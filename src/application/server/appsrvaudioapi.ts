
"use server";

import path from "path";
import { AudioContext } from 'node-web-audio-api';
import AppServerConfig from "./appsrvconfig";


export async function getStereoAudioFileWave(fname: string): Promise<number[] | null> {
    const fs = require('fs').promises;
  
    const appfolder: string = AppServerConfig.getAppRootFolder(process.env.NODE_ENV);
    const audiosfolder: string = path.join(appfolder, "audios");
    const rutaArchivo = path.join(audiosfolder, fname);
  
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
      return Array.from(ondaMono); // Convertimos a un array JavaScript serializable
  
    } catch (error) {
      console.error('Error al leer o decodificar el archivo de audio estéreo:', error);
      return null;
    }
  }