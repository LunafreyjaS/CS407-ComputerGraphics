import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { setupModel } from './setupModel.js';

async function createFox() {
    const loader = new GLTFLoader();
    const data = await loader.loadAsync('/assets/fox/scene.gltf');
  
    const fox = setupModel(data);
    console.log("Fox loaded");

    return fox;
}


export { createFox };