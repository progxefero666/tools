import { ChangeEvent } from "react";


/*.............................................................................
// componenst interface base
inputtext.tsx
inputnumber.tsx
inputcheckbox.tsx
inputcolor.tsx
inputrange.tsx
inputselect.tsx
inputfileaudio.tsx
//.............................................................................*/
export interface InputCheckboxProps {
    name:string;
    classname?: string;
    label?: string;
    defaultvalue: boolean;
    onchange?: (name:string,result: unknown) => void;
}

export interface InputTextProps {
    name:string;
    classname?: string;
    label?: string;
    defaultvalue: string;
    onchange?: (name:string,result: unknown) => void;
    placeholder?: string;    
    maxlen:number;
}

export interface InputNumberProps {
    name:string;
    classname?: string;
    label?: string;
    defaultvalue: number;
    minvalue?:number;
    maxvalue?:number;
    onchange?: (name:string,result: unknown) => void;
}

export interface InputSelectProps {
    name:string;
    classname?: string;
    label?: string;
    defaultvalue: string;
    onchange?: (name:string,result: unknown) => void;
    collection: string[];
}

export interface InputRangeProps {
    name:string;
    classname?: string;
    label?: string;
    defaultvalue: number| string;
    onchange?: (name:string,result: unknown) => void;
    min:number;
    max:number;
    step?:number;
}

export interface InputColorProps {
    name:string;
    classname?: string;
    label?: string;
    defaultvalue: string;
    onchange?: (name:string,result: unknown) => void;
}

export interface InputFileProps {
    name:string;
    classname?: string;
    label?: string;
    onchange?: (name:string,result: unknown) => void;
    formats:string;
    multiple:boolean;
}


//....................................................................
// multimedia interfaces
//....................................................................
/*
  src:  audio file path
  onPlayPause:otional callback
}*/
export interface AudioPlayerProps {
    src: string;
    disabled?:boolean;
    onPlayPause?: () => void; 
}
  
