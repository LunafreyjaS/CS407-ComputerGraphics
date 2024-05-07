import { Mesh, MeshBasicMaterial, MeshPhongMaterial, BufferAttribute, Color, BufferGeometry, MeshStandardMaterial, Material, Float32BufferAttribute} from 'three';


export class Parachute extends Mesh{
     
    constructor() {


    const geometry = new BufferGeometry();


    const materialProperties = {
        color: 0xFFFFFF,
        flatShading: true,
        vertexColors: true,
        shininess: 0
    };

    const vertices = [
        -2, 0, -1,  // Vertex 0
        2, 0, -1,   // Vertex 1
        -3, 0, 1,   // Vertex 2
        3, 0, 1,    // Vertex 3
        -1.5, 2, -0.5, // Vertex 4 (Top Left)
        1.5, 2, -0.5,  // Vertex 5 (Top Right)
        -2.5, 2, 1, // Vertex 6 (Top Left)
        2.5, 2, 1,  // Vertex 7 (Top Right)

        // Additional vertices to close the sides
        -2, 0, -1,  // Vertex 8 (Duplicate of Vertex 0)
        2, 0, -1,   // Vertex 9 (Duplicate of Vertex 1)
        -3, 0, 1,   // Vertex 10 (Duplicate of Vertex 2)
        3, 0, 1,    // Vertex 11 (Duplicate of Vertex 3)
        -1.5, 2, -0.5, // Vertex 12 (Duplicate of Vertex 4)
        1.5, 2, -0.5,  // Vertex 13 (Duplicate of Vertex 5)
        -2.5, 2, 1, // Vertex 14 (Duplicate of Vertex 6)
        2.5, 2, 1   // Vertex 15 (Duplicate of Vertex 7)
    ];

    const indices = [
        0, 1, 2,
        1, 3, 2,
        // Left side triangles
        0, 2, 4,
        2, 6, 4,
        // Right side triangles
        1, 5, 3,
        3, 5, 7,
        // Top triangles
        4, 5, 6,
        5, 7, 6,
        // Front triangle
        4, 6, 5,
        // Back triangle
        7, 5, 6
    ];

    const colors = [
        1, 0, 0,    // Red
        1, 0.5, 0,  // Orange
        1, 1, 0,    // Yellow
        0, 1, 0,    // Green
        0, 0, 1,    // Blue
        0.3, 0, 0.5,// Indigo
        0.93, 0.51, 0.93, // Violet
        1, 0, 0     // Red
    ];

    // Set vertices, indices, and colors
    geometry.setIndex(indices);
    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));

    super(geometry, new MeshPhongMaterial(materialProperties));

    }
}