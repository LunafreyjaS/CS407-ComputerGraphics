<script>
    import { onMount } from 'svelte';
    import * as THREE from 'three';

    let scene, camera, renderer, cube, canvas;

    onMount(() =>{
        scene = new THREE.Scene();
        scene.background = new THREE.Color('lightblue');

        camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.z = 3;
        camera.position.y = -0.5;

        renderer = new THREE.WebGLRenderer({ canvas: canvas });
        renderer.setSize( canvas.clientWidth, canvas.clientHeight );

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );

        material.wireframe = true;

        cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        animate();
    });

    function animate() {
        requestAnimationFrame( animate );

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.02;

        renderer.render( scene, camera );
    }
</script>

<section>
    <head>
        <title>Assignment 1: Hello World Cube</title>
        <meta name="description" content="Assignment 1: Hello World Cube" />
    </head>
    <body>
        <h2>Luna's Lovely Cube</h2>

        <canvas bind:this={canvas}></canvas>

        <article class="description">
            <p>The goal of this assignment is to <em>prove the architecture</em> we'll be using to display WebGL 3D graphics in a web application.  We want to show that we can successfully:</p>
            <ul>
                <li>Use the three.js library to create a 3D scene</li>
                <li>Render the scene to a canvas element</li>
                <li>Control the animation of the scene</li>
                <li>All in a Svelte app</li>
                <li>Deployed to the Web</li>
            </ul>
        </article>


    </body>
  
</section>

<style>
    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 0.6;
    }

    h2 {
        font-size: 3em;
        text-align: center;
    }

    canvas {
        width: 1080px;
        height: 720px;
    }
</style>