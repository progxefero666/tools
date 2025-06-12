//src\lib\xuicomp\bar\xuinavigator.tsx

import { AppThemifyIcons } from "@/style/appthicons";


/**
 * JSX Component Search
 *   author: Xefero
 */
export interface XuiNavigatorIfc {
    name: string;
    onnavigate: () => void;
    maxlen: number;
    placeholder: string;
}

export function XuiNavigator({ name, onnavigate, placeholder, maxlen }: XuiNavigatorIfc) {

    const handleOnClick = () => {
        onnavigate();
    }

    const icon_size: string = AppThemifyIcons.DEF_SIZE;
    let iconclass = AppThemifyIcons.getIconClass(AppThemifyIcons.TI_NEW, icon_size, "black");
    return (
        <div className="w-full flex flex-row">

            <div>
                <h2>Title</h2>
            </div>
            
            <div>
                <p>icon-back</p>
            </div>

        </div>
    )

}//end comp

