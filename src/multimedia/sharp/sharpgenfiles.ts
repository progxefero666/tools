
import path from "path";
import sharp, { OverlayOptions,type Sharp } from "sharp";

import { Point2D } from "@/common/graphics/model/point2d";
import { RectColor } from "@/common/graphics/model/rectcolor";
import { Dimension } from "@/common/model/base/dimension";
import { MObjectConfig } from "../objconst";
import { XImageBuffer } from "../model/ximagebuffer";
import { SharpMotor } from "./sharpmotor";


/**
 * class SharpGeneratorFiles
 */
export class SharpGeneratorFiles {

    public static async genTwoImagesBuffersAlphaFile(
        imgRes_fpath: string,
        background: Sharp,
        imgA_buffer: Buffer, imgA_coord: Point2D, imgA_alpha: number,
        imgB_buffer: Buffer, imgB_coord: Point2D, imgB_alpha: number  ): Promise<boolean> {

        try {
            const imgABuffer = await SharpMotor.loadImageBufferWithOpacity(imgA_buffer, imgA_alpha);
            const imgBBuffer = await SharpMotor.loadImageBufferWithOpacity(imgB_buffer, imgB_alpha);
            const overlays: OverlayOptions[] = [
                {input: imgABuffer,left: imgA_coord.x,top: imgA_coord.y,blend: SharpMotor.BLEND_OVER},
                {input: imgBBuffer,left: imgB_coord.x,top: imgB_coord.y,blend: SharpMotor.BLEND_OVER}
            ];
            await background.composite(overlays).png().toFile(imgRes_fpath);
            return true;
        } 
        catch (error) {console.error(SharpMotor.ERR_MIX, error);
            return false;
        }
    }

    //store img res mixing two images with alpha secure chanel
    public static async genTwoImagesAlphaBuffer(
        imgRes_fpath: string,
        imgRes_rect:RectColor,
        imgA_fpath: string, imgA_coord: Point2D,imgA_dim: Dimension, imgA_alpha: number,
        imgB_fpath: string, imgB_coord: Point2D,imgB_dim: Dimension, imgB_alpha: number  ): Promise<boolean> {

        try {
            // 1. Crear fondo transparente
            const background = sharp({
                create: {
                    width: imgRes_rect.dimension.width,
                    height: imgRes_rect.dimension.width,
                    channels: MObjectConfig.RGBA_CHANELS,
                    background: imgRes_rect.sharpColor
                }
            });

            // 2. load alpha img buffers
            const imgABuffer = await SharpMotor.loadImageWithOpacity(imgA_fpath, imgA_alpha);
            const imgBBuffer = await SharpMotor.loadImageWithOpacity(imgB_fpath, imgB_alpha);

            // 3. layers
            const overlays: OverlayOptions[] = [
                {input: imgABuffer,left: imgA_coord.x,top: imgA_coord.y,blend: SharpMotor.BLEND_OVER},
                {input: imgBBuffer,left: imgB_coord.x,top: imgB_coord.y,blend: SharpMotor.BLEND_OVER}
            ];
            // 4. save img result
            await background.composite(overlays).png().toFile(imgRes_fpath);
    
            return true;
        } 
        catch (error) {console.error('Error al mezclar imágenes:', error);
            return false;
        }
    }


}//end class