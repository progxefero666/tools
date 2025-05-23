"use server";

import path from "path";
import { SystemFileUtil } from "@/common/server/systemfileutil";
import AppServerConfig from "./appsrvconfig";

/*
export enum AppFolders {
    AUDIOS = "audios",
    VIDEOS = "videos",
    IMAGES = "images",
    DOCS= "docs"
}
function getAppAudioFilepath(fname: string): string {
    const appfolder:string = AppServerConfig.getAppRootFolder(process.env.NODE_ENV);
    const audiosfolder:string =path.join(appfolder,"audios");
    return path.join(audiosfolder,fname);
}
*/
export async function readAppAudio(fname: string): Promise<Buffer> {
    const appfolder:string = AppServerConfig.getAppRootFolder(process.env.NODE_ENV);
    const audiosfolder:string =path.join(appfolder,"audios");
    const fpath = path.join(audiosfolder,fname);
    //console.log("fpath:".concat(fpath));
    return readAudio(fpath);
}


// ======================
// action servers
// ======================
export async function readUserAudio(userId: number, fname: string): Promise<Buffer> {
    const fpath = getDefFolderAudiosPath(userId, fname);
    console.log("fpath:".concat(fpath));
    return readAudio(fpath);
}

// ======================
// Funciones internas 
// ======================
async function readAudio(fpath: string): Promise<Buffer> {
    const audioContent: Blob = await SystemFileUtil.readAudioFile(fpath);
    return Buffer.from(await audioContent.arrayBuffer());
}

function getDefFolderAudiosPath(userId: number, fname: string): string {
    const rootFolder = AppServerConfig.gerUsersRootFolder(process.env.NODE_ENV);
    const userFolder = path.join(rootFolder, userId.toString());
    const vfaFolder = path.join(userFolder,"toolvfa");
    const audiosFolder = path.join(vfaFolder, "audios");
    return path.join(audiosFolder, fname);
}



//AppServerConfig.getAppRootFolder()