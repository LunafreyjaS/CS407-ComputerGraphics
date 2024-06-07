import { PlaneGeometry, MeshPhysicalMaterial, Mesh, DoubleSide } from "three";

function createGround() {

    const geometry = new PlaneGeometry(40, 1000);
    const material = new MeshPhysicalMaterial({ color: 'green' });
    material.side = DoubleSide;
    const ground = new Mesh(geometry, material);
    ground.rotation.x = - Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    ground.castShadow = true;
    
    return ground;

}


export { createGround };