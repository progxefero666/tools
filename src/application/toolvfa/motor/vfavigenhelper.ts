
import { VfaVideo } from "@/application/toolvfa/vfavideo";
import { VfaVideoMData } from "./vfavigendata";
import { FileHelper } from "@/common/util/filehelper";
import { XImage } from "@/multimedia/model/ximage";
import { SystemFileUtil } from "@/common/server/systemfileutil";
import { ServerPaths } from "../server/vfaserverpaths";
import { PassThrough } from "stream";
import { VfaStorage } from "../server/vfastorage";
import { XImageBuffer } from "@/multimedia/model/ximagebuffer";
import { VideoHelper } from "@/multimedia/helper/videohelp";

/**
 * VfaVideoGenHelper.PROCGEN_END
 */
export class VfaVideoGenHelper {

    public static readonly PROC_PROGRESS_LEN:number = 100.0;

    public static readonly PROCID_CREATEINPUTS:string = "createinputs";
    public static readonly PROCID_SAVEVIDEO:string = "savevideo";
    public static readonly PROCGEN_END:string = "process_end";
    
    public static readonly ERROR_UNKNOW:string = "Unknown error during video generation";

    /*
        public getSecondsPerNextImage(countImages: number): number {
        const secPerImge = this.getSecondsPerImage(countImages);
        return secPerImge - this.elemTrDuration;
    }

    public getSecondsPerImage(countImages: number): number {
        return Math.floor(this.duration / countImages);
    }
    const transTotalFrames = transTotalDuration * toolData.xvideo.framerate;
    */

    public static getVideoGenMtData(userId:number,progressRange: number, toolData: VfaVideo): VfaVideoMData {

        const totalFrames = toolData.audio.duration * toolData.xvideo.framerate;
        const transTotalDuration = toolData.elements.length  * toolData.transvelocity;
        const transElemCountFrames = toolData.transvelocity * toolData.xvideo.framerate;
        const normalTotalDuration = toolData.audio.duration - transTotalDuration;
        const normalTotalFrames = normalTotalDuration * toolData.xvideo.framerate;

        const normalElemCountFrames= Math.floor(normalTotalFrames / toolData.elements.length);
        const  alphaUnit=(1.0 / transElemCountFrames);

        const countElemVideos:number = toolData.elements.length * 2;
        const percUnit= (progressRange /countElemVideos);
                
        const metadata = new VfaVideoMData
            (toolData.xvideo.framerate,totalFrames,transElemCountFrames,normalElemCountFrames,percUnit,alphaUnit);
        metadata.userId = userId; 
        return metadata;  
    }
    
    
    static async getXImageCombStream(userId:number,ximgbuffer: XImageBuffer,countBuffers:number): Promise<PassThrough> {
        let buffers: Buffer[] = [];
        for (let buffIndex = 0; buffIndex < countBuffers; buffIndex++) {            
            buffers.push(Buffer.from(ximgbuffer.content));
        }
        return VideoHelper.getCombinedStream(buffers);
    }

    static async  getXImageNrBuffer(userId: number, ximage: XImage): Promise<XImageBuffer> {
        const fname = FileHelper.getFileName(ximage.fname).
            concat(VfaStorage.FEXT_VIIMAGE_N).concat(".png");
        const fpath: string = ServerPaths.getToolImagePath(userId,fname); 
        const fbuffer:Buffer = await SystemFileUtil.readImageFileBuffer(fpath);
        return new XImageBuffer(fbuffer,ximage.dimension,ximage.coords);
    }

    static async  getXImageTrBuffer(userId: number, ximage: XImage): Promise<XImageBuffer> {
        const fname = FileHelper.getFileName(ximage.fname).
            concat(VfaStorage.FEXT_VIIMAGE_T).concat(".png");
        const fpath: string = ServerPaths.getToolImagePath(userId,fname); 
        //console.log(userId);
        //console.log(fpath);
        const fbuffer:Buffer = await SystemFileUtil.readImageFileBuffer(fpath);
        return new XImageBuffer(fbuffer,ximage.dimension,ximage.coords);
    }


    static async  getXImagesNrBuffers(userId: number, ximages: XImage[]): Promise<XImageBuffer[]> {
        let list:XImageBuffer[] = [];
        for (let elem of ximages) {
            const elemXBuffer = await VfaVideoGenHelper.getXImageNrBuffer(userId,elem);
            list.push(elemXBuffer);
        }
        return list;
    }

    static async  getXImagesTrBuffers(userId: number, ximages: XImage[]): Promise<XImageBuffer[]> {
        let list:XImageBuffer[] = [];
        for (let elem of ximages) {
            const elemXBuffer = await VfaVideoGenHelper.getXImageTrBuffer(userId,elem);
            list.push(elemXBuffer);
        }
        return list;
    }

    static async getImgElementNrBuffers(filePath:string,countBuffers:number ): Promise<PassThrough> {
        let elemBuffer: Buffer = await SystemFileUtil.readImageFileBuffer(filePath);
        let buffers: Buffer[] = [];
        for (let idx = 0; idx < countBuffers; idx++) {
            buffers.push(Buffer.from(elemBuffer));
        }
        return VideoHelper.getCombinedStream(buffers);
    }

    static async getImgElementCombStream(userId:number,element: XImage,countBuffers:number): Promise<PassThrough> {
        const ext = FileHelper.getFileExtension(element.fname);
        const nameBase = FileHelper.getFileName(element.fname);
        const nrfilename:string = nameBase.concat(VfaStorage.FEXT_VIIMAGE_N).concat(".").concat(ext);
        const filePath: string = ServerPaths.getToolImagePath(userId,nrfilename);            
        return VfaVideoGenHelper.getImgElementNrBuffers(filePath,countBuffers);
    }

    /*
    static async  getImageTrBuffers(userId: number, element: XImage): Promise<Buffer> {
        const ext = FileHelper.getFileExtension(element.fname);
        const nameBase = FileHelper.getFileName(element.fname);
        const nrfilename:string = nameBase.concat(VfaStorage.FEXT_VIIMAGE_T).concat(".").concat(ext);
        const filePath: string = ServerPaths.getToolImagePath(userId,nrfilename);       
        return await SystemFileUtil.readImageFileBuffer(filePath);
    }

    static async setImagesTrBuffers(userId: number, elements: XImage[]): Promise<boolean> {        
        for (let elem of elements) {
            elem.viBuffer = await VfaVideoGenHelper.getImageTrBuffers(userId,elem);
        }
        return true;
    }    
    */

} //end class


