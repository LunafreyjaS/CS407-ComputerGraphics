//Code from three.js documentation

import { createCamera } from './components/camera.js';
import { createOctahedron } from './components/octahedron.js';
import { createTorus } from './components/torus.js';
import { createScene } from './components/scene.js';
import { createDirectionalLight, createPointLight } from './components/lights.js';

import { createRenderer } from './systems/renderer.js';
import {Resizer} from './systems/Resizer.js';

import {Color} from 'three';

let camera, renderer, scene 
let isLighting = true;


class World {
    // 1. Create an instance of the World app
    constructor(container) {
        camera = createCamera();
        camera.position.set(5, 0, 35);
        camera.lookAt(0, 0, 0);

        scene = createScene();
        renderer = createRenderer(container);

        const octahedron = createOctahedron();
        octahedron.material.color = new Color('purple');

        const torusHex = createTorus();
        torusHex.material.color = new Color('red');

        const pointLight = createPointLight();
        pointLight.position.set(0, 7, 0);
        pointLight.intensity = 0;
        pointLight.color = new Color('blue');

        const directionalLight = createDirectionalLight();
        directionalLight.position.set(-10, 10, -10);
        directionalLight.intensity = 1.5;

        scene.add(octahedron);
        scene.add(torusHex);
        scene.add(pointLight);
        scene.add(directionalLight);

        const resizer = new Resizer(container, camera, renderer);
    }
    
    // 2. Render the scene
    render() {
        renderer.render(scene, camera);
    }

    //3. Dynamic Lighting
    lightingSwap() {
    
        let pointLight = scene.getObjectByName('pointLight');
        let directionalLight = scene.getObjectByName('directionalLight');
        
        if (isLighting) {
            pointLight.intensity = 0;
            directionalLight.intensity = 0;
            isLighting = false;
        } else {
            pointLight.intensity = 3;
            directionalLight.intensity = 1.5;
            isLighting = true;
        }

    }

    //4. Move torusHex
    moveTorusHex(direction) {
        let torusHex = scene.getObjectByName('torusHex');
        
        if(direction == "left")
            torusHex.position.x -= 1;
        else if(direction == "right")
            torusHex.position.x += 1;
        else if(direction == "up")
            torusHex.position.y += 1;
        else if(direction == "down")
            torusHex.position.y -= 1;
    }

}
    
    export { World};