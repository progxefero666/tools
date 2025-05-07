"use client";

import React, { JSX, useEffect } from "react";
import TailwindReport from "../../comp/tailwindreport";

// Función para renderizar la barra de comandos
const renderCommandBar: (selectedReport: string,
                         setSelectedReport: React.Dispatch<React.SetStateAction<string>>)
                             => JSX.Element = (selectedReport, setSelectedReport) => {
  return (
    <div className="flex justify-center mb-6">
      <select className="select select-bordered w-full max-w-xs"
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)} >
        <option value="tailwind-fonts">Fuentes de Tailwind</option>
      </select>
    </div>
  );

}

export default function StyleReports() {
  
  const [selectedReport, setSelectedReport] = React.useState("tailwind-fonts");
  useEffect(() => {
    //const currentTheme = DaisyUI.getCurrentTheme();
    //setSelectedTheme(currentTheme);
    alert("useEffect");
  }, []);
  return (
    <div id="cont_root" className="w-[860px]">
      {/* Título */}
      <h1 className="text-2xl font-bold text-center mb-6">Informes de Estilo</h1>

      {/* bar comandss */}
      {renderCommandBar(selectedReport, setSelectedReport)}

      {/* Contenido del informe seleccionado */}
      <div className="grid grid-cols-1 gap-4">
        {selectedReport === "tailwind-fonts" && <TailwindReport />}
      </div>
    </div>
  );

}//end comp