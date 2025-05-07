
import { Image, loadImage } from '@napi-rs/canvas';
import { XImage } from "@/multimedia/model/ximage";
import { CVImage } from "../model/cvimage";
import { Dimension } from "@/common/model/base/dimension";
import { Point2D } from "@/common/graphics/model/point2d";


/**
 * CVImage = NapiHelper.getCVImageFromBuffer(buffer:Buffer,dim:Dimension,coords:Point2D,alpha?:number)
 */
export class NapiHelper {

    public static async getCVImage(ximage:XImage,dim:Dimension,coords:Point2D,alpha?:number): Promise<CVImage> {
        let cvAlpha = 1;
        if(alpha){cvAlpha = alpha;}
        const cvimage: Image = await loadImage(ximage.viBuffer!);
        return new CVImage(cvimage,dim,coords,cvAlpha);
    }

    public static async getCVImageFromBuffer(buffer:Buffer,dim:Dimension,coords:Point2D,alpha?:number): Promise<CVImage> {
        let cvAlpha = 1;
        if(alpha){cvAlpha = alpha;}
        const image: Image = await loadImage(buffer);
        return new CVImage(image,dim,coords,cvAlpha);
    }

}