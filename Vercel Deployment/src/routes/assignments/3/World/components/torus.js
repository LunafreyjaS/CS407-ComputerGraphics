import { TorusGeometry, Mesh, MeshStandardMaterial, Color } from 'three';

function createTorus() {
  // create a geometry
  const geometry = new TorusGeometry(9, 1, 5, 6);

  // create a default (white) Basic material
  const material = new MeshStandardMaterial();

  // create a Mesh containing the geometry and material
  const torus = new Mesh(geometry, material);

  return torus;
}

export { createTorus };