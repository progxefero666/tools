//src\lib\arquitect\comp\leftpanel.tsx

import { PanelMenu } from "@/lib/arquitect/comp/panelmenu";


/**
 * Page Left Panel
 */
export interface IfcLeftPanel {
    home: () => void;
    selection:string;
    collection: string[];
}
export default function PageLeftPanel({home,collection,selection}: IfcLeftPanel) {

    const css_classname:string = "w-full h-auto flesk-col"
    return (
        <div className="w-full min-h-screen bg-gray-900 border px-2">
            <div className="w-full h-[50px] px-2 pt-2">
                <h4>IA Portal</h4>
            </div>            
            <PanelMenu collection={collection}
                       defaultvalue={selection} />
        </div>
    )

}//end