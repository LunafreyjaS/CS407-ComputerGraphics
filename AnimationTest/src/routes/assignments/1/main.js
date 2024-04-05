//Example Code from Class Repository 
//https://github.com/morses/CS407-S24-ClassRepo/blob/main/HelloThreeJS/main.js

import * as THREE from '../../node_modules/three/build/three.module.js';     // if this gives you an error it's because you forgot to install three.js :-)

const scene = new THREE.Scene();

scene.background = new THREE.Color('lightblue');



const camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );

material.wireframe = true;

const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 3;
camera.position.y = -.5;

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.02;

	renderer.render( scene, camera );
}

animate();