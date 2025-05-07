
export interface InputListProps {
    name?: string;
    classname?: string;
    label?: string;
    defaultvalue: string;
    onchange?: (name: string, result: unknown) => void;
    collection: string[];
}


export const InputList = ({ name, defaultvalue,classname, label, onchange, collection }: InputListProps) => {

    const handleOnChange = (text: string) => {
        alert("handleOnChange");
        if (onchange) {

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