//Code from three.js documentation

import { DirectionalLight, PointLight } from 'three';

function createDirectionalLight() {
  // Create a directional light
  const light = new DirectionalLight('white', 8);

  // move the light right, up, and towards us
  light.position.set(10, 10, 10);

  return light;
}

function createPointLight() {
  // Create a point light
  const light = new PointLight("#cb3434", 0.5, 0, 0.5);
  light.castShadow = true;

  return light;
}

export { createDirectionalLight, createPointLight };
