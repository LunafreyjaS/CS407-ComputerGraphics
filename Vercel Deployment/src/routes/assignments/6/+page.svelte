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
        <title>Assignment 6: Import Model w/ Animation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
        <h2>Luna's Imported Model</h2>

        <div id="scene-container"></div>

        <code>{Math.round(fps)} FPS</code>

        <canvas bind:this={canvas}></canvas>

        <p>This work is based on "Azeria" (https://sketchfab.com/3d-models/azeria-6d4aff07356e409396872111bc97858f) by hurkomendiguren (https://sketchfab.com/hurkomendiguren) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)</p>

        <article class="description">
            <p>The goal of this assignment is to learn how to import external models and utilize their built-in animations</p>  <p>Requirements are:</p>
            <ul>
                <li>Read the glTF file and place the object into your scene..</li>
                <li>Think up something fun to do with your object and it's animation.  Include some form of user interaction that makes the object run its animation, move around the scene, transform in some way, ...</li>
                <li>Use lighting as usual and some form of camera control</li>
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