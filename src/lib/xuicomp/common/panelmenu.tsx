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
            <div className="w-full flex justify-center rounded-box items-center">
                <h3>Options</h3>
            </div>

            <ul className="menu w-full rounded-box menu-md space-y-2">
                {collection.map((item, index) => (
                    <li className="list-row list-item" key={index}>
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