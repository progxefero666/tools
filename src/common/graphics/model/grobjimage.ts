
import { Dimension } from "@/common/model/base/dimension";
import { GrObjBase } from "./grobjbase";
import { Point2D } from "./point2d";


/**
 * * GrObjImage class
 */
export  class GrObjImage extends GrObjBase {

    public bmimage: ImageBitmap;
    public alpha:number = 1.0;

    constructor(dim:Dimension,coords:Point2D,bmimage:ImageBitmap,alpha?:number){
        super(coords,dim);
        this.bmimage = bmimage;
        if(alpha){this.alpha = alpha; }        
    }

    clone(): GrObjImage {
        return new GrObjImage(this.dim.clone(),this.coords.clone(),this.bmimage,this.alpha);
    }

}//end class GrObjImage