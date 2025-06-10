//src\app\dahboard\page.tsx

"use client";
import { useEffect, useState } from "react";

import { AppDesktop } from "./app/appdesktop";

import "@/css/allwidths.css";
import PageLeftPanel from "@/lib/arquitect/comp/leftpanel";
import MainPanel from "@/lib/arquitect/comp/mainpanel";

/**
 * App Desktop
 */
const app_desktop:AppDesktop 
    = new AppDesktop("portal_project","title","iaxeferoicon.png","description");

export default function Desktop() {

    const [modules,setModules] = useState<string[]>(app_desktop.getFields());
    
    useEffect(() => {

    },[]);
        
    const home = (): void => {
        //bg-white
    }
    
    return (
        <div id="cont_root" className="w-full h-auto" >
            
            <div className="w-full min-h-[566px] max-h-[566px] grid grid-cols-[18%_82%]">
                <PageLeftPanel 
                    selection={modules[0]}
                    home={home}
                    collection={modules}/>
                <MainPanel />
            </div>

        </div>
    );

}//end
