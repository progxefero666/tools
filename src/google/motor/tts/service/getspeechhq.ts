'use server';

import { GoogleCloud } from '@/google/googlecloud';
import { GoogleTextToSpeech } from '@/google/motor/tts/gtexttospeech';
import { AudioConstants } from '@/multimedia/audioconst';

export async function getSpeechHQ(language: string,
                                   voiceName: string,
                                   text: string): Promise<Buffer | null> {
    const client = GoogleTextToSpeech.getConnection();
    if (client === null) return null;

    try {
        const [response] = await client.synthesizeSpeech({
            input: { text },
            voice: { name: voiceName, languageCode: language },
            audioConfig: { audioEncoding: "LINEAR16" }
        });
        const audio = response.audioContent;
        if (!audio || (typeof audio !== 'string' && !(audio instanceof Uint8Array))) {
            console.error(GoogleCloud.ERR_UNKNOW, GoogleCloud.ERR_AUDIO_NOT_CONTENT);
            return null;
        }
        const buffer: Buffer = typeof audio === 'string'
                ? Buffer.from(audio,AudioConstants.TYPE_BASE64)
                : Buffer.from(audio);
        return buffer;
    }
    catch (error) {
        GoogleCloud.showError(error);
        return null;
    }
                                
}//end 