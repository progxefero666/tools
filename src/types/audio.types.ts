
export type AudioMimeType = 
  | "audio/mpeg"
  | "audio/wav"
  | "audio/ogg"
  | "audio/flac"
  | "audio/webm";

export interface AudioBufferOptions {
  sampleRate: number;
  channels: number;
  bitDepth: number;
}
