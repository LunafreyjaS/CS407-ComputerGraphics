import { PlaneGeometry, MeshPhysicalMaterial, Mesh } from "three";

function createGround() {

    const geometry = new PlaneGeometry(100, 100);
    const material = new MeshPhysicalMaterial({ color: 'green' });
    const ground = new Mesh(geometry, material);
    ground.rotation.x = - Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    ground.castShadow = true;
    
    return ground;

}


export { createGround };