
import { Point2D } from "@/common/graphics/model/point2d";

import { Dimension } from "@/common/model/base/dimension";
import { XImage } from "../model/ximage";


/**
 * class MMImageHelp.getURLImageSource
 */
export class ImageHelper{

     public static readonly BLEND_OVER = "over";
     
     public static async arrayBufferToImageBitmap(buffer: ArrayBuffer, mimeType: string): Promise<ImageBitmap> {
        const blob = new Blob([buffer], { type: mimeType });
        return await createImageBitmap(blob); 
    }

    public static async getCvImage(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(err);
        });
    }

    static getImage(file: File): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);            
            img.onload = () => resolve(img);
            img.onerror = (error) => {
                URL.revokeObjectURL(img.src); //
                reject(new Error("Error al cargar la imagen")); 
            };
        });
    }

    static async getImageDimension(file: File): Promise<Dimension> {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });
        return Promise.resolve(new Dimension(img.width, img.height));
    }


    public static async getHtmlImages(objsUrls: string[]): Promise<HTMLImageElement[]> {
        try {
            const images = await Promise.all(objsUrls.map(url => ImageHelper.getCvImage(url)));
            return images;
        } 
        catch (error) { console.error("Error loading images:", error);
            return [];
        }
    }
     public static async getCvImages(ximages: XImage[]): Promise<ImageBitmap[]> {
        try {
            const images = await Promise.all(
                ximages.map(ximg => ImageHelper.arrayBufferToImageBitmap(ximg.imArrayBuffer,ximg.mimetype))
            );
            return images;
        } 
        catch (error) { console.error("Error loading images:", error);
            return [];
        }
    }

     public static getURLImageSource(mimetype:string,imbuffer: ArrayBuffer): string {
        const blob = new Blob([imbuffer], {type: mimetype});
        return URL.createObjectURL(blob);
      }
  
      static getHtmImageDataURL = async (image: HTMLImageElement, mimetype: string, dimension: Dimension): Promise<string> => {
        const canvas = document.createElement("canvas");
        canvas.width = dimension.width;
        canvas.height = dimension.height;
        const ctx = canvas.getContext("2d");
        ctx!.drawImage(image, 0, 0, dimension.width, dimension.height);
        return canvas.toDataURL(mimetype);
    }

    static async dataURLToArrayBuffer(dataURL: string): Promise<ArrayBuffer> {
        const response = await fetch(dataURL);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as ArrayBuffer);
            reader.onerror = () => reject(reader.error);
            reader.readAsArrayBuffer(blob);
        });
    }

    static async getResizedArrayBuffer(file: File, dimension: Dimension): Promise<ArrayBuffer> {
        const resizedDataURL = await ImageHelper.getDataURL(file, dimension);
        return ImageHelper.dataURLToArrayBuffer(resizedDataURL);
    }

    static getDataURL = async (file: File, dimension: Dimension): Promise<string> => {
        const srcOriginal = URL.createObjectURL(file);
        const img = new Image();
        img.src = srcOriginal;
        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });

        // Crear una miniatura usando Canvas
        const canvas = document.createElement("canvas");
        canvas.width = dimension.width;
        canvas.height = dimension.height;
        const ctx = canvas.getContext("2d");
        ctx!.drawImage(img, 0, 0, dimension.width, dimension.height);
        const dataURL = canvas.toDataURL(file.type);

        URL.revokeObjectURL(srcOriginal);
        return dataURL;
    }      
}


export async function getViImagenArrayBuffer(viDimension: Dimension,viColor:string,
                                             imageMimetype:string,
                                             imageObject: HTMLImageElement,
                                             imageDimension: Dimension,
                                             coords:Point2D): Promise<ArrayBuffer> {    
    const canvas = document.createElement("canvas");
    
    canvas.width = viDimension.width;
    canvas.height = viDimension.height;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = viColor;
    ctx.fillRect(0, 0, viDimension.width,viDimension.height);
    ctx!.drawImage(imageObject, coords.x, coords.y, imageDimension.width, imageDimension.height);
    const dataURL = canvas.toDataURL(imageMimetype);
    return ImageHelper.dataURLToArrayBuffer(dataURL);
}

