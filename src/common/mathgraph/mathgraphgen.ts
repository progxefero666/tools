import { WaveDef } from "@/pyshic/electromag/model/wavedef";
import { Dimension } from "../model/base/dimension";
import { MathGrappAxisXY } from "./model/axisxygraph";
import { Physic } from "@/pyshic/pyshic";

/**
 * class MathGraphGenerator
 */
export class MathGraphGenerator {

    // Wave 2d Graph Axis XY 
    public static genWaveGraphXY(frameDim:Dimension,Wavedef: WaveDef): MathGrappAxisXY {        
        let data_x: number[] = [];
        let data_y: number[] = [];
        let data_phi: number[] = [];
        for(let iter:number=0; iter < frameDim.width; iter++) {
            const time: number = iter * Physic.NANOSECOND;
            const amplitude: number = Wavedef.getAmplitudeAt(time);
            const space_position: number = iter * Physic.NANOMETER;
            const phi:number = Wavedef.getPhaseAt(space_position,time);
            data_x.push(Math.floor(iter));
            data_y.push(Math.floor(amplitude));
            data_phi.push(phi);
        }
        return new MathGrappAxisXY(frameDim.width, frameDim.height, data_x, data_y,data_phi);
    }

}//end class