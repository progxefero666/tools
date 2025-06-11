//src\app\dahboard\page.tsx
"use client";

import { useEffect, useState } from "react";
import { AppDesktop } from "./desktop/app/appdesktop";
import { useClientReady } from "@/lib/react/hook/useclientready";
import { ServiceFrontProjects } from "@/app_front/projects/services/srvprojects";
import { ProjectDef } from "@/app_front/projects/model/projectdef";

import PageLeftPanel from "@/lib/arquitect/comp/leftpanel";
import MainPanel from "@/lib/arquitect/comp/mainpanel";

import "@/css/allwidths.css";

/**
 * App Desktop
 */
const app_desktop:AppDesktop 
    = new AppDesktop("portal_project","title","iaxeferoicon.png","description");

export default function Desktop() {

    const [modules,setModules] = useState<string[]>(app_desktop.getFields());
    
    const testDb = async () => {
        const srvProjects = new ServiceFrontProjects();
        await srvProjects.init(); // Esperar carga de datos
        const projectDefs: ProjectDef[] = srvProjects.projectDefs;
        console.log(projectDefs); // Ahora tiene datos
        alert("return");
    }

    const testDb2 = async () => {
        const srvProjects = new ServiceFrontProjects();
        await srvProjects.init(); // Esperar carga de datos
        const projectDefs: ProjectDef[] = srvProjects.projectDefs;
        console.log(projectDefs); // Ahora tiene datos
        alert("return");
    }    
    useEffect(() => {
        //getProject(name: string): Promise<Project|string> 
        testDb2();
    },[]);
        
    const home = (): void => {
        //bg-white
    }
    
    return (
        <div id="cont_root" className="w-full h-auto" >
            
            <div className="w-full min-h-[566px] max-h-[566px] grid grid-cols-[18%_82%]">
                <PageLeftPanel 
                    selection={modules[0]}
                    home={home}
                    collection={modules}/>
                <MainPanel />
            </div>

        </div>
    );

}//end
