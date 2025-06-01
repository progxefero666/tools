import { Vector3d } from "@/types/types";

import * as THREE from 'three';
import { Vector3 } from 'three';

import { GlLine } from "./model/glline";
import { Math3dCf } from "@/common/math/math3dcf";
import { GlConfig } from "../glconfig";
import { ThreeLine } from "../three/model/thline";


/**
 * GlPrimitiveUtil.getCfGlLine(color:string,center:Vector3d,radius: number,countSides: number,GlConfig.DIR_POS)
 */
export class GlPrimitiveUtil {

    public static getCfGlLine(color:string,center:Vector3d,radius: number,countSides: number,dir?: number):GlLine {
        const cfVertex:Vector3d[]=Math3dCf.getCfVertex(center,radius,countSides,dir??GlConfig.DIR_POS);
        return new GlLine(color,cfVertex);
    }

    public static getCfThreeLine(color:string,center:Vector3d,radius: number,countSides: number,dir?: number):ThreeLine {
        const cfVertex:Vector3d[]=Math3dCf.getCfVertex(center,radius,countSides,dir??GlConfig.DIR_POS);
        const threeVertex:Vector3[] = [];
        for(let idx=0;idx<cfVertex.length;idx++){
            threeVertex.push(new Vector3(cfVertex[idx][0], cfVertex[idx][1], cfVertex[idx][2]));
        }
        threeVertex.push(new Vector3(cfVertex[0][0], cfVertex[0][1], cfVertex[0][2]));
        return new ThreeLine(color,threeVertex);
    }
}//end class