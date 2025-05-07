
import sharp, { OverlayOptions,type Sharp } from "sharp";

import { Point2D } from "@/common/graphics/model/point2d";
import { XImageBuffer } from "../model/ximagebuffer";
import { SharpMotor } from "./sharpmotor";

/**
 * class SharpGenImageBuffers
 */
export class SharpGenImageBuffers {

    public static async genOneXImageBufferAlphaBuffer(
                background:Sharp,imgbuffer:XImageBuffer): Promise<Buffer> {
        return SharpGenImageBuffers.genOneImageBufferAlphaBuffer
            (background,imgbuffer.content,imgbuffer.coords,imgbuffer.alpha);
    }

    public static async genOneImageBufferAlphaBuffer(
        background: Sharp,
        img_buffer: Buffer, img_coord: Point2D, img_alpha: number): Promise<Buffer> {
        try {
            const imgABuffer = await SharpMotor.loadImageBufferWithOpacity(img_buffer, img_alpha);
            const overlays: OverlayOptions[] = [
                {input: imgABuffer,left: img_coord.x,top: img_coord.y,blend: SharpMotor.BLEND_OVER}
            ];
            return await background.composite(overlays).png().toBuffer();
        } 
        catch (error) {console.error(SharpMotor.ERR_MIX, error);
            return Buffer.alloc(0); 
        }
    }    

    public static async genTwoXImagesBuffersAlphaBuffer(
                background: Sharp,
                imgA: XImageBuffer,
                imgB: XImageBuffer): Promise<Buffer> {
        try {
            const imgABuffer = await SharpMotor.loadImageBufferWithOpacity(imgA.content, imgA.alpha);
            const imgBBuffer = await SharpMotor.loadImageBufferWithOpacity(imgB.content, imgB.alpha);
            const overlays: OverlayOptions[] = [
                {input: imgABuffer,left: imgA.coords.x,top: imgA.coords.y,blend: SharpMotor.BLEND_OVER},
                {input: imgBBuffer,left: imgB.coords.x,top: imgB.coords.y,blend: SharpMotor.BLEND_OVER}
            ];
            return await background.composite(overlays).png().toBuffer();
        } 
        catch (error) {console.error(SharpMotor.ERR_MIX, error);
            return Buffer.alloc(0); 
        }
    }

    public static async genTwoImagesBuffersAlphaBuffer(
        background: Sharp,
        imgA_buffer: Buffer, imgA_coord: Point2D, imgA_alpha: number,
        imgB_buffer: Buffer, imgB_coord: Point2D, imgB_alpha: number  ): Promise<Buffer> {
        try {
            const imgABuffer = await SharpMotor.loadImageBufferWithOpacity(imgA_buffer, imgA_alpha);
            const imgBBuffer = await SharpMotor.loadImageBufferWithOpacity(imgB_buffer, imgB_alpha);
            const overlays: OverlayOptions[] = [
                {input: imgABuffer,left: imgA_coord.x,top: imgA_coord.y,blend: SharpMotor.BLEND_OVER},
                {input: imgBBuffer,left: imgB_coord.x,top: imgB_coord.y,blend: SharpMotor.BLEND_OVER}
            ];
            return await background.composite(overlays).png().toBuffer();
        } 
        catch (error) {console.error(SharpMotor.ERR_MIX, error);
            return Buffer.alloc(0); 
        }
    }

}//end class




