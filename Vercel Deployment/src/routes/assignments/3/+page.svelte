<script>

    import { onMount } from 'svelte';
    import { World } from './World/World.js'

    let canvas;
    let world = null;
    let isLighting = true;

    onMount(() => {
        world = new World(canvas);

        world.render();
    });

    function lighting() {
        world.lightingSwap();
        if (isLighting) {
            isLighting = false;
        } else {
            isLighting = true;
        }
    }

    function moveUp() {
        world.moveTorusHex("up");
    }

    function moveLeft() {
        world.moveTorusHex("left");
    }

    function moveRight() {
        world.moveTorusHex("right");
    }

    function moveDown() {
        world.moveTorusHex("down");
    }

</script>

<section>

    <head>
        <title>Assignment 3: World Test</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
        <h2>Luna's Lit-Up World!</h2>

        <div id="scene-container"></div>

        <button on:click={lighting}>
            {#if isLighting} Swap for Point Lighting {/if}
            {#if !isLighting} Swap for Directional Lighting {/if}
        </button>
        
        <br>

        <button on:click={moveUp}>Up</button>
        <br>
        <button on:click={moveLeft}>Left</button>
        <button on:click={moveRight}>Right</button>
        <br>
        <button on:click={moveDown}>Down</button>



        <!-- <button on:click={toggleAnimation}>
            {#if isAnimating} Stop Animation {/if}
            {#if !isAnimating} Start Animation {/if}
        </button>

        <button on:click={toggleWireframe}>
            {#if isWireframe} Hide Wireframe {/if}
            {#if !isWireframe} Show Wireframe {/if}
        </button> -->

        <canvas bind:this={canvas}></canvas>

        <article class="description">
            <p>The goal of this assignment is to use the World App architecture from <a href="https://discoverthreejs.com/book/first-steps/world-app/">Discover three.js</a> book to:</p>
            <ul>
                <li>Wrap the three.js scene in a World class that hides its implementation</li>
                <li>refactor the design into separate modules for the scene, camera, objects, renderer, lights, ...</li>
                <li>and that does a little more than the last assignment, in terms of objects and specifically a lighting effect</li>
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