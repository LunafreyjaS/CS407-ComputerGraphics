//Code from three.js documentation

import { createCamera } from './components/camera.js';
import { createOctahedron } from './components/octahedron.js';
import { createTorus } from './components/torus.js';
import { createScene } from './components/scene.js';
import { createDirectionalLight, createPointLight } from './components/lights.js';

import { createRenderer } from './systems/renderer.js';
import {Resizer} from './systems/Resizer.js';

import {Color} from 'three';

let camera, renderer, scene;
let torusHex, pointLight, directionalLight;


class World {
    // 1. Create an instance of the World app
    constructor(container) {
        camera = createCamera();
        camera.position.set(7, 0, 35);
        camera.lookAt(0, 0, 0);

        scene = createScene();
        renderer = createRenderer(container);

        const octahedron = createOctahedron();
        octahedron.material.color = new Color('purple');

        torusHex = createTorus();
        torusHex.material.color = new Color('red');

        pointLight = createPointLight();
        pointLight.position.set(0, 8, 1);
        pointLight.intensity = 0;
        pointLight.decay = 20;
        pointLight.distance = 200;
        pointLight.color = new Color('blue');

        directionalLight = createDirectionalLight();
        directionalLight.position.set(-10, 10, 10);
        directionalLight.lookAt(0, 0, 0);
        directionalLight.intensity = 5;

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
        
        if (pointLight.intensity > 0) {
            pointLight.intensity = 0;
            directionalLight.intensity = 5;
        } else {
            pointLight.intensity = 400;
            directionalLight.intensity = 0;
        }

        this.render();
    }

    //4. Move torusHex
    moveTorusHex(direction) {
        
        if(direction == "left")
            torusHex.position.x -= 1;
        else if(direction == "right")
            torusHex.position.x += 1;
        else if(direction == "up")
            torusHex.position.y += 1;
        else if(direction == "down")
            torusHex.position.y -= 1;

        this.render();
    }

}
    
    export { World};