import { VideoConstants } from "@/multimedia/videoconst";


export class AppApi {

    public static readonly API_TOOLVFA = "/api/toolvfa";
    public static readonly API_TOOLVFA_VIGEN = "/api/toolvfa/generator";
    public static readonly API_TOOLVFA_VIDOWNLOAD = "/api/toolvfa/download";

    public static DEF_HEADERS = {
        'Content-Type': VideoConstants.STREAM_CONTENTTYPE,
        'Cache-Control': VideoConstants.NOT_CACHE,
        'Connection': VideoConstants.CON_KEEPALIVE,
    }

    public static getEncodeMessage (mess: any):Uint8Array {
        const messEnc:string="data: ".concat(mess).concat("\n\n");                
        return new TextEncoder().encode(messEnc);
    };   


}//end class