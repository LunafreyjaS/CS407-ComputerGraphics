//Code from three.js documentation

import { createCamera } from './components/camera.js';
import { createScene } from './components/scene.js';
import { createDirectionalLight, createPointLight } from './components/lights.js';
import { createRenderer } from './systems/renderer.js';
import {Resizer} from './systems/Resizer.js';

import { createCylinderConeTop } from './components/cylinderConeTop.js';
import { createCylinderConeBottom } from './components/cylinderConeBottom.js';
import { createCylinderConeMiddle } from './components/cylinderConeMiddle.js';
import { createSmallSphere, createMediumSphere, createLargeSphere } from './components/sphere.js';

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

let camera, renderer, scene;
let directionalLight;
let cylinderGroup;
let rotationY = 0;
let rotationX = 0;
let bloomComposer, finalComposer
//Let other shapes


class World {
    // 1. Create an instance of the World app
    constructor(container) {
        camera = createCamera();
        camera.position.set(0, 18, 50);
        camera.lookAt(0, 0, 0);

        scene = createScene();
        renderer = createRenderer(container);

        // Bloom Render, partially taken from https://github.com/mrdoob/three.js/blob/master/examples/webgl_postprocessing_unreal_bloom_selective.html
        const BLOOM_SCENE = 1;
        const bloomLayer = new Layers();
        bloomLayer.set(BLOOM_SCENE);

        const renderScene = new RenderPass(scene, camera);

        const bloomPass = new UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        bloomPass.threshold = 0;
        bloomPass.strength = 1;
        bloomPass.radius = 0.5;
        bloomPass.exposure = 0.5;
        bloomPass.enabled = true;
        //bloomPass.selectedObjects = scene.children.filter(obj => obj.layers.test(BLOOM_SCENE));

        bloomComposer = new EffectComposer(renderer);
        bloomComposer.renderToScreen = false;
        bloomComposer.addPass(renderScene);
        bloomComposer.addPass(bloomPass);

        const outputPass = new OutputPass();

        finalComposer = new EffectComposer(renderer);
        finalComposer.addPass(renderScene);
        //finalComposer.addPass(bloomPass);
        finalComposer.addPass(outputPass);

        const raycaster = new Raycaster();
                    

        //Create shapes
        cylinderGroup = new Group();

        const cylinderConeTop = createCylinderConeTop();
        cylinderConeTop.material.color = new Color('darkslategrey');
        cylinderConeTop.position.set(0, 12, 0);

        const cylinderConeMiddle = createCylinderConeMiddle();
        cylinderConeMiddle.material.color = new Color('white');
        cylinderConeMiddle.position.set(0, 2, 0);

        const cylinderConeBottom = createCylinderConeBottom();
        cylinderConeBottom.material.color = new Color('darkslategrey');
        cylinderConeBottom.position.set(0, -9, 0);

        cylinderGroup.add(cylinderConeTop);
        cylinderGroup.add(cylinderConeMiddle);
        cylinderGroup.add(cylinderConeBottom);

        const spherePositions = [
            new Vector3(-2, 5, 0),
            new Vector3(1, 3.5, 2),
            new Vector3(3.5, 1, -3),
            new Vector3(-1, 1, 1.5),
            new Vector3(-3, -2, 2),
            new Vector3(2.5, -5, -1.5)
        ];

        const spheres = spherePositions.map((position, index) => {
            let sphere;
            if (index < 3) {
                // Create small spheres for the first 3 positions
                sphere = createSmallSphere();
            } else if (index < 5) {
                // Create medium spheres for positions 3 and 4
                sphere = createMediumSphere();
            } else {
                // Create a large sphere for the last position
                sphere = createLargeSphere();
            }
            sphere.position.copy(position);
            cylinderConeMiddle.add(sphere); // Add spheres as children of cylinderConeMiddle
            return sphere;
        });

 


        const pointLightSS1 = createPointLight();
        pointLightSS1.position.set(-2, 5, 0);
        spheres[0].attach(pointLightSS1);

        const pointLightSS2 = createPointLight();
        pointLightSS2.position.set(1, 3.5, 2);
        spheres[1].attach(pointLightSS2);

        const pointLightSS3 = createPointLight();
        pointLightSS3.position.set(3.5, 1, -3);
        spheres[2].attach(pointLightSS3);

        const pointLightMS1 = createPointLight();
        pointLightMS1.position.set(-1, 1, 1.5);
        spheres[3].attach(pointLightMS1);

        const pointLightMS2 = createPointLight();
        pointLightMS2.position.set(-3, -2, 2);
        spheres[4].attach(pointLightMS2);

        const pointLightLS = createPointLight();
        pointLightLS.position.set(2.5, -5, -1.5);
        spheres[5].attach(pointLightLS);

        // smallSphere1.layers.set(BLOOM_SCENE);
        // smallSphere2.layers.set(BLOOM_SCENE);
        // smallSphere3.layers.set(BLOOM_SCENE);
        // mediumSphere1.layers.set(BLOOM_SCENE);
        // mediumSphere2.layers.set(BLOOM_SCENE);
        // largeSphere.layers.set(BLOOM_SCENE);

        directionalLight = createDirectionalLight();
        directionalLight.position.set(-10, 10, 10);
        directionalLight.lookAt(0, 0, 0);
        directionalLight.intensity = 2;

        //Add scene items
        scene.add(directionalLight);
        scene.add(cylinderGroup);

        const resizer = new Resizer(container, camera, renderer, bloomComposer, finalComposer, raycaster, scene, bloomLayer, cylinderGroup, directionalLight,  pointLightSS1, pointLightSS2, pointLightSS3, pointLightMS1, pointLightMS2, pointLightLS, cylinderConeTop, cylinderConeMiddle, cylinderConeBottom);
    }
    
    // 2. Render the scene
    render() {

        bloomComposer.render();

        finalComposer.render(scene, camera);
    }

    rotateCylinder(direction) {

        const rotationSpeed = 0.1;
        
        if(direction == "left"){
            rotationY -= rotationSpeed;
            cylinderGroup.rotation.set(rotationX, rotationY, 0);
        }
        else if(direction == "right"){
            rotationY += rotationSpeed;
            cylinderGroup.rotation.set(rotationX, rotationY, 0); 
        }
        else if(direction == "up"){
            rotationX += rotationSpeed;
            cylinderGroup.rotation.set(rotationX, rotationY, 0);
        }
        else if(direction == "down"){
            rotationX -= rotationSpeed;
            cylinderGroup.rotation.set(rotationX, rotationY, 0);
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