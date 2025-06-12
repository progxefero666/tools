//src\lib\arquitect\comp\panelmain.tsx

import { useEffect } from "react";
import PanelHeader from "./panelheader";
import PanelRight from "./panelrigth";
import { CardProject } from "@/lib/xuicards/cardproject";


/**
 * Page Main Panel
 */
export interface PanelMainIfc {
    module_name: string;
    collection: string[];
}
export default function PanelMain({ module_name, collection }: PanelMainIfc) {
    useEffect(() => { }, []);


    const onFilterChange = (name: string, value: string) => {
        alert("onFilterChange");
        alert(value);
    }

    const onSelectElement = (name: string, value: string) => {
        alert("onSelectElement");
        alert(value);
    }
   
    const renderMainContent = () => {
        return (
           <ul className="menu w-full rounded-box menu-md space-y-2">
               {collection.map((item, index) => (
                   <li className="list-row list-item" key={index}>
                       <CardProject
                           name={item}
                           text={item}
                           onselection={onSelectElement}
                           iconname="file"
                           iconsize={undefined}
                           iconcolor={undefined}/>
                   </li>
               ))}
           </ul>
        );
    }

    return (
        <div className="w-full h-auto flex-col ">
            <PanelHeader collection={collection}
                defvalue={collection[0]}
                module_name="dsd"
                onfilterchange={onFilterChange}
                onselectelement={onSelectElement} />

            <div className="w-full h-auto grid grid-cols-[80%_20%]">
                {renderMainContent()}
                <PanelRight />
            </div>
        </div>
    )

}//end