
import ffmpeg from 'fluent-ffmpeg';
import { PassThrough } from 'stream';
import { VideoConstants } from '../videoconst';


/*
const outputOptions = [
    `-metadata title=${toolData.videodata.name}`,
    `-metadata mimetype=${toolData.videodata.mimetype}`,
    MMVideoHelp.VIDEOCONFIG_UNIVCOMPAT,
    MMVideoHelp.VIDEOCONFIG_NOTLOSS,
    MMVideoHelp.VIDEOPRESET_SLOW
    videoCodec: string, bitrate: string, framerate: number, resolution: string,
*/
export async function createVideoFromCombStream(
    videoCodec: string, bitrate: string, framerate: number, 
    resolution: string, filePath: string, combinedStream: PassThrough): Promise<boolean> {

    return new Promise((resolve, reject) => {
        ffmpeg()
            .input(combinedStream)
            .inputFormat(VideoConstants.VIDEO_FROMIMGBUFFERS)
            .inputFPS(framerate)
            .videoCodec(videoCodec)
            .videoBitrate(bitrate)
            .size(resolution)
            .output(filePath)
            .on('end', () => {
                console.log("vi generation success");
                resolve(true); // Éxito
            })
            .on('error', (err: any) => {
                console.error("vi generation error:", err.message);
                if (err.code) {
                    console.error('Código de salida de FFmpeg:', err.code);
                }
                resolve(false); 
            })
            .run();
    });
}

export async function createVideoFromListVideoFiles(
    onCreateFinalVideoProgress: (percent100: number) => void,
    videoCodec: string,bitrate: string,framerate: number, 
    resolution: string,videoPaths: string[],outputPath: string): Promise<boolean> {

    return new Promise((resolve, reject) => {
        const command = ffmpeg();

        // add list videos
        videoPaths.forEach((videoPath) => {
            command.input(videoPath);
        });

        command
            .inputFPS(framerate)
            .videoCodec(videoCodec)
            .videoBitrate(bitrate)
            .size(resolution)
            .outputOptions('-map [merged]')
            .complexFilter([
                {
                    filter: 'concat',
                    options: {
                        n: videoPaths.length, // Número de videos
                        v: 1,  // Concatenar video (1 = sí, 0 = no)
                        a: 0   // Ignorar audio (0 = no)
                    },
                    outputs: 'merged'
                }
            ])
            .on('start', () => {
                //console.log("vi generation init");
            })
            .on('progress', (progress) => {
                const percent = Math.floor(progress.percent || 0);
                //console.log(`Progreso: ${percent}%`);
                onCreateFinalVideoProgress(percent);                
            })
            .on('end', () => {
                //console.log("vi generation success");
                resolve(true); 
            })
            .on('error', (err) => {
                console.error("vi generation error:", err.message);
                reject(false);
            })
            .save(outputPath);
    });
}

export async function createVideoAudioFromListVideoFiles(
    videoCodec: string,bitrate: string,framerate: number,resolution: string,
    videoPaths: string[],audioFilePath: string,outputPath: string): Promise<boolean> {

    return new Promise((resolve, reject) => {
        const command = ffmpeg();

        // 1. Añadir todos los videos (inputs)
        videoPaths.forEach((videoPath) => {
            command.input(videoPath);
        });


        //.audioChannels(audiodata.channels)
        //.audioFrequency(audiodata.samplingRate)

        // 2. Añadir el archivo de audio como input
        command.input(audioFilePath);
        command
            .inputFPS(framerate)
            .videoCodec(videoCodec)
            .videoBitrate(bitrate)
            .size(resolution)

            .outputOptions([
                '-map [v]', 
                '-map 1:a',
                '-shortest'  
            ])
            .complexFilter([
                {
                    // Filtro para concatenar los videos (sin audio)
                    filter: 'concat',
                    options: { n: videoPaths.length, v: 1, a: 0 },
                    outputs: 'v' 
                }
            ])
            .on('start', () => console.log("Iniciando procesamiento..."))
            .on('progress', (progress) => {
                console.log(`Progreso: ${Math.floor(progress.percent || 0)}%`);
            })
            .on('end', () => {
                console.log("Video + audio generados con éxito");
                resolve(true);
            })
            .on('error', (err) => {
                console.error("Error:", err.message);
                reject(false);
            })
            .save(outputPath);
    });
}