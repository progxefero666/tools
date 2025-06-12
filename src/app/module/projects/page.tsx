//src\app\module\projects\page.tsx
"use client";

import { useEffect, useState } from "react";
import { useClientReady } from "@/lib/react/hook/useclientready";
import PanelLeft from "@/app/module/projects/layout/panelleft";
import PanelMain from "@/app/module/projects/layout/panelmain";
import { AppProjects } from "@/app_front/modules/projects/appprojects";
import { ServiceFrontProjects } from "@/app_front/projects/services/srvprojects";
import { ProjectDef } from "@/app_front/projects/model/projectdef";


/**
 * Module View: IA Projects
 */
let appProjects: AppProjects = new AppProjects();

const dummyElems: string[] = ["uno", "dos", "tres", "cuatro"]
export default function PageProjects() {

    const moduleName: string = "iaprojects";
    const [sectionsnames, setSectionsnames] = useState<string[]>(appProjects.projectsNames);

    const [projectsnames, setProjectsnames] = useState<string[]>(appProjects.projectsNames);

    const loadSections = async () => {
        const srvProjects = new ServiceFrontProjects();
        await srvProjects.init();
        //const projectDefs: ProjectDef[] = srvProjects.projectDefs;  
        const section_names:string[]=srvProjects.getSectionNames()
        setSectionsnames(section_names);
    }

    const loadProjects = async () => {
        await appProjects.init();
        setProjectsnames(appProjects.projectsNames);
    }

    useEffect(() => {
        loadSections()
        loadProjects();
    }, []);

    const loadProject = (project_name: string): void => {
        //appProjects.chargeProject(project_name);
        alert(loadProject);
    }

    const loadCategory = (category_name: string): void => {
        alert("loadCategory");
        //appProjects.chargeCategory(category_name);
    }
    const clientReady = useClientReady();
    if (!clientReady) { return <div>Loading...</div>; }

    return (
        <div id="cont_root" className="w-full h-auto" >
            <div className="w-full min-h-[566px] max-h-[566px] grid grid-cols-[18%_82%]">
                <PanelLeft
                    selection={sectionsnames[0]}
                    home={loadCategory}
                    collection={sectionsnames} />

                <PanelMain module_name={moduleName}
                    collection={projectsnames} />
            </div>
        </div>
    );

}//end

