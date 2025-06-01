//src\common\geometry\model\cfcurve2d.ts

import { Math2D } from "@/common/math/math2d";
import { MathCurve2d } from "@/common/math/mathcurve2d";
import { XMath } from "@/common/math/xmath";
import { Vector2d } from "@/types/types";


/**
 * CfCurve2d class represents a circular curve in 2D space.
 */
export class CfCurve2d {

    public ccrotation: number;
    public ccDistance: number;    
    public directionInvClockD: boolean;
    public radius: number;

    public point: Vector2d = [0, 0];
    public startAngle: number = 0;
    public rangeAngle: number= 0;;
    public endAngle: number = 0;
    public joins: Vector2d[] = [];

    //rangeAngle: number
    constructor(ccDistance:number,ccrotation: number,radius:number,direction:boolean) {
        this.ccDistance = ccDistance;
        this.ccrotation = ccrotation;
        this.radius = radius;
        this.directionInvClockD = direction;
        this.calculateParams();
    }

    private calculateParams(): void {
        this.point = Math2D.getCfPoint([0, 0], this.ccDistance, this.ccrotation);       
        this.joins = Math2D.getInter([0, 0], this.ccDistance, this.point, this.radius);
        this.startAngle = Math2D.getTwoPointsAngle(this.point, this.joins[1]);
        this.endAngle = Math2D.getTwoPointsAngle(this.point, this.joins[0]);
    }

} //end class

//const effectiveRotation = this.ccrotation;
//this.startAngle = effectiveRotation + (Math.PI / 2);
//this.endAngle = effectiveRotation + (3 * Math.PI / 2)