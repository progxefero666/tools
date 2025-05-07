
import { parseMedia } from '@remotion/media-parser';
import { PassThrough } from "stream";
import { Dimension } from "@/common/model/base/dimension";
import { XVideo } from "../model/xvideo";
import { AppConstants } from '@/common/app/constants';
import { VideoConstants } from '../videoconst';
import { XColor } from '@/common/graphics/color/xcolor';
import { MMBase } from '../objtypes';

export const availableVideoCodecs = ['vp8', 'vp9', 'h264', 'h265'] as const;
export type ConvertMediaVideoCodec = (typeof availableVideoCodecs)[number];


/*
* getUrlVideoCodec -->
* "avc1.64001E"`: H.264 (AVC) High Profile, Level 4.2
* "avc1.42E01E"`: H.264 (AVC) Main Profile, Level 4.2
* "avc1.4D401E"`: H.264 (AVC) Baseline Profile, Level 4.2
* "vp9"`: VP9
* "vp8"`: VP8
* "av01.0.01M.09"`: AV1 Main Profile, Main tier, Level 3.0, Sequence header
* "hev1.1.L93.B0"`: HEVC (H.265) Main Profile, Main tier, Level 3.1
* "mp4v.20.8"`: MPEG-4 Part 2 Simple Profile, Level 3
* 
* Valores de retorno si solo está el tipo MIME (sin `codecs`):
* `"video/mp4"`
* `"video/webm"`
* `"video/quicktime"`
* `"video/x-matroska"`
*/
export class VideoHelper {

    /**
     * getUrlVideoCodec for upload files
     * @param objectURL 
     * @returns 
     */
    public static getUrlVideoCodec(objectURL: string): Promise<string | null> {

        return new Promise((resolve) => {
            const videoElement = document.createElement('video');
            videoElement.src = objectURL;
            videoElement.addEventListener('loadedmetadata', () => {
                const typeAttribute = videoElement.getAttribute('type');
                if (typeAttribute) {
                    const codecsMatch = typeAttribute.match(/codecs="([^"]+)"/);
                    if (codecsMatch && codecsMatch[1]) {
                        resolve(codecsMatch[1].split(',').map(c => c.trim())[0] || null);
                        return;
                    }
                    if (typeAttribute.startsWith(MMBase.MIMETYPE_VIDEO_MP4)) {
                        resolve(VideoConstants.DEF_MP4_CODEC);
                        return;
                    }
                }
                resolve(null);
            });
            videoElement.addEventListener('error', () => {
                resolve(null);
            });
            videoElement.load();
        });
    }

    static async processXVideo(file: File, id?: string): Promise<XVideo | null> {
        try {
          const fbuffer  = await file.arrayBuffer();
          const fblob    = new Blob([fbuffer], { type: file.type });
          const fobjURL  = URL.createObjectURL(fblob);
          const metadata = await parseMedia({
            src: fobjURL,
            fields: {
              durationInSeconds: true,
              dimensions: true,
              sampleRate: true,
              fps:true
            }
          });      
          let metadata_codec: string = VideoConstants.DEF_MP4_CODEC;
          const fcodec = await VideoHelper.getUrlVideoCodec(fobjURL);
          if (fcodec !== null) {metadata_codec = fcodec;}
      
          let videoid: string = AppConstants.UNDEFINED;
          if (id) {videoid = id;}

          alert(metadata.fps!);

          const xvideo: XVideo = new XVideo(
            videoid,
            file.name,
            Math.floor(metadata.durationInSeconds!),
            new Dimension(metadata.dimensions!.width, metadata.dimensions!.height),
            VideoConstants.DEF_VIRGBACOLOR,
            metadata.fps!,
            VideoConstants.DEF_BITRATE,
            metadata_codec,
            fbuffer, file.size);
          return xvideo;
        } 
        catch (error) {
          console.error("Error in processXVideo:", error);
          return null;
        } 
    }
      

    public getViUrlObject(mimetype: string, buffer: ArrayBuffer): string {
        const blob = new Blob([buffer], { type: mimetype });
        return URL.createObjectURL(blob);
    }

    static getResolution(dimension: Dimension): string {
        return dimension.width.toString()
            .concat("x").concat(dimension.height.toString());
    }

    public static getCountFrames(framerate: number, durationSeconds: number): number {
        return durationSeconds * framerate;
    }
    public static getPercent(countFrames: number, frameIndex: number): number {
        return Math.floor((frameIndex * 100) / countFrames);
    }

    public static getPercentString(countFrames: number, frameIndex: number): string {
        return VideoHelper.getPercent(countFrames, frameIndex).toString();
    }

    public static getCombinedStream(buffers: Buffer[]): PassThrough {
        const combinedStream: PassThrough = new PassThrough();
        buffers.forEach((buffer, index) => {
            combinedStream.push(buffer);
            if (index === buffers.length - 1) {
                combinedStream.push(null);
            }
        });
        return combinedStream;
    }

}