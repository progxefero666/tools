"use server";

import * as fs from "fs/promises";
import path from "path";
import { SystemFileUtil } from "@/common/server/systemfileutil";
import { ServerPaths } from '../toolvfa/server/vfaserverpaths';
import { FileHelper } from "@/common/util/filehelper";
import sharp from "sharp";
import { VfaStorage } from "@/application/toolvfa/server/vfastorage";


export async function createUserToolFolders(userId: number): Promise<boolean> {
    return VfaStorage.createToolUserFolders(userId);
}

export async function storeDoc(userId: number, fileContent: ArrayBuffer): Promise<boolean> {
    try {
        const filePath: string = ServerPaths.getToolDocPath(userId);
        return await SystemFileUtil.createFile(fileContent, filePath);
    }
    catch (error) { return false; }
}//end 

/*
export async function storeImage(userId: number,fname:string, fileContent: ArrayBuffer): Promise<boolean> {
    try {
        const pathFolder = ServerPaths.getToolImagesPath(userId);
        const filePath = path.join(pathFolder, fname);
        return await SystemFileUtil.createFile(fileContent, filePath);
    }
    catch (error) { return false; }
}
*/

/**
 * @param mimetype :org mimetype
 * @param name : org fname witout ext
 * @param fcontent : org file buffer
 * @returns 
 */
export async function storeImageAsPng(userId: number,mimetype:string,name:string, fcontent: ArrayBuffer): Promise<boolean> {
    try {       
        const ffolder = ServerPaths.getToolImagesFolder(userId);
        const fpath= path.join(ffolder, name.concat(".png"));
        const buffer = Buffer.from(fcontent);
        const result: sharp.OutputInfo = await sharp(buffer).ensureAlpha().toFormat("png").toFile(fpath);
        //console.log(result); // { format: 'png', width: 800, height: 600, size: 12345 }                
        return !!result; 
    }
    catch (error) { return false; }
}

export async function storeAudio(userId: number,fname:string, fileContent: ArrayBuffer): Promise<boolean> {
    try {
        const pathFolder = ServerPaths.getToolAudiosPath(userId);
        const filePath: string = path.join(pathFolder, fname);
        return await SystemFileUtil.createFile(fileContent, filePath);
    }
    catch (error) { return false; }
}//end 

