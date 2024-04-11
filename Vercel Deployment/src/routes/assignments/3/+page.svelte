<script>
    import { onMount } from 'svelte';
    import {World} from 'World/World.js';

    function main(){
        
        const container = document.querySelector('#scene-container');

        const world = new World(container);

        world.render();
    }

    main();

</script>

<section>

    <head>
        <title>Assignment 3</title>
        <meta name="description" content="Assignment 2: World Test" />
    </head>
    <body>
        <h2>Luna's Placeholder Name</h2>

        <!-- <button on:click={toggleAnimation}>
            {#if isAnimating} Stop Animation {/if}
            {#if !isAnimating} Start Animation {/if}
        </button>

        <button on:click={toggleWireframe}>
            {#if isWireframe} Hide Wireframe {/if}
            {#if !isWireframe} Show Wireframe {/if}
        </button>

        <canvas bind:this={canvas}></canvas> -->

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