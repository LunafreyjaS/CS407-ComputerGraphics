<script>

    import { onMount } from 'svelte';
    import { World } from './World/World.js'

    let canvas;
    let world = null;
    let fps;

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
        <title>Assignment 6: Import Model w/ Animation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
        <h2>Luna's Imported Model</h2>

        <div id="scene-container"></div>

        <code>{Math.round(fps)} FPS</code>

        <canvas bind:this={canvas}></canvas>

        <p>This work is based on "Azeria" (https://sketchfab.com/3d-models/azeria-6d4aff07356e409396872111bc97858f) by hurkomendiguren (https://sketchfab.com/hurkomendiguren) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)</p>


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