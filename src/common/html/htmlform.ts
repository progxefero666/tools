import { AppConstants } from "../app/constants";
import { HtmlFormComponent } from "./htmlformcomp";


export class HtmlForm {

    public fields: Map<string, HtmlFormComponent> = new Map();

    constructor(listElements:HtmlFormComponent[]) {
       this.appendGroup(listElements);        
    }

    append = (nombre: string, field: HtmlFormComponent): void => {
        this.fields.set(nombre, field);
    }

    appendGroup = (fields: HtmlFormComponent[]): void => {
       for(let idx=0;idx<fields.length;idx++){
            this.append(fields[idx].name,fields[idx]);        
       }
    }

    public getFields= (): string[] => {
        return Array.from(this.fields.keys());
    }

    get = (nombre: string): HtmlFormComponent | null => {
        if(this.fields.has(nombre)){
            return this.fields.get(nombre) ?? null;
        }
        return null;
    }

    getHtmlCompType = (nombre: string): string => {
        //alert(this.get(nombre)!.type);
        return this.get(nombre)!.type;
    }

    getLabel = (nombre: string): string => {
        return this.get(nombre)!.label!;
    }

    getCollection = (nombre: string): string[] => {
        return this.get(nombre)?.collection!;
    }

    getDefaultValueText = (nombre: string): string => { 
        return this.get(nombre)!.getDefaultValueText();
    }

    getDefaultValueNumber = (nombre: string): number => {
        return this.get(nombre)!.getDefaultValueNumber();
    }

    getDefaultValueBoolean = (nombre: string): boolean => {
        return this.get(nombre)!.getDefaultValueBoolean();
    }

    getDefaultValueDate = (nombre: string): Date => {
        return this.get(nombre)!.getDefaultValueDate();
    }

}//end class