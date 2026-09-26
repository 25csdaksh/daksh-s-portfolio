/**
 * galaxyShaders.js
 * High-performance GPU Shaders for the 3D Procedural Spiral Galaxy.
 * Provides realistic circular glowing stars, differential Keplerian orbital dynamics,
 * volumetric core glow, and cosmic dust nebulae.
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
    attribute float aTwinkleSpeed;

    varying vec3 vColor;
    varying float vBrightness;
    varying float vDistance;
    varying float vTwinkle;

    void main() {
      vColor = color;
      vBrightness = aBrightness;
      vDistance = aDistance;

      // Keplerian / Galactic Differential Orbital Velocity
      // V(r) curve: inner stars rotate faster, outer stars slower with flat rotation curve at edges
      float radius = length(position.xz);
      float orbitalVelocity = (uRotationSpeed * 120.0) / (pow(max(radius, 0.45), uDifferentialSpeed) + 0.4);
      
      // Continuous orbital revolution
      float currentAngle = atan(position.z, position.x) + (uTime * orbitalVelocity * aSpeed);

      // Subtle vertical wave oscillation for organic living galaxy feel
      float waveY = sin(uTime * 0.4 + aRandomAngle + radius * 0.8) * (0.05 * (1.0 + radius * 0.08));
      float driftRadius = radius + cos(uTime * 0.25 + aRandomAngle) * 0.025;

      vec3 newPosition;
      newPosition.x = cos(currentAngle) * driftRadius + aRandomness.x;
      newPosition.z = sin(currentAngle) * driftRadius + aRandomness.z;
      newPosition.y = position.y + aRandomness.y + waveY;

      vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;

      gl_Position = projectedPosition;

      // Size attenuation based on distance to camera
      gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -viewPosition.z);
      gl_PointSize = max(gl_PointSize, 2.0);

      // Subtle star twinkle
      vTwinkle = 0.8 + 0.2 * sin(uTime * aTwinkleSpeed + aRandomAngle * 3.0);
    }
  `,

  fragmentShader: `
    varying vec3 vColor;
    varying float vBrightness;
    varying float vDistance;
    varying float vTwinkle;

    void main() {
      // Distance from center of point sprite (0.0 to 0.5)
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);
      if (dist > 0.5) discard;

      // Soft circular anti-aliased core
      float strength = 1.0 - (dist * 2.0);
      strength = pow(strength, 2.0);

      // Intense white-hot center core glow
      float centerGlow = exp(-dist * 9.0) * 1.1;

      // Outer soft aura
      float outerAura = exp(-dist * 4.5) * 0.45;

      // Color blending: center is pure white-hot, fading into star color and soft aura
      vec3 finalColor = mix(vColor, vec3(1.0), clamp(centerGlow, 0.0, 1.0));
      finalColor += vColor * outerAura;

      float alpha = (strength * 0.7 + centerGlow * 0.6 + outerAura * 0.3) * vBrightness * vTwinkle;
      alpha = clamp(alpha, 0.0, 1.0);

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

      // Smooth exponential volumetric radial falloff
      float glow = exp(-dist * 4.8);
      float pulse = 1.0 + sin(uTime * 1.5) * 0.06;
      glow *= pulse * uIntensity;

      // Color gradient from white-hot center to celestial blue/gold corona
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
      
      float radius = length(position.xz);
      float orbitalVelocity = (uRotationSpeed * 100.0) / (pow(max(radius, 0.5), 0.75) + 0.4);
      float currentAngle = atan(position.z, position.x) + (uTime * orbitalVelocity * aSpeed);

      vec3 newPosition;
      newPosition.x = cos(currentAngle) * radius + aRandomness.x;
      newPosition.z = sin(currentAngle) * radius + aRandomness.z;
      newPosition.y = position.y + aRandomness.y + sin(uTime * 0.2 + aRandomAngle) * 0.06;

      vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      gl_Position = projectionMatrix * viewPosition;

      gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -viewPosition.z);
      gl_PointSize = max(gl_PointSize, 8.0);
      vAlpha = 0.16 * aScale;
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    varying float vAlpha;

    void main() {
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);
      if (dist > 0.5) discard;

      // Soft gaussian cloud falloff
      float cloud = exp(-dist * 3.6) * (1.0 - dist * 2.0);
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
      vTwinkle = 0.55 + 0.45 * sin(uTime * aTwinkleSpeed + aPhase);

      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      gl_Position = projectionMatrix * viewPosition;

      gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -viewPosition.z);
      gl_PointSize = max(gl_PointSize, 1.5);
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    varying float vTwinkle;

    void main() {
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);
      if (dist > 0.5) discard;

      float strength = 1.0 - (dist * 2.0);
      strength = pow(strength, 2.0);

      float alpha = strength * vTwinkle;
      gl_FragColor = vec4(vColor, alpha);
    }
  `
};
