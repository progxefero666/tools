
/**
 * class FileHelper.getFileExtension
 */
export class FileHelper {

    public static readonly DEF_TEXT_FORMAT="utf-8";

    static hasExtension(filePath: string): boolean {
        return filePath.split('/').pop()!.includes('.');
    }

    static getFileName(filePath: string): string {
        return filePath.split('/').pop()!.split('.').shift()!;
    }

    static getFileExtension(fileName: string) {
        return fileName.split('.').pop()!;
    }
    
    static generateFileName(name: string,ext:string): string {
        return name.concat(".").concat(ext);
    }

    /**
     * Convierte una cadena JSON a un ArrayBuffer.
     */
    static stringToArrayBuffer(jsonString: string): ArrayBuffer {
        const encoder = new TextEncoder(); // Codifica strings en Uint8Array
        const uint8Array = encoder.encode(jsonString); // Uint8Array
        const arrayBuffer = uint8Array.buffer.slice(0) as ArrayBuffer; // Forzar el tipo a ArrayBuffer
        return arrayBuffer;
    }

}//end class