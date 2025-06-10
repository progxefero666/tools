import { XColor } from "@/lib/common/graphics/color/xcolor";


/**
 * ColorUtil.toCVColor()
 */
export class ColorHelper {

    public static getAleatoryValue255():number {
        return Math.floor(Math.random() * 256);
    }

    public static toSharpColor(color: XColor){
        
        return { r:color.r, g: color.g, b: color.b, alpha:color.alpha };
    }

    public static toCVColor(rgbaColor:XColor): string {

        return `rgba(${rgbaColor.r}, ${rgbaColor.g}, ${rgbaColor.b}, ${rgbaColor.alpha})`;
    }

    public static getAleatoryColor():string {
        const red = ColorHelper.getAleatoryValue255().toString();
        const green = ColorHelper.getAleatoryValue255().toString();
        const blue = ColorHelper.getAleatoryValue255().toString();
        return `rgb(${red}, ${green}, ${blue})`;
    }

    public static getAleatoryColorRGBA(alpha: number): string {
        const red = ColorHelper.getAleatoryValue255();
        const green = ColorHelper.getAleatoryValue255();
        const blue = ColorHelper.getAleatoryValue255();
        return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    }

    public static getSharpColor(colorStr: string) {
        const parts = colorStr.slice(5, -1).split(',').map(Number);
        return {
            r: parts[0],
            g: parts[1],
            b: parts[2],
            alpha: parts[3]
        };
    }
    public static toCanvasColor(rgbStr: string): string {
        const match = rgbStr.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i);
        if (!match) throw new Error(`Formato RGB inválido: ${rgbStr}`);
        const r = parseInt(match[1], 10);
        const g = parseInt(match[2], 10);
        const b = parseInt(match[3], 10);        
        return `rgba(${r}, ${g}, ${b},1)`;
    }

    //ColorRGBA
    public static getHtmlElemRgbaColor(rgbStr: string): XColor {
        const match = rgbStr.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i);
        if (!match) throw new Error(`Formato RGB inválido: ${rgbStr}`);
        const r = parseInt(match[1], 10);
        const g = parseInt(match[2], 10);
        const b = parseInt(match[3], 10);
        return new XColor(r, g, b,1);
    }

    public static parseRGB(rgbStr: string): { r: number; g: number; b: number } {
        const match = rgbStr.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i);
        if (!match) throw new Error(`Formato RGB inválido: ${rgbStr}`);
        return {
            r: parseInt(match[1], 10),
            g: parseInt(match[2], 10),
            b: parseInt(match[3], 10)
        };
    }

    /**
     * Convierte un color en formato hexadecimal o RGB a Oklch.
     * @param color - Color en formato hexadecimal (#RRGGBB) o array [r, g, b].
     * @returns Una cadena con el formato "oklch(L% C H)".
     */
    public static hexOrRgbToOklch(color: string | [number, number, number]): string {
        // Paso 1: Convertir el color a RGB si es hexadecimal
        let r, g, b;

        if (typeof color === "string") {
            // Extraer los valores R, G, B del hexadecimal
            const hex = color.replace("#", "");
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
        } else {
            // Si ya es un array RGB, asignar directamente
            [r, g, b] = color;
        }

        // Paso 2: Normalizar los valores RGB al rango [0, 1]
        const normR = r / 255;
        const normG = g / 255;
        const normB = b / 255;

        // Paso 3: Convertir RGB a XYZ (espacio de color CIE XYZ)
        const rgbToXyz = (c: number) => {
            if (c <= 0.04045) return c / 12.92;
            return Math.pow((c + 0.055) / 1.055, 2.4);
        };

        const x =
            0.4124564 * rgbToXyz(normR) +
            0.3575761 * rgbToXyz(normG) +
            0.1804375 * rgbToXyz(normB);
        const y =
            0.2126729 * rgbToXyz(normR) +
            0.7151522 * rgbToXyz(normG) +
            0.072175 * rgbToXyz(normB);
        const z =
            0.0193339 * rgbToXyz(normR) +
            0.119192 * rgbToXyz(normG) +
            0.9503041 * rgbToXyz(normB);

        // Paso 4: Convertir XYZ a Oklab
        const xyzToOklab = (x: number, y: number, z: number) => {
            const l =
                0.4122214708 * x + 0.5363325363 * y + 0.0514459929 * z;
            const m =
                0.2119034982 * x + 0.6806995451 * y + 0.1073969566 * z;
            const s =
                0.0883024619 * x + 0.2817188376 * y + 0.6299787005 * z;

            const f = (t: number) => {
                if (t > Math.pow(6 / 29, 3)) return Math.cbrt(t);
                return t / (3 * Math.pow(6 / 29, 2)) + 4 / 29;
            };

            const L =
                0.2104542553 * f(l) + 0.793617785 * f(m) - 0.0040720468 * f(s);
            const A =
                1.9779984951 * f(l) - 2.428592205 * f(m) + 0.4505937099 * f(s);
            const B =
                0.0259040371 * f(l) + 0.7827717662 * f(m) - 0.808675766 * f(s);

            return { L, A, B };
        };

        const { L, A, B } = xyzToOklab(x, y, z);

        // Paso 5: Convertir Oklab a Oklch
        const chroma = Math.sqrt(A * A + B * B);
        const hue = Math.atan2(B, A) * (180 / Math.PI); // Convertir radianes a grados

        // Asegurarse de que el matiz esté en el rango [0, 360]
        const finalHue = hue < 0 ? hue + 360 : hue;

        // Paso 6: Devolver el resultado en formato "oklch(L% C H)"
        return `oklch(${(L * 100).toFixed(2)}% ${chroma.toFixed(2)} ${finalHue.toFixed(2)})`;
    }
}