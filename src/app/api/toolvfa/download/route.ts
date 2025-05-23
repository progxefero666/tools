"use server";

import path from "path";
import fs from "fs/promises";

import { AppConfig } from "@/application/appconfig";
import { VfaStorage } from "@/application/toolvfa/server/vfastorage";
import { VfaVideo } from "@/application/toolvfa/vfavideo";
import { ServerPaths } from "@/application/toolvfa/server/vfaserverpaths";
import { MMBase } from "@/multimedia/objtypes";
import { HttpBase } from "@/common/http/httpbase";


/**
 * download tool user final video 
 * @param request 
 * @returns 
 */
export async function GET(request: Request) {
    const url = new URL(request.url);
    const userIdParam = url.searchParams.get(AppConfig.KEY_USERID);
    if (!userIdParam) {
        return new Response(JSON.stringify({ error: HttpBase.RESPMSG_BADPARAMETERS}), {
            status: HttpBase.RESPCODE_BADREQUEST,
            headers: { "Content-Type": MMBase.MIMETYPE_APP_JSON },
        });
    }

    const userId = Number(userIdParam);
    const videoData: VfaVideo = await VfaStorage.readDoc(userId);
    if(!videoData){
        return new Response(JSON.stringify({ error: HttpBase.RESPMSG_NOTFOUND }), {
            status: HttpBase.RESPCODE_NOTFOUND,
            headers: { "Content-Type": MMBase.MIMETYPE_APP_JSON },
        });
    }

    const videoFoder: string = ServerPaths.getToolVfaVideoFolder(userId);
    const videoFilePath = path.join(videoFoder, videoData.xvideo.fname);
    const videoFileExt = path.extname(videoFilePath).substring(1).toLowerCase(); 
    //console.log(videoFilePath);
    try {
        const fileHandle = await fs.open(videoFilePath, HttpBase.MODE_READ);
        const fileStream = fileHandle.createReadStream();
        const { size } = await fileHandle.stat();

        const headers = new Headers();
        let contentType = MMBase.MIMETYPE_DEF;
        if (videoFileExt == MMBase.VIDEOFORMAT_MP4) {
            contentType = MMBase.MIMETYPE_VIDEO_MP4;
        }
        else if (videoFileExt == MMBase.VIDEOFORMAT_AVI) {
            contentType = MMBase.MIMETYPE_VIDEO_AVI;
        }
        else if (videoFileExt == MMBase.VIDEOFORMAT_MOV) {
            contentType = MMBase.MIMETYPE_VIDEO_MOV;
        }

        headers.set("Content-Type", contentType);
        headers.set('Content-Disposition', `attachment; filename="${videoData.xvideo.fname}"`);
        headers.set('Content-Length', String(size));
        return new Response(fileStream as any, { status: HttpBase.RESPCODE_SERVEROK, headers });
    }
    catch (error) {
        //console.error("Error reading video file:", error);
        return new Response(JSON.stringify({ error: HttpBase.RESPMSG_SERVERERROR }), {
            status: HttpBase.RESPCODE_SERVERERROR,
            headers: { "Content-Type":MMBase.MIMETYPE_APP_JSON },
        });
    }

}