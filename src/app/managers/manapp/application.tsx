//src\app\module\aiprojects\manproyect\page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useClientReady } from "@/lib/react/hook/useclientready";
import { XuiSearch } from "@/lib/xuicomp/common/search";
import { AppStorage } from "@/app_front/context/appstrclient";
import { ServiceFrontProjects } from "@/app_front/projects/services/srvprojects";

import { AppThemifyIcons } from "@/style/appthicons";
import PanelAux from "./panelaux";
import { XButton } from "@/lib/xuicomp/common/button";

/**
 * Page AiProjectMonitor
 */
export default function AiProjectMonitor() {
    const router = useRouter();

    const [projectName, setProjectName] = useState<string>("undefined");
    const [listSections, setListSection] = useState<string[]>([]);
    const [showSections, setShowSections] = useState<boolean>(false);
    const [sections, setSection] = useState<string>("undefined");

    const initProject = async () => {
        const srvProjects = new ServiceFrontProjects();
        await srvProjects.init();
        const section_names: string[] = srvProjects.getSectionNames()
        setListSection(section_names);
    }

    useEffect(() => {
        const projectName: string = AppStorage.readProjectName();
        setProjectName(projectName);
        initProject();
    }, []);

    const loadSection = (sectionName: string): void => {
        setSection(sectionName);
    }

    const executeOperation = (operation_id?: string): void => {

    }

    const onCloseProject = (): void => {
        alert("close project");
        router.push("/module/aiprojects");
    }

    const clientReady = useClientReady();
    if (!clientReady) { return <div>Loading...</div>; }

    const renderMainContent = () => {
        return (
            <div className="w-full h-auto flex flex-col pt-1 pl-2 pr-2">
                <p>Section Charged</p>
            </div>

        );
    }

    return (
        <div id="cont_root" className="w-full h-auto" >
            <div className="w-full h-auto bg-gray-900 grid grid-cols-[18%_82%]">

                <div className="w-full min-h-screen flex flex-col px-2">

                    <div className="w-full h-[50px] flex flex-row items-center px-2 pt-2 mb-2">
                        <div className="flex-1 text-white text-2xl">
                            IA Portal
                        </div>
                        <div>
                            <XButton
                                callback={executeOperation}
                                operation={"nav_back"}
                                iconname={AppThemifyIcons.TI_BACK}
                                iconcolor="white" />
                        </div>
                    </div>

                    <div className="w-full px-[6px] mb-[6px] flex justify-center items-center ">
                        <div className="w-full pt-[4px] pb-[4px] border rounded-md border-orange-950 ">
                            <div className="w-full relative">
                                <div className="w-full h-auto  flex items-center  pt-1 pl-2 pr-12">
                                    <div className="flex-1">
                                        <p>Project</p>
                                    </div>
                                    <div className="absolute right-2">
                                        <XButton
                                            btndisabled={false}
                                            callback={onCloseProject}
                                            operation={"filteron"}
                                            iconname={AppThemifyIcons.TI_CLOSE} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="w-full h-auto flex flex-col">
                    <div className="w-full h-[50px] flex flex-row bg-gray-900 space-x-1 pt-3 pb-2">
                        <p>Project header</p>
                    </div>

                    <div className="w-full h-auto rounded-lg grid grid-cols-[80%_20%]">
                        <div className="main_monitor w-full h-auto rounded-lg ">
                            {renderMainContent()}
                        </div>
                        <PanelAux />
                    </div>
                </div>

            </div>
        </div>
    )

}//end page