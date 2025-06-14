//src\lib\arquitect\comp\panelleft.tsx

import { PanelMenu } from "@/lib/xuicomp/common/panelmenu";
import { XButton } from "@/lib/xuicomp/buttons/xbutton";
import { AppThemifyIcons } from "@/style/appthicons";


/**
 * Page Left Panel
 */
export interface PanelLeftIfc {
    home: (module_name: string) => void;
    selection: string;
    collection: string[];
}
export default function PanelLeft({ home, collection, selection }: PanelLeftIfc) {

    const onSelection = (name: string): void => {
        home(name);
    }

    const executeNavigation = (operation_id?: string): void => {

    }

    return (
        <div className="w-full min-h-screen px-2">

            <div className="w-full h-[50px] flex flex-row items-center px-2 pt-2 mb-2">
                <div className="flex-1 text-white text-2xl">
                    AI ChatBot
                </div>
                <div>
                    <XButton
                        callback={executeNavigation}
                        operation={"nav_back"}
                        iconname={AppThemifyIcons.TI_BACK}
                        iconcolor="white" />
                </div>
            </div>

            <PanelMenu collection={collection}
                defaultvalue={selection}
                onselection={onSelection} />
                
        </div>
    )

}//end