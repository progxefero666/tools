//src\app\module\aiprojects\manprojects\pageheader.tsx


import { XuiSearch } from "@/lib/xuicomp/bar/xuisearch";
import { XuiSelect } from "@/lib/xuicomp/bar/xuiselect";
import { XButton } from "@/lib/xuicomp/buttons/xbutton";
import { InputSelect } from "@/lib/xuicomp/form/inputselect";
import { AppThemifyIcons } from "@/style/appthicons";


/**
 * Ai Manager Projects Header
 */
export interface AiManagerProjectsHeaderIfc {
    defvalue: string;
}
export default function AiManagerProjectsHeader({ defvalue }: AiManagerProjectsHeaderIfc) {

    const maxLen: number = 50;
    const onFilterChange = (filter_name: string, filter_value: string): void => {
    }

    const executeOperation = (operation_id?: string): void => {
    }

    return (

        <div className="w-full h-[50px] bg-gray-900 grid grid-cols-[18%_66%_16%]">

            {/*column left */}
            <div className="w-full  flex flex-row items-center px-2 pt-2 mb-2">
                <div className="flex-1 text-white text-2xl">
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
                <XuiSearch name="seach"
                    onchange={onFilterChange}
                    placeholder="find"
                    maxlen={maxLen} />
            </div>

            {/* column right */}
            <div className="w-full flex flex-row">
                column right
            </div>

        </div>
    )

}//end