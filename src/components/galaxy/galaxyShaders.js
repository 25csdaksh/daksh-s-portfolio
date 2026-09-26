/**
 * galaxyShaders.js
 * GPU Shaders for the True 3D Milky Way Spiral Galaxy.
 * Produces crisp, luminous, circular point stars with intense white-hot cores,
 * realistic star-forming nebulae, and soft volumetric galactic haze.
 */

export const galaxyParticlesShader = {
  vertexShader: `
    uniform float uTime;
    uniform float uPixelRatio;
    uniform float uSize;

    attribute float aScale;
    attribute float aBrightness;
    attribute float aTwinkleSpeed;
    attribute float aPhase;
    attribute vec3 aStreamVector;

    varying vec3 vColor;
    varying float vBrightness;
    varying float vTwinkle;

    void main() {
      vColor = color;
      vBrightness = aBrightness;

      // Subtle organic breathing & streamline drift along the spiral arm vector
      float drift = sin(uTime * 0.6 + aPhase) * 0.035;
      vec3 displacedPos = position + aStreamVector * drift;

      // Subtle vertical wave across the disk
      displacedPos.y += sin(uTime * 0.4 + aPhase * 2.0) * 0.02;

      vec4 modelPosition = modelMatrix * vec4(displacedPos, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;

      gl_Position = projectedPosition;

      // Size attenuation: larger when close to camera
      gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -viewPosition.z);
      gl_PointSize = max(gl_PointSize, 1.2);

      // Star twinkling effect
      vTwinkle = 0.82 + 0.18 * sin(uTime * aTwinkleSpeed + aPhase);
    }
  `,

  fragmentShader: `
    varying vec3 vColor;
    varying float vBrightness;
    varying float vTwinkle;

    void main() {
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);
      if (dist > 0.5) discard;

      // 1. Soft anti-aliased circular disk
      float disc = 1.0 - (dist * 2.0);
      disc = pow(disc, 1.8);

      // 2. Hyper-bright white-hot stellar nucleus
      float core = exp(-dist * 12.0);

      // 3. Subtle outer diffraction corona
      float corona = exp(-dist * 4.5) * 0.3;

      // Blend color towards pure white at the hot center
      vec3 finalColor = mix(vColor, vec3(1.0), clamp(core * 1.1, 0.0, 1.0));
      finalColor += vColor * corona;

      float alpha = (disc * 0.55 + core * 0.85 + corona * 0.2) * vBrightness * vTwinkle;
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
    uniform vec3 uColorMid;
    uniform vec3 uColorOuter;
    uniform float uIntensity;
    uniform float uTime;
    varying vec2 vUv;

    void main() {
      float dist = distance(vUv, vec2(0.5));
      if (dist > 0.5) discard;

      // Soft exponential volumetric density falloff (Plummer profile)
      float glow = exp(-dist * 6.0);
      float pulse = 1.0 + sin(uTime * 0.9) * 0.03;
      glow *= pulse * uIntensity;

      // 3-stop smooth gradient: Soft White -> Warm Gold -> Deep Cosmic Blue
      vec3 color;
      if (dist < 0.22) {
        color = mix(uColorInner, uColorMid, dist / 0.22);
      } else {
        color = mix(uColorMid, uColorOuter, (dist - 0.22) / 0.28);
      }

      float alpha = clamp(glow * (1.0 - dist * 2.0), 0.0, 1.0) * 0.65;

      gl_FragColor = vec4(color * uIntensity, alpha);
    }
  `
};

export const dustCloudShader = {
  vertexShader: `
    uniform float uTime;
    uniform float uPixelRatio;
    uniform float uSize;

    attribute float aScale;
    attribute float aPhase;
    attribute vec3 aStreamVector;

    varying vec3 vColor;
    varying float vAlpha;

    void main() {
      vColor = color;

      float drift = sin(uTime * 0.35 + aPhase) * 0.025;
      vec3 displacedPos = position + aStreamVector * drift;
      displacedPos.y += sin(uTime * 0.25 + aPhase) * 0.03;

      vec4 modelPosition = modelMatrix * vec4(displacedPos, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      gl_Position = projectionMatrix * viewPosition;

      gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -viewPosition.z);
      gl_PointSize = max(gl_PointSize, 5.0);
      
      vAlpha = 0.14 * aScale;
    }
  `,
  fragmentShader: `
    varying vec3 vColor;
    varying float vAlpha;

    void main() {
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);
      if (dist > 0.5) discard;

      // Gaussian soft cloud falloff
      float cloud = exp(-dist * 4.2) * (1.0 - dist * 2.0);
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
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);
      if (dist > 0.5) discard;

      float strength = pow(1.0 - (dist * 2.0), 2.0);
      float alpha = strength * vTwinkle * 0.75;

      gl_FragColor = vec4(vColor, alpha);
    }
  `
};
