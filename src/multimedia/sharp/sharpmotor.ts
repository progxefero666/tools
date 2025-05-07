
import sharp, { OverlayOptions,type Sharp } from "sharp";
import { MObjectConfig } from "../objconst";
import { RectColor } from "@/common/graphics/model/rectcolor";

export class SharpMotor {

    public static readonly BLEND_DESTIN = "dest-in";
    public static readonly BLEND_OVER = "over";
    public static readonly ERR_MIX = "Sharp mix error:";

    public static getBackground(rectColor: RectColor): Sharp {
        return sharp({
            create: {
                width: rectColor.dimension.width,
                height: rectColor.dimension.width,
                channels: MObjectConfig.RGBA_CHANELS,
                background: rectColor.sharpColor
            }
        });
    }
    
    
    //create Opacity Buffer
    public static createOpacityBuffer(opacity: number): Buffer {
        return Buffer.from([255, 255, 255, Math.round(opacity * 255)]);
    }

    //load Image With Opacity
    public static async loadImageWithOpacity(imagePath: string,opacity: number): Promise<Buffer> {
        return sharp(imagePath)
            .composite([{
                input: SharpMotor.createOpacityBuffer(opacity),
                raw: { width: 1, height: 1, channels: MObjectConfig.RGBA_CHANELS },
                tile: true,
                blend: SharpMotor.BLEND_DESTIN
            }]).toBuffer();
    }    
    
    public static async loadImageBufferWithOpacity(imageBuffer: Buffer,opacity: number): Promise<Buffer> {
        return sharp(imageBuffer)
            .composite([{
                input: SharpMotor.createOpacityBuffer(opacity),
                raw: { width: 1, height: 1, channels: MObjectConfig.RGBA_CHANELS },
                tile: true,
                blend: this.BLEND_DESTIN
            }]).toBuffer();
    }

}