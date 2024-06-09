import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createDirectionalLight, createPointLight } from './components/lights.js';
import { createRenderer } from './systems/renderer.js';
import {Resizer} from './systems/Resizer.js';
import {Loop} from './systems/Loop.js';
import {cameraOrbit } from './systems/orbit.js';

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
import { Vector3, Vector4 } from 'three';
 
import { createGround } from './components/ground.js';
import { createIcosahedron, updateUniform, setFragmentShader, setVertexShader } from './components/icosahedron.js';

let camera, renderer, scene, loop, controls;
let directionalLight;

let icosahedron;

class World {
    // 1. Create an instance of the World app
    constructor(container) {
        camera = createCamera();
        camera.position.set(0, 20, -30);
        //camera.lookAt(0, -10, 1000);

        controls = cameraOrbit(camera, container);
        //camera.lookAt(0, 0, 10);

        scene = createScene();
        renderer = createRenderer(container);

        loop = new Loop(camera, scene, renderer);

        //Create shapes

        const ground = createGround();
        icosahedron = createIcosahedron();
        icosahedron.position.set(0, 6, 0);

        //Create lighting

        directionalLight = createDirectionalLight();
        directionalLight.position.set(-10, 10, -30);
        directionalLight.lookAt(0, 0, 0);
        directionalLight.intensity = 2;

        //Add scene items

        scene.add(ground);
        scene.add(icosahedron);
        scene.add(directionalLight);

        const resizer = new Resizer(container, camera, renderer, scene, directionalLight);
    }

    render() {

        renderer.render(scene, camera);
    }

    start() {
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

    changeColor(color1, color2){
    
        const red1 = parseInt(color1.substring(1, 3), 16) / 255.0;
        const green1 = parseInt(color1.substring(3, 5), 16) / 255.0;
        const blue1 = parseInt(color1.substring(5, 7), 16) / 255.0;
        const color1Vec = new Vector3(red1, green1, blue1);

        const red2 = parseInt(color2.substring(1, 3), 16) / 255.0;
        const green2 = parseInt(color2.substring(3, 5), 16) / 255.0;
        const blue2 = parseInt(color2.substring(5, 7), 16) / 255.0;
        const color2Vec = new Vector3(red2, green2, blue2);

        updateUniform(icosahedron, "color1", color1Vec);
        updateUniform(icosahedron, "color2", color2Vec);
    }

    updateShaders(vertexShader, fragmentShader){
        setVertexShader(icosahedron, vertexShader);
        setFragmentShader(icosahedron, fragmentShader);
    }

}

export { World };