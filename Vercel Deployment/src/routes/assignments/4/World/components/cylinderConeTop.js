import { CylinderGeometry, Mesh, MeshStandardMaterial, Color } from 'three';

function createCylinderConeTop() {
  // create a geometry
  const geometry = new CylinderGeometry(4, 7, 4, 16);

  // create a default (white) Standard material
  const material = new MeshStandardMaterial();

  // create a Mesh containing the geometry and material
  const cylinderConeTop = new Mesh(geometry, material);

  return cylinderConeTop;
}

export { createCylinderConeTop };