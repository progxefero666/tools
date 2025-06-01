//src\common\math\mathcurve2d.ts

import { Vector2d } from "@/types/types";
import { Dimension } from "../model/base/dimension";
import { CfCurve2d } from "../geometry/model/cfcurve2d";
import { XMath } from "./xmath";

/**
 * MathCurve2d class provides methods to calculate points on a circular curve in 2D space.
 */
export class MathCurve2d {

    static getCfCurveRadius(radio: number, angleRange: number): number {
        return radio * Math.sin(angleRange / 2);
    }

    public static getExtCfModelA(figureRadius: number): CfCurve2d[] {
        const countBaseElements: number = 8;
        const countLayers: number = 1;
        const countTotalElements: number = countBaseElements * countLayers;
        const angleRange = (2 * Math.PI) / countTotalElements;
        const elem_radius = MathCurve2d.getCfCurveRadius(figureRadius,angleRange); 

        const curves: CfCurve2d[] = [];
        let directionN = true;
        for (let idx = 0; idx < countTotalElements; idx++) {
            const elem_angle = idx * angleRange;
            curves.push(new CfCurve2d(figureRadius, elem_angle, elem_radius, directionN));
            //directionN = !directionN
        }
        return curves;
    }   

    public static getExtCfModelB(figureRadius: number): CfCurve2d[] {
        const countBaseElements: number = 10;
        const countLayers: number = 1;
        const countTotalElements: number = countBaseElements * countLayers;
        const angleRange = (2 * Math.PI) / countTotalElements;
        
        const elem_radius = MathCurve2d.getCfCurveRadius(figureRadius, angleRange);

        const radiusPercDiff: number= 30.0;
        const percGroupA: number = 100.0 - radiusPercDiff;
        const percGroupB: number = 100.0 + radiusPercDiff;
        const radiusGroupA: number = XMath.getValueOfPercent(elem_radius, percGroupA);
        const radiusGroupB: number = XMath.getValueOfPercent(elem_radius, percGroupB);

        const curves: CfCurve2d[] = [];
        let directionN = true;
        for (let idx = 0; idx < countTotalElements; idx++) {
            const elem_angle = idx * angleRange;
            if(XMath.esPar(idx)){
                curves.push(new CfCurve2d(figureRadius, elem_angle, radiusGroupA, directionN));
            }
            else {
                curves.push(new CfCurve2d(figureRadius, elem_angle, radiusGroupB, directionN));
            }
            
            directionN = !directionN
        }
        return curves;
    }

    public static getExtCfModelC(figureRadius: number): CfCurve2d[] {
        const countBaseElements: number = 10;
        const countLayers: number = 1;
        const countTotalElements: number = countBaseElements * countLayers;
        const angleRange = (2 * Math.PI) / countTotalElements;
        
        const elem_radius = MathCurve2d.getCfCurveRadius(figureRadius, angleRange);

        const radiusPercDiff: number= 30.0;
        
        const percGroupA: number = 100.0 - radiusPercDiff;
        const percGroupB: number = 100.0 + radiusPercDiff;
        const radiusGroupA: number = XMath.getValueOfPercent(elem_radius, percGroupA);
        const radiusGroupB: number = XMath.getValueOfPercent(elem_radius, percGroupB);

        const curves: CfCurve2d[] = [];
        let directionN = true;
        for (let idx = 0; idx < countTotalElements; idx++) {
            const elem_angle = idx * angleRange;
            if(XMath.esPar(idx)){
                curves.push(new CfCurve2d(figureRadius, elem_angle, radiusGroupA, directionN));
            }
            else {
                curves.push(new CfCurve2d(figureRadius, elem_angle, radiusGroupB, directionN));
            }
            
            directionN = !directionN
        }
        return curves;
    }

    /*
    XMath.esPar(idx)

    public static getCurvePoint(center: [number, number], radius: number, angle: number): [number, number] {
        const coord_x = center[0] + radius * Math.cos(angle);
        const coord_y = center[1] + radius * Math.sin(angle);
        return [coord_x, coord_y];
    }
    */

}//end