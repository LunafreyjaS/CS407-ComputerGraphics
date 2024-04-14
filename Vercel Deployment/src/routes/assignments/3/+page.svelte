<script>

    /** @type {import('./$types').PageData}*/
    export let data;

    import { onMount } from 'svelte';
    import {World} from '$lib/World/World.js';

    let canvas;
    let world = null;

    onMount(() => {
        world = new World(canvas);

        world.render();
    });

</script>

<section>

    <head>
        <title>Assignment 3: World Test</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
        <h2>Luna's Placeholder Name</h2>

        <button on:click={World.lightingSwap}>
            {#if World.isLighting} Swap for Point Lighting {/if}
            {#if !World.isLighting} Swap for Directional Lighting {/if}
        </button>
        
        <br>

        <button on:click={World.moveTorus("up")}>Up</button>
        <br>
        <button on:click={World.moveTorus("left")}>Left</button>
        <button on:click={World.moveTorus("right")}>Right</button>
        <br>
        <button on:click={World.moveTorus("down")}>Down</button>

        <!-- <button on:click={toggleAnimation}>
            {#if isAnimating} Stop Animation {/if}
            {#if !isAnimating} Start Animation {/if}
        </button>

        <button on:click={toggleWireframe}>
            {#if isWireframe} Hide Wireframe {/if}
            {#if !isWireframe} Show Wireframe {/if}
        </button> -->

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