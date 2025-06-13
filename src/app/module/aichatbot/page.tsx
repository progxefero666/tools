//src\app\module\chatbot\page.tsx
"use client";

import { useEffect, useState } from "react";
import { useClientReady } from "@/lib/react/hook/useclientready";
import { useRouter } from "next/navigation";

import { ProjectDef } from "@/app_front/projects/model/projectdef";
import PanelLeft from "./layout/panelleft";
import PanelMain from "./layout/panelmain";


/**
 * AIChatBot
 */
const options:string[] = ["option 1","option 2","option 3"]

export default function AIChatBot() {

    const moduleName:string = "aichatbot";
    const router = useRouter();  

    useEffect(() => {

    }, []);

    const executeOption = (option_name: string): void => { 
    }

    const clientReady = useClientReady();
    if (!clientReady) { return <div>Loading...</div>; }

    return (
        <div id="cont_root" className="w-full h-auto" >

            <div className="w-full h-auto bg-gray-900 grid grid-cols-[18%_82%]">
                
                <PanelLeft
                    selection={options[0]}
                    home={executeOption}
                    collection={options} />                

                <PanelMain module_name={moduleName}
                           collection={[]}/>
            </div>

        </div>
    );

}//end

function testDb2() {
    throw new Error("Function not implemented.");
}

