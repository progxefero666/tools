
import { PassThrough } from "stream";

import { XVideo } from "@/multimedia/model/xvideo";
import { createVideoFromCombStream } from "@/multimedia/ffmpeg/ffmpegcreator";
import { VideoConstants } from "@/multimedia/videoconst";


export class VfaVideoGenFile {
    
    static async  createProcVideo(xvideo:XVideo,filePath: string,combinedStream: PassThrough): Promise<boolean> {    

        let result = await createVideoFromCombStream(
            VideoConstants.CODEC_H264_AVC, VideoConstants.BITRATE_2500, 
            xvideo.framerate,xvideo.resolution,filePath,combinedStream);  

        return result;
    }//end 
}

