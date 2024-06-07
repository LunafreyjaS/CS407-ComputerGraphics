<script>

    import { onMount } from 'svelte';
    import { World } from './World/World.js'
    import { cpp } from '@codemirror/lang-cpp';
    import { oneDark } from '@codemirror/theme-one-dark';
    import ColorPicker from 'svelte-awesome-color-picker';

    let canvas;
    let world = null;
    let fps = 0;
    let color1 = "#000000";
    let color2 = "#FFFFFF";

    // let vertexShaderText = `
    //     varying float yValue;

    //     void main() {

    //     yValue = position.y;

    //     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    //     }
    //     `;

    let vertexShaderText = `
        varying float yValue;
        varying float xValue;

        void main() {

        yValue = position.y;
        xValue = position.x;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
        `;
        
    // let fragmentShaderText = `precision mediump float;
    //     varying float yValue;

    //     uniform vec3 color1;
    //     uniform vec3 color2;

    //     void main() {
        
    //         float wave = sin(yValue * 10.0) * 0.5 + 0.5; // Change the 10.0 to modify the banding effect
    //         vec3 color;
    //         if (yValue >= 0.0) {
    //             color = mix(color2, color1, wave);
    //         } else {
    //             color = mix(color1, color2, wave);
    //         }

    //         gl_FragColor = vec4(color, 1.0);
        
    //     }`;

    let fragmentShaderText = `precision mediump float;
        varying float yValue;
        varying float xValue;

        uniform vec3 color1;
        uniform vec3 color2;

        void main() {
        

            float wave = sin(xValue * 1.0); // Change the 1.0 to modify the thickness of the waves

            float blendFactor =(yValue + wave) / 2.0;

            vec3 color = mix(color2, color1, smoothstep(-1.0, 1.0, blendFactor));

            gl_FragColor = vec4(color, 1.0);
        
        }`;

    let x = 0;
    let y = 0;
    let z = 0;

    onMount(() => {
        world = new World(canvas);

        world.changeColor(color1, color2);

        world.start();

        setInterval(() => {
            fps = world.getFrameRate();
        }, 2000);
    });

    function compileShaders() {
        world.updateShaders(vertexShaderText, fragmentShaderText);
    }

    function changeColor() {
        world?.changeColor(color1, color2);
    }

</script>

<section>

    <head>
        <title>Assignment 7: Shaders</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
        <h2>Luna's Shady Shapes</h2>

        <div id="scene-container"></div>

        <code>{Math.round(fps)} FPS</code>

        <canvas bind:this={canvas}></canvas>

        <div class="color-picker">
            <label for="color1">Shader Color 1</label>
            <ColorPicker bind:hex={color1} on:input={changeColor} isAlpha={false} />
            <br>
            <label for="color2">Shader Color 2</label>
            <ColorPicker bind:hex={color2} on:input={changeColor} isAlpha={false} />
        </div>

        <div class="editor-container">
            <label for="vertexShader" class="centered-label">Vertex Shader</label>
            <br>
            <textarea id="vertexShader" class="centered-textarea" bind:value={vertexShaderText} rows="10" cols="100"></textarea>
        </div>
        <div class="editor-container">
            <label for="fragmentShader" class="centered-label">Fragment Shader</label>
            <br>
            <textarea id="fragmentShader" class="centered-textarea" bind:value={fragmentShaderText} rows="10" cols="100"></textarea>
        </div>

        <article>
            <button type="button" on:click={compileShaders}>Compile and Use Shaders</button>
        </article>

        <article class="description">
            <p>The goal of this assignment is to do something cool with shaders.</p>  <p>Requirements are:</p>
            <ul>
                <li>Write your own shaders to do something interesting.  Feel free to find some inspiration online, but you'll need to build a big part of it yourself.  Remember to attribute where you got the idea from, if that's what you did.</li>
                <li>Include interaction of some kind that sends uniforms or attributes to your custom shader.</li>
                <li>Include more than one object in your scene, but only have your shaders applied to one of those objects.  This will enable you to see how different "materials" (and thus shaders) are used for different objects.</li>

            </ul>
        </article>

        <h3>Try the following Fragment Shader for an Alternate Effect!</h3>
        <br>
        {@html `

            <pre>
            <code>
                precision mediump float;
                varying float yValue;
                varying float xValue;
        
                uniform vec3 color1;
                uniform vec3 color2;
        
                void main() {
                
                    float wave = sin(yValue * 10.0) * 0.5 + 0.5; // Change the 10.0 to modify the banding effect
                    vec3 color;
                    if (yValue >= 0.0) {
                        color = mix(color2, color1, wave);
                    } else {
                        color = mix(color1, color2, wave);
                    }
        
                    gl_FragColor = vec4(color, 1.0);
                
                }
            </code>
            </pre>
        
        `}

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