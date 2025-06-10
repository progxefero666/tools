
import { UiOperation } from "@/lib/common/model/base/uioperation";
import { useEffect, useState } from "react";
import { XButtonIcon } from "./iconbutton";

/*
    class UiOperation:
        id:string;
        color:string;            
        text?:string;
        symbol?:string;
*/

const getArrayDisabledImages = (count:number,valueInit:boolean):boolean[] => {
    let arrayRes:boolean[] = [];
    for(let idx=0;idx<count;idx++){
        arrayRes.push(valueInit);
    }
    return [true];
}

export interface BarButtonsProp {    
    contclass?:string;
    callback: (operation: string) => void; 
    operations:UiOperation[];
    btnsize?: string;
    iconsize?: string;     
}
export interface BarIconButtonsRef {
    setMode: (mode: string) => void;
}

export function BarIconButtons({contclass, callback,operations,btnsize,iconsize}: BarButtonsProp) {

    const iconsColor:string = "black";
    const [btnsDisabled, setBtnsDisabled] = 
        useState<boolean[]>(getArrayDisabledImages(operations.length,false));

    useEffect(() => {             
    }, []);

    const renderContent = () => (
        <>
            {operations.map((operation, index) => (           
                <XButtonIcon 
                    callback    = {callback} 
                    operation   = {operation.id}
                    btndisabled = {btnsDisabled[index]}
                    btncolor    = {operation.color}
                    btnsize     = {btnsize}
                    btntext     = {operation.text}                    
                    iconname    = {operation.symbol}                            
                    iconsize    = {iconsize}
                    iconcolor   = {iconsColor} />
            ))}
        </>
    );

    return contclass ? (
        <div className={contclass}>{renderContent()}</div>
    ) : 
    (
        renderContent()
    )
} //end component

/*
<button
    key={`op-${index}`}
    className={getClassName(index)}
    onClick={() => handleOnClick(command.cmd.operation)}
    disabled={disabled?.[index]}>
    {command.icon ? (RenderIcon(command.icon, iconclass)) : null}                        
    {command.cmd.text && command.cmd.text}
</button>                    
    */