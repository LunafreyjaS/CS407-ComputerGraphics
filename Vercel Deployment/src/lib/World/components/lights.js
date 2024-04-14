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
  const light = new PointLight('white', 2);

  return light;
}

export { createDirectionalLight, createPointLight };
