//Code from three.js documentation

import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createDirectionalLight, createPointLight } from './components/lights.js';
import { createRenderer } from './systems/renderer.js';
import {Resizer} from './systems/Resizer.js';

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

import {Parachute} from './components/parachute.js';
import {createKiwi} from './components/kiwi.js';

let camera, renderer, scene, controls;
let directionalLight;
let group, parachuteShape, kiwiShape;
let rotationY = 0;
let rotationX = 0;
let bloomComposer, finalComposer
//Let other shapes


class World {
    // 1. Create an instance of the World app
    constructor(container) {
        camera = createCamera();

        camera.position.set(0, 20, -20);

        controls = cameraOrbit(camera, container);
        camera.lookAt(0, 0, 0);

        scene = createScene();
        renderer = createRenderer(container);

        // Bloom Render, partially taken from https://github.com/mrdoob/three.js/blob/master/examples/webgl_postprocessing_unreal_bloom_selective.html
        // const BLOOM_SCENE = 1;
        // const bloomLayer = new Layers();
        // bloomLayer.set(BLOOM_SCENE);

        // const renderScene = new RenderPass(scene, camera);

        // const bloomPass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        // bloomPass.threshold = 0;
        // bloomPass.strength = 1;
        // bloomPass.radius = 0.5;
        // bloomPass.exposure = 0.5;
        // bloomPass.enabled = true;
        //bloomPass.selectedObjects = scene.children.filter(obj => obj.layers.test(BLOOM_SCENE));

        // bloomComposer = new EffectComposer(renderer);
        // bloomComposer.renderToScreen = false;
        // bloomComposer.addPass(renderScene);
        // bloomComposer.addPass(bloomPass);

        // const outputPass = new OutputPass();

        // finalComposer = new EffectComposer(renderer);
        // finalComposer.addPass(renderScene);
        // //finalComposer.addPass(bloomPass);
        // finalComposer.addPass(outputPass);

        // const raycaster = new Raycaster();
                    

        //Create shapes
        group = new Group();
        parachuteShape = new Parachute();
        kiwiShape = createKiwi();

        group.add(parachuteShape);
        group.add(kiwiShape);

        kiwiShape.position.set(0, -3, -2);
        kiwiShape.rotation.set(0.7, -3, 0);

        //Create lighting

        directionalLight = createDirectionalLight();
        directionalLight.position.set(-10, 10, -30);
        directionalLight.lookAt(0, 0, 0);
        directionalLight.intensity = 2;

        //Add scene items
        scene.add(group);
        scene.add(directionalLight);

        const resizer = new Resizer(container, camera, renderer, scene, directionalLight);
    }
    
    // 2. Render the scene
    render() {

        renderer.render(scene, camera);
    }

    rotateParachute(direction) {

        const rotationSpeed = 0.1;
        console.log(direction);
        
        if(direction == "left"){
            rotationY -= rotationSpeed;
            group.rotation.set(rotationX, rotationY, 0);
        }
        else if(direction == "right"){
            rotationY += rotationSpeed;
            group.rotation.set(rotationX, rotationY, 0); 
        }
        else if(direction == "up"){
            rotationX += rotationSpeed;
            group.rotation.set(rotationX, rotationY, 0);
        }
        else if(direction == "down"){
            rotationX -= rotationSpeed;
            group.rotation.set(rotationX, rotationY, 0);
        }

        this.render();
    }

    zoomCamera(direction) {
    
        const zoomAmount = 1;
        if(direction == "in")
            camera.position.z -= zoomAmount;
        else if(direction == "out")
            camera.position.z += zoomAmount;

        camera.lookAt(0, 0, 0);

        this.render();
    }

}

    export { World};