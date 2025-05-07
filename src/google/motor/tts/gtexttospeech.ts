
import { TextHelper } from '@/common/text/texthelper';
import { TimeUtil } from '@/common/util/timeutil';
import { GoogleCloud } from '@/google/googlecloud';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';


/**
 * class GoogleTextToSpeech.ERR_NOTCONNECTION
 */
export class GoogleTextToSpeech {

    public static ERR_NOTCONNECTION = "Error: not api TextToSpeech connection.";

    public static getConnection(): TextToSpeechClient | null {
        let connection: TextToSpeechClient | null = null;
        try {
            connection = new TextToSpeechClient();
        }
        catch (error) {
            GoogleCloud.showError(error);
            return null;
        }
        finally {
            return connection;
        }
    }

    /*
    public static estimateParagraphSpeechDuration(text: string,
        wordsPerMinute: number = 160,
        pauseDuration: number = 200): number {
        const wordCount = text.split(/\s+/).length;
        const durationMilliseconds = (wordCount / wordsPerMinute) * 60000;
        const pauseCount = (text.match(/[.,!?;:]/g) || []).length;
        return (durationMilliseconds + (pauseCount * pauseDuration));
    }
*/

}//end class

