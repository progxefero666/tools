import AppServerConfig from "@/application/server/appsrvconfig";
import path from "path";


/**
 * class GcServerStorage
 * google cloud storage control
 */
export class GcServerStorage {

    public static readonly GCLOUD_FOLDER ="gcloud";
    public static readonly TEXTAUDIOS_FOLDER ="textaudio";

    public static getAudioFilePath(userId: number, fname: string): string {
        const rootFolder = AppServerConfig.gerUsersRootFolder(process.env.NODE_ENV);
        const userFolder = path.join(rootFolder, userId.toString());
        const gloudFolder = path.join(userFolder,GcServerStorage.GCLOUD_FOLDER);
        const audiosFolder= path.join(gloudFolder,GcServerStorage.TEXTAUDIOS_FOLDER);
        return path.join(audiosFolder, fname);
    }
    
}//end class