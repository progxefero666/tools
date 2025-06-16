//src\app\module\aiprojects\manprojects\pageheader.tsx


import { XuiSearch } from "@/lib/xuicomp/common/search";
import { XuiSelect } from "@/lib/xuicomp/common/bselect";

import { InputSelect } from "@/lib/xuicomp/form/inputselect";
import { AppThemifyIcons } from "@/style/appthicons";
import { XButton } from "@/lib/xuicomp/common/button";


/**
 * Ai Manager Projects Header
 */
export interface AiManagerProjectsHeaderIfc {
    defvalue: string;
}
export default function AiManagerProjectsHeader({ defvalue }: AiManagerProjectsHeaderIfc) {

    const maxLen: number = 50;
    const onSearchSubmit = (value:string): void => {
    }

    const executeOperation = (operation_id?: string): void => {
    }

    return (

        <div className="w-full h-auto grid grid-cols-[17%_65%_17%] pt-[12px] pb-[6px]">

            {/*column left */}
            <div className="w-full flex flex-row items-center px-2 top-2">
                <div className="flex-1 flex items-center text-white text-2xl translate-y-[-4px]">
                    AI Projects
                </div>
                <div>
                    <XButton
                        callback={executeOperation}
                        operation={"nav_back"}
                        iconname={AppThemifyIcons.TI_BACK}
                        iconcolor="white" />
                </div>
            </div>

            {/*column center */}
            <div className="w-full flex flex-row">

                <div className="w-[26%]">
                    <XuiSearch placeholder="find" maxlen={maxLen}
                               onsubmit={onSearchSubmit}/>
                </div>

            </div>

            {/* column right */}
            <div className="w-full flex flex-row">
                config - user - about
            </div>

        </div>
    )

}//end
