import { AppConstants } from "../app/constants";



export class HtmlFormComponent {

    public type: string = AppConstants.UNDEFINED;
    public name: string = AppConstants.DATATEXT_UNDEFINED;
    public label?: string = AppConstants.DATATEXT_UNDEFINED;    
    public valuedef: unknown = AppConstants.DATATEXT_UNDEFINED;
    public value?: unknown = AppConstants.DATATEXT_UNDEFINED;

    public collection?: string[] | null = null;
    
    constructor(type: string, 
                name: string, valuedef: unknown,
                label?: string | null, 
                collection?: string[]) {
        this.type = type;
        this.name = name;
        this.valuedef = valuedef;
        if (label) { this.label = label };
        if (collection) { this.collection = collection };
    }

    // BASETYPE_STRING
    getDefaultValueText = (): string => {
        return this.valuedef!.toString();
    }

    // BASETYPE_STRING
    getDefaultValueNumber = (): number => {
        return Number(this.valuedef!);
    }

    // BASETYPE_BOOLEAN
    getDefaultValueBoolean = (): boolean => {
        let res:boolean = Boolean(this.valuedef!.toString());
        return res;
    }

    // BASETYPE_DATETIME
    getDefaultValueDate = (): Date => {
        let res:Date = new Date(this.valuedef!.toString())
        return res;
    }

    // BASETYPE_FILEMETADATA


}
