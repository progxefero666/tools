
import ffmpeg from 'fluent-ffmpeg';
import { PassThrough } from 'stream';
import { VideoConstants } from '../videoconst';
import path from 'path';
import { SystemFileUtil } from '@/common/server/systemfileutil';
//import * as fs from "fs/promises";

/*
El usuario exporta a AVI → Cambia -c:a aac por -c:a mp3.
videoCodec: string, bitrate: string, framerate: number,

*/
export async function createVideoFromCombStream(
    videoCodec: string, bitrate: string, framerate: number,
    resolution: string, filePath: string, combinedStream: PassThrough): Promise<boolean> {
    //console.log("fpath: ".concat(filePath))    
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
                //console.log("vi generation success");
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

/**
 * input format: 00:00:25.33 
 * @param videoDuration 
 * @param valueTimeMillsec 
 * @returns in sec
 */
function getGenPercent(videoDuration: number, valueTimeMillsec: String): number {
    const hours: string = valueTimeMillsec.substring(0, 2);
    const mins: string = valueTimeMillsec.substring(3, 5);
    const smil: string = valueTimeMillsec.substring(6, 11);
    const totalseconds: number =
        (Number(hours) * 3600) + (Number(mins) * 60) + Math.floor(Number(smil));
    return Math.ceil((totalseconds * 100) / videoDuration);
}

export async function createVideoFromListVideoFiles(
    onCreateProgress: (percent: number) => void, videoDuration: number,
    videoCodec: string, bitrate: string, framerate: number, resolution: string,
    videoPaths: string[], outputPath: string): Promise<boolean> {
    //console.log("fpath: ".concat(outputPath))   
    const fs = require('fs');

    //const fname:string = SystemFileUtil.getFileName(outputPath);
    //const flistname:string = fname.concat(".txt");
    const listFilePath = path.join(path.dirname(outputPath), "concat_list.txt");

    fs.writeFileSync(listFilePath, videoPaths.map(p => `file '${p.replace(/\\/g, '/')}'`).join('\n'));

    return new Promise((resolve, reject) => {
        const command = ffmpeg()
            .input(listFilePath)
            .inputOptions(['-f concat', '-safe 0'])
            .outputOptions([
                '-c:v', videoCodec,
                '-b:v', bitrate,
                '-r', framerate.toString(),
                '-s', resolution,
                '-an',
                '-y'
            ])
            .on('start', cmd => {
                //console.log(cmd.toString());
            })
            .on('progress', progress => {
                //console.log("Objeto Progress:", progress);
                if (progress.timemark) {
                    const progValue: number = getGenPercent(videoDuration, progress.timemark);
                    onCreateProgress(progValue);
                }
            })
            .on('end', () => {
                fs.unlink(listFilePath, () => { });
                resolve(true);
            })
            .on('error', (err) => {
                fs.unlink(listFilePath, () => { });
                console.error("ERROR FFMPEG:", err.message);
                reject(false);
            })
            .save(outputPath);
    });

};//end function

export async function createVideoAudioFromListVideoFiles(
    onCreateProgress: (percent: number) => void,
    audioFilePath: string,
    videoDuration: number, videoCodec: string, bitrate: string, framerate: number, resolution: string,
    videoPaths: string[], outputPath: string): Promise<boolean> {
    
    const fs = require('fs');

    const listFilePath = path.join(path.dirname(outputPath), "concat_list.txt");

    fs.writeFileSync(listFilePath, videoPaths.map(p => `file '${p.replace(/\\/g, '/')}'`).join('\n'));

    return new Promise((resolve, reject) => {
        const command = ffmpeg()
            .input(listFilePath)
            .inputOptions(['-f concat', '-safe 0'])
            .outputOptions([
                '-c:v', videoCodec,
                '-b:v', bitrate,
                '-r', framerate.toString(),
                '-s', resolution,
                '-y',
                '-c:a', 'aac',
                '-shortest'
            ]);
        command.input(audioFilePath);    

        command.on('start', cmd => {
            //console.log(cmd.toString());
        })
        command.on('progress', progress => {
            //console.log("Objeto Progress:", progress);
            if (progress.timemark) {
                const progValue: number = getGenPercent(videoDuration, progress.timemark);
                onCreateProgress(progValue);
            }
        })
        command.on('end', () => {
            fs.unlink(listFilePath, () => { });
            resolve(true);
        })
        command.on('error', (err) => {
            fs.unlink(listFilePath, () => { });
            console.error("ERROR FFMPEG:", err.message);
            reject(false);
        })
        command.save(outputPath);
    });

};//end function


/*

    //const fname:string = SystemFileUtil.getFileName(outputPath);
    //const flistname:string = fname.concat(".txt");
export async function createVideoAudioFromListVideoFiles(
    videoCodec: string, bitrate: string, framerate: number, resolution: string,
    videoPaths: string[], audioFilePath: string, outputPath: string): Promise<boolean> {

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
            .videoCodec(videoCodec) // "libx264"
            .videoBitrate(bitrate)   // "2500k"
            .size(resolution)
            .format('mp4')
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
    */