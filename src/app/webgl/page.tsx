"use client";

import React, { useEffect, useRef, useMemo, useState, useCallback, createContext, useContext} from "react";

import { math } from "@/common/math/mathjslib";
import { Canvas, useThree, useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { Html, OrbitControls, OrthographicCamera } from '@react-three/drei'
import { ColorManagement, Line, SphereGeometry } from 'three'

import { AppUI, useClientReady } from "@/style/appui";
import { VideoPlayerBar } from "@/components/common/videoplayerbar";
import { UIBarVideoPlayerCommands } from "@/components/uicommands";
import { AppGravity } from "./appgravity/appgravity";
import { AppGravityControl } from "./appgravity/appgravityctr";

// view:css
import "@/css/allwidths.css";
import "@icon/themify-icons/themify-icons.css";
import { RenderSystem } from "./app/world3d";
import { WebColors } from "@/common/graphics/color/webcolors";


ColorManagement.enabled = true;
const gl_config: THREE.WebGLRendererParameters = {
    antialias: true,
    logarithmicDepthBuffer: true,    // big escenes
    powerPreference: "high-performance", // Prioriza GPU 
};

//const appControl:AppQuantumControl = new AppQuantumControl();
const appControl: AppGravityControl = new AppGravityControl();

export default function WebglPage() {
    const [scene, setScene] = useState<THREE.Scene | null>(null);
    const [sceneReady, setSceneReady] = useState<boolean>(false);

    const canvasContRef = useRef<HTMLDivElement | null>(null);
    //useEffect(() => {}, []);

    const execPlayerCommand = (commandId: string) => {
        //alert(commandId);
    }

    const clientReady = useClientReady();
    if (!clientReady) { return <div>Loading...</div>; }

    const getRootClassName = () => {
        const device = AppUI.getBrowserDimension();
        return AppUI.getRootContainerWidthClass(device.width);
    }

    const onWglAppInit = (state: {gl: THREE.WebGLRenderer
                                  scene: THREE.Scene
                                  camera: THREE.Camera}) => {            
        state.gl.setClearColor(appControl.backcolor);
        state.gl.toneMapping = THREE.ACESFilmicToneMapping;
        state.gl.toneMappingExposure = 1;
        state.scene.background = new THREE.Color(WebColors.COLOR_BLACK);
        //state.scene.add(appControl.sphere_mesh!)
        appControl.setLightning(state.scene);
        setScene(state.scene);
        setSceneReady(true);
    };
    return (
        <div id="cont_root" className={getRootClassName()}>
            <div className="w-full h-auto grid grid-cols-[47%_1%_52%]  ">

                {/* left colum  */}
                <div className="min-h-[566px] max-h-[566px] flex flex-col  ">
                    <div className="w-full h-auto flex mb-2 px-[6px] py-2 space-x-2 bg-white border">
                        <p>webgl page</p>
                    </div>
                    <div className="w-full h-auto flex mb-2 px-[6px] py-2 space-x-2 bg-white border">
                        <p>escene info</p>
                    </div>
                </div>
                <div></div>

                {/* right colum  */}
                <div className="w-full h-auto flex flex-col ">

                    <div className="w-full h-auto border bg-white mb-2 px-[6px] py-2 flex space-x-2">
                        <p>bar</p>
                    </div>

                    <div className="min-h-[507px] w-full items-center justify-center"
                        ref={canvasContRef}>

                        <Canvas className="border"
                            gl={gl_config} dpr={[1, 2]} linear={false} shadows={true}
                            frameloop="demand"
                            camera={{
                                fov: appControl.cameraMain!.fov,
                                position: appControl.cameraMain!.position
                            }}
                            onCreated={onWglAppInit} >
                            <OrbitControls />
                            {/*<RenderSystem /> */}
                               

                            {sceneReady ? 
                                <AppGravity scene={scene!}
                                            pyplane={appControl.pyplane!} 
                                            pysphere={appControl.pysphere!}
                                            executeRays={appControl.executeRays} />
                            :null}                   

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

