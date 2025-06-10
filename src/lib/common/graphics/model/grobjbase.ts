
import { Dimension } from "@/lib/common/model/base/dimension";
import { Point2D } from "./point2d";
import { GrObjFrame } from "./grobjframe";
import { XColor } from "../color/xcolor";
import { Graphix } from "../graphix";
import { TextBase } from "../graphixtexts";


/**
 * GrObjBase class
 */
export class GrObjBase {

    public static readonly DEF_MARGIN:number = 2;

    public coords:Point2D = Point2D.DEF;
    public dim:Dimension = Dimension.DEF;
    public objmargin:number =GrObjBase.DEF_MARGIN;
    public applyframe:boolean;
    public frame: GrObjFrame|null = null; 

    constructor(coords: Point2D,dim: Dimension|null,applyframe?:boolean ) {
        this.coords = coords;
        if(dim!=null){
            this.dim = dim;
        }        
        this.applyframe = applyframe ?? false;
    }

    protected init(){

        if(this.applyframe) {
            const frColor: XColor   = Graphix.DEF_OBJFRAME_COLOR; 
            const frBwidth:number   = 1;
            const frStyle:string    = Graphix.DEF_OBJFRAME_STYLE;
            const frDim:Dimension   = TextBase.getObjFrameDimension(this.dim,this.objmargin);       
            const frCorner:Point2D = TextBase.getObjFrameCoords(this.coords,this.objmargin);             
            this.frame = new GrObjFrame(frCorner,frDim,frColor,frBwidth,frStyle);
        }
    }

    protected updateObjParams(paramId:string){       
        if(paramId==Graphix.OBJ_PARAM_DIMENSION){
            if (this.frame) {
                this.frame.dim = TextBase.getObjFrameDimension(this.dim, this.objmargin);
            }
        }
        else if(paramId==Graphix.OBJ_PARAM_POSITION ){
            if (this.frame) {
                this.frame.coords = TextBase.getObjFrameCoords(this.coords, this.objmargin);
            }
        }
    }

    public move(ncoords:Point2D ): void {
        this.coords = ncoords;
        this.updateObjParams(Graphix.OBJ_PARAM_POSITION);
    }   




}//end class