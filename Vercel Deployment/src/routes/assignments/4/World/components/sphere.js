import { SphereGeometry, Mesh, MeshToonMaterial, Color } from 'three';

function createSmallSphere() {
  // create a geometry
  const geometry = new SphereGeometry(1);

  // create a default (white) Standard material
  const material = new MeshToonMaterial();
  material.color = new Color("#ddad1c");
  material.emissive = new Color("#cb3434");

  // create a Mesh containing the geometry and material
  const sphere = new Mesh(geometry, material);

  return sphere;
}

function createMediumSphere() {
    // create a geometry
    const geometry = new SphereGeometry(1.5);
    
    // create a default (white) Standard material
    const material = new MeshToonMaterial();
    material.color = new Color("#ddad1c");
    material.emissive = new Color("#cb3434");
    
    // create a Mesh containing the geometry and material
    const sphere = new Mesh(geometry, material);
    
    return sphere;
}

function createLargeSphere() {
    // create a geometry
    const geometry = new SphereGeometry(2);
    
    // create a default (white) Standard material
    const material = new MeshToonMaterial();
    material.color = new Color("#ddad1c");
    material.emissive = new Color("#cb3434");
    
    // create a Mesh containing the geometry and material
    const sphere = new Mesh(geometry, material);
    
    return sphere;
}

export { createSmallSphere, createMediumSphere, createLargeSphere};