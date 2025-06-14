//src\app\module\aiprojects\manproyect\page.tsx
"use client";

import { useEffect, useState } from "react";

import { getAllProjectNames } from "@/app/api/projects/services/srvprojects";
import { AppProjects } from "./manprojects/appprojects";
import { useRouter } from "next/navigation";
import { useClientReady } from "@/lib/react/hook/useclientready";
import { CardProject } from "@/lib/xuicards/cardproyect";
import { XuiSearch } from "@/lib/xuicomp/bar/xuisearch";
import { AppStorage } from "@/app_front/context/appstrclient";
import AiManagerProjectsHeader from "./manprojects/pageheader";

/**
 * AI Manager Projects
 */
let appProjects: AppProjects = new AppProjects();

export default function AiManagerProjects() {
    const router = useRouter();
    const [projectsnames, setProjectsnames] = useState<string[]>([]);

    const loadProjects = async () => {
        const listNames = await getAllProjectNames();
        setProjectsnames(listNames);
    }

    useEffect(() => {
        loadProjects();
    }, []);



    const onSelectProject = (projectName: string) => {
        alert("load poject");
        AppStorage.saveProjectName(projectName);
        router.push("/module/aiprojects/manproyect"); 
    }

    const clientReady = useClientReady();
    if (!clientReady) { return <div>Loading...</div>; }


    const renderMainContent = () => {
        return (
            <ul className="menu w-full rounded-box menu-md space-y-2">
                {projectsnames.map((item, index) => (
                    <li className="list-row" key={index}>
                        <CardProject
                            name={item}
                            text={item}
                            onselection={onSelectProject}
                            iconname="file"
                            iconsize={undefined}
                            iconcolor={undefined} />
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div id="cont_root" className="w-full h-auto" >

            {/* header */}
            <AiManagerProjectsHeader defvalue="none"/>

            {/* body */}
            <div className="w-full h-auto bg-gray-900 grid grid-cols-[18%_66%_16%]">

                {/* column left */}
                <div className="w-full min-h-screen flex flex-col px-2">

                </div>

                {/* column center */}

                {/* column right */}
                <div className="w-full h-auto flex-col ">
                    <div className="w-full h-auto rounded-lg grid grid-cols-[80%_20%]">
                        <div className="main_monitor w-full h-auto rounded-lg">
                            {renderMainContent()}
                        </div>
                        <div className="w-full min-h-screen flex-col bg-gray-900 p-2">
                            <h4>Right Panel</h4>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );

}//end 