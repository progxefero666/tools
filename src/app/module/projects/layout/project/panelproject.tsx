//src\app\module\projects\layout\project\panelproject.tsx


import { useEffect } from "react";

import { CardProject } from "@/lib/xuicards/cardproyect";

import { XuiSearch } from "@/lib/xuicomp/bar/xuisearch";
import PanelProjectAux from "./panelprojectaux";


/**
 * Page Main Panel
 */
export interface PanelProjectIfc {
    project_name: string;
}
export default function PanelProject({ project_name }: PanelProjectIfc) {
    
    const renderMainContent = () => {
        return (
            <div className="w-full h-auto flex flex-col pt-1 pl-2 pr-2">
                <p>Section Charged</p>
            </div>
            
        );
    }

    return (
        <div className="w-full h-auto flex flex-col">
            <div className="w-full h-[50px] flex flex-row bg-gray-900 space-x-1 pt-3 pb-2">
                <p>Project header</p>
            </div>

            <div className="w-full h-auto rounded-lg grid grid-cols-[80%_20%]">
                <div className="main_monitor w-full h-auto rounded-lg ">
                    {renderMainContent()}
                </div>
                <PanelProjectAux />
            </div>
        </div>
    )

}//end
