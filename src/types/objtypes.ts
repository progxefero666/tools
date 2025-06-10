//

import path from "path";

import { Dimension } from "../lib/common/model/base/dimension";
import { FileHelper } from "../lib/common/util/filehelper";
import { AppConstants } from "@/lib/common/app/constants";




export enum MediaType {
    TYPE_VIDEO = "VIDEO",
    TYPE_AUDIO = "AUDIO",
    TYPE_IMAGE = "IMAGE"
}

/**
 * MMBase.MIMETYPE_DEF
 * MMBase.MIMETYPE_VIDEO_AVI 
 * MMBase.MIMETYPE_VIDEO_MOV 
 *     public static MIMETYPE_VIDEO_MP4 = "video/mp4" as const;
    public static MIMETYPE_VIDEO_AVI = "video/x-msvideo" as const;
    public static MIMETYPE_VIDEO_MOV = "video/quicktime" as const;
 */
export class MMBase {

    public static readonly PERSONALIZED = "personalized";
    public static readonly DEF_DIMENSION = new Dimension(0, 0);

    public static OBJ_TEXT = "text";
    public static OBJ_APP = "application";
    public static OBJ_IMAGE = "image";
    public static OBJ_AUDIO = "audio";
    public static OBJ_VIDEO = "video";

    
    public static MIMETYPE_DEF = "application/octet-stream";

    public static VIDEOFORMAT_MP4:string = "mp4";
    public static VIDEOFORMAT_AVI:string = "avi";
    public static VIDEOFORMAT_MOV:string = "mov";

    public static MIMETYPE_TEXT_HTML = "text/html" as const;
    public static MIMETYPE_TEXT_PLAIN = "text/plain" as const;
    public static MIMETYPE_TEXT_CSSV = "text/cssv" as const;
    public static MIMETYPE_TEXT_JAVASCRIPT = "text/javascript" as const;

    public static MIMETYPE_APP_JSON = "application/json" as const;
    public static MIMETYPE_APP_XML = "application/xml" as const;
    public static MIMETYPE_APP_PDF = "application/pdf" as const;

    public static MIMETYPE_IMAGE_JPEG = "image/jpeg" as const;
    public static MIMETYPE_IMAGE_PNG = "image/png" as const;
    public static MIMETYPE_IMAGE_GIF = "image/gif" as const;
    public static MIMETYPE_IMAGE_WEBP = "image/webp" as const;

    public static MIMETYPE_AUDIO_MPEG = "audio/mpeg" as const;
    public static MIMETYPE_AUDIO_OGG = "audio/ogg" as const;
    public static MIMETYPE_AUDIO_WAV = "audio/wav" as const;
    public static MIMETYPE_AUDIO_WEBM = "audio/webm" as const;
    public static MIMETYPE_AUDIO_FLAC = "audio/flac" as const;
    public static MIMETYPE_AUDIO_AAC = "audio/aac" as const;
    public static MIMETYPE_AUDIO_MIDI = "audio/midi" as const;
    
    

    public static MIMETYPE_VIDEO_MP4 = "video/mp4" as const;
    public static MIMETYPE_VIDEO_AVI = "video/x-msvideo" as const;
    public static MIMETYPE_VIDEO_MOV = "video/quicktime" as const;

    public static MIMETYPE_VIDEO_WEBM = "video/webm" as const;
    public static MIMETYPE_VIDEO_OGG = "video/ogg" as const;
    
    public static MIMETYPE_VIDEO_MPEG = "video/mpeg" as const;


    

    // VIDEO
    public static VIDEO_MT_MAP: { [key: string]: string } = {
        "mp4": this.MIMETYPE_VIDEO_MP4,
        "avi": this.MIMETYPE_VIDEO_AVI,
        "webm": this.MIMETYPE_VIDEO_WEBM,
        "ogg": this.MIMETYPE_VIDEO_OGG,
        "mov": this.MIMETYPE_VIDEO_MOV,
        "mpeg": this.MIMETYPE_VIDEO_MPEG,
    };

    // AUDIO MIME types
    public static AUDIO_MT_MAP: { [key: string]: string } = {
        "mp3": this.MIMETYPE_AUDIO_MPEG,
        "ogg": this.MIMETYPE_AUDIO_OGG,
        "wav": this.MIMETYPE_AUDIO_WAV,
        "webm": this.MIMETYPE_AUDIO_WEBM,
        "flac": this.MIMETYPE_AUDIO_FLAC,
        "aac": this.MIMETYPE_AUDIO_AAC,
        "midi": this.MIMETYPE_AUDIO_MIDI,
    };

    // IMAGES
    public static IMAGE_MT_MAP: { [key: string]: string } = {
        "jpeg": this.MIMETYPE_IMAGE_JPEG,
        "jpg": this.MIMETYPE_IMAGE_JPEG,
        "png": this.MIMETYPE_IMAGE_PNG,
        "gif": this.MIMETYPE_IMAGE_GIF,
        "webp": this.MIMETYPE_IMAGE_WEBP,
    };

    // TEXT
    public static TEXT_APP_MT_MAP: { [key: string]: string } = {
        "json": this.MIMETYPE_APP_JSON,
        "xml": this.MIMETYPE_APP_XML,
        "pdf": this.MIMETYPE_APP_PDF,
        "html": this.MIMETYPE_TEXT_HTML,
        "txt": this.MIMETYPE_TEXT_PLAIN,
        "css": this.MIMETYPE_TEXT_CSSV,
        "js": this.MIMETYPE_TEXT_JAVASCRIPT,
    };

    
    public static getTextAppMimeType(filePath: string): string {
        const ext: string = path.extname(filePath).slice(1);
        const lowerExt = ext.toLowerCase();
        return MMBase.TEXT_APP_MT_MAP[lowerExt] || AppConstants.UNDEFINED;
    }

    public static getAudioMimeType(filePath: string): string {
        const ext: string = FileHelper.getFileExtension(filePath);
       
        return MMBase.AUDIO_MT_MAP[ext] || AppConstants.UNDEFINED;
    }

    public static getImageFileMimeType(filePath: string): string {
        const ext: string = FileHelper.getFileExtension(filePath);
        const lowerExt = ext.toLowerCase();
        return MMBase.IMAGE_MT_MAP[lowerExt];
    }

    public static getImageExtMimeType(ext: string): string {
        const lowerExt = ext.toLowerCase();
        return MMBase.IMAGE_MT_MAP[lowerExt] || AppConstants.UNDEFINED;
    }
    
    public static getVideoExtMimeType(ext: string): string {
        const lowerExt = ext.toLowerCase();
        return MMBase.VIDEO_MT_MAP[lowerExt] || AppConstants.UNDEFINED;
    }
    
    
    public static getVideoMimeType(filePath: string): string {
        alert(filePath);
        const ext: string = path.extname(filePath).slice(1);
        
        const lowerExt = ext.toLowerCase();
        return MMBase.VIDEO_MT_MAP[lowerExt] || AppConstants.UNDEFINED;
    }
    
}//end class