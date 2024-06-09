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
import { Vector3, Vector4, Matrix4 } from 'three';
 
//import { createGround } from './components/ground.js';
//import { createIcosahedron, updateUniform, setFragmentShader, setVertexShader } from './components/icosahedron.js';
import { createBloom } from './systems/bloom.js';
import { Collision } from './systems/collision.js';
import { lunaSphere } from './components/sphere.js';
import { createGround } from './components/ground.js';
import { createHourglass } from './components/hourglass.js';
import { get } from 'svelte/store';

let camera, renderer, scene, loop, controls, bloom, collision;
let directionalLight;

let spheres = [];
let hourglass;
let ground;

let rotationY = 0;
let rotationX = 0;

let hourglassMatrix;
let gravityDirection;
let scale = 1;
let boundary = scale*4;
let particleCount = 300;


class World {
    // 1. Create an instance of the World app
    constructor(container) {
        camera = createCamera();
        camera.position.set(0, 10, -30);
        //camera.lookAt(0, -10, 1000);

        controls = cameraOrbit(camera, container);
        //camera.lookAt(0, 0, 10);

        scene = createScene();
        renderer = createRenderer(container);

        bloom = createBloom(container, scene, camera, renderer, container.clientWidth, container.clientHeight);

        collision = new Collision(spheres);

        loop = new Loop(camera, scene, renderer, bloom);
        loop.addUpdateable(collision);

        //Create shapes

        hourglass = createHourglass(scale);

        for (let i = 0; i < particleCount; i++) {
        
            const particle = new lunaSphere(scale, boundary);
            spheres.push(particle);
            scene.add(particle.mesh);
        }

        loop.addUpdateable({
            tick: (delta) => {
                hourglassMatrix = new Matrix4().makeRotationFromQuaternion(hourglass.quaternion);
                gravityDirection = this.getGravityDirection(hourglass);
                spheres.forEach((lunaSphere) => {
                    lunaSphere.tick(delta, hourglassMatrix, spheres, gravityDirection);
                });
                controls.update();
            }
        })

        // const pos1 = new Vector3(6, 0, 0);
        // const dir1 = new Vector3(0, 0, 1);
        // const sphere1 = new lunaSphere(pos1, 1.5, dir1, 0);

        //spheres.push(sphere1);

        ground = createGround();


        //Create lighting

        directionalLight = createDirectionalLight();
        directionalLight.position.set(-10, 10, -30);
        directionalLight.lookAt(0, 0, 0);
        directionalLight.intensity = 2;

        //Add scene items

        // scene.add(sphere1);
        // loop.addUpdateable(sphere1);

        scene.add(ground);

        scene.add(hourglass);

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

    rotateHourglass(direction) {
        const rotationSpeed = 0.1;
    
        if (direction === "left") {
            rotationY -= rotationSpeed;
        } else if (direction === "right") {
            rotationY += rotationSpeed;
        } else if (direction === "up") {
            rotationX += rotationSpeed;
        } else if (direction === "down") {
            rotationX -= rotationSpeed;
        }
    
        hourglass.rotation.set(rotationX, rotationY, 0);
        hourglassMatrix = new Matrix4().makeRotationFromQuaternion(hourglass.quaternion);
        gravityDirection = this.getGravityDirection(hourglass);
    
        this.render();
    }

    getGravityDirection(hourglass) {
        const up = new Vector3(0, 1, 0);
        up.applyQuaternion(hourglass.quaternion);
        return up.multiplyScalar(-9.81);
    }

    addSphere() {
        const particle = new lunaSphere(scale, boundary);
        spheres.push(particle);
        scene.add(particle.mesh);

        particleCount++;
        console.log(particleCount);
    }


    // changeColor(color1, color2){
    
    //     const red1 = parseInt(color1.substring(1, 3), 16) / 255.0;
    //     const green1 = parseInt(color1.substring(3, 5), 16) / 255.0;
    //     const blue1 = parseInt(color1.substring(5, 7), 16) / 255.0;
    //     const color1Vec = new Vector3(red1, green1, blue1);

    //     const red2 = parseInt(color2.substring(1, 3), 16) / 255.0;
    //     const green2 = parseInt(color2.substring(3, 5), 16) / 255.0;
    //     const blue2 = parseInt(color2.substring(5, 7), 16) / 255.0;
    //     const color2Vec = new Vector3(red2, green2, blue2);

    //     updateUniform(icosahedron, "color1", color1Vec);
    //     updateUniform(icosahedron, "color2", color2Vec);
    // }

    // updateShaders(vertexShader, fragmentShader){
    //     setVertexShader(icosahedron, vertexShader);
    //     setFragmentShader(icosahedron, fragmentShader);
    // }

}

export { World };