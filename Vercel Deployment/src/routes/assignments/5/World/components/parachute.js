import { Mesh, MeshBasicMaterial, MeshPhongMaterial, BufferAttribute, Color, BufferGeometry, MeshStandardMaterial, Material, Float32BufferAttribute, DoubleSide} from 'three';


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
        -1.5, 2, -0.5, // Vertex 4
        1.5, 2, -0.5,  // Vertex 5
        -2.5, 2, 1, // Vertex 6
        2.5, 2, 1,  // Vertex 7
        -2, -2, -2,    // Vertex 8
        -1.4, -2.6, -2, // Vertex 9
        2, -2, -2,   // Vertex 10
        1.4, -2.6, -2 // Vertex 11
    ];

    const indices = [
        //Bottom
        // 0, 1, 2,
        // 1, 3, 2,
        // Left
        0, 2, 4,
        2, 6, 4,
        // Right
        1, 5, 3,
        3, 5, 7,
        // Top
        4, 5, 6,
        5, 7, 6,
        // Front
        4, 6, 5,
        // Back
        7, 5, 6,
        // Parachute String Right
        0, 8, 2,
        0, 9, 8,
        // Parachute String Left
        10, 1, 3,
        10, 11, 3
    ];

    const colors = [
        1, 0, 0,    // Red
        1, 0.5, 0,  // Orange
        1, 1, 0,    // Yellow
        0, 0, 1,    // Blue
        0, 1, 0,    // Green
        0.3, 0, 0.5,// Indigo
        0.93, 0.51, 0.93, // Violet
        1, 0, 0,     // Red
        0, 0, 1,   // Blue
        0.3, 0, 0.5,// Indigo
        1, 0.5, 0,  // Orange
        1, 1, 0,    // Yellow
    ];

    // Set vertices, indices, and colors
    geometry.setIndex(indices);
    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));

    super(geometry, new MeshPhongMaterial(materialProperties));
    this.material.side = DoubleSide;

    }
}