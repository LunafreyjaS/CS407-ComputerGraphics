import { lunaSphere } from "../components/sphere";

class Collision {

    constructor() 
    {
        this.colliders = [];
    }

    addCollider(collider) 
    {
        this.colliders.push(collider);
    }

    checkCollisions() 
    {
        for (let i = 0; i < this.colliders.length; i++) 
        {
            for (let j = i + 1; j < this.colliders.length; j++) 
            {
                const object1 = this.colliders[i];
                const object2 = this.colliders[j];

                if (object1.checkCollision(object2)) 
                {
                    object1.bounce(object2);
                }
            }
        }
    }

    tick(delta) {
        this.checkCollisions();
    }

}

export { Collision };