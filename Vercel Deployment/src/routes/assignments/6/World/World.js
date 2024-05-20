//Code from three.js documentation

import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createDirectionalLight, createPointLight } from './components/lights.js';
import { createRenderer } from './systems/renderer.js';
import {Resizer} from './systems/Resizer.js';
import {Loop} from './systems/Loop.js';

import {Color, Raycaster} from 'three';
import { Group } from 'three';
import { Layers } from 'three';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { Vector2 } from 'three';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { ShaderMaterial } from 'three';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { Vector3 } from 'three';
 
import { createGround } from './components/ground.js';
import { createFox } from './components/fox.js';

let camera, renderer, scene, loop;
let directionalLight;
let rotationY = 0;
let rotationX = 0;
let rotationZ = 0;
//Let other shapes
let ground, fox;
let keys = {};

class World {
    // 1. Create an instance of the World app
    constructor(container) {
        camera = createCamera();
        camera.position.set(0, 5, -3);
        camera.lookAt(0, -10, 1000);

        scene = createScene();
        renderer = createRenderer(container);

        loop = new Loop(camera, scene, renderer);

        //Create shapes

        const ground = createGround();


        //Create lighting

        directionalLight = createDirectionalLight();
        directionalLight.position.set(-10, 10, -30);
        directionalLight.lookAt(0, 0, 0);
        directionalLight.intensity = 2;

        //Add scene items

        scene.add(ground);
        scene.add(directionalLight);

        const resizer = new Resizer(container, camera, renderer, scene, directionalLight);
    }
    
    async init(){
        fox = await createFox();

        fox.position.set(0, 1, 10);
        fox.scale.set(0.03, 0.03, 0.03);
        //fox.add(camera);

        loop.addUpdateable(fox);
        loop.fox = fox;
        fox.playSurvey();

        scene.add(fox);
        scene.add(camera);
    }


    // 2. Render the scene
    render() {

        renderer.render(scene, camera);
    }

    start(){
        loop.start();
    }

    stop(){
        loop.stop();
    }

    getFrameRate() {
        return loop.getFrameRate();
    }

    toggleAnimation(){
        loop.animate = !loop.animate;
    }

    initControls() {
        window.addEventListener('keydown', (event) => {
            keys[event.key] = true;
            this.updateMovement();
            this.render();
        });

        window.addEventListener('keyup', (event) => {
            keys[event.key] = false;
            this.updateMovement();
            this.render();
        });
    }

    updateMovement() {
        if (keys['w'] && keys['Shift']) {
            this.playRun();
        } else if (keys['w']) {
            this.playWalkForward();
        } else if (keys['s']) {
            this.playWalkBackward();
        } else {
            this.playSurvey();
        }

        if (keys['a']) {
            rotationZ += 0.1;
            fox.rotation.z = rotationZ;
            //camera.rotation.y = -rotationZ/2;
        } else if (keys['d']) {
            rotationZ -= 0.1;
            fox.rotation.z = rotationZ;
            //camera.rotation.y = -rotationZ/2;
        }
    }

    playWalkForward() {
        if (fox && fox.playWalk) {
            fox.playWalk();
        }
        fox.position.x += 0.2 * Math.sin(fox.rotation.z);
        fox.position.z += 0.2 * Math.cos(fox.rotation.z);
        //camera.position.z += 0.1;
    }

    playWalkBackward() {
        if (fox && fox.playWalk) {
            fox.playWalk();
        }
        fox.position.x -= 0.2 * Math.sin(fox.rotation.z);
        fox.position.z -= 0.2 * Math.cos(fox.rotation.z);
        //camera.position.z -= 0.1;
    }

    playRun() {
        if (fox && fox.playRun) {
            fox.playRun();
        }
        fox.position.x += 0.3 * Math.sin(fox.rotation.z);
        fox.position.z += 0.3 * Math.cos(fox.rotation.z);
        //camera.position.z += 0.2;
    }

    playSurvey() {
        if (fox && fox.playSurvey) {
            fox.playSurvey();
        }
    }

}

    export { World};