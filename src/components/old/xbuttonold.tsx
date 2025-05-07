
import { AppConstants } from "@/common/app/constants";
import { AppUI } from "@/style/appui";
import { UICommand } from "@/common/model/base/command";
import { AppIcons, RenderIcon } from "@/components/appheroicons";


export interface XButtonOldIfc {
    command: UICommand;
    disabled?: boolean;
    iconclass: string;
    onclick?: (operation: string) => void;
}
export function XButtonOld({ command, disabled, onclick, iconclass }: XButtonOldIfc) {


    const handleOnClick = () => {
        if (onclick) {
            if (command.cmd.operation) {
                onclick(command.cmd.operation);
            }
            else { onclick(AppConstants.UNDEFINED); }
        }
    };
    
    const getClassName = () => {
        let classn = "btn";
        if (command.color) {
            classn += " ".concat(command.color);
        }
        return classn;
    }
    
    return (
        <button className={getClassName()} onClick={handleOnClick} disabled={disabled}>
            {command.icon && RenderIcon(command.icon, iconclass)}
            {command.cmd.text && command.cmd.text}
        </button>
    )

}
