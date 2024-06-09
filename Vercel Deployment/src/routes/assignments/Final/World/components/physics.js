import { Vector3, Mesh } from 'three';

export class Physics {

    constructor(boundary, initialPosition) {
        this.boundary = boundary;
        this.gravity = new Vector3(0, -9.81, 0);
        this.elasticity = 0.05;
        this.friction = 0.999;

        this.position = initialPosition.clone();
        this.velocity = new Vector3();
        this.acceleration = this.gravity;
    }

    tick(mesh, delta, hourglassMatrix, gravityDirection) {
        //this.acceleration.copy(gravityDirection);
    
        const deltaVelocity = this.acceleration.clone().multiplyScalar(delta);
        this.velocity.add(deltaVelocity);
        this.velocity.multiplyScalar(this.friction);
    
        const deltaPosition = this.velocity.clone().multiplyScalar(delta);
        this.position.add(deltaPosition);
    
        // Convert position to local space of the hourglass
        const localPosition = this.position.clone().applyMatrix4(hourglassMatrix).clone();

        // Check collisions in local space
        this.checkCollisions(localPosition, hourglassMatrix);
    
        // Convert position back to world space
        this.position.copy(localPosition.applyMatrix4(hourglassMatrix));
    
        mesh.position.copy(this.position);
    }

    checkCollisions(localPosition, hourglassMatrix) {
        // Define the boundaries of the hourglass shape
        const topY = 7.9;
        const bottomY = -7.9;
        const maxRadius = 4;
        const minRadius = 1;
    
        // Apply hourglass rotation to position
        const rotatedPosition = localPosition.clone().applyMatrix4(hourglassMatrix);
    
        // Check for collision with the top cap
        if (rotatedPosition.y > topY) {
            rotatedPosition.y = topY;
            this.velocity.y *= -this.elasticity;
        }
    
        // Check for collision with the bottom cap
        if (rotatedPosition.y < bottomY) {
            rotatedPosition.y = bottomY;
            this.velocity.y *= -this.elasticity;
        }
    
        // Constrain within the hourglass sides
        const constrainedRadius = this.calculateRadiusConstraint(rotatedPosition.y, topY, bottomY, maxRadius, minRadius);
        const currentRadius = Math.sqrt(rotatedPosition.x ** 2 + rotatedPosition.z ** 2);
        if (currentRadius > constrainedRadius) {
            const scale = constrainedRadius / currentRadius;
            rotatedPosition.x *= scale;
            rotatedPosition.z *= scale;
            this.velocity.x *= -this.elasticity;
            this.velocity.z *= -this.elasticity;
        }
    
        // Convert back to local space
        localPosition.copy(rotatedPosition.applyMatrix4(hourglassMatrix.clone().invert()).clone());
    }

    calculateRadiusConstraint(y, topY, bottomY, maxRadius, minRadius) {
        const midY = (topY + bottomY) / 2;
        if (y > midY) {
            return minRadius + (maxRadius - minRadius) * ((y - midY) / (topY - midY));
        } else {
            return minRadius + (maxRadius - minRadius) * ((midY - y) / (midY - bottomY));
        }
    }

    // checkCollisions(){
    //     // Lower boundary
    //     if(this.position.y < this.boundary - 10){
    //         this.position.y = this.boundary - 10;
    //         this.velocity.y *= -this.elasticity;
    //     }

    //     // Upper boundary
    //     if(this.position.y > this.boundary + 50){
    //         this.position.y = this.boundary + 50;
    //         this.velocity.y *= -this.elasticity;
    //     }

    //     // Left boundary
    //     if(this.position.x < -50 - this.boundary){
    //         this.position.x = -50 - this.boundary;
    //         this.velocity.x *= -this.elasticity;
    //     }

    //     // Right boundary
    //     if(this.position.x > 50 - this.boundary){
    //         this.position.x = 50 - this.boundary;
    //         this.velocity.x *= -this.elasticity;
    //     }

    //     // Front boundary
    //     if(this.position.z < -50 + this.boundary){
    //         this.position.z = -50 + this.boundary;
    //         this.velocity.z *= -this.elasticity;
    //     }

    //     // Back boundary
    //     if(this.position.z > 50 - this.boundary){
    //         this.position.z = 50 - this.boundary;
    //         this.velocity.z *= -this.elasticity;
    //     }
    // }
}