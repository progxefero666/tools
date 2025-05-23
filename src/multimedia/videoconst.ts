
import { Point2D } from "../common/graphics/model/point2d";
import { XColor } from "../common/graphics/color/xcolor";
import { Dimension } from "../common/model/base/dimension";

/*
| **Resolución**       | **Bitrate recomendado** |
|-----------------------|-------------------------|
| 480p (SD)            | `500k` - `1000k`       |
| 720p (HD)            | `1000k` - `2500k`      |
| 1080p (Full HD)      | `2500k` - `5000k`      |
| 1440p (2K)           | `5000k` - `10000k`     |
| 2160p (4K)           | `10000k` - `20000k`    |
*/

/**
 * class VideoConfig.DEF_BITRATE
 */
export class VideoConstants {

    public static readonly BITRATE_2500 = "2500k";
    public static readonly CODEC_H264_AVC: string = "libx264"; // H.264 (AVC) codec
    
    public static readonly DEF_VIRGBACOLOR = XColor.DEF;

    public static readonly RGBA_CHANELS = 4;
    public static readonly DEF_MP4_CODEC: string = "avc1";

    public static readonly DEF_FRAMERATE: number = 30;
    public static readonly DEF_FORMAT: string = "mp4";
    public static readonly DEF_BITRATE = "1000k";

    public static readonly DEF_COORDS: Point2D = new Point2D(0, 0);
    public static readonly DEF_DIMENSION = new Dimension(800, 600);
    public static readonly DEF_HEXBACKCOLOR = "#000000";
    public static readonly OPACITY_NONE: number = 1.0;

   
    public static readonly VIDEO_FROMIMGBUFFERS = "image2pipe";
    public static readonly CONFIG_NOTLOSS = "-crf 17";
    public static readonly PRESET_SLOW = "-preset slow";
    public static readonly VIDEOCONFIG_UNIVCOMPAT = "-pix_fmt yuv420p";
    

    public static readonly NOT_CACHE: string = "no-cache";
    public static readonly STREAM_CONTENTTYPE: string = "text/event-stream";
    public static readonly CON_KEEPALIVE: string = "keep-alive";

    

}//end class
