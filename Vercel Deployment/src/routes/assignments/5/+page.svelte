<script>

    import { onMount } from 'svelte';
    import { World } from './World/World.js'

    let canvas;
    let world = null;

    onMount(() => {
        world = new World(canvas);

        world.render();
    });

    // onkeydown = function(e) {
    //     if (e.key === "w") {
    //         world.rotateParachute("up");
    //     } else if (e.key === "a") {
    //         world.rotateParachute("left");
    //     } else if (e.key === "s") {
    //         world.rotateParachute("down");
    //     } else if (e.key === "d") {
    //         world.rotateParachute("right");
    //     }
    // }

</script>

<section>

    <head>
        <title>Assignment 5: Color By Vector</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
        <h2>Luna's Kiwi Adventure</h2>

        <div id="scene-container"></div>

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