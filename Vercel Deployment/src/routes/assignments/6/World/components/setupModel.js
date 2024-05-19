import { AnimationMixer } from 'three';

function setupModel(data) {
    const model = data.scene.children[0];

    
    const surveyClip = data.animations[0];
    const walkClip = data.animations[1];
    const runClip = data.animations[2];
    
    const mixer = new AnimationMixer(model);

    const surveyAction = mixer.clipAction(surveyClip);
    const walkAction = mixer.clipAction(walkClip);
    const runAction = mixer.clipAction(runClip);

    model.tick = (delta) => {
        mixer.update(delta);
    };

    model.playSurvey = () => {
        surveyAction.play();
        walkAction.stop();
        runAction.stop();
    }

    model.playWalk = () => {
        walkAction.play();
        surveyAction.stop();
        runAction.stop();
    };

    model.playRun = () => {
        runAction.play();
        surveyAction.stop();
        walkAction.stop();
    }
    
    return { model };
    }

export { setupModel };