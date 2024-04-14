<script>
    import { onMount } from 'svelte';
    import * as THREE from 'three';

    let scene, camera, renderer, heart, pivot, canvas;
    let isAnimating = false;
    let isWireframe = false;

    onMount(() =>{
        scene = new THREE.Scene();
        scene.background = new THREE.Color('lightblue');

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.z = 30;
        camera.position.x = -5;
        camera.position.y = -5;

        renderer = new THREE.WebGLRenderer({ canvas: canvas });
        renderer.setSize( canvas.clientWidth, canvas.clientHeight );

        //Heart Shape taken from three.js documentation for ShapeGeometry

        const x = 0, y = 0;

        const heartShape = new THREE.Shape();

        heartShape.moveTo( x - 5, y - 5 );
        heartShape.bezierCurveTo( x - 5, y - 5, x - 4, y, x, y );
        heartShape.bezierCurveTo( x + 6, y, x + 6, y - 7,x + 6, y - 7 );
        heartShape.bezierCurveTo( x + 6, y - 11, x + 3, y - 15.4, x - 5, y - 19 );
        heartShape.bezierCurveTo( x - 12, y - 15.4, x - 16, y - 11, x - 16, y - 7 );
        heartShape.bezierCurveTo( x - 16, y - 7, x - 16, y, x - 10, y );
        heartShape.bezierCurveTo( x - 7, y, x - 5, y - 5, x - 5, y - 5 );

        //

        const geometry = new THREE.ShapeGeometry( heartShape );
        const material = new THREE.MeshBasicMaterial( { color: 0xFF6EC7 } );
        material.side = THREE.DoubleSide;

        material.wireframe = false;

        heart = new THREE.Mesh( geometry, material );
        heart.scale.x = 1.2;
        scene.add( heart );

        pivot = new THREE.Object3D();
        pivot.position.set(-6, 0, 0);
        scene.add( pivot );
        pivot.attach(heart);


        animate();
    });

    function animate() {
        requestAnimationFrame( animate );

        if (isAnimating){

            //heart.rotation.x += 0.01;
            pivot.rotation.y += 0.02;

        }

        renderer.render( scene, camera );
    }

    function toggleAnimation() {
        isAnimating = !isAnimating;
    }

    function toggleWireframe() {
        heart.material.wireframe = !heart.material.wireframe;
        isWireframe = !isWireframe;
    }


</script>

<section>
    <head>
        <title>Assignment 2: Animation Test</title>
        <meta name="description" content="Assignment 2: Animation Test" />
    </head>
    <body>
        <h2>Luna's Cardiovascular Centrifuge</h2>

        <button on:click={toggleAnimation}>
            {#if isAnimating} Stop Animation {/if}
            {#if !isAnimating} Start Animation {/if}
        </button>

        <button on:click={toggleWireframe}>
            {#if isWireframe} Hide Wireframe {/if}
            {#if !isWireframe} Show Wireframe {/if}
        </button>

        <canvas bind:this={canvas}></canvas>

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