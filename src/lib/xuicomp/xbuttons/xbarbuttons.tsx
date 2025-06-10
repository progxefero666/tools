import { AppConstants } from "@/libold/app/constants";
import { AppUI } from "@/style/appui";
import { UICommand } from "@/lib/common/model/base/command";
import { RenderIcon } from "@/lib/xuicomp/appheroicons";


export interface BarCommandButtonsIfc {
    commands: UICommand[];
    barclassname:string,
    disabled?: boolean[];
    iconclass: string;
    onclick?: (operation: string) => void;
}
export function BarCommandButtons({ commands, barclassname,disabled, onclick, iconclass }: BarCommandButtonsIfc) {


    const handleOnClick = (operation:string) => {
        if (onclick) {
            onclick(operation);
        }
    };
    
    const getClassName = (index:number) => {
        let classn = "btn";
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
