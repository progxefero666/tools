"use client";


import { useEffect, useRef,useMemo, useState, ChangeEvent } from "react";
import { AppUI, useClientReady } from "@/style/appui";
import { Dimension } from "@/common/model/base/dimension";
import { VideoPlayerBar } from "@/components/common/videoplayerbar";
import { UIBarVideoPlayerCommands } from "@/components/uicommands";
import { XColor } from "@/common/graphics/color/xcolor";
import { GColors } from "@/common/graphics/color/colorlib";


// view:css
import "@/css/allwidths.css";
import "@icon/themify-icons/themify-icons.css";


import { Canvas, useThree, useFrame,extend } from '@react-three/fiber';
import * as THREE from 'three';
import { ColorManagement, Line } from 'three'
import { Html, OrthographicCamera } from '@react-three/drei'

ColorManagement.enabled = true;

/*
    // Optimizaciones:
    depth: true,
    //premultipliedAlpha: false,    
    //stencil: false,
    precision: "highp",              // Precisión shaders
    depth: true       
*/
const gl_config: THREE.WebGLRendererParameters = {
    antialias: true,
    logarithmicDepthBuffer: true,    // big escenes
    powerPreference: "high-performance", // Prioriza GPU 
};

export default function WebglPage() {

    const canvasContRef = useRef<HTMLDivElement | null>(null);

      const lineRef = useRef<Line>(null)

    useEffect(() => {
    }, []);

    const execPlayerCommand = (commandId: string) => {
        //alert(commandId);
    }

    const CinematicAnimation = () => {
        const ref = useRef<THREE.Mesh>(null)
        const animationTime = useRef(0)

        useFrame((_, delta) => {
            animationTime.current += delta
            if (ref.current) {
                ref.current.rotation.y = Math.sin(animationTime.current) * 2
            }
        })

        return (
            <mesh ref={ref}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                    color="white"
                    metalness={0}
                    roughness={0.2}
                    toneMapped={false}
                />
            </mesh>
        )
    }

    const FrameRateController = (props: { targetFPS: number, children?: React.ReactNode }) => {
        const { targetFPS, children } = props;
        const frameInterval = useRef(1000 / targetFPS) // ms por frame
        const lastTime = useRef(performance.now())

        useFrame((state) => {
            const now = performance.now()
            const elapsed = now - lastTime.current

            if (elapsed > frameInterval.current) {
                lastTime.current = now - (elapsed % frameInterval.current)
                state.invalidate() // Renderiza solo cuando pasa el intervalo
            }
        })
        return <>{children}</>
    }

    const onInit = (state: {
        gl: THREE.WebGLRenderer
        scene: THREE.Scene
        camera: THREE.Camera
        // ... otros parámetros disponibles
    }) => {
        state.gl.setClearColor(new THREE.Color("#1a1a1a"));

    };


    const Escena = () => {
        const { scene } = useThree();

        scene.background = new THREE.Color('#000000'); // Fondo negro
        return (
            <>
                <ambientLight intensity={1} color="#ffffff" />
                <pointLight
                    position={[5, 5, 5]}
                    intensity={50}
                    color="#ffffff"
                    castShadow /> // Opcional para sombras
                <mesh rotation={[0, Math.PI / 4, 0]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial
                        color="white"
                        metalness={0} // Reduce efecto metálico
                        roughness={0.2} // Aumenta reflectividad
                        toneMapped={false} // ✅ Desactiva mapeo tonal para colores puros
                    />
                </mesh>
            </>
        );
    }
    
    const clientReady = useClientReady();
    if (!clientReady) { return <div>Loading...</div>; }

    const getRootClassName = () => {
        //const device = window.screen;
        const device = AppUI.getBrowserDimension();
        return AppUI.getRootContainerWidthClass(device.width);
    }

    return (
        <div id="cont_root" className={getRootClassName()}>
            <div className="w-full h-auto grid grid-cols-[47%_1%_52%]  ">
                {/* left colum ................................................................... */}
                <div className="min-h-[566px] max-h-[566px] flex flex-col  ">
                    <div className="w-full h-auto flex mb-2 px-[6px] py-2 space-x-2 bg-white border">
                        <p>webgl page</p>
                    </div>
                    <div className="w-full h-auto flex mb-2 px-[6px] py-2 space-x-2 bg-white border">
                        <p>escene info</p>
                    </div>
                </div>
                <div></div>

                {/* right colum ................................................................... */}
                <div className="w-full h-auto flex flex-col ">

                    <div className="w-full h-auto border bg-white mb-2 px-[6px] py-2 flex space-x-2">
                        <p>bar</p>
                    </div>

                    <div className="min-h-[507px] w-full items-center justify-center"
                        ref={canvasContRef}>

                        <Canvas
                            gl={gl_config}
                            dpr={[1, 2]}
                            shadows
                            linear={false} // ¡Clave! frameloop="demand"                            
                            camera={{ fov: 50, position: [0, 0, 5] }}
                            onCreated={onInit} >

                            <FrameRateController targetFPS={30}>
                                <CinematicAnimation />
                            </FrameRateController>
                            <ambientLight intensity={1} color="#ffffff" />
                            <pointLight position={[5, 5, 5]} intensity={50} color="#ffffff" />
                            {/*<Escena />*/}

                        </Canvas>

                    </div>
                    <div className="h-auto mt-[8px] bg-green-250 border w-full items-center justify-center">
                        <VideoPlayerBar
                            barclassname="w-full"
                            onclick={execPlayerCommand}
                            commands={UIBarVideoPlayerCommands} />
                    </div>
                </div>

            </div>

        </div>
    );

}//end function

