"use client";

import { DaisyUI } from "@/style/daisyui";
import { useEffect, useState } from "react";


export default function DaisyThemeSelector() {
    const [selectedTheme, setSelectedTheme]   = useState("");

    const themes = DaisyUI.getAllThemes();

    useEffect(() => {
        //require useEffect
        const currentTheme = DaisyUI.getCurrentTheme();
        setSelectedTheme(currentTheme);
    }, []);
      
    const onThemeSelected = (themeName: string): void => {
        const htmlElement = document.querySelector("html");
        if (htmlElement) {
            htmlElement.setAttribute("data-theme", themeName);
            setSelectedTheme(themeName); 
        }
    };
        
    return (
        <>
            <select className="select select-bordered w-full max-w-xs"
                    value={selectedTheme}
                    onChange={(e) => onThemeSelected(e.target.value)} >    
                <option value="" disabled>choose theme</option>
                {themes.map((theme) => (
                <option key={theme.name} value={theme.name}>
                    {theme.name}
                </option>
                ))}
            </select>
        </>
    );
            
}

/*
"use client";

import { DaisyUI } from "@/common/style/daisyui";
import { useEffect, useState } from "react";

export default function DaisyThemeSelector() {
    const [selectedTheme, setSelectedTheme] = useState("");

    const themes = DaisyUI.getAllThemes();

    useEffect(() => {
        // Obtener el tema actual al cargar el componente
        const currentTheme = DaisyUI.getCurrentTheme();
        setSelectedTheme(currentTheme);
    }, []);

    useEffect(() => {
        // Actualizar el tema en el DOM cuando cambie el estado
        document.documentElement.setAttribute("data-theme", selectedTheme);
    }, [selectedTheme]);

    const onThemeSelected = (themeName: string): void => {
        if (themes.some((theme) => theme.name === themeName)) {
            setSelectedTheme(themeName);
        } else {
            console.warn(`El tema "${themeName}" no es válido.`);
        }
    };

    return (
        <select
            className="select select-bordered w-full max-w-xs"
            value={selectedTheme}
            onChange={(e) => onThemeSelected(e.target.value)}
        >
            <option value="" disabled>
                Choose theme
            </option>
            {themes.map((theme) => (
                <option key={theme.name} value={theme.name}>
                    {theme.name}
                </option>
            ))}
        </select>
    );
}
*/