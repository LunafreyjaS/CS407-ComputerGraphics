// Code from three.js documentation

import { Color, Scene, TextureLoader } from 'three';
import Sky from '$lib/images/sky.jpg';

function createScene() {
  const scene = new Scene();

  const skyTexture = new TextureLoader().load(Sky);

  scene.background = skyTexture;
  //scene.background = new Color('skyblue');

  return scene;
}

export { createScene };