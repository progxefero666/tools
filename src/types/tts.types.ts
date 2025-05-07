
export type AudioContent = string | Uint8Array;

export interface SynthRequest {
  language: string;
  voiceName: string;
  text: string;
}

export interface SynthResponse {
  buffer: Buffer;
  mimeType: string;
}
