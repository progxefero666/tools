//src\lib\arquitect\comp\header.tsx

import { XuiSearch } from "@/lib/xuicomp/common/search";
import { XuiSelect } from "@/lib/xuicomp/common/bselect";
import { InputSelect } from "@/lib/xuicomp/form/inputselect";


/**
 * Page Header
 */
/*
    collection: string[];
    onfilterchange: (name:string,value:string) => void;
    onselectelement: (name:string,value:string) => void;
*/
export interface PageHeaderIfc {

    defvalue:string;

}

export default function PanelHeader({ defvalue}: PageHeaderIfc) {
    const maxLen:number = 50;

    const onFilterChange = (filter_name: string,filter_value: string): void => {
        
    }

    return (
        <div className="w-full h-auto flex flex-row bg-gray-900 space-x-1 pt-3 pb-2">

            <div className="w-auto h-auto">                
                <XuiSearch name="seach"
                        onchange={onFilterChange}
                        placeholder="find"
                        maxlen={maxLen} />
            </div>
            
        </div>
    )

}//end