import { SphereGeometry, Mesh, MeshToonMaterial, Color, Vector3 } from 'three';
import { Physics } from './physics';

class lunaSphere extends Mesh{

  constructor(scale, boundary) {
    super();

    this.mesh = new Mesh(new SphereGeometry(0.2*scale), new MeshToonMaterial({ color: '#ffd700'}))

    // this.geometry = new SphereGeometry(0.5*scale, 8, 8);

    // this.material = new MeshToonMaterial({ color: '#ffd700'});

    //this.sphere = new Mesh(this.geometry, this.material);


    let initialPosition;
    do {
        const y = (Math.random() - 0.5) * 18 * scale;
        const radiusConstraint = this.calculateRadiusConstraint(y, 9 * scale, -9 * scale, 4 * scale, 1 * scale);
        const x = (Math.random() - 0.5) * 2 * radiusConstraint;
        const z = (Math.random() - 0.5) * 2 * radiusConstraint;
        initialPosition = new Vector3(x, y, z);
    } while (!this.isWithinHourglass(initialPosition, 9 * scale, -9 * scale, 4 * scale, 1 * scale));

    // Initialize physics for the particle
    this.physics = new Physics(boundary, initialPosition);

    
    //this.physics.position.copy(position);
    //direction.normalize();

    //this.physics.velocity.copy(direction.multiplyScalar(speed));

    console.log("i made a sphere");
  }
  
  tick(delta, hourglassMatrix, spheres, gravityDirection){
    this.physics.tick(this.mesh, delta, hourglassMatrix, gravityDirection);
    this.position.copy(this.physics.position);

      for (let otherSphere of spheres){
        if (otherSphere !== this && this.checkCollision(otherSphere)) {
            this.bounce(otherSphere);
        }
      }
  }

  checkCollision(otherSphere){
    const distance = this.position.distanceTo(otherSphere.position);

    if(distance < this.mesh.geometry.parameters.radius + otherSphere.mesh.geometry.parameters.radius){
      return true;
    }
    return false;
  }

  bounce(otherSphere){
  
    const normal = otherSphere.physics.position.clone().sub(this.physics.position).normalize();

    const relativeVelocity = this.physics.velocity.clone().sub(otherSphere.physics.velocity);

    const normalVelocity = relativeVelocity.dot(normal);

    const impulse = normal.clone().multiplyScalar(normalVelocity);

    this.physics.velocity.sub(impulse);
    otherSphere.physics.velocity.add(impulse);
  
  }

  isWithinHourglass(position, topY, bottomY, maxRadius, minRadius) {
    const y = position.y;
    const midY = (topY + bottomY) / 2;
    const constrainedRadius = this.calculateRadiusConstraint(y, topY, bottomY, maxRadius, minRadius);
    const currentRadius = Math.sqrt(position.x ** 2 + position.z ** 2);
    return currentRadius <= constrainedRadius;
  }
  
  calculateRadiusConstraint(y, topY, bottomY, maxRadius, minRadius) {
    const midY = (topY + bottomY) / 2;
    if (y > midY) {
        return minRadius + (maxRadius - minRadius) * ((y - midY) / (topY - midY));
    } else {
        return minRadius + (maxRadius - minRadius) * ((midY - y) / (midY - bottomY));
    }
  }

}


// function createSmallSphere() {
//   // create a geometry
//   const geometry = new SphereGeometry(1);

//   const physics = new Physics(1.0);

//   // create a default (white) Standard material
//   const material = new MeshToonMaterial();
//   material.color = new Color("#ddad1c");
//   material.emissive = new Color("#cb3434");

//   // create a Mesh containing the geometry and material
//   const sphere = new Mesh(geometry, material);

//   return sphere;
// }

// function createMediumSphere() {
//     // create a geometry
//     const geometry = new SphereGeometry(1.5);
    
//     // create a default (white) Standard material
//     const material = new MeshToonMaterial();
//     material.color = new Color("#ddad1c");
//     material.emissive = new Color("#cb3434");
    
//     // create a Mesh containing the geometry and material
//     const sphere = new Mesh(geometry, material);
    
//     return sphere;
// }

// function createLargeSphere() {
//     // create a geometry
//     const geometry = new SphereGeometry(2);
    
//     // create a default (white) Standard material
//     const material = new MeshToonMaterial();
//     material.color = new Color("#ddad1c");
//     material.emissive = new Color("#cb3434");
    
//     // create a Mesh containing the geometry and material
//     const sphere = new Mesh(geometry, material);
    
//     return sphere;
// }

export { lunaSphere };