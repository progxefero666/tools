

"use client";


import { useEffect, useRef, useState, ChangeEvent } from "react";
import { AppUI, useClientReady } from "@/style/appui";
import { RectColor } from "@/common/graphics/model/rectcolor";
import { Dimension } from "@/common/model/base/dimension";
import { TestCtrlCanvas } from "@/app/test/canvas/ctrcanvas";


import { VideoPlayerBar } from "@/components/common/videoplayerbar";
import { UIBarVideoPlayerCommands } from "@/components/uicommands";
import { XColor } from "@/common/graphics/color/xcolor";
import { GColors } from "@/common/graphics/color/colorlib";
import { ButtonsColors, ThemeColors } from "@/style/apptheme";
import { XButtonIcon } from "@/components/buttons/iconbutton";
import { InputSelect } from "@/components/form/inputselect";
import { FntFamilies } from "@/common/app/appfont";
import { InputNumber } from "@/components/form/inputnumber";

// view:css
import "@/css/allwidths.css";
import "@icon/themify-icons/themify-icons.css";

let ctrCanvas: TestCtrlCanvas | null = null;

import quantumTestA from "../api/quantum/circuittest";



export default function PageQuantum() {

    // canvas states
    const [canvasDimension, setCanvasDimension] = useState<Dimension>(new Dimension(200, 200));
    const [isCanvasInitialized, setIsCanvasInitialized] = useState(false);
    const canvasContRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    
    useEffect(() => {


        if (!canvasContRef.current) { return; }
        if (!canvasContRef.current.clientWidth) { return; }
        if (!isCanvasInitialized) {
            const canvasContDimension = new Dimension(
                canvasContRef.current!.clientWidth - 3,
                canvasContRef.current!.clientHeight)
            setCanvasDimension(canvasContDimension);
            setIsCanvasInitialized(true);
        }
        else {
            if (ctrCanvas != null) { return; }
            if (canvasRef.current) {
                const ctx = canvasRef.current.getContext('2d');
                if (!ctx) { return; }
                ctrCanvas = new TestCtrlCanvas(canvasRef.current, canvasDimension, GColors.BLACK);
            }
        }
    });

    const startTest = async () => {
        alert("test start")
        const result:boolean = await quantumTestA();
        alert("test end")
    }

    
    const execPlayerCommand = (commandId: string) => {
        //alert(commandId);
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



            <div className="w-full h-auto grid grid-cols-[27%_1%_72%]  ">

                {/* left colum ................................................................... */}
                <div className="min-h-[566px] max-h-[566px] flex flex-col  ">

                    <div className="w-full h-auto flex mb-2 px-[6px] py-2 space-x-2 bg-white border">
                        <button
                            className="btn btn-accent"
                            onClick={startTest} >
                            ejecuteTest
                        </button>
                        {/*
                        <XButtonIcon iconname="text"
                            btncolor={ButtonsColors.PRIMARY_CONTENT}
                            iconclass="h-7 w-7"
                            iconcolor={ThemeColors.PRIMARY} />

                        <XButtonIcon iconname="image"
                            btncolor={ButtonsColors.PRIMARY_CONTENT}
                            iconclass="h-7 w-7"
                            iconcolor={ThemeColors.PRIMARY} />

                        <XButtonIcon iconname="video-clapper"
                            btncolor={ButtonsColors.PRIMARY_CONTENT}
                            iconclass="h-7 w-7"
                            iconcolor={ThemeColors.PRIMARY} />

                        <XButtonIcon iconname="pulse"
                            btncolor={ButtonsColors.PRIMARY_CONTENT}
                            iconclass="h-7 w-7"
                            iconcolor={ThemeColors.PRIMARY} />                        
                        
                        */}                                 
                    </div>

                    <div className="w-full h-auto flex mb-2 px-[6px] py-2 space-x-2 bg-white border">

                        <InputNumber name="row_index"
                                    defaultvalue={12}
                                    minvalue={2}
                                    maxvalue={80}
                                    classname="w-[60px]" />
                                    
                        {/*
                        <XButtonIcon iconname="plus"
                            btncolor={ButtonsColors.PRIMARY_CONTENT}
                            iconclass="h-7 w-7"
                            iconcolor={ThemeColors.PRIMARY} />                        
                        <XButtonIcon iconname="brush-alt"
                            btncolor={ButtonsColors.PRIMARY_CONTENT}
                            iconclass="h-7 w-7"
                            iconcolor={ThemeColors.PRIMARY} />

                        <XButtonIcon iconname="save"
                            btncolor={ButtonsColors.PRIMARY_CONTENT}
                            iconclass="h-7 w-7"
                            iconcolor={ThemeColors.PRIMARY} />                  
                        */}            


                    </div>
                </div>

                <div>
                </div>

                {/* right colum ................................................................... */}
                <div className="w-full h-auto flex flex-col ">

                    <div className="w-full h-auto border bg-white mb-2 px-[6px] py-2 flex space-x-2">

{/*
                        <XButtonIcon iconname="pencil"
                            btncolor={ButtonsColors.PRIMARY_CONTENT}
                            iconclass="h-7 w-7"
                            iconcolor={ThemeColors.PRIMARY} />

                        <InputSelect name="font_families"
                            classname="w-[150px]"
                            defaultvalue={FntFamilies.DEF_FAMILY}
                            collection={FntFamilies.FAMILIES} />
                        <InputNumber name="font_size"
                            defaultvalue={12}
                            minvalue={2}
                            maxvalue={100}
                            classname="w-[80px]" />

                        <XButtonIcon iconname="palette"
                            btncolor={ButtonsColors.PRIMARY_CONTENT}
                            iconclass="h-7 w-7"
                            iconcolor={ThemeColors.PRIMARY} />

                        <XButtonIcon iconname="align-left"
                            btncolor={ButtonsColors.PRIMARY_CONTENT}
                            iconclass="h-7 w-7"
                            iconcolor={ThemeColors.PRIMARY} />
                        <XButtonIcon iconname="align-center"
                            btncolor={ButtonsColors.PRIMARY_CONTENT}
                            iconclass="h-7 w-7"
                            iconcolor={ThemeColors.PRIMARY} />

                        <XButtonIcon iconname="align-right"
                            btncolor={ButtonsColors.PRIMARY_CONTENT}
                            iconclass="h-7 w-7"
                            iconcolor={ThemeColors.PRIMARY} />

                        <XButtonIcon iconname="Italic"
                            btncolor={ButtonsColors.PRIMARY_CONTENT}
                            iconclass="h-7 w-7"
                            iconcolor={ThemeColors.PRIMARY} />

                        <XButtonIcon iconname="underline"
                            btncolor={ButtonsColors.PRIMARY_CONTENT}
                            iconclass="h-7 w-7"
                            iconcolor={ThemeColors.PRIMARY} />
                        
                        <XButtonIcon iconname="underline"
                            btncolor={ButtonsColors.PRIMARY_CONTENT}
                            iconclass="h-7 w-7"
                            iconcolor={ThemeColors.PRIMARY} />
                             */} 
                    </div>

                    <div className="min-h-[507px] w-full items-center justify-center"
                        ref={canvasContRef}>
                        <canvas
                            ref={canvasRef}
                            width={canvasDimension.width}
                            height={canvasDimension.height}
                            className="border border-black bg-black" />
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

