"use client";

import { MMBase } from "../multimedia/objtypes";

/**
 * class AppAssets
 */
export default class AppAssets {

    public static readonly FILE_EXT:string = ".svg";

    // Constantes estáticas para las subcarpetas (directamente en la raíz de public)
    public static readonly IMAGES_PATH:string  = "/images";
    public static readonly VIDEOS_PATH:string  = "/videos";
    public static readonly AUDIOS_PATH:string  = "/audios";
    public static readonly DOCS_PATH:string  = "/doc";


    // Cargar una imagen como File desde una URL

    public static async getVideo(filename: string): Promise<File | null> {
        const fullPath = `${AppAssets.VIDEOS_PATH}/${filename}`;
        return await AppAssets.loadFileFromUrl(fullPath, filename, MMBase.getVideoMimeType(filename));
    }

    public static async getAudio(filename: string): Promise<File | null> {
        const fullPath = `${AppAssets.AUDIOS_PATH}/${filename}`;
        return await AppAssets.loadFileFromUrl(fullPath, filename, MMBase.getAudioMimeType(filename));
    }

    public static async getDoc(filename: string): Promise<File | null> {
        const fullPath = `${AppAssets.DOCS_PATH}/${filename}`;
        return await AppAssets.loadFileFromUrl(fullPath, filename, MMBase.getTextAppMimeType(filename));
    }

    public static async readJsonDoc(filename: string): Promise<string> {
        const fullPath = `${AppAssets.DOCS_PATH}/${filename}`;
        try {
            const response = await fetch(fullPath);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.text();
        } 
        catch (error) {
            //console.error(`Error al cargar "${fullPath}":`, error);
            return "error"; 
        }
    }

    // Función auxiliar para cargar un archivo desde una URL
    private static async loadFileFromUrl(
        fileUrl: string,
        filename: string,
        mimeType: string
    ): Promise<File | null> {
        try {
            const response = await fetch(fileUrl);
            if (!response.ok) {
                console.error(`Error al cargar el archivo "${fileUrl}": ${response.statusText}`);
                return null;
            }

            const blob = await response.blob();
            return new File([blob], filename, { type: mimeType });
        } catch (error) {
            console.error(`Error al cargar el archivo "${fileUrl}":`, error);
            return null;
        }
    }

    public static async getImage(filename: string): Promise<File | null> {
        const fullPath = `${AppAssets.IMAGES_PATH}/${filename}`;
        return await AppAssets.loadFileFromUrl(fullPath, filename, MMBase.getImageFileMimeType(filename));
    }

    public static async getImages(filenames: string[]): Promise<File[] | null> {
        const files: File[] = [];
        for (const filename of filenames) {
            const file = await AppAssets.getImage(filename);
            if (!file) return null; // Si alguno falla, retorna null
            files.push(file);
        }
        return files;
    }

    public static async getVideos(filenames: string[]): Promise<File[] | null> {
        const files: File[] = [];
        for (const filename of filenames) {
            const file = await AppAssets.getVideo(filename);
            if (!file) return null;
            files.push(file);
        }
        return files;
    }

    public static async getAudios(filenames: string[]): Promise<File[] | null> {
        const files: File[] = [];
        for (const filename of filenames) {
            const file = await AppAssets.getAudio(filename);
            if (!file) return null;
            files.push(file);
        }
        return files;
    }

    public static async getDocs(filenames: string[]): Promise<File[] | null> {
        const files: File[] = [];
        for (const filename of filenames) {
            const file = await AppAssets.getDoc(filename);
            if (!file) return null;
            files.push(file);
        }
        return files;
    }

    /*
    public static async getAllImages(): Promise<File[]> {
        const filenames = await AppAssets.listFilesInDir(AppAssets.IMAGES_PATH);
        return filenames.length > 0 ? await AppAssets.getImages(filenames) ?? [] : [];
    }

    public static async getAllVideos(): Promise<File[]> {
        const filenames = await AppAssets.listFilesInDir(AppAssets.VIDEOS_PATH);
        return filenames.length > 0 ? await AppAssets.getVideos(filenames) ?? [] : [];
    }

    public static async getAllAudios(): Promise<File[]> {
        const filenames = await AppAssets.listFilesInDir(AppAssets.AUDIOS_PATH);
        return filenames.length > 0 ? await AppAssets.getAudios(filenames) ?? [] : [];
    }

    public static async getAllDocs(): Promise<File[]> {
        const filenames = await AppAssets.listFilesInDir(AppAssets.DOCS_PATH);
        return filenames.length > 0 ? await AppAssets.getDocs(filenames) ?? [] : [];
    }
    */

    // Función para listar archivos en un directorio usando fetch
    /*
    private static async listFilesInDir(dirPath: string): Promise<string[]> {
        try {
            const response = await fetch(dirPath);
            if (!response.ok) {
                console.error(`Error al listar archivos en "${dirPath}": ${response.statusText}`);
                return [];
            }

            const text = await response.text();
            const filenames = text.split("\n").filter((line) => line.trim() !== "");
            return filenames;
        } catch (error) {
            console.error(`Error al listar archivos en "${dirPath}":`, error);
            return [];
        }
    }
    */
}