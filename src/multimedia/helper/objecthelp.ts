
import * as mm from "music-metadata";

import { XImage } from "../model/ximage";
import { XImageBuffer } from "../model/ximagebuffer";

/**
 * class MMObjectHelp.ALPHA_FULL
 */
export class MMObjectHelper {

    public static ALPHA_FULL: number = 1.0;

    static getRandomInt(): number {
        const min = 1;
        const max = 100000;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    static getXImageBuffer(ximage:XImage,alpha?:number):XImageBuffer {
        return new XImageBuffer(ximage.viBuffer!,ximage.dimension,ximage.coords,alpha);
    }


}//end class