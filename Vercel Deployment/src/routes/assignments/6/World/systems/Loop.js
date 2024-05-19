import { Clock, PerspectiveCamera, WebGLRenderer, Scene, Object3D } from "three";
//import { Animatable } from "./Animateable";

export class Loop {

    animate = true;

    constructor(camera, scene, renderer) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updateables = [];
        this.clock = new Clock();
        this.delta = 0;
        this.fox = [];
    }

    start() {
        this.delta = this.clock.getDelta();
        this.renderer.setAnimationLoop(() => {
            this.tick();
            this.renderer.render(this.scene, this.camera);
        });
    }

    stop() {
        this.renderer.setAnimationLoop(null);
        this.delta = 0;
    }

    addUpdateable(item) {
        this.updateables.push(item);
    }

    removeUpdateable(item) {
        const index = this.updateables.indexOf(item);
        if (index !== -1) {
            this.updateables.splice(index, 1);
        }
    }

    tick() {
        this.delta = this.clock.getDelta();

        if(this.animate){
            for (const item of this.updateables) {
                item.tick(this.delta);
            }
        }
    }

    playSurvey() {
        this.fox.playSurvey();
    }

    playWalk() {
        this.fox.playWalk();
    }

    playRun() {
        this.fox.playRun();
    }

    getFrameRate() {
        if (this.delta === 0) return 0;
        return 1 / this.delta;
    }
}