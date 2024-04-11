//Code from three.js documentation

import { WebGLRenderer } from 'three';

function createRenderer() {
  const renderer = new WebGLRenderer();

  return renderer;
}

export { createRenderer };