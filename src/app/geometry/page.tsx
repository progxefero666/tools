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
import { CtrlGeoCanvas } from "./ctrgeocanvas";
import { WaveDef } from "@/pyshic/electromag/model/wavedef";
import { Physic } from "@/pyshic/pyshic";

import { MathGrappAxisXY } from "@/common/mathgraph/model/axisxygraph";
import { MathGraphGenerator } from "@/common/mathgraph/mathgraphgen";
import { FigureCf } from "@/common/geometry/model/figure";
import { WebColors } from "@/common/graphics/color/webcolors";
import { CfCurve2d } from "@/common/geometry/model/cfcurve2d";
import { MathCurve2d } from "@/common/math/mathcurve2d";
import { InputRange, InputRangeRef } from "@/components/form/inputrange";

let ctrCanvas: CtrlGeoCanvas | null = null;


export default function PageGeometry() {

    // canvas states
    const [canvasDimension, setCanvasDimension] = useState<Dimension>(new Dimension(200, 200));
    const [isCanvasInitialized, setIsCanvasInitialized] = useState(false);
    const canvasContRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const cvPlayerRange = useRef<InputRangeRef>(null);

    useEffect(() => {

        if (!canvasContRef.current) { return; }
        if (!canvasContRef.current.clientWidth) { return; }
        if (!isCanvasInitialized) {
            const canvasContDimension = new Dimension(
                canvasContRef.current!.clientWidth - 3,
                canvasContRef.current!.clientHeight - 3)
            setCanvasDimension(canvasContDimension);
            
            setIsCanvasInitialized(true);
        }
        else {
            if (ctrCanvas != null) { return; }
            if (canvasRef.current) {
                const ctx = canvasRef.current.getContext('2d');
                if (!ctx) { return; }
                console.log(canvasDimension)
                ctrCanvas = new CtrlGeoCanvas(canvasRef.current, canvasDimension, GColors.BLACK);
                //chargeGraph();
                chargeFigure();
            }
        }
    });

    const onPlayerRangeChange = (name: string, result: unknown) => {

    }
    
    const execPlayerCommand = (commandId: string) => {}

    const executeActionBar = async (operation: string) => {
        console.log(`executeActionBar operation:${operation}`);
    }

    const chargeFigure= () :void  =>{
        const figure:FigureCf = new FigureCf(150, WebColors.COLOR_GREEN);
        const curves: CfCurve2d[] = MathCurve2d.getExtCfModelB(figure.radius);
        ctrCanvas!.renderFigure(figure.radius,figure.color,curves);
    }

    const chargeGraph= () :void  =>{
        //2500
        const waveDef:WaveDef = new WaveDef(10e6,50,Physic.ELECTRON_MASS); 
        const waveGrap:MathGrappAxisXY = MathGraphGenerator
            .genWaveGraphXY(ctrCanvas!.graphDimension,waveDef);
        ctrCanvas!.renderMathGrappAxisXY(waveGrap);
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

            <div className="w-full h-auto grid grid-cols-[34%_1%_65%]">

                {/* left colum ................................................................... */}
                <div className="min-h-[566px] max-h-[566px] flex flex-col">

                    <div className="w-full h-auto flex mb-2 px-[6px] py-2 space-x-2 bg-white border">
                    </div>

                    <div className="w-full h-auto flex mb-2 px-[6px] py-2 space-x-2 bg-white border">
                        <InputRange name="playRange" 
                            ref={cvPlayerRange}
                            defaultvalue={0} step={1}
                            min={0} max={20}
                            onchange={onPlayerRangeChange} />

                        <InputNumber name="row_index"
                            defaultvalue={12}
                            minvalue={2}
                            maxvalue={80}
                            classname="w-[60px]" />

                    </div>
                </div>

                <div>
                </div>

                {/* right colum ................................................................... */}
                <div className="w-full h-auto flex flex-col ">

                    <div className="w-full h-auto border bg-white mb-2 px-[6px] py-2 flex space-x-2">
                        <XButtonIcon
                            callback={executeActionBar} operation="generate"
                            btncolor={ButtonsColors.INFO_CONTENT}
                            btnsize="md"
                            iconname="pulse"
                            iconsize={"md"}
                            iconcolor="black" btntext="generate" />
                    </div>

                    <div className="h-[500px] w-full items-center justify-center"
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

