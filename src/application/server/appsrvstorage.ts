"use server";

import { SystemFileUtil } from "@/common/server/systemfileutil";
import AppServerConfig from "./appsrvconfig";
import path from "path";


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
