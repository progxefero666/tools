import { Math2D } from "@/common/math/math2d";
import { Point2D } from "@/common/graphics/model/point2d";
import { Vector3d } from "@/types/types";


/**
 * class PySphere
 */
export class PySphere {

    public name:string;
    public color:string;
    public mass:number;
    public radius:number;
    public position:Vector3d;
    
    constructor(name:string,mass:number,radius:number,position:Vector3d,color:string){
        this.name = name;
        this.mass = mass;
        this.radius = radius;
        this.position = position;
        this.color=color;
    }
    
    public getProy2dPolyPoints():Point2D[] {
        const center: Point2D = new Point2D(this.position[0],this.position[2]);
        const points = Math2D.getCfPoints(center, this.radius, 360);
        points.push(points[0]);
        return points;
    }


}//end class