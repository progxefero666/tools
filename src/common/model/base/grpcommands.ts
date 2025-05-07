import { UICommand } from "@/common/model/base/command";


export class XGroupUICommands {

    // Cambiamos fields a un objeto Record<string, XFormField> en lugar de un array
    public buttons: Map<string, UICommand> = new Map();

    constructor() {

    }
    append = (nombre: string, uiCommand: UICommand): void => {
        this.buttons.set(nombre, uiCommand);
    }

    get = (nombre: string): UICommand | null => {
        if(this.buttons.has(nombre)){
            return this.buttons.get(nombre) ?? null;
        }
        return null;
    }    

}