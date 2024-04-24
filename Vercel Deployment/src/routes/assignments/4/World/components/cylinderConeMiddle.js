import { CylinderGeometry, Mesh, MeshPhysicalMaterial, Color } from 'three';

function createCylinderConeMiddle() {
  // create a geometry
  const geometry = new CylinderGeometry(7, 7, 16, 16);

  // create a default (white) Standard material
  const material = new MeshPhysicalMaterial();
  material.transparent = true;
  material.opacity = 0.25;
  material.premultipliedAlpha = true;

  // create a Mesh containing the geometry and material
  const cylinderConeMiddle = new Mesh(geometry, material);

  return cylinderConeMiddle;
}

export { createCylinderConeMiddle };