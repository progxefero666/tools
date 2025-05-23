
import ffmpeg from 'fluent-ffmpeg';
import { path as ffprobePath } from 'ffprobe-static';

interface VideoMetadata {
    format: {
        filename: string;
        format_name: string;
        format_long_name: string;
        duration: number;
        size: string;
        bit_rate: string;
        tags?: {
            encoder?: string;
            creation_time?: string;
        };
    };
    streams: Array<{
        codec_type: 'video';
        codec_name: string;
        codec_long_name: string;
        width: number;
        height: number;
        pix_fmt?: string;
        r_frame_rate?: string;
        bit_rate?: string;
    }>;
}
export async function getVideoMetadata(filePath: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        ffmpeg()
            .setFfprobePath(ffprobePath) // Usa ffprobe-static para el binario
            .input(filePath)
            .ffprobe((err, metadata) => {
                if (!err) {
                    //resolve(metadata as unknown as VideoMetadata);
                    console.log(JSON.stringify(metadata));
                    resolve(true);
                }
                else {
                    reject(err.message);                    
                }
            });
    });
}
