import { GoogleVoice } from "./model/gvoice";
import { GoogleVoiceInfo } from "./model/gcvoiceinfo";
import { GoogleVoAnalizer } from "./gcanalizer";
import { GoogleTextVo } from "../motor/gctext";


/**
 * class GCloudVoices
 * 
 * Estructura de los códigos de voz (ej: "es-ES")
    Primer elemento (idioma):
        Código ISO 639-1 (2 letras).
        Ejemplos: es (español), en (inglés), fr (francés).

    Segundo elemento (región):
        Código ISO 3166-1 alpha-2 (2 letras).
        Ejemplos: ES (España), US (Estados Unidos), MX (México).

    es-ES	Español (España)	es-ES-Standard-A, es-ES-Wavenet-B
    es-US	Español (EE.UU.)	es-US-Neural2-A, es-US-Wavenet-C
    en-US	Inglés (EE.UU.)	en-US-Wavenet-D, en-US-Standard-E
    fr-FR	Francés (Francia)	fr-FR-Wavenet-A, fr-FR-Standard-D     
Voces:
1. Voces por Tipo de Modelo:

Chirp (HD): Son voces generalmente optimizadas para tener una pronunciación más natural y fluida.
	Ejemplos: es-ES-Chirp-HD-D, es-ES-Chirp3-HD-Achernar, es-ES-Chirp3-HD-Puck, etc.

Neural2 (HD): Son voces basadas en redes neuronales más avanzadas, con mayor calidad en términos de prosodia y expresividad.
	Ejemplos: es-ES-Neural2-A, es-ES-Neural2-F, es-ES-Neural2-G, etc.

Standard (HD): Son voces más simples, con menor complejidad en la pronunciación pero son más eficientes y 
               rápidas para aplicaciones que no requieren alta calidad en la voz.
	Ejemplos: es-ES-Standard-A, es-ES-Standard-B, es-ES-Standard-C, etc.

Wavenet (HD): Son voces avanzadas que ofrecen una calidad muy natural y precisa, muy similares a las voces humanas.
	Ejemplos: es-ES-Wavenet-B, es-ES-Wavenet-C, es-ES-Wavenet-D, etc.

Polyglot (HD): Voces más específicas para traducir y generar un sonido multilingüe (aunque es menos común, se usa para voces más "neutras").
	Ejemplo: es-ES-Polyglot-1.

Studio (HD): Voces de alta calidad y también muy naturales, ideales para grab

 * Atributos comunes de voice:

- ssmlGender: El género de la voz (por ejemplo, "MALE", "FEMALE", "NEUTRAL").
- naturalSampleRateHertz: La tasa de muestreo en hertz que representa la calidad de la voz.
- name: El nombre de la voz (por ejemplo, "es-ES-Standard-A").
- languageCodes: Una lista de códigos de idioma soportados para la voz.
- customVoice: Puede especificar si es una voz personalizada.
- pitch: Controla el tono de la voz, que puede ser positivo o negativo.
- speakingRate: Controla la velocidad de habla.
- volumeGainDb: Ajusta el volumen de la voz.
- effectsProfileId: Identificador del perfil de efectos (para optimizar sonidos para dispositivos específicos).
- voiceType: Puede especificar el tipo de voz (como "standard" o "neural").

 */
export class GoogleVoices {

    // constants
    //.......................................................................................
    public static readonly DEF_SAMPLERATE: number = 24000;//Hz

    public static VO_GENDER_ALL = "ALL";
    public static VO_GENDER_MALE = "MALE";
    public static VO_GENDER_FEMALE = "FEMALE";
    public static VO_GENDER_NEUTRAL = "NEUTRAL";

    public static VO_GENDERS: string[] = [
        GoogleVoices.VO_GENDER_MALE, 
        GoogleVoices.VO_GENDER_FEMALE, 
        GoogleVoices.VO_GENDER_NEUTRAL];

    public static ERR_VOICELIST_EMPTY = "Error: not voices return";
    public static ERR_VOICE_INVALID = "Error: Voice data invalida";

    public static readonly VO_QUAL_ALL: string      = "all";
    public static readonly VO_QUAL_WAVENET: string  = "Wavenet";
    public static readonly VO_QUAL_NEURAL2: string  = "Neural2";
    public static readonly VO_QUAL_CHIRP: string    = "Chirp";
    public static readonly VO_QUAL_POLYGLOT: string = "Polyglot";
    public static readonly VO_QUAL_STANDARD: string = "Standard";
    public static readonly VO_QUAL_STUDIO: string   = "Studio";

    public static readonly VO_LIST_QUAL: string[] = [
        GoogleVoices.VO_QUAL_WAVENET,
        GoogleVoices.VO_QUAL_NEURAL2,
        GoogleVoices.VO_QUAL_CHIRP,
        GoogleVoices.VO_QUAL_POLYGLOT,
        GoogleVoices.VO_QUAL_STANDARD,
        GoogleVoices.VO_QUAL_STUDIO];


                    
    // filter functions
    //.......................................................................................

    // by language
    public static filterVoicesByLang(voices: GoogleVoice[], language: string): GoogleVoice[] {
        let filterList: GoogleVoice[] = [];
        for (const voice of voices) {
            if (!voice.suplanguages) {
                continue;
            }
            if (voice.suplanguages.includes(language)) {
                filterList.push(voice);
            }
        }
        return filterList;
    }

    //by samplerate
    public static filterVoicesBySRate(voices: GoogleVoice[], sampleRate: number): GoogleVoice[] {
        let filterList: GoogleVoice[] = [];
        for (const voice of voices) {
            if (!voice.sampratehe) {
                continue;
            }
            if (voice.sampratehe >= sampleRate) {
                filterList.push(voice);
            }
        }
        return filterList;
    }

    //by gender
    public static filterVoicesByGenero(voices: GoogleVoice[], gender: string): GoogleVoice[] {
        let filterList: GoogleVoice[] = [];
        for (const voice of voices) {
            if (voice.gender == gender) {
                filterList.push(voice);
            }
        }
        return filterList;
    }

    // by quality
    public static sameQuality(quality: string, voice_name: string): boolean {
        const qualityMatch = GoogleVoices.VO_LIST_QUAL.some(quality => voice_name.includes(quality));
        if (!qualityMatch) {return false;}
        return true;
    }    

    public static filterVoicesByQuality(voices: GoogleVoice[], quality: string): GoogleVoice[] {
        let filterList: GoogleVoice[] = [];
        for (const voice of voices) {
            if (GoogleVoices.sameQuality(quality, voice.name)) {
                filterList.push(voice);
            }
        }
        return filterList;
    }

    public static filterByParams(voices: GoogleVoice[],
                                 sampleRate: number,
                                 language: string,
                                 quality: string,
                                 gender: string ): GoogleVoice[] {
    
        let filterList = voices;
    
        filterList = GoogleVoices.filterVoicesBySRate(filterList, sampleRate);
        if(filterList.length==0){ return [] };

        filterList = GoogleVoices.filterVoicesByLang(filterList, language);
        if(filterList.length==0){ return [] };

        if (quality !== GoogleVoices.VO_QUAL_ALL) {
            filterList = GoogleVoices.filterVoicesByQuality(filterList, quality);
            if(filterList.length==0){ return [] };
        }

        if (gender !== GoogleVoices.VO_QUAL_ALL) {
            filterList = GoogleVoices.filterVoicesByGenero(filterList, gender);
            if(filterList.length==0){ return [] };
        }
    
        return filterList;
    }
    
    // GCloudVoiceInfo
    //.......................................................................................    
    public static getListVoicesDef(voices: GoogleVoice[]): GoogleVoiceInfo[] {
        let listdef: GoogleVoiceInfo[] = [];
        for (const voiceItem of voices) {
            listdef.push(voiceItem.getVoiceInfo());
        }
        return listdef;
    }

}//end class