import {Scene, WebGLRenderer, WebGLRenderTarget, Vector2, Camera} from 'three';
import { EffectComposer } from 'three/examples/jsm/Addons.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';


function createBloom(canvas, scene, camera, renderer, width, height)
{
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new Vector2(width, height), 0.05, 1.0, 0.09);
    const bloomComposer = new EffectComposer(renderer);

    const fxaaPass = new ShaderPass(FXAAShader);
    fxaaPass.material.uniforms['resolution'].value.set(1 / width, 1 / height);

    bloomComposer.addPass(renderScene);
    bloomComposer.addPass(bloomPass);
    bloomComposer.addPass(fxaaPass);

    return bloomComposer
}


export {createBloom}