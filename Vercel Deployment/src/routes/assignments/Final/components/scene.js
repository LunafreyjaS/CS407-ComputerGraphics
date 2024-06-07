// Code from three.js documentation

import { Color, Scene, TextureLoader } from 'three';

function createScene() {
  const scene = new Scene();

  //const skyTexture = new TextureLoader().load(Sky);

  scene.background = new Color('skyblue');

  return scene;
}

export { createScene };