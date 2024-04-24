import { CylinderGeometry, Mesh, MeshStandardMaterial, Color } from 'three';

function createCylinderConeBottom() {
  // create a geometry
  const geometry = new CylinderGeometry(7, 5, 6, 16);

  // create a default (white) Standard material
  const material = new MeshStandardMaterial();

  // create a Mesh containing the geometry and material
  const cylinderConeBottom = new Mesh(geometry, material);

  return cylinderConeBottom;
}

export { createCylinderConeBottom };