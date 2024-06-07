<script>

    import { onMount } from 'svelte';
    import { World } from './World/World.js'

    let canvas;
    let world = null;
    let isLighting = true;

    onMount(() => {
        world = new World(canvas);

        world.render();

        canvas.addEventListener('wheel', (e) => {
            e.preventDefault();

            if (e.deltaY < 0) {
                world.zoomCamera("in");
            } else {
                world.zoomCamera("out");
            }
        });

    });

    onkeydown = function(e) {
        if (e.key === "w") {
            world.rotateCylinder("up");
        } else if (e.key === "a") {
            world.rotateCylinder("left");
        } else if (e.key === "s") {
            world.rotateCylinder("down");
        } else if (e.key === "d") {
            world.rotateCylinder("right");
        }
    }



</script>

<section>

    <head>
        <title>Assignment 4: Child Objects</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
        <h2>Luna's Lava Lamp?</h2>

        <div id="scene-container"></div>

        <!-- <button on:click={lighting}>
            {#if isLighting} Swap for Point Lighting {/if}
            {#if !isLighting} Swap for Directional Lighting {/if}
        </button>
        
        <br> -->

        <p> Press WASD to rotate the lamp.</p>

        <canvas bind:this={canvas}></canvas>

        <article class="description">
            <p>The goal of this assignment is to create a simple scene using a hierarchical scene graph as shown in <a href="https://discoverthreejs.com/book/first-steps/transformations/">Transformations, Coordinate Systems, and the Scene Graph</a> in the Discover three.js book.</p>  Requirements are:
            <ul>
                <li>Construct a compound model composed of a primary object and multiple child objects</li>
                <li>Place those child objects relative to the parent using transformations, at least one of which we create manually using vector or matrix algebra</li>
                <li>Have interactivity that moves both the entire object as well as the children</li>
            </ul>
            <p>For the axes: X (red), Y (green) and Z (blue)</p>
            <p>Keyboard controls: WASD (rotates the child objects about their own local origin)  Only works if the canvas element has focus.  Click it if key press doesn't do anything.</p>
        </article>

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