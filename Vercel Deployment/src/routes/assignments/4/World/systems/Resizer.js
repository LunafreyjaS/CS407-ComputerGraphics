// Code from three.js documentation

class Resizer {
    constructor(container, camera, renderer, bloomComposer, finalComposer) {
      // Set the camera's aspect ratio
      camera.aspect = container.clientWidth / container.clientHeight;
  
      // update the camera's frustum
      camera.updateProjectionMatrix();
  
      // update the size of the renderer AND the canvas
      renderer.setSize(container.clientWidth, container.clientHeight);

      bloomComposer.setSize(container.clientWidth, container.clientHeight);
      finalComposer.setSize(container.clientWidth, container.clientHeight);
  
      // set the pixel ratio (for mobile devices)
      renderer.setPixelRatio(window.devicePixelRatio);
    }
  }

  export {Resizer};