//src\application\page\comp\centerpanel.tsx

import { useEffect } from "react";
import PageHeader from "./header";
import PageRightPanel from "./rigthpanel";


/**
 * Page Main Panel
 */
export default function MainPanel() {

    useEffect(() => { }, []);
        
    
    const renderMainContent = () => {
        return (
            <p>main content</p>
        );
    }

    return (
        <div className="w-full h-auto flex-col ">
            <PageHeader />
            <div className="w-full h-auto grid grid-cols-[80%_20%]">                
                {renderMainContent()}
                <PageRightPanel />
            </div>
        </div>
    )

}//end