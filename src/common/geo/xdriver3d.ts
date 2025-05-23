import { CvRect } from "../graphics/model/cvrect";
import { GrSegment2D } from "../graphics/model/grline2d";
import { Point2D } from "../graphics/model/point2d";
import { Dimension } from "../model/base/dimension";
import { Math2D } from "../math/math2d";
import { PointXYZ } from "../system3d/model/pointxyz";


/**
 * class XCvDriver3d
 */
export class XCvDriver3d {

    public canvasDim: Dimension;
    public cubeSize:number;// ej: 100 gen units
    public deepthLpcs:number; //len percent 0 to 1
    public perspY:number;     //0 to 90
    public deepth:number;
    public deepthHalf:number;
    public virtualBackSize:number;


    public cvViewSize:number = 0;
    public cvBackSize:number = 0;    
    public cvCenter:Point2D;
    public cvViewRect: CvRect;
    public cvBackRect:CvRect;
    public cvBackCoords:Point2D;
    public cvAxisX:GrSegment2D;
    public cvAxisY:GrSegment2D;
    public cvAxisDeepth:GrSegment2D;
    public focalLength:number = 0;
    

    constructor(canvasDim: Dimension,cubeSize:number,deepthLpcs:number,perspY:number){
        this.canvasDim    = canvasDim;
        this.cubeSize     = cubeSize;
        this.deepthLpcs   = deepthLpcs;
        this.perspY       = perspY;
        this.deepth       = this.cubeSize * this.deepthLpcs;
        this.deepthHalf   = this.deepth / 2;

        // formula-->  1 / (1 + distancia_profundidad * tan(medio_fov))
        // result--> real dividido por el factor de encogimiento.
        const fullFovRad = this.perspY * Math.PI / 180;
        const halfFovRad = fullFovRad / 2;        
        this.focalLength = (this.canvasDim.height / 2) / Math.tan(halfFovRad);

        const shrinkageFactor = 1 + this.deepth * Math.tan(halfFovRad);            
        this.virtualBackSize = 0;
        if (shrinkageFactor > 0) {
            this.virtualBackSize = this.cubeSize / shrinkageFactor;    
        }

        // in graphics unit - 1 pix
        this.cvCenter = new Point2D(
            Math.floor(canvasDim.width/2),
            Math.floor(canvasDim.height/2));
        this.cvAxisX = new GrSegment2D(
            new Point2D(0,(this.canvasDim.height / 2)),
             new Point2D(this.canvasDim.width,(this.canvasDim.height / 2)),
            "rgb(255 0 255)");
        
        this.cvAxisY = new GrSegment2D(
            new Point2D((this.canvasDim.width / 2),0),
            new Point2D((this.canvasDim.width / 2),this.canvasDim.height),
            "rgb(255 255 0)");

        this.cvViewSize = 0;
        if(canvasDim.width>=canvasDim.height){
            this.cvViewSize = canvasDim.width;
        }
        else {
           this.cvViewSize = canvasDim.height;
        }
        this.cvBackSize     = this.cvViewSize * (this.virtualBackSize / this.cubeSize);                
        this.cvViewRect     = new CvRect( new Dimension(this.cvViewSize,this.cvViewSize),"rgb(255 0 0)");                
        this.cvBackRect     = new CvRect( new Dimension(this.cvBackSize,this.cvBackSize),"rgb(0 255 0)");

        const cvViewCoordsLeftDown: Point2D= new Point2D(0,this.cvViewSize);
        const cvBackCoordsLeftDown: Point2D= new Point2D(
            Math.floor(this.cvCenter.x - (this.cvBackSize/2)),
            Math.floor(this.cvCenter.y + (this.cvBackSize/2)));
            
        this.cvAxisDeepth = new GrSegment2D(
            cvViewCoordsLeftDown,
            cvBackCoordsLeftDown,"rgb(0 255 255)");

        this.cvBackCoords  = new Point2D(
            Math.floor(this.cvCenter.x - (this.cvBackSize/2)),
            Math.floor(this.cvCenter.y - (this.cvBackSize/2)));
        
    }//end 

    public getDepthIntFactor(coordY: number): number {
        const distanceObserverToFront = this.focalLength;
        const distanceObserverToBack = this.focalLength + this.deepth;       
        const distanceObserverToPoint = this.focalLength + (coordY + this.deepthHalf);
        const invDistFront  = 1 / distanceObserverToFront;
        const invDistBack   = 1 / distanceObserverToBack;
        const invDistPoint  = 1 / distanceObserverToPoint;
        const invDistRange = invDistFront - invDistBack;
        return ((invDistFront - invDistPoint) / invDistRange);
    }

    public getCoords(point: PointXYZ): Point2D {
        const alpha = this.getDepthIntFactor(point.y);
        const currentProjectedSize = this.cvViewSize + alpha * (this.cvBackSize - this.cvViewSize);
        const scaleFactor = currentProjectedSize / this.cubeSize;
        const projectedX = point.x * scaleFactor;
        const projectedZ = -point.z * scaleFactor;
        return new Point2D(this.cvCenter.x + projectedX, this.cvCenter.y + projectedZ);
    }

}//end class

