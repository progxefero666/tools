//src\lib\arquitect\comp\panelleft.tsx

import { PanelMenu } from "@/lib/xuicomp/common/panelmenu";
import { XButtonIcon } from "@/lib/xuicomp/buttons/iconbutton";
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

    const executeOperation = (operation_id: string): void => {

    }

    return (
        <div className="w-full min-h-screen bg-gray-900 border px-2">
            <div className="w-full h-[50px] flex justify-center px-2 pt-2">
                <h4>IA Portal</h4>
                <XButtonIcon
                    callback={executeOperation}
                    operation={"nav_back"}
                    iconname={AppThemifyIcons.TI_CONTROLINIT} />
            </div>
            <PanelMenu collection={collection}
                defaultvalue={selection}
                onselection={onSelection} />
        </div>
    )

}//end