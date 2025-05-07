import { JSX } from "react";

// Definición de la interfaz DaisyColor
export interface DaisyColor {
    name: string;       // Nombre del color
    cssclass: string;   // Clase CSS asociada
    desc: string;       // Descripción del color
}

export interface DaisyTheme {
    name: string;  // Nombre del tema
    style: string; // Estilo asociado (por ahora, "default")
}

// Clase principal DaisyUI
// DaisyUI.getCurrentTheme():
export class DaisyUI {

    // Lista estática de temas de DaisyUI
    private static readonly THEMES: DaisyTheme[] = [
        { name: "abyss", style: "default" },
        { name: "acid", style: "default" },
        { name: "aqua", style: "default" },
        { name: "autumn", style: "default" },
        { name: "black", style: "default" },
        { name: "bumblebee", style: "default" },
        { name: "business", style: "default" },
        { name: "caramellatte", style: "default" },
        { name: "coffee", style: "default" },
        { name: "corporate", style: "default" },
        { name: "cmyk", style: "default" },
        { name: "cupcake", style: "default" },
        { name: "cyberpunk", style: "default" },
        { name: "dark", style: "default" },
        { name: "dim", style: "default" },
        { name: "dracula", style: "default" },
        { name: "emerald", style: "default" },
        { name: "fantasy", style: "default" },
        { name: "forest", style: "default" },
        { name: "garden", style: "default" },
        { name: "halloween", style: "default" },
        { name: "lemonade", style: "default" },
        { name: "light", style: "default" },
        { name: "lofi", style: "default" },
        { name: "luxury", style: "default" },
        { name: "night", style: "default" },
        { name: "nord", style: "default" },
        { name: "pastel", style: "default" },
        { name: "retro", style: "default" },
        { name: "silk", style: "default" },
        { name: "sunset", style: "default" },
        { name: "synthwave", style: "default" },
        { name: "valentine", style: "default" },
        { name: "winter", style: "default" }
    ];
    // Método estático para obtener el tema actual de DaisyUI
    public static getCurrentTheme(): string {
        const htmlElement: HTMLElement | null = document.querySelector("html");
        if (!htmlElement) {
            return "default-theme"; 
        }
        // get value data-theme
        const currentTheme: string | null = htmlElement.getAttribute("data-theme");
        return currentTheme || "default-theme"; 
    }

   // Método para obtener todos los temas
   public static getAllThemes(): DaisyTheme[] {
    return this.THEMES;
    }    
        
    // Lista estática de colores de DaisyUI
    private static readonly COLORS: DaisyColor[] = [
        { name: "primary", cssclass: "--color-primary", desc: "Primary brand color, The main color of your brand" },
        { name: "primary-content", cssclass: "--color-primary-content", desc: "Foreground content color to use on primary color" },
        { name: "secondary", cssclass: "--color-secondary", desc: "Secondary brand color, The optional, secondary color of your brand" },
        { name: "secondary-content", cssclass: "--color-secondary-content", desc: "Foreground content color to use on secondary color" },
        { name: "accent", cssclass: "--color-accent", desc: "Accent brand color, The optional, accent color of your brand" },
        { name: "accent-content", cssclass: "--color-accent-content", desc: "Foreground content color to use on accent color" },
        { name: "neutral", cssclass: "--color-neutral", desc: "Neutral dark color, For not-saturated parts of UI" },
        { name: "neutral-content", cssclass: "--color-neutral-content", desc: "Foreground content color to use on neutral color" },
        { name: "base-100", cssclass: "--color-base-100", desc: "Base surface color of page, used for blank backgrounds" },
        { name: "base-200", cssclass: "--color-base-200", desc: "Base color, darker shade, to create elevations" },
        { name: "base-300", cssclass: "--color-base-300", desc: "Base color, even more darker shade, to create elevations" },
        { name: "base-content", cssclass: "--color-base-content", desc: "Foreground content color to use on base color" },
        { name: "info", cssclass: "--color-info", desc: "Info color, For informative/helpful messages" },
        { name: "info-content", cssclass: "--color-info-content", desc: "Foreground content color to use on info color" },
        { name: "success", cssclass: "--color-success", desc: "Success color, For success/safe messages" },
        { name: "success-content", cssclass: "--color-success-content", desc: "Foreground content color to use on success color" },
        { name: "warning", cssclass: "--color-warning", desc: "Warning color, For warning/caution messages" },
        { name: "warning-content", cssclass: "--color-warning-content", desc: "Foreground content color to use on warning color" },
        { name: "error", cssclass: "--color-error", desc: "Error color, For error/danger/destructive messages" },
        { name: "error-content", cssclass: "--color-error-content", desc: "Foreground content color to use on error color" }
    ];


    
    // Método para obtener todos los colores
    public static getAllColors(): DaisyColor[] {
        return this.COLORS;
    }

    // Método para buscar un color por su nombre
    public static getColorByName(name: string): DaisyColor | undefined {
        return this.COLORS.find(color => color.name === name);
    }


}//end



