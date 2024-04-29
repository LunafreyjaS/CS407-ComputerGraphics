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