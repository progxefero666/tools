"use client";

import React, { JSX, useEffect, useState } from "react";

import {DaisyUiReportColors,DaisyUiReportHtmltext} from "../../comp/daisyuireport";
import DaisyThemeSelector from "@/components/style/themeselector";

// Función para renderizar la barra de comandos
const renderCommandBar: (selectedReport: string,
                         setSelectedReport: React.Dispatch<React.SetStateAction<string>>)
                             => JSX.Element = (selectedReport, setSelectedReport) => {

  const reports=["daisy-colors","daisy-htmltext"];

  return (
    <div className="flex items-center  justify-center mb-6">
    
      <DaisyThemeSelector />

      <select  className="select w-full"
            value={selectedReport} 
            onChange={(e) => setSelectedReport(e.target.value)}  >
        
          <option value="" disabled>
            Select Report
          </option>

          {/* Generar opciones dinámicamente */}
          {reports.map((report) => (
            <option key={report} value={report}>
              {report}
            </option>
          ))}
      </select>

    </div>
  );

}

export default function StyleReports() {
  
  const [selectedReport, setSelectedReport] = React.useState("daisy-colors");

  useEffect(() => {
  }, []);

  return (
    
    <div id="cont_root" className="w-[860px]">

      {renderCommandBar(selectedReport, setSelectedReport)}

      <div className="grid grid-cols-1 ">
        {selectedReport === "daisy-colors" && <DaisyUiReportColors />}
        {selectedReport === "daisy-htmltext" && <DaisyUiReportHtmltext />}
      </div>      
      
    </div>
  );

}//end comp