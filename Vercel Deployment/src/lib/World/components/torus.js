import { TorusGeometry, Mesh, MeshBasicMaterial, Color } from 'three';

function createTorus() {
  // create a geometry
  const geometry = new TorusGeometry(8, 1, 5, 6);

  // create a default (white) Basic material
  const material = new MeshBasicMaterial();

  // create a Mesh containing the geometry and material
  const torus = new Mesh(geometry, material);

  return torus;
}

export { createTorus };