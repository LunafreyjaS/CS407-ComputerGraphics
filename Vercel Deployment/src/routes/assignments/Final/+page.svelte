<script>

    import { onMount } from 'svelte';
    import { World } from './World/World.js'

    let canvas;
    let world = null;
    let fps = 0;

    onMount(() => {
        world = new World(canvas);

        world.init();
        world.start();
        world.initControls();

        setInterval(() => {
            fps = world.getFrameRate();
        }, 2000);
    });

</script>

<section>

    <head>
        <title>Final Project</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
        <h2>Luna's Final Project</h2>

        <div id="scene-container"></div>

        <code>{Math.round(fps)} FPS</code>

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