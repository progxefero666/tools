//src\lib\arquitect\comp\header.tsx

import { XuiSearch } from "@/lib/xuicomp/bar/xuisearch";
import { XuiSelect } from "@/lib/xuicomp/bar/xuiselect";
import { InputSelect } from "@/lib/xuicomp/form/inputselect";


/**
 * Page Header
 */

export interface PageHeaderIfc {
    module_name: string;
    collection: string[];
    defvalue:string;
    onfilterchange: (name:string,value:string) => void;
    onselectelement: (name:string,value:string) => void;
}

export default function PanelHeader({ module_name,collection,defvalue,onfilterchange,onselectelement}: PageHeaderIfc) {
    const maxLen:number = 50;

    const onFilterChange = (filter_name: string,filter_value: string): void => {
        onfilterchange(filter_name,filter_value);
    }


    const onSelect = (select_name: string,select_value: string): void => {
        onselectelement(select_name,select_value);
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

/*
            <div className="w-[200px] h-auto">
                <XuiSelect
                    name="select"
                    onselect={onSelect}
                    collection={collection}
                    defaultvalue={defvalue} />
            </div>        
*/