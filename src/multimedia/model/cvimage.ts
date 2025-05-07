
import { Image } from '@napi-rs/canvas';
import { Dimension } from "@/common/model/base/dimension";
import { Point2D } from "@/common/graphics/model/point2d";


/**
 * class ImageBlob
 */
export class CVImage {
    
    public image:Image;
    public dimension: Dimension;
    public alpha: number;
    public coords: Point2D = Point2D.DEF;

    constructor(image:Image,dimension: Dimension, coords: Point2D ,alpha: number) {
        this.image     = image;
        this.dimension = dimension;
        this.coords    = coords;
        this.alpha     = alpha;         
    }

}//end class