//src\lib\arquitect\comp\panelmain.tsx

import { useEffect } from "react";

import { CardProject } from "@/lib/xuicards/cardproyect";
import PanelProjectsAux from "./panelprojectsaux";
import { XuiSearch } from "@/lib/xuicomp/bar/xuisearch";


/**
 * Page Main Panel
 */
export interface PanelProjectsIfc {
    loadProject: (project_name: string) => void;
    collection: string[];
}
export default function PanelProjects({ loadProject, collection }: PanelProjectsIfc) {
    useEffect(() => { }, []);

    const onSelectProject = (project_name: string) => {
        loadProject(project_name);
    }

    const maxLen: number = 50;
    const onFilterChange = (filter_name: string, filter_value: string): void => {

    }

    const renderMainContent = () => {
        return (
            <ul className="menu w-full rounded-box menu-md space-y-2">
                {collection.map((item, index) => (
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
        <div className="w-full h-auto flex-col ">
            <div className="w-full h-auto flex flex-row bg-gray-900 space-x-1 pt-3 pb-2">

                <div className="w-auto h-auto">
                    <XuiSearch name="seach"
                        onchange={onFilterChange}
                        placeholder="find"
                        maxlen={maxLen} />
                </div>

            </div>

            <div className="w-full h-auto rounded-lg grid grid-cols-[80%_20%]">
                <div className="main_monitor w-full h-auto rounded-lg">
                    {renderMainContent()}
                </div>
                <PanelProjectsAux />
            </div>
        </div>
    )

}//end

