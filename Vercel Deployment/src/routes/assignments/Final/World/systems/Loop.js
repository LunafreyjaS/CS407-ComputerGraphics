import { Clock, PerspectiveCamera, WebGLRenderer, Scene, Object3D } from "three";
//import { Animatable } from "./Animateable";

const clock = new Clock();

class Loop {
    constructor(camera, scene, renderer, bloom) {
        this.camera = camera;
        this.scene = scene;
        this.renderer = renderer;
        this.updatables = [];
        this.delta = 0;
        this.bloom = bloom;
        this.bloomOn = false;
        
    }

    start() {
        this.renderer.setAnimationLoop(() => {
        // tell every animated object to tick forward one frame
        this.tick();

        // render a frame
        if (this.bloomOn) {
            this.bloom.render();
        } else {
            this.renderer.render(this.scene, this.camera);
        }
        });
    }

    stop() {
        this.renderer.setAnimationLoop(null);
    }

  tick() {
    // only call the getDelta function once per frame!
    this.delta = clock.getDelta();

    // console.log(
    //   `The last frame rendered in ${delta * 1000} milliseconds`,
    // );

        for (const object of this.updatables) {
            object.tick(this.delta);
        }
    }

    addUpdateable(object) {
        this.updatables.push(object);
    }

    removeUpdateable(object) {
        this.updatables = this.updatables.filter((updatable) => updatable !== object);
    }

    getFrameRate() {
        if (this.delta === 0) return 0;
        return 1 / this.delta;
    }
}

export { Loop };
