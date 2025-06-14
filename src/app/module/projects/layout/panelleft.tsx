//src\lib\arquitect\comp\panelleft.tsx


import { XButton } from "@/lib/xuicomp/buttons/xbutton";
import { AppThemifyIcons } from "@/style/appthicons";
import { useState, useEffect } from "react";
import { PanelSections } from "./panelsections";


/**
 * Page Left Panel loadCategory = (category_name: string)
 */
export interface PanelLeftIfc {
    projectname?: string;
    closeproject: () => void;
    loadsection: (section_name: string) => void;
    actsection: string;
    sections: string[];
}
export default function PanelLeft({closeproject,loadsection,sections,actsection,projectname}: PanelLeftIfc) {

    const [projectCharged, setProjectCharged] = useState<boolean>(false);
    const [actProjectName, setActProjectName] = useState<string>("undefined");
    const [showSections, setShowSections] = useState<boolean>(false);

    useEffect(() => {
        if(projectname){
            setProjectCharged(true);
            setActProjectName(projectname);
            setShowSections(true);
        }
    }, [projectname]);
    
    const onSectionSelection = (name: string): void => {
        loadsection(name);
    }

    const executeOperation = (operation_id?: string): void => {

    }

    const onCloseProject = (operation?: string): void => {
    }

    return (
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



            {showSections ?
                <PanelSections collection={sections}
                    defaultvalue={actsection}
                    onselection={onSectionSelection} />            
            :null}

        </div>
    )

}//end
