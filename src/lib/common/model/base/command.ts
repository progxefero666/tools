
export class Command {

    public operation: string;
    public text?: string;

    constructor(operation: string, text?: string ) {
        this.operation = operation;
        if(text){this.text = text;}
    }
}
export type CommandType = InstanceType<typeof Command>;

/**
 * Command class to represent a command with:
 *  operation, text, icon, color, and data
 */
export class UICommand  {

    public cmd: Command;
    public color?: string|null = null;
    public data?: string|null = null;
    public icon?: string|null = null;

    constructor(command: Command,color: string,data?:string|null, icon?: string  ) {
        this.cmd = command;
        if(color){this.color = color;}
        if(data){this.data = data;}
        if(icon){this.icon = icon;}
    }
}
export type UICommandType = InstanceType<typeof UICommand>;