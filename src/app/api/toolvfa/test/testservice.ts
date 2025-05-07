"use server";

import path from 'path';
import sharp, { OverlayOptions,type Sharp } from "sharp";

import { ServerPaths } from "../../../../application/toolvfa/server/vfaserverpaths";
import { Point2D } from '@/common/graphics/model/point2d';
import { VfaStorage } from '../../../../application/toolvfa/server/vfastorage';
import { SharpGenImageBuffers } from '@/multimedia/sharp/sharpgenimages';
import { RectColor } from '@/common/graphics/model/rectcolor';
import { XColor } from '@/common/graphics/color/xcolor';
import { Dimension } from '@/common/model/base/dimension';
import { SharpGeneratorFiles } from '@/multimedia/sharp/sharpgenfiles';
import { SharpMotor } from '@/multimedia/sharp/sharpmotor';


export async function testVideoGen(userId: number): Promise<boolean> {

    const imgA_buffer:Buffer = await VfaStorage.getImageBuffer(userId,"imagenA_n.png");
    const imgB_buffer:Buffer = await VfaStorage.getImageBuffer(userId,"imagenB_n.png");
    const imgA_coord:Point2D = new Point2D(0,0);
    const imgB_coord:Point2D = new Point2D(0,0);
    const imgA_alpha:number = 0.5;
    const imgB_alpha:number = 0.5;
    
    const dimension: Dimension = new Dimension(800,600);
    const color: XColor = XColor.DEF;
    const rectColor: RectColor = new RectColor(dimension,color);
    const background:Sharp = SharpMotor.getBackground(rectColor);

    const imagesFolder: string = ServerPaths.getToolImagesFolder(userId);
    const fpathRes: string = path.join(imagesFolder,"imagenRes.png");

    //XImageBuffer.getCloned
    
    const result:boolean = await SharpGeneratorFiles.genTwoImagesBuffersAlphaFile(
                                    fpathRes,background,
                                    imgA_buffer,imgA_coord,imgA_alpha,
                                    imgB_buffer,imgB_coord,imgB_alpha);

    return true;

}//end 

