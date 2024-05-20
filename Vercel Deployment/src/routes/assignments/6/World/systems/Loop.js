import { Clock, PerspectiveCamera, WebGLRenderer, Scene, Object3D } from "three";
//import { Animatable } from "./Animateable";

const clock = new Clock();

class Loop {
    constructor(camera, scene, renderer) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updatables = [];
    }

    start() {
        this.renderer.setAnimationLoop(() => {
        // tell every animated object to tick forward one frame
        this.tick();

        // render a frame
        this.renderer.render(this.scene, this.camera);
        });
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }

  tick() {
    // only call the getDelta function once per frame!
    const delta = clock.getDelta();

    // console.log(
    //   `The last frame rendered in ${delta * 1000} milliseconds`,
    // );

        for (const object of this.updatables) {
        object.tick(delta);
        }
    }

    addUpdateable(object) {
        this.updatables.push(object);
    }

    removeUpdateable(object) {
        this.updatables = this.updatables.filter((updatable) => updatable !== object);
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

export { Loop };
