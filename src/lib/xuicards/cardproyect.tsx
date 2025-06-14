//src\lib\xuicards\cardproyect.tsx

import React, { useState } from "react";
import { MdPreview } from 'md-editor-rt';
//import 'md-editor-rt/lib/preview.css';

import { AppThemifyIcons } from "@/style/appthicons";
import { AppConstants } from "@/lib/common/app/constants";
import { XButton } from "../xuicomp/buttons/xbutton";
import { ThemeColors } from "@/style/apptheme";

import 'md-editor-rt/lib/style.css'; 
import 'md-editor-rt/lib/preview.css';

const dummy_content: string = `## Introducción

    Este es un **texto en negrita** y este es *texto en cursiva*.

    ### Lista de tareas
    - [x] Tarea completada
    - [ ] Tarea pendiente
    - [ ] Otra tarea

    ### Lista numerada
    1. Primer elemento
    2. Segundo elemento
    3. Tercer elemento

    ## Código
    Aquí hay código inline: \`console.log("Hola")\``;

export interface CardProjectIfc {
    name: string;
    text: string;
    onselection: (value:string) => void;
    iconname?: string;
    iconcolor?: string;
    iconsize?: string;
}
export function CardProject({name,text,onselection,iconname,iconsize,iconcolor}: CardProjectIfc) {

    const [collapse, setcollapse] = useState<boolean>(true);

    let iconclass: string = AppConstants.UNDEFINED;
    if (iconname) {
        const icon_size: string = iconsize ?? AppThemifyIcons.DEF_SIZE;
        iconclass = AppThemifyIcons.getIconClass(iconname, icon_size, iconcolor);
    }

    const onOpen = () => {
        onselection(name);
    };

    const onCollapse = (operation_id?: string) => {
        setcollapse(!collapse);
    };


    return (
        <div className="w-full flex flex-col bg-base-100">

            {/* header */}
            <div className="w-full relative">
                <div className="w-full h-auto flex items-center">
                    <div className="flex flex-row text-white text-2xl">
                        <div>
                            {collapse ?
                                <XButton callback={onCollapse} iconname={AppThemifyIcons.TI_ARROW_DOWN}
                                    iconsize="xs"
                                    iconcolor="white" />
                                : <XButton callback={onCollapse}
                                    iconsize="xs"
                                    iconname={AppThemifyIcons.TI_ANGLE_UP} iconcolor="white" />
                            }
                        </div>
                        <div className="flex items-center text-white text-base ml-2">
                            {text}
                        </div>
                    </div>
                    <div className="absolute right-2"> {/* Botón pegado a la derecha */}
                        <button className="btn btn-sm btn-success"
                         onClick={onOpen}>
                            open
                        </button>

                    </div>
                </div>
            </div>

            {/* body */}
            {!collapse ?
                <div className="w-full flex flex-col">
                    <hr className="text-primary mb-2" />
                    <div className="w-full text-white text-md pb-1">
                        <MdPreview
                            value={dummy_content}
                            theme="dark" />
           
                    </div>

                </div> : null}
        </div>
    )

} //end component

/*
                    <XButton callback={onClick}
                             btntext="open" 
                             btncolor={ThemeColors.INFO} />
 */