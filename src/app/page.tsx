//src\app\module\aiprojects\manproyect\page.tsx
"use client";

import { useEffect, useState } from "react";


import { useRouter } from "next/navigation";
import { useClientReady } from "@/lib/react/hook/useclientready";
import { CardProject } from "@/lib/xuicards/cardproyect";
import { XuiSearch } from "@/lib/xuicomp/common/search";
import { AppStorage } from "@/app_front/appstorage";
import PageHeader from "./layout/pageheader";



//let appProjects: ManagerAplications = new ManagerAplications();

/**
 * Home Page - AI Desktop Tools 
 */
export default function Desktop() {

    const router = useRouter();
    
    const test = async () => {
        //const [projectsnames, setProjectsnames] = useState<string[]>([]);
    }

    useEffect(() => {
    }, []);

    const onTest = (value: string) => {
    }

    const clientReady = useClientReady();
    if (!clientReady) { return <div>Loading...</div>; }


    const renderMainContent = () => {
        /*
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
        */
    }

    return (
        <div id="cont_root" className="w-full h-auto bg-gray-900 " >

            {/* header */}
            <PageHeader defvalue="none" />

            {/* body */}
            <div className="w-full h-auto grid grid-cols-[17%_65%_17%]">

                {/* column left */}
                <div className="w-full min-h-screen flex flex-col px-2">

                </div>

                {/* column center */}
                <div className="w-full h-auto">
                    <div className="main_monitor w-full min-h-screen rounded-lg">
                        {/*renderMainContent()*/}
                    </div>
                </div>

                {/* column right */}
                <div className="w-full min-h-screen flex-col p-2">
                    Right Panel
                </div>

            </div>

        </div>
    );

}//end 