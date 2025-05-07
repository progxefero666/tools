import { AppConstants } from "../app/constants";
import { HtmlFormComponent } from "./htmlformcomp";


export class HtmlFormById {


    public fields: Record<string, HtmlFormComponent>={};

    constructor() {}

    // Método para añadir un campo al objeto 'fields'
    public append = (fieldName: string, field: HtmlFormComponent): void => {
        if (!this.fields[fieldName]) { 
            this.fields[fieldName] = field; 
          }
    };

}