
import { FileHelper } from "@/common/util/filehelper";
import { MMBase } from "@/multimedia/objtypes";

import { readAppAudio, readUserAudio } from "../server/appsrvstorage";
import { AudioHelper } from "@/multimedia/helper/audiohelp";

/**
 * class AppService.readFileAudio(userId: number,fname:string)
 */
export class AppService {

    public static async readAppFileAudio(fname:string): Promise<string|null> {       
        let result:string|null=null;  
        try {
            const fbuffer: Buffer = await readAppAudio(fname);
            if(!fbuffer){return null;}
            const fext:string = FileHelper.getFileExtension(fname);
            result = AudioHelper.getAudioUrl(fbuffer,MMBase.getAudioMimeType(fext));
        }
        catch (error) { 
            console.error("Error: readFileAudio", error); 
            result = null;
        }         
        return result;
    }

    public static async readUserFileAudio(userId: number,fname:string): Promise<string|null> {       
        let result:string|null=null;  
        try {
            const fbuffer: Buffer = await readUserAudio(userId,fname);
            if(!fbuffer){return null;}
            const fext:string = FileHelper.getFileExtension(fname);
            result = AudioHelper.getAudioUrl(fbuffer,MMBase.getAudioMimeType(fext));
        }
        catch (error) { 
            //console.error("Error: readFileAudio", error); 
            result = null;
        }         
        return result;
    }

}//end class