import React from "react";
import { JSX } from "react/jsx-runtime";

// Definición de la interfaz TailwindFont
export interface TailwindFont {
    name: string;
    fontSizeVar: string; 
    fontSize: string;
    lineHeightVar: string;
    lineHeight: string;
}

// Clase principal TailwindFonts
export class TailwindUI {

    // Lista estática de fuentes de TailwindCSS
    private static readonly FONTS: TailwindFont[] = [
        {
            name: "text-xs",
            fontSizeVar: "var(--text-xs)",
            fontSize: "0.75rem (12px)",
            lineHeightVar: "var(--text-xs--line-height)",
            lineHeight: "calc(1 / 0.75)"
        },
        {
            name: "text-sm",
            fontSizeVar: "var(--text-sm)",
            fontSize: "0.875rem (14px)",
            lineHeightVar: "var(--text-sm--line-height)",
            lineHeight: "calc(1.25 / 0.875)"
        },
        {
            name: "text-base",
            fontSizeVar: "var(--text-base)",
            fontSize: "1rem (16px)",
            lineHeightVar: "var(--text-base--line-height)",
            lineHeight: "calc(1.5 / 1)"
        },
        {
            name: "text-lg",
            fontSizeVar: "var(--text-lg)",
            fontSize: "1.125rem (18px)",
            lineHeightVar: "var(--text-lg--line-height)",
            lineHeight: "calc(1.75 / 1.125)"
        },
        {
            name: "text-xl",
            fontSizeVar: "var(--text-xl)",
            fontSize: "1.25rem (20px)",
            lineHeightVar: "var(--text-xl--line-height)",
            lineHeight: "calc(1.75 / 1.25)"
        },
        {
            name: "text-2xl",
            fontSizeVar: "var(--text-2xl)",
            fontSize: "1.5rem (24px)",
            lineHeightVar: "var(--text-2xl--line-height)",
            lineHeight: "calc(2 / 1.5)"
        },
        {
            name: "text-3xl",
            fontSizeVar: "var(--text-3xl)",
            fontSize: "1.875rem (30px)",
            lineHeightVar: "var(--text-3xl--line-height)",
            lineHeight: "calc(2.25 / 1.875)"
        },
        /*
        {
            name: "text-4xl",
            fontSizeVar: "var(--text-4xl)",
            fontSize: "2.25rem (36px)",
            lineHeightVar: "var(--text-4xl--line-height)",
            lineHeight: "calc(2.5 / 2.25)"
        },
        {
            name: "text-5xl",
            fontSizeVar: "var(--text-5xl)",
            fontSize: "3rem (48px)",
            lineHeightVar: "var(--text-5xl--line-height)",
            lineHeight: "1"
        },
        {
            name: "text-6xl",
            fontSizeVar: "var(--text-6xl)",
            fontSize: "3.75rem (60px)",
            lineHeightVar: "var(--text-6xl--line-height)",
            lineHeight: "1"
        },
        {
            name: "text-7xl",
            fontSizeVar: "var(--text-7xl)",
            fontSize: "4.5rem (72px)",
            lineHeightVar: "var(--text-7xl--line-height)",
            lineHeight: "1"
        },
        {
            name: "text-8xl",
            fontSizeVar: "var(--text-8xl)",
            fontSize: "6rem (96px)",
            lineHeightVar: "var(--text-8xl--line-height)",
            lineHeight: "1"
        },
        {
            name: "text-9xl",
            fontSizeVar: "var(--text-9xl)",
            fontSize: "8rem (128px)",
            lineHeightVar: "var(--text-9xl--line-height)",
            lineHeight: "1"
        }
        */
    ];

    // Método para obtener todas las fuentes
    public static getAllFonts(): TailwindFont[] {
        return this.FONTS;
    }

    // Método para buscar una fuente por su nombre
    public static getFontByName(name: string): TailwindFont | undefined {
        return this.FONTS.find(font => font.name === name);
    }

}//end class


