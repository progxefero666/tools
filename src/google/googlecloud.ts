

/**
 * class GoogleCloud.INF_AU_FILE_GENSUCCESS
 */
export class GoogleCloud {

    public static VO_FORMAT_MP3 = "MP3";
    public static VO_FORMAT_HQ:string = "LINEAR16";
    public static VO_FORMAT_STREAMING:string = "OGG_OPUS";
  
    public static INF_AU_FILE_GENSUCCESS = "Audio file generation success";
    
    public static ERR_UNKNOW = "Error unknow";
    public static ERR_NOTCRED_FOUND = "Error: var GOOGLE_APPLICATION_CREDENTIALS not found";
    public static ERR_AUDIO_NOT_CONTENT =  "No audio content received";
    public static ERR_AUDIO_FILEWRITER = "Error: Voice data invalida";
    public static ERR_VOICE_INVALID = "Error: Voice data incorrect";

   
    //if (!GoogleCloud.checkCredentials()) return null;
    public static checkCredentials(): boolean {
        const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;        
        if (!credentialsPath) {
            console.error(GoogleCloud.ERR_NOTCRED_FOUND);
            return false;
        }
        return true;
    }

    public static showError(error: unknown): void {
        console.error('Error calling api service:', {
            error: error instanceof Error ? error.message : 'Error unknow',
            stack: error instanceof Error ? error.stack : undefined
        });
    }    

} //end class