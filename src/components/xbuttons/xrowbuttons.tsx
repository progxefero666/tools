
import { AppUI } from "@/style/appui";
import { UICommand } from "@/common/model/base/command";
import { RenderIcon } from "@/components/appheroicons";


export interface RowCommandButtonsIfc {
    rowid:string;
    commands: UICommand[];
    barclassname:string,
    disabled?: boolean[];
    iconclass: string;
    onclick?: (rowid:string,operation: string) => void;
}
export function RowCommandButtons({ rowid,commands, barclassname,disabled, onclick, iconclass }: RowCommandButtonsIfc) {


    const handleOnClick = (operation:string) => {
        if (onclick) {
            onclick(rowid,operation);
        }
    };
    
    const getClassName = (index:number) => {
        let classn = "btn btn-xs";
        if (commands[index].color) {
            classn += " ".concat(commands[index].color);
        }
        return classn;
    }

    const renderContent = () => (
        <>
            {commands.map((command, index) => (
                <button
                    key={`cmd-${index}`}
                    className={getClassName(index)}
                    onClick={() => handleOnClick(command.cmd.operation)}
                    disabled={disabled?.[index]}>
                    {command.icon ? (RenderIcon(command.icon, iconclass)) : null}                        
                    {command.cmd.text && command.cmd.text}
                </button>
            ))}
        </>
    );


    return barclassname ? (
        <div className={barclassname}>{renderContent()}</div>
    ) : 
    (
        renderContent()
    )
}
