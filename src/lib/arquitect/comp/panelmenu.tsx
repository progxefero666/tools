//src\lib\arquitect\comp\panelmenu.tsx


export interface PanelMenuIfc {
    collection: string[];
    defaultvalue: string;
    onchange?: (name: string) => void;
}

/**
 * Component Input List
 *  author: xefero
 */
export const PanelMenu = ({ defaultvalue, collection,onchange}:PanelMenuIfc) => {

    const handleOnChange = (elem_name: string) => {
        //alert("handleOnChange");
        if (onchange) {
            onchange(elem_name);
        }
    }

    return (
        <div>
            <ul className="menu w-full rounded-box menu-md space-y-2"
                defaultValue={defaultvalue}
                onChange={(e) => handleOnChange((e.target as HTMLSelectElement).value)} >

                {collection.map((item, index) => (
                    <li className="list-row list-item" key={index} value={item}>
                        <div className="card bg-base-100 w-fill shadow-sm">
                            {item}
                        </div>                        
                    </li>
                ))}

            </ul>
        </div>
    );


}