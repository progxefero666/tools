//src\lib\arquitect\comp\panelmenu.tsx

import { CardMenuOption } from "@/lib/xuicards/cardmenuoption";
import { XuiSearch } from "@/lib/xuicomp/bar/xuisearch";



/**
 * Component Menu cards
 *  author: xefero
 */
export interface PanelMenuIfc {
    collection: string[];
    defaultvalue: string;
    onselection?: (name: string) => void;
}

export const PanelSections = ({ defaultvalue, collection, onselection }: PanelMenuIfc) => {

    const handleOnSelection = (elem_name: string) => {
        if (onselection) {
            onselection(elem_name);
        }
    }

    const onFilterChange = (name:string,value:string) => {
        console.log(value)
    }

    return (
        <div>

            <div className="w-full px-[6px] mb-[4px] flex justify-center items-center  ">
                <div className="w-full pt-[4px] pb-[4px] border rounded-md border-orange-950">
                    <XuiSearch onchange={onFilterChange}
                        placeholder="find"
                        name="manolo"
                        maxlen={70}  />
                </div>                
            </div>

            {collection.map((item, index) => (
                <div className="w-full" key={index}>
                    <CardMenuOption
                        name={item}
                        text={item}
                        onselection={handleOnSelection}
                        iconname="file"
                        iconsize={undefined}
                        iconcolor={undefined} />
                </div>
            ))}
        
        </div>
    );
}