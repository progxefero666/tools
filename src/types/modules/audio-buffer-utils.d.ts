
declare module 'audio-buffer-utils' {
  export function createBuffer(
    channels: number,
    length: number,
    sampleRate: number
  ): AudioBuffer;

  // Puedes añadir más si los usas:
  export function clone(buffer: AudioBuffer): AudioBuffer;
  export function concat(buffers: AudioBuffer[]): AudioBuffer;
}