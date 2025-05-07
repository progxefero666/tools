import React from "react";
import { TailwindUI } from "@/style/tailwind"; // Asegúrate de que la ruta sea correcta

export default function TailwindReport() {
    // Obtener las fuentes usando la función getAllFonts()
    const fonts = TailwindUI.getAllFonts();

    // Función para generar las filas del reporte
    const renderRows = () => {
        const rows = [];

        for (let i = 0; i < fonts.length; i++) {
            const font = fonts[i];

            // Asignar cada celda de la fila al array usando índices
            rows[i * 5] = (
                <div key={i * 5} className="flex justify-center" style={{ fontSize: font.fontSizeVar , lineHeight: font.lineHeightVar  }}>
                    {font.name || "N/A"}
                </div>
            );
            rows[i * 5 + 1] = (
                <div key={i * 5+1} className="flex justify-center" style={{ fontSize: font.fontSizeVar, lineHeight: font.lineHeightVar }}>
                    {font.fontSizeVar || "N/A"}
                </div>
            );
            rows[i * 5 + 2] = (
                <div key={i * 5+2}  className="flex justify-center" style={{ fontSize: font.fontSizeVar , lineHeight: font.lineHeightVar  }}>
                    {font.fontSize || "N/A"}
                </div>
            );
            rows[i * 5 + 3] = (
                <div  key={i * 5+3} className="flex justify-center" style={{ fontSize: font.fontSizeVar, lineHeight: font.lineHeightVar}}>
                    {font.lineHeightVar || "N/A"}
                </div>
            );
            rows[i * 5 + 4] = (
                <div  key={i * 5+4}  className="flex justify-center" style={{ fontSize: font.fontSizeVar , lineHeight: font.lineHeightVar  }}>
                    {font.lineHeight || "N/A"}
                </div>
            );
        }

        return rows;
    };

    return (
        <div>
            {/* Encabezado */}
            <div className="grid grid-cols-5 gap-4 text-center font-semibold border-b-2 pb-2 mb-4">
                <div>Nombre</div>
                <div>Font Size Var</div>
                <div>Font Size</div>
                <div>Line Height Var</div>
                <div>Line Height</div>
            </div>

            {/* Contenido */}
            <div className="grid grid-cols-5 gap-4 text-sm">
                {renderRows()}
            </div>
        </div>
    );
}