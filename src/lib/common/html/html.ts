import { Dimension } from "@/lib/common/model/base/dimension";
import { AppConstants } from "../app/constants";
import { Hour } from "@/lib/common/datetime/hour";


export enum HtmlCompTypes {
    INPUT_TEXT = "input_text",
    INPUT_PASSWORD = "input_password",
    INPUT_SEARCH = "input_search",
    INPUT_TEXTAREA = "input_textarea",
    INPUT_NUMBER = "input_number",
    INPUT_CHECK = "input_check",
    INPUT_RANGE = "input_range",
    SELECT = "select",
    INPUT_COLOR = "input_color",
    FILE = "file",
    INPUT_DATE = "input_date",
    RADIO = "radio",
    INPUT_PHONE = "input_phone",
    INPUT_EMAIL = "input_email",
    INPUT_URL = "input_url",
    LIST = "list",
    INPUT_TIME = "input_time"
}

export const getDefaultValueType = (type: string): string => {
    let baseType: string = AppConstants.BASETYPE_STRING;
    switch (type) {
        case HtmlCompTypes.INPUT_NUMBER:
        case HtmlCompTypes.INPUT_RANGE:
            baseType = AppConstants.BASETYPE_NUMBER;
            break;
        case HtmlCompTypes.INPUT_CHECK:
            baseType = AppConstants.BASETYPE_BOOLEAN;
            break;
        case HtmlCompTypes.FILE:
            baseType = AppConstants.UNDEFINED;
            break;
        case HtmlCompTypes.INPUT_DATE:
            baseType = AppConstants.BASETYPE_DATETIME;
            break;
        case HtmlCompTypes.INPUT_TIME:
            baseType = AppConstants.BASETYPE_TIME;
            break;
    }
    return baseType;
}

export interface HtmlComponentProps {
    type:string;
    name: string;
    classname?: string;
    label?: string;
    defaultvalue: unknown;
    value?: unknown;    
    onchange?: (name: string, result: unknown) => void;
}

//XHtml.HTML_INPUT_TEXT
export interface HtmlInputTextProps extends HtmlComponentProps {
    defaultvalue: string;
    placeholder?: string;    
    maxlen?:number;    
}


//XHtml.HTML_INPUT_CHECK
export interface HtmlInputCheckProps extends HtmlComponentProps {
    defaultvalue: boolean;
}


//XHtml.HTML_INPUT_NUMBER
export interface HtmlInputNumberProps extends HtmlComponentProps {
    defaultvalue: number;
    step?:number;    
}

//XHtml.HTML_INPUT_RANGE
export interface HtmlInputRangeProps extends HtmlComponentProps {  
    defaultvalue: number;
    min?:number;
    max?:number;   
}

//XHtml.SELECT_COLOR
export interface HtmlSelectProps extends HtmlComponentProps {
    defaultvalue: string;
    collection: string[];
}

//XHtml.HTML_INPUT_COLOR 
export interface HtmlInputColorProps extends HtmlComponentProps {
    defaultvalue: string;
}

//XHtml.HTML_FILE
export interface HtmlFileProps extends HtmlComponentProps {
    defaultvalue: string;
    multiple?:boolean;
}

//XHtml.HTML_INPUT_PASSWORD
export interface HtmlInputPasswordProps extends HtmlComponentProps {
    defaultvalue: string;
    placeholder?: string;
    maxlen:number;    
}

//XHtml.HTML_INPUT_SEARCH
export interface HtmlInputSearchProps extends HtmlComponentProps {
    placeholder?: string;    
    maxlen:number;    
}

//XHtml.HTML_INPUT_TEXTAREA  
export interface HtmlInputTextAreaProps extends HtmlComponentProps {
    defaultvalue: string;
    placeholder?: string;    
    maxlen:number;    
}

//XHtml.HTML_RADIO
export interface HtmlRadioProps extends HtmlComponentProps {
    defaultvalue: string;
    collection: string[];  
}

//XHtml.HTML_INPUT_PHONE
export interface HtmlInputPhoneProps extends HtmlComponentProps {
    defaultvalue: string;
}

//XHtml.HTML_INPUT_EMAIL
export interface HtmlInputEmailProps extends HtmlComponentProps {
    defaultvalue: string;
}

//XHtml.HTML_INPUT_URL
export interface HtmlInputUrlProps extends HtmlComponentProps {
    defaultvalue: string;
}

//XHtml.HTML_INPUT_DATE
export interface HtmlInputDateProps extends HtmlComponentProps {
    defaultvalue: Date;
    format:string;
}

//XHtml.HTML_INPUT_TIME
export interface HtmlInputTimeProps extends HtmlComponentProps {
    defaultvalue: Hour;
    timeZone: string
    format?:string;
}

export type HtmlGenProp = HtmlInputCheckProps | HtmlInputTextProps | HtmlInputNumberProps | HtmlInputRangeProps |
HtmlSelectProps | HtmlInputColorProps | HtmlFileProps | HtmlInputPasswordProps  | HtmlInputSearchProps | HtmlInputTextAreaProps |
HtmlRadioProps | HtmlInputPhoneProps | HtmlInputEmailProps | HtmlInputUrlProps | HtmlInputDateProps  | HtmlInputTimeProps;


export interface InputDimensionProps extends HtmlComponentProps {
    collection: string[];
    dimension?:Dimension; 
}
