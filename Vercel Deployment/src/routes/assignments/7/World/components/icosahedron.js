import { IcosahedronGeometry, Mesh, ShaderMaterial, Color, Vector3 } from 'three';

function createIcosahedron() {
  // create a geometry
  const geometry = new IcosahedronGeometry(5, 1);

  // create a default (white) Standard material
  const material = new ShaderMaterial(
    {
      uniforms: {
        color1: { value: new Vector3(1.0, 0.0, 0.0) },
        color2: { value: new Vector3(1.0, 0.0, 0.0) },
        time: { value: 0 }
      },
    }
  );
  

  // create a Mesh containing the geometry and material
  const icosahedron = new Mesh(geometry, material);

  icosahedron.tick = function (delta) {
    this.material.uniforms.time.value += delta;
    this.material.uniformsNeedUpdate = true;
  }

  return icosahedron;
}

function setVertexShader(mesh, vertexShader) {
    const material = mesh.material;

    material.vertexShader = vertexShader;
    material.needsUpdate = true;
}

function setFragmentShader(mesh, fragmentShader) { 
    const material = mesh.material;

    material.fragmentShader = fragmentShader;
    material.needsUpdate = true;
}

function updateUniform(mesh, name, value) {
    const material = mesh.material;

    material.uniforms[name].value = value;
}


export { createIcosahedron, setVertexShader, setFragmentShader, updateUniform};