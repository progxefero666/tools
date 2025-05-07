import { MMBase } from "@/multimedia/objtypes";
import AppServerConfig from "@/application/server/appsrvconfig";
import path from "path";

/**
 * ServerPaths.getToolVfaVideoFolder
 */
export class ServerPaths {

    public static readonly TOOL_FOLDER = "toolvfa";
    public static readonly TOOL_FOLDER_IMAGES = "images";
    public static readonly TOOL_FOLDER_AUDIOS = "audios";
    public static readonly TOOL_FOLDER_VIDEOS = "videos";
    public static readonly TOOL_DOCNAME = "toolvfadata.json";
    public static readonly TOOL_FILEGENERATION = "videogen.txt";

    public static getToolFolder(userId: number): string {
        const userRootFolder: string = AppServerConfig.gerUsersRootFolder(process.env.NODE_ENV);
        return path.join(userRootFolder, userId.toString(), ServerPaths.TOOL_FOLDER);
    }

    public static getToolDocPath(userId: number): string {
        const fileFolder: string = ServerPaths.getToolFolder(userId);
        return path.join(fileFolder, ServerPaths.TOOL_DOCNAME);
    }

    public static getToolAudiosPath(userId: number): string {
        const fileFolder: string = ServerPaths.getToolFolder(userId);
        return path.join(fileFolder, ServerPaths.TOOL_FOLDER_AUDIOS);
    }

    public static getToolImagesFolder(userId: number): string {
        const fileFolder: string = ServerPaths.getToolFolder(userId);
        return path.join(fileFolder, ServerPaths.TOOL_FOLDER_IMAGES);
    }
    public static getToolImagePath(userId: number,filename:string): string {
        const imagesFolder: string = ServerPaths.getToolImagesFolder(userId);
        return path.join(imagesFolder,filename);
    }

    public static getToolVfaVideoFolder(userId: number): string {
        const fileFolder: string = ServerPaths.getToolFolder(userId);
        return path.join(fileFolder, ServerPaths.TOOL_FOLDER_VIDEOS);
    }

    public static getToolVideoSubPath(userId: number,subfolderName: string): string {
        return path.join(ServerPaths.getToolVfaVideoFolder(userId),subfolderName);
    }
    //const videoFolderPath = ServerPaths.getToolFilesVidesoPath(userId)

    public static  getVideoFilePath(userId: number, videoIndex: number): string {
        let elemsOutputFolder = ServerPaths.getToolVideoSubPath(userId, "elements");
        let videofilename: string = "element_".concat(videoIndex.toString()).concat(MMBase.VIDEOFORMAT_MP4);
        return path.join(elemsOutputFolder, videofilename);
    }

}
