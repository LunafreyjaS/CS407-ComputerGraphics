<script>

    import { onMount } from 'svelte';
    import { World } from './World/World.js'

    let canvas;
    let world = null;

    onMount(() => {
        world = new World(canvas);

        world.render();

        window.addEventListener('keydown', (e) => {
            if (e.key === "w") {
                world.rotateParachute("up");
            } else if (e.key === "a") {
                world.rotateParachute("left");
            } else if (e.key === "s") {
                world.rotateParachute("down");
            } else if (e.key === "d") {
                world.rotateParachute("right");
            }
        });
    });

</script>

<section>

    <head>
        <title>Assignment 5: Color By Vector</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
        <h2>Luna's Kiwi Adventure</h2>

        <div id="scene-container"></div>

        <p>WASD to control object rotation, mouse to for camera orbit</p>

        <canvas bind:this={canvas}></canvas>

        <img src="https://i.redd.it/lzmbulysouoc1.jpeg" alt="Kiwi" width="300" height="300">


        <article class="description">
            <p>The goal of this assignment is to learn how geometries are organized, represented and delivered to OpenGL and the graphics card.</p>  <p>Requirements are:</p>
            <ul>
                <li>Construct a custom geometry object manually by specifying vertices and faces in an indexed buffer geometry.</li>
                <li>Use per-vertex colors so we can pass custom attribute data to the vertex shader</li>
                <li>Implement orbit and optionally camera navigation through the scene</li>
            </ul>
            <p>Use the mouse to orbit and pan the camera: left mouse click (hold down) or single finger swipe to orbit, right mouse click (hold down), arrow keys, or two-finger swipe to pan; zoom with the scroll wheel or pinch gesture.</p>
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