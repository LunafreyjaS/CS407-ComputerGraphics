//Code from three.js documentation

import { createCamera } from './components/camera.js';
import { createOctahedron } from './components/octahedron.js';
import { createTorus } from './components/torus.js';
import { createScene } from './components/scene.js';

import { createRenderer } from './systems/renderer.js';
import {Resizer} from './systems/Resizer.js';

import {Color} from 'three';

let camera, renderer, scene;


class World {
    // 1. Create an instance of the World app
    constructor(container) {
        camera = createCamera();
        camera.position.set(0, 0, 10);

        scene = createScene();
        renderer = createRenderer(container);

        const octahedron = createOctahedron();
        octahedron.material.color = new Color('purple');

        const torusHex = createTorus();
        torusHex.material.color = new Color('red');

        scene.add(octahedron);
        scene.add(torusHex);

        const resizer = new Resizer(container, camera, renderer);
    }
    
    // 2. Render the scene
    render() {
        renderer.render(scene, camera);
    }

    //3. Dynamic Lighting
    lightingSwap() {
    
    

    }

}
    
    export { World };