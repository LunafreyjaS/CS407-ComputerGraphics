// Code from three.js documentation

import { Color, Scene, TextureLoader } from 'three';
import Sky from '../components/sky.jpg';

function createScene() {
  const scene = new Scene();

  const skyTexture = new TextureLoader().load(Sky);

  scene.background = skyTexture;

  return scene;
}

export { createScene };