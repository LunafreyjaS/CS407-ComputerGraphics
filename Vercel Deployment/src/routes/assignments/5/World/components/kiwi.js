import { Group, SphereGeometry, ConeGeometry, CylinderGeometry, Mesh, MeshToonMaterial, Color } from 'three';

function createKiwi() {

    const kiwi = new Group();

    const bodyGeo = new SphereGeometry(1.5);
    const eyeGeo = new SphereGeometry(0.2);
    const beakGeo = new ConeGeometry(0.2, 1, 3);
    const legGeo = new CylinderGeometry(0.1, 0.1, 0.5, 16);
    const footGeo = new CylinderGeometry(0.2, 0.2, 0.1, 16);
    
    const bodyMat = new MeshToonMaterial();
    bodyMat.color = new Color("green");

    const eyeMat = new MeshToonMaterial();
    eyeMat.color = new Color("black");

    const beakMat = new MeshToonMaterial();
    beakMat.color = new Color("orange");

    const legMat = new MeshToonMaterial();
    legMat.color = new Color("black");
    
    const footMat = new MeshToonMaterial();
    footMat.color = new Color("orange");

    const body = new Mesh(bodyGeo, bodyMat);
    const eye1 = new Mesh(eyeGeo, eyeMat);
    const eye2 = new Mesh(eyeGeo, eyeMat);
    const beak = new Mesh(beakGeo, beakMat);
    const leg1 = new Mesh(legGeo, legMat);
    const leg2 = new Mesh(legGeo, legMat);
    const foot1 = new Mesh(footGeo, footMat);
    const foot2 = new Mesh(footGeo, footMat);

    eye1.position.set(0.5, 0.65, 1.5);
    eye2.position.set(-0.5, 0.65, 1.5);
    beak.position.set(0.2, -0.3, 1.5);
    beak.rotation.set(3, 0, -0.3);
    leg1.position.set(0.5, -1.5, 0.5);
    leg2.position.set(-0.5, -1.5, 0.5);
    foot1.position.set(0.5, -1.75, 0.5);
    foot2.position.set(-0.5, -1.75, 0.5);

    kiwi.add(body);
    kiwi.add(eye1);
    kiwi.add(eye2);
    kiwi.add(beak);
    kiwi.add(leg1);
    kiwi.add(leg2);
    kiwi.add(foot1);
    kiwi.add(foot2);
    
    return kiwi;
}

export { createKiwi };