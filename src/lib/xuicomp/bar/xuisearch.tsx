//src\lib\xuicomp\common\search.tsx

import { AppThemifyIcons } from "@/style/appthicons";



/**
 * JSX Component Search
 *   author: Xefero
 */
export interface SearchIfc {
    name: string;
    onchange: (name: string, value: string) => void;
    maxlen: number;
    placeholder: string;
}

export function XuiSearch({ name, onchange, placeholder, maxlen }: SearchIfc) {

    const handleOnChange = (value: string) => {
        onchange(name, value);
    }

    const icon_size: string = AppThemifyIcons.DEF_SIZE;
    let iconclass = AppThemifyIcons.getIconClass(AppThemifyIcons.TI_NEW, icon_size, "white");
    return (
        <div className="flex w-auto flex-row items-center">
            
            <input
                name={name}
                className="input w-full mr-2"
                type="text"
                placeholder={placeholder}
                onChange={(e) => handleOnChange(e.target.value)}
                maxLength={maxlen} />
            <div className={iconclass}  />
        </div>
    )

}//end comp

