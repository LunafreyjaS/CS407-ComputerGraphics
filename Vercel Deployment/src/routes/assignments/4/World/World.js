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

let camera, renderer, scene;
let directionalLight;
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
        bloomPass.strength = 0.5;
        bloomPass.radius = 0.2;
        bloomPass.exposure = 1;

        bloomComposer = new EffectComposer(renderer);
        bloomComposer.renderToScreen = false;
        bloomComposer.addPass(renderScene);
        bloomComposer.addPass(bloomPass);

        const outputPass = new OutputPass();

        finalComposer = new EffectComposer(renderer);
        finalComposer.addPass(renderScene);
        finalComposer.addPass(bloomPass);
        finalComposer.addPass(outputPass);

        const raycaster = new Raycaster();
                    

        //Create shapes
        const cylinderGroup = new Group();

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

        const smallSphere1 = createSmallSphere();
        smallSphere1.position.set(-2, 5, 0);

        const smallSphere2 = createSmallSphere();
        smallSphere2.position.set(1, 3.5, 2);

        const smallSphere3 = createSmallSphere();
        smallSphere3.position.set(3.5, 1, -3);

        const mediumSphere1 = createMediumSphere();
        mediumSphere1.position.set(-1, 1, 1.5);

        const mediumSphere2 = createMediumSphere();
        mediumSphere2.position.set(-3, -2, 2);

        const largeSphere = createLargeSphere();
        largeSphere.position.set(2.5, -5, -1.5);

        cylinderConeMiddle.add(smallSphere1);
        cylinderConeMiddle.add(smallSphere2);
        cylinderConeMiddle.add(smallSphere3);
        cylinderConeMiddle.add(mediumSphere1);
        cylinderConeMiddle.add(mediumSphere2);
        cylinderConeMiddle.add(largeSphere);

        const pointLightSS1 = createPointLight();
        pointLightSS1.position.set(-2, 5, 0);
        smallSphere1.attach(pointLightSS1);

        const pointLightSS2 = createPointLight();
        pointLightSS2.position.set(1, 3.5, 2);
        smallSphere2.attach(pointLightSS2);

        const pointLightSS3 = createPointLight();
        pointLightSS3.position.set(3.5, 1, -3);
        smallSphere3.attach(pointLightSS3);

        const pointLightMS1 = createPointLight();
        pointLightMS1.position.set(-1, 1, 1.5);
        mediumSphere1.attach(pointLightMS1);

        const pointLightMS2 = createPointLight();
        pointLightMS2.position.set(-3, -2, 2);
        mediumSphere2.attach(pointLightMS2);

        const pointLightLS = createPointLight();
        pointLightLS.position.set(2.5, -5, -1.5);
        largeSphere.attach(pointLightLS);

        directionalLight = createDirectionalLight();
        directionalLight.position.set(-10, 10, 10);
        directionalLight.lookAt(0, 0, 0);
        directionalLight.intensity = 0;

        //Add scene items
        scene.add(directionalLight);
        scene.add(cylinderGroup);

        const resizer = new Resizer(container, camera, renderer, bloomComposer, finalComposer, raycaster, scene, bloomLayer, cylinderGroup, directionalLight, smallSphere1, smallSphere2, smallSphere3, mediumSphere1, mediumSphere2, largeSphere, pointLightSS1, pointLightSS2, pointLightSS3, pointLightMS1, pointLightMS2, pointLightLS, cylinderConeTop, cylinderConeMiddle, cylinderConeBottom);
    }
    
    // 2. Render the scene
    render() {

        bloomComposer.render();

        finalComposer.render(scene, camera);
    }

}

    export { World};