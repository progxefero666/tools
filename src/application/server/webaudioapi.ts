import { AudioContext } from 'node-web-audio-api';


async function processAudioBuffer() {

  try {
    // 1. Crear un contexto de audio (simulado en Node.js)
    const audioContext = new AudioContext();

    // 2. Simular la obtención de un buffer de audio (esto en tu caso vendría de la decodificación de un archivo)
    const sampleRate = audioContext.sampleRate;
    const duration = 5; // segundos
    const numberOfChannels = 1;
    const frameCount = sampleRate * duration;
    const audioBuffer = audioContext.createBuffer(
      numberOfChannels,
      frameCount,
      sampleRate
    );

    // Obtener el array de datos para el canal 0
    const channelData = audioBuffer.getChannelData(0);

    // Llenar el buffer con algunos datos de ejemplo (una onda sinusoidal simple)
    const frequency = 440; // Hz (La de Do central es 261.63 Hz)
    for (let i = 0; i < frameCount; i++) {
      const time = i / sampleRate;
      channelData[i] = Math.sin(2 * Math.PI * frequency * time) * 0.5; // Amplitud entre -0.5 y 0.5
    }

    console.log('Buffer de audio creado y llenado con datos.');
    console.log('Sample Rate:', sampleRate);
    console.log('Duración:', audioBuffer.duration, 'segundos');
    console.log('Número de Canales:', audioBuffer.numberOfChannels);
    console.log('Longitud del Buffer:', audioBuffer.length);
    console.log('Primeros 10 valores del buffer:', channelData.slice(0, 10));

    // Aquí podrías realizar el procesamiento de la señal de audio (leer los valores del buffer)
    // Por ejemplo, iterar sobre channelData para analizar la amplitud en cada instante.

    // No olvides cerrar el contexto cuando ya no lo necesites (aunque en este ejemplo simple no es crítico)
    audioContext.close();

  } 
  catch (error) {
    console.error('Error al procesar el buffer de audio:', error);
  }
}
async function leerSeñalDeAudio(rutaArchivo: string): Promise<Float32Array | null> {
    const fs = require('fs');
    try {
      const contextoAudio = new AudioContext();
  
      // Leer el archivo de audio como un ArrayBuffer
      const bufferArchivo = await fs.readFile(rutaArchivo);
      const bufferAudio = await contextoAudio.decodeAudioData(bufferArchivo.buffer);
  
      // Obtener los datos de la señal de audio (asumiendo un solo canal para simplificar)
      const señalAudio = bufferAudio.getChannelData(0);
  
      contextoAudio.close();
      return señalAudio;
  
    } catch (error) {
      console.error('Error al leer o decodificar el archivo de audio:', error);
      return null;
    }
  }
  
  async function procesarArchivo() {
    const rutaArchivoAudio = './audio.wav'; // Reemplaza con la ruta de tu archivo de audio
  
    const datosSeñal = await leerSeñalDeAudio(rutaArchivoAudio);
  
    if (datosSeñal) {
      console.log('Datos de la señal de audio leídos correctamente.');
      console.log('Frecuencia de Muestreo:', new AudioContext().sampleRate);
      console.log('Duración:', datosSeñal.length / new AudioContext().sampleRate, 'segundos');
      console.log('Primeros 10 valores de la señal:', datosSeñal.slice(0, 10));
      // Aquí puedes procesar los datos de la señal de audio (por ejemplo, para visualización)
    } else {
      console.log('No se pudieron leer los datos de la señal de audio.');
    }
  }

  
async function leerSeñalDeAudioStereo(rutaArchivo: string): Promise<[Float32Array, Float32Array] | null> {
    const fs = require('fs');
    try {
      const contextoAudio = new AudioContext();
  
      // Leer el archivo de audio como un ArrayBuffer
      const bufferArchivo = await fs.readFile(rutaArchivo);
      const bufferAudio = await contextoAudio.decodeAudioData(bufferArchivo.buffer);
  
      // Obtener los datos de la señal de audio para ambos canales
      const canalIzquierdo = bufferAudio.getChannelData(0);
      const canalDerecho = bufferAudio.getChannelData(1);
  
      contextoAudio.close();
      return [canalIzquierdo, canalDerecho];
  
    } catch (error) {
      console.error('Error al leer o decodificar el archivo de audio estéreo:', error);
      return null;
    }
  }
  
  async function procesarArchivoStereo() {
    const rutaArchivoAudio = './audio.wav'; // Reemplaza con la ruta de tu archivo de audio estéreo
  
    const señalesAudio = await leerSeñalDeAudioStereo(rutaArchivoAudio);
  
    if (señalesAudio) {
      const [canalIzquierdo, canalDerecho] = señalesAudio;
      console.log('Datos de la señal de audio estéreo leídos correctamente.');
      console.log('Frecuencia de Muestreo:', new AudioContext().sampleRate);
      console.log('Duración:', canalIzquierdo.length / new AudioContext().sampleRate, 'segundos');
      console.log('Longitud del Canal Izquierdo:', canalIzquierdo.length);
      console.log('Longitud del Canal Derecho:', canalDerecho.length);
      console.log('Primeros 10 valores del Canal Izquierdo:', canalIzquierdo.slice(0, 10));
      console.log('Primeros 10 valores del Canal Derecho:', canalDerecho.slice(0, 10));
      // Aquí puedes procesar los datos de ambos canales (por ejemplo, para visualización)
    } else {
      console.log('No se pudieron leer los datos de la señal de audio estéreo.');
    }
  }

  async function leerOndaMonoPromedioAbsoluto(rutaArchivo: string): Promise<Float32Array | null> {
    const fs = require('fs');
    try {
      const contextoAudio = new AudioContext();
  
      // Leer el archivo de audio como un ArrayBuffer
      const bufferArchivo = await fs.readFile(rutaArchivo);
      const bufferAudio = await contextoAudio.decodeAudioData(bufferArchivo.buffer);
  
      // Obtener los datos de la señal de audio para ambos canales
      const canalIzquierdo = bufferAudio.getChannelData(0);
      const canalDerecho = bufferAudio.getChannelData(1);
      const longitud = Math.min(canalIzquierdo.length, canalDerecho.length);
      const ondaMono = new Float32Array(longitud);
  
      // Calcular el promedio de los valores absolutos de ambos canales
      for (let i = 0; i < longitud; i++) {
        ondaMono[i] = (Math.abs(canalIzquierdo[i]) + Math.abs(canalDerecho[i])) / 2;
      }
  
      contextoAudio.close();
      return ondaMono;
  
    } catch (error) {
      console.error('Error al leer o decodificar el archivo de audio estéreo:', error);
      return null;
    }
  }
  
  async function procesarArchivoMono() {
    const rutaArchivoAudio = './audio.wav'; // Reemplaza con la ruta de tu archivo de audio estéreo
  
    const ondaMono = await leerOndaMonoPromedioAbsoluto(rutaArchivoAudio);
  
    if (ondaMono) {
      console.log('Onda mono (promedio absoluto) leída correctamente.');
      console.log('Frecuencia de Muestreo:', new AudioContext().sampleRate);
      console.log('Duración:', ondaMono.length / new AudioContext().sampleRate, 'segundos');
      console.log('Longitud de la Onda Mono:', ondaMono.length);
      console.log('Primeros 10 valores de la Onda Mono:', ondaMono.slice(0, 10));
      // Aquí puedes usar 'ondaMono' para tu visualización
    } else {
      console.log('No se pudo leer la onda mono del archivo de audio estéreo.');
    }
  }
  