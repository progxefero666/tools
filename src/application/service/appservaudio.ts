
import { getStereoAudioFileWave } from "../server/appsrvaudioapi";


/**
 * class AppAudioApiService.readStereoAudioWave(fname);
 */
export class AppAudioApiService {

    public static async readStereoAudioWave(fname: string): Promise<Float32Array| null> {
        try {
          const audioWaveNumbers: number[] | null = await getStereoAudioFileWave(fname);
          if (!audioWaveNumbers) {
            return null;
          }
          const audioWave = new Float32Array(audioWaveNumbers);
          return audioWave;
        } 
        catch (error) {
          console.error("Error: readFileAudio", error);
          return null;
        }
      }

}//class