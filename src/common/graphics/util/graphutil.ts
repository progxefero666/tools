import { Dimension } from "../../model/base/dimension";
import { Point2D } from "../model/point2d";

/**
 * GraphUtil.getCvImages(objsUrls: string[])
 */
export class GraphUtil{


    static getAspectRatio = (width: number, height: number): number => {
        return (width/height);
    }

    public static getCenteredOrigin(parentDimension: Dimension, soonDimension: Dimension): Point2D {
        const x = (parentDimension.width - soonDimension.width) / 2;
        const y = (parentDimension.height - soonDimension.height) / 2;
        return new Point2D(x, y);
    }
    
    public static getEscDimensionByParent(parentDim: Dimension, soonDim: Dimension): Dimension {
        const aspRatio = soonDim.getAspectRatio();
        let elemDim : Dimension = new Dimension(parentDim.width,parentDim.height);
        if ( (parentDim.width / parentDim.height) > aspRatio) {
            elemDim.width = Math.floor(parentDim.height * aspRatio);
        } 
        else {
            elemDim.height = Math.floor(parentDim.width / aspRatio);
        }
        return elemDim;
    }    

} //end class