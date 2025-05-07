import { createCanvas, loadImage, Image } from '@napi-rs/canvas';

import { RectColor } from '@/common/graphics/model/rectcolor';

import { CVImage } from '../model/cvimage';
import { ColorHelper } from '@/common/graphics/color/colorhelper';
import { MMBase } from '../objtypes';

export class NapiGenMemory {

    public static async genOneImageBuffer(rect:RectColor,img:CVImage): Promise<Buffer> {
        try {
            const canvas = createCanvas(rect.dimension.width,rect.dimension.height);
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = ColorHelper.toCVColor(rect.color);
            ctx.fillRect(0, 0,rect.dimension.width,rect.dimension.height);            
            // Imagen
            ctx.globalAlpha = img.alpha;
            ctx.drawImage(img.image, 
                          img.coords.x,img.coords.y,
                          img.dimension.width,img.dimension.height); 

            return canvas.toBuffer(MMBase.MIMETYPE_IMAGE_PNG);
        } 
        catch (error) {
            console.error('Error en genTwoImagesAlphaBuffer:', error);
            throw error; 
        }        
    }

    public static async genTwoImagesBuffer(rect:RectColor,imgA:CVImage,imgB:CVImage): Promise<Buffer> {

        try {
            const canvas = createCanvas(rect.dimension.width,rect.dimension.height);
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = ColorHelper.toCVColor(rect.color);
            ctx.fillRect(0, 0,rect.dimension.width,rect.dimension.height);
            
            // Imagen A
            ctx.globalAlpha = imgA.alpha;
            ctx.drawImage(imgA.image, 
                        imgA.coords.x,imgA.coords.y,
                        imgA.dimension.width,imgA.dimension.height); 

            // Imagen B
            ctx.globalAlpha = imgB.alpha;
            ctx.drawImage(imgB.image, 
                        imgB.coords.x,imgB.coords.y,
                        imgB.dimension.width,imgB.dimension.height); 

            return canvas.toBuffer(MMBase.MIMETYPE_IMAGE_PNG);
        } 
        catch (error) {
            console.error('Error en genTwoImagesAlphaBuffer:', error);
            throw error; 
        }        
    }

}//end class