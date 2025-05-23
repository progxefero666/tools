
import ffmpeg from 'fluent-ffmpeg';
import { path as ffprobePath } from 'ffprobe-static';

interface AudioMetadata {
    format: {
        filename: string;
        format_name: string;      
        format_long_name: string; 
        duration: number;         // seconds with decimal
        size: string;             // bytes 
        bit_rate:number | string; 
        tags?: {
            encoder?: string;// Software 
            artist?: string; 
        };
    };
    streams: Array<{
        codec_type: 'audio';      
        codec_name: string;       // Ej: "aac", "mp3"
        codec_long_name: string;  // Ej: "AAC (Advanced Audio Coding)"
        sample_rate: number;      // Frecuencia (ej: "48000")
        channels: number;         // Número de canales (2 = estéreo)
        channel_layout?: string;  // Ej: "stereo"
        bit_rate?:number | string;        // Bitrate del audio (ej: "256000")
    }>;
}

export async function getAudioMetadata(filePath: string): Promise<AudioMetadata> {
    return new Promise((resolve, reject) => {
      ffmpeg()
        .setFfprobePath(ffprobePath) // Usa ffprobe-static para el binario
        .input(filePath)
        .ffprobe((err, metadata) => {
          if (!err) {
            console.log(JSON.stringify(metadata))
            //resolve(metadata as unknown  as AudioMetadata);
          }
          else {           
            reject(new Error(`Error en FFprobe: ${err.message}`));
          }
        });
    });
  }