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
    let iconclass = AppThemifyIcons.getIconClass(AppThemifyIcons.TI_NEW, icon_size, "black");
    return (
        <div className="flex w-auto flex-row">
            <button className={iconclass} style={{ marginRight: '0.5rem' }} />
            <input
                name={name}
                className="input w-full"
                type="text"
                placeholder={placeholder}
                onChange={(e) => handleOnChange(e.target.value)}
                maxLength={maxlen} >
            </input>

        </div>
    )

}//end comp

