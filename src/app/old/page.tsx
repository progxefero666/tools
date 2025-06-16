//src\app\module\projects\page.tsx
"use client";

import { useEffect, useState } from "react";
import { useClientReady } from "@/lib/react/hook/useclientready";
import { ServiceFrontProjects } from "@/app_front/projects/services/srvprojects";
import { ProjectDef } from "@/app_front/projects/model/projectdef";

import PanelLeft from "@/app/old/layout/panelleft";
import PanelProjects from "@/app/old/layout/projects/panelprojects";
import { AppProjects } from "@/app_front/modules/projects/appprojects";
import PanelProject from "./layout/project/panelproject";


/**
 * Module View: IA Projects
 */
let appProjects: AppProjects = new AppProjects();


export default function PageProjects() {

    useEffect(() => {
        loadSections()
        loadProjects();
    }, []);

    //projects
    const [projectsnames, setProjectsnames] = useState<string[]>(appProjects.projectsNames);


    const loadProjects = async () => {
        await appProjects.init();
        setProjectsnames(appProjects.projectsNames);
    }

    const [actProjectCharged, setActProjectCharged] = useState<boolean>(false);
    const [actProjectName, setActProjectName] = useState<string>("undefined");    
    const loadProject = (project_name: string): void => {
        appProjects.chargeProject(project_name);
        setActProjectCharged(true);
        setActProjectName(project_name);
        //projectdesc
    }

    //project
    const closeProject = (): void => {
        alert("close project");
    }    
    const [sectionsnames, setSectionsnames] = useState<string[]>(appProjects.projectsNames);
    const loadSections = async () => {
        const srvProjects = new ServiceFrontProjects();
        await srvProjects.init();
        //const projectDefs: ProjectDef[] = srvProjects.projectDefs;  
        const section_names: string[] = srvProjects.getSectionNames()
        setSectionsnames(section_names);
    }

    const loadSection = (section_name: string): void => {       
        appProjects.chargeSection(section_name);
        //appProjects.actSectionData
    }

    const clientReady = useClientReady();
    if (!clientReady) { return <div>Loading...</div>; }

    return (
        <div id="cont_root" className="w-full h-auto" >
            <div className="w-full h-auto bg-gray-900 grid grid-cols-[18%_82%]">

                {actProjectCharged ?
                    <>
                        <PanelLeft projectname={actProjectName}
                            closeproject={closeProject}
                            actsection={sectionsnames[0]}
                            loadsection={loadSection}
                            sections={sectionsnames} />

                        <PanelProject project_name={actProjectName} />
                    </>
                    :
                    <>
                        <PanelLeft closeproject={closeProject}
                            actsection={sectionsnames[0]}
                            loadsection={loadSection}
                            sections={sectionsnames} />
                        <PanelProjects loadProject={loadProject}
                            collection={projectsnames} />
                    </>
                }
            </div>
        </div>
    );

}//end

