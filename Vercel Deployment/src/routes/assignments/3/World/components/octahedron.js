import { OctahedronGeometry, Mesh, MeshPhongMaterial, Color } from 'three';

function createOctahedron() {
  // create a geometry
  const geometry = new OctahedronGeometry(2, 0);

  // create a default (white) Basic material
  const material = new MeshPhongMaterial();
  material.opacity = 0.7;

  // create a Mesh containing the geometry and material
  const octahedron = new Mesh(geometry, material);

  return octahedron;
}

export { createOctahedron };