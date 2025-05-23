

/**
 * class AudioConstant.TYPE_TEXT
 * audio/mp3      ✅ Seguro y ampliamente compatible  
audio/wav      ✅ Seguro y ampliamente compatible  
audio/ogg      ✅ Seguro, especialmente con codec Vorbis  
audio/flac     ✅ Generalmente seguro, pero puede fallar en navegadores antiguos o móviles  
audio/webm     ✅ Seguro, especialmente con Opus (mejor compatibilidad que FLAC)

MIMETYPE_AUDIO_MPEG = "audio/mp3"
MIMETYPE_AUDIO_MPEG = "audio/mpeg" 
MIMETYPE_AUDIO_WAV = "audio/wav"

MIMETYPE_AUDIO_OGG = "audio/ogg" ->
MIMETYPE_AUDIO_WEBM = "audio/webm" ->
MIMETYPE_AUDIO_FLAC = "audio/flac" ->
 */

/**
 * class AudioConstants.DEF_SAMPL_RATE
 */
export class AudioConstants {

    public static readonly CHANELS_MONO: number = 1;
    public static readonly DEF_BITDEPTH: number = 16;
    public static readonly TYPE_BASE64 = "base64";
    public static readonly TYPE_TEXT = "string";

    public static readonly DEF_BIT_RATE: number = 192000;
    public static readonly DEF_CODEC: string = "MPEG 1 Layer 3";
    
    public static readonly DEF_SAMPL_RATE: number = 44100;
}