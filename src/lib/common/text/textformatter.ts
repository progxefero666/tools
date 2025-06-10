
export class TextFormatter {
    
    /**
     * Corrige los espacios después de signos de puntuación (, . ; : ! ?)
     * Añade un espacio si no hay uno justo después del signo,
     * sin afectar los saltos de línea.
     */
    public static fixSpacing(text: string): string {
        return text.replace(/([.,;:!?])(?=\S)/g, '$1 '); // Añadimos un espacio después de los signos de puntuación
    }

    /**
     * Elimina espacios duplicados dentro de líneas,
     * pero respeta saltos de línea y párrafos.
     */
    public static removeExtraSpaces(text: string): string {
        return text
            .split('\n')
            .map(line => line.replace(/[ \t]{2,}/g, ' ').trimEnd())
            .join('\n');
    }

    /**
     * Aplica todas las correcciones: puntuación y espacios duplicados,
     * manteniendo saltos de línea y estructura de párrafos.
     */
    public static cleanText(text: string): string {
        const spaced = this.fixSpacing(text);
        const cleaned = this.removeExtraSpaces(spaced);
        return cleaned.trim();
    }
}
