<script>

    import { onMount } from 'svelte';
    import { World } from './World/World.js'

    let canvas;
    let world = null;
    let fps = 0;

    onMount(() => {
        world = new World(canvas);

        world.start();

        setInterval(() => {
            fps = world.getFrameRate();
        }, 2000);

        window.addEventListener('keydown', (e) => {
            if (e.key === "w") {
                world.rotateHourglass("up");
            } else if (e.key === "a") {
                world.rotateHourglass("left");
            } else if (e.key === "s") {
                world.rotateHourglass("down");
            } else if (e.key === "d") {
                world.rotateHourglass("right");
            }
            else if (e.key === " ") {
                world.addSphere();
            }
        });
    });

</script>

<section>

    <head>
        <title>Final Project</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
        <h2>Luna's Final Project</h2>

        <p> Press WASD to rotate the lamp.</p>

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