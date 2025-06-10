
export interface InputListProps {
    name?: string;
    classname?: string;
    label?: string;
    defaultvalue: string;
    onchange?: (name: string) => void;
    collection: string[];
}

/**
 * Component Input List
 *  author: xefero
 */
export const InputList = ({ name, defaultvalue,classname, label, onchange, collection }: InputListProps) => {

    const handleOnChange = (elem_name: string) => {
        //alert("handleOnChange");
        if (onchange) {
          onchange(elem_name);
        }
    }
    
    const renderContent = () => (
        <>
          {label && <label className="w-full">{label}</label>}
          <ul className="list w-full"
              defaultValue={defaultvalue}
              onChange={(e) => handleOnChange((e.target as HTMLSelectElement).value)} >

            {collection.map((item, index) => (
              <li className="list-row list-item" key={index} value={item}>
                {item}
              </li>
            ))}

          </ul>
        </>
      );
  
    return classname ? (<div className={classname}>{renderContent()}</div> ) : 
                       (renderContent())

  }