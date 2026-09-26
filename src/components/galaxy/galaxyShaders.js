/**
 * galaxyShaders.js
 * High-performance GPU Shaders for the 3D Procedural Spiral Galaxy.
 * Provides differential orbital physics, dynamic twinkling, soft point falloffs,
 * and volumetric glows on the GPU.
 */

export const galaxyParticlesShader = {
  vertexShader: `
    uniform float uTime;
    uniform float uPixelRatio;
    uniform float uSize;
    uniform float uRotationSpeed;
    uniform float uDifferentialSpeed;

    attribute float aScale;
    attribute float aBrightness;
    attribute float aSpeed;
    attribute float aRandomAngle;
    attribute float aDistance;
    attribute vec3 aRandomness;

    varying vec3 vColor;
    varying float vBrightness;
    varying float vDistance;

    const float PI = 3.14159265358979323846;

    void main() {
      vColor = color;
      vBrightness = aBrightness;
      vDistance = aDistance;

      // Calculate initial polar coordinates
      float initialAngle = atan(position.z, position.x);
      float currentRadius = length(position.xz);

      // Differential orbital angular velocity:
      // Inner stars revolve faster, outer stars revolve slower (Keplerian / Galactic rotation curve)
      float orbitalVelocity = (uRotationSpeed * 100.0) / (pow(max(currentRadius, 0.4), uDifferentialSpeed) + 0.35);
      
      // Global 720-degree infinite rotation plus differential spin
      float currentAngle = initialAngle + (uTime * orbitalVelocity * aSpeed);

      // Add gentle vertical & horizontal harmonic drift for living galaxy feel
      float driftY = sin(uTime * 0.4 + aRandomAngle) * (0.04 * (1.0 + currentRadius * 0.1));
      float driftRadius = currentRadius + cos(uTime * 0.3 + aRandomAngle) * 0.03;

      // Reconstruct 3D world position
      vec3 newPosition;
      newPosition.x = cos(currentAngle) * driftRadius + aRandomness.x;
      newPosition.z = sin(currentAngle) * driftRadius + aRandomness.z;
      newPosition.y = position.y + aRandomness.y + driftY;

      vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;

      gl_Position = projectedPosition;

      // Size attenuation based on distance to camera and screen pixel ratio
      gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -viewPosition.z);
      
      // Enforce minimum size on high-DPI screens
      gl_PointSize = max(gl_PointSize, 1.5);
    }
  `,

  fragmentShader: `
    varying vec3 vColor;
    varying float vBrightness;
    varying float vDistance;

    void main() {
      // Calculate distance from center of point quad (0.0 to 0.5)
      float dist = distance(gl_PointCoord, vec2(0.5));
      if (dist > 0.5) discard;

      // Soft circular point falloff
      float strength = 1.0 - (dist * 2.0);
      strength = pow(strength, 2.2);

      // Core white-hot glow point in center
      float coreGlow = exp(-dist * 8.0) * 0.85;

      // Blend star color towards pure white at the hot center
      vec3 finalColor = mix(vColor, vec3(1.0), coreGlow);

      // Apply individual star brightness & radial falloff
      float alpha = strength * vBrightness;

      gl_FragColor = vec4(finalColor, alpha);
    }
  `
};

export const coreGlowShader = {
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColorInner;
    uniform vec3 uColorOuter;
    uniform float uIntensity;
    uniform float uTime;
    varying vec2 vUv;

    void main() {
      float dist = distance(vUv, vec2(0.5));
      if (dist > 0.5) discard;

      // Exponential volumetric falloff from center
      float glow = exp(-dist * 5.2);
      float pulse = 1.0 + sin(uTime * 1.8) * 0.05;
      glow *= pulse * uIntensity;

      // Gradient from white-hot core to soft celestial blue/gold corona
      vec3 color = mix(uColorInner, uColorOuter, smoothstep(0.0, 0.45, dist));
      float alpha = clamp(glow * (1.0 - dist * 2.0), 0.0, 1.0);

      gl_FragColor = vec4(color * uIntensity, alpha);
    }
  `
};

export const dustParticlesShader = {
  vertexShader: `
    uniform float uTime;
    uniform float uPixelRatio;
    uniform float uSize;
    uniform float uRotationSpeed;

    attribute float aScale;
    attribute float aSpeed;
    attribute float aRandomAngle;
    attribute vec3 aRandomness;

    varying vec3 vColor;
    varying float vAlpha;

    void main() {
      vColor = color;
      
      float initialAngle = atan(position.z, position.x);
      float radius = length(position.xz);
      float currentAngle = initialAngle + (uTime * uRotationSpeed * 12.0 * aSpeed);

      vec3 newPosition;
      newPosition.x = cos(currentAngle) * radius + aRandomness.x;
      newPosition.z = sin(currentAngle) * radius + aRandomness.z;
      newPosition.y = position.y + aRandomness.y + sin(uTime * 0.2 + aRandomAngle) * 0.08;

      vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      gl_Position = projectionMatrix * viewPosition;

      gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -viewPosition.z);
      vAlpha = 0.12 * aScale;
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    varying float vAlpha;

    void main() {
      float dist = distance(gl_PointCoord, vec2(0.5));
      if (dist > 0.5) discard;

      // Soft gaussian-like cloud density
      float cloud = exp(-dist * 4.0) * (1.0 - dist * 2.0);
      cloud = clamp(cloud, 0.0, 1.0);

      gl_FragColor = vec4(vColor, cloud * vAlpha);
    }
  `
};

export const backgroundStarsShader = {
  vertexShader: `
    uniform float uTime;
    uniform float uPixelRatio;
    uniform float uSize;

    attribute float aScale;
    attribute float aTwinkleSpeed;
    attribute float aPhase;
    attribute vec3 aColor;

    varying vec3 vColor;
    varying float vTwinkle;

    void main() {
      vColor = aColor;
      
      // Calculate twinkling factor
      vTwinkle = 0.5 + 0.5 * sin(uTime * aTwinkleSpeed + aPhase);

      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      gl_Position = projectionMatrix * viewPosition;

      gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -viewPosition.z);
      gl_PointSize = max(gl_PointSize, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    varying float vTwinkle;

    void main() {
      float dist = distance(gl_PointCoord, vec2(0.5));
      if (dist > 0.5) discard;

      float strength = 1.0 - (dist * 2.0);
      strength = pow(strength, 2.5);

      float alpha = strength * (0.35 + 0.65 * vTwinkle);
      gl_FragColor = vec4(vColor, alpha);
    }
  `
};
