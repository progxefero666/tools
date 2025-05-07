
import path from "path";
import { loadImage, Image } from 'canvas';
import { ServerPaths } from "@/application/toolvfa/server/vfaserverpaths";
import { VfaVideo } from "@/application/toolvfa/vfavideo";
import { SystemFileUtil } from "@/common/server/systemfileutil";



/**
 * class VfaStorage.FEXT_VIIMAGE_T
 */
export class VfaStorage {

    public static readonly FEXT_VIIMAGE_T:string = "_t";
    public static readonly FEXT_VIIMAGE_N:string = "_n";

    static async createToolUserFolders(userId: number): Promise<boolean> {
        const toolFolder: string = ServerPaths.getToolFolder(userId);
        const toolFolderAudios = path.join(toolFolder, ServerPaths.TOOL_FOLDER_AUDIOS);
        const toolFolderImages = path.join(toolFolder, ServerPaths.TOOL_FOLDER_IMAGES);
        const toolFolderVideos = path.join(toolFolder, ServerPaths.TOOL_FOLDER_VIDEOS);
        const toolFolderElementsVideos = path.join(toolFolderVideos, "elements");

        const toolFolderC: boolean = await SystemFileUtil.createDir(toolFolder);
        const toolFolderAudiosC: boolean = await SystemFileUtil.createDir(toolFolderAudios);
        const toolFolderImagesCc: boolean = await SystemFileUtil.createDir(toolFolderImages);
        const toolFolderVideosCc: boolean = await SystemFileUtil.createDir(toolFolderVideos);
        const toolFolderElementsVideosCc: boolean = await SystemFileUtil.createDir(toolFolderElementsVideos);
        if (!toolFolderC || !toolFolderAudiosC || !toolFolderImagesCc || !toolFolderVideosCc) {
            return false;
        }
        return true;
    }

    static async readImage(userId: number, imageName: string): Promise<Image> {
        const pathFolder = ServerPaths.getToolImagesFolder(userId);
        const filePath = path.join(pathFolder, imageName);
        const image = await loadImage(filePath);
        return image;
    }
    
    static async getImageBuffer(userId: number, fileName: string): Promise<Buffer> {
        const imagesFolder = ServerPaths.getToolImagesFolder(userId);
        const filePath = path.join(imagesFolder, fileName);
        const elemSource: Buffer = await SystemFileUtil.readImageFileBuffer(filePath);
        return elemSource;
    }

    static async readDoc(userId: number): Promise<VfaVideo> {
        const filePath: string = ServerPaths.getToolDocPath(userId);
        const fileContent: string = await SystemFileUtil.readFile(filePath);
        const toolData: VfaVideo = JSON.parse(fileContent);
        return toolData;
    }

    static async readAudio(userId: number, fileName: string): Promise<Blob> {
        const pathFolder = ServerPaths.getToolAudiosPath(userId);
        const filePath: string = path.join(pathFolder, fileName);
        const audioContent: Blob = await SystemFileUtil.readAudioFile(filePath);
        return audioContent;
    }

    /*
    export async function readImageBuffer(userId: number, filename: string): Promise<Buffer> {
        const filePath: string = ServerPaths.getToolImagePath(userId, filename);
        return await SystemFileUtil.readImageFileBuffer(filePath);
    }
    */


}//end class