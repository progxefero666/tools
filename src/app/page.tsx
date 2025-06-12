//src\app\dahboard\page.tsx
"use client";

import { useEffect, useState } from "react";
import { AppDesktop } from "../app_front/appdesktop";
import { useClientReady } from "@/lib/react/hook/useclientready";

import { ProjectDef } from "@/app_front/projects/model/projectdef";

import PanelLeft from "@/app/desktop/layout/panelleft";
import PanelMain from "@/app/desktop/layout/panelmain";
import { useRouter } from "next/navigation";



/**
 * App Desktop
 */
const app_desktop: AppDesktop = new AppDesktop("iaxeferoicon.png","AI Desktop");

export default function Desktop() {
    const moduleName:string = "home";
    const router = useRouter();  
    const [modules, setModules] = useState<string[]>(app_desktop.modules_names);


    useEffect(() => {

    }, []);

    const loadModule = (module_name: string): void => {  
        router.push('/module/projects');     
        if(module_name=="iaprojects"){
             router.push('/module/projects');
        }
    }
    
    const clientReady = useClientReady();
    if (!clientReady) { return <div>Loading...</div>; }

    return (
        <div id="cont_root" className="w-full h-auto" >

            <div className="w-full h-auto bg-gray-900 grid grid-cols-[18%_82%]">
                <PanelLeft
                    selection={modules[0]}
                    home={loadModule}
                    collection={modules} />
                <PanelMain module_name={moduleName}
                           collection={[]}/>
            </div>

        </div>
    );

}//end

function testDb2() {
    throw new Error("Function not implemented.");
}

