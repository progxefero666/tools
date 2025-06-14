//src\app\module\aiprojects\manproyect\page.tsx
"use client";

import { useEffect, useState } from "react";

import { getAllProjectNames } from "@/app/api/projects/services/srvprojects";
import { AppProjects } from "./manprojects/appprojects";
import { useRouter } from "next/navigation";
import { useClientReady } from "@/lib/react/hook/useclientready";
import { CardProject } from "@/lib/xuicards/cardproyect";
import { XuiSearch } from "@/lib/xuicomp/bar/xuisearch";

/**
 * AI Manager Projects
 */
let appProjects: AppProjects = new AppProjects();

export default function AiManagerProjects() {
    const router = useRouter();
    const [projectsnames, setProjectsnames] = useState<string[]>(appProjects.projectsNames);

    const loadProjects = async () => {
        const listNames = await getAllProjectNames();
        setProjectsnames(listNames);
    }

    useEffect(() => {
        loadProjects();
    }, []);


    const filterMaxLen: number = 50;
    const onFilterChange = (filter_name: string, filter_value: string): void => { }

    const onSelectProject = (project_name: string) => {
        //router.push("/module/projects"); 
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
            <div className="w-full h-auto bg-gray-900 grid grid-cols-[18%_82%]">

                {/* panel left */}
                <div className="w-full min-h-screen flex flex-col px-2">

                </div>

                {/* panel right */}
                <div className="w-full h-auto flex-col ">
                    <div className="w-full h-auto flex flex-row bg-gray-900 space-x-1 pt-3 pb-2">

                        <div className="w-auto h-auto">
                            <XuiSearch name="seach"
                                onchange={onFilterChange}
                                placeholder="find"
                                maxlen={filterMaxLen} />
                        </div>

                    </div>

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