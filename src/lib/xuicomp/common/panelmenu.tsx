//src\lib\arquitect\comp\panelmenu.tsx

import { CardMenuOption } from "@/lib/xuicards/cardmenuoption";


/**
 * Component Menu cards
 *  author: xefero
 */
export interface PanelMenuIfc {
    collection: string[];
    defaultvalue: string;
    onselection?: (name: string) => void;
}

export const PanelMenu = ({ defaultvalue, collection, onselection }: PanelMenuIfc) => {

    const handleOnSelection = (elem_name: string) => {
        if (onselection) {
            onselection(elem_name);
        }
    }

    return (
        <div>
            <div className="w-full pl-[6px] pr-[6px] mb-[4px]">
                <div className="w-full pt-[4px] pb-[4px] flex justify-center items-center border rounded-sm border-orange-600">
                    Options
                </div>
                
            </div>

            <ul className="menu w-full rounded-box menu-md space-y-3">
                {collection.map((item, index) => (
                    <li className="list-row" key={index}>
                        <CardMenuOption
                            name={item}
                            text={item}
                            onselection={handleOnSelection}
                            iconname="file"
                            iconsize={undefined}
                            iconcolor={undefined} />
                    </li>
                ))}
            </ul>
        </div>
    );
}