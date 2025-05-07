
import { AppUI } from "@/style/appui";
import { UICommand } from "@/common/model/base/command";
import { AppIcons, RenderIcon } from "@/components/appheroicons";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { UIVideoPlayerCommands } from "../uicommands";


export interface VideoPlayerBarIfc {
    commands: UICommand[];
    onclick: (operation: string) => void;
    barclassname:string,
    visibled?: boolean[];
    disabled?: boolean[];
    iconclass?: string;    
}
export interface VideoPlayerBarHandle {
    setPlayMode: (mode: string) => void;
}

/*
commands:
...................................
0:(UIVideoPlayerCommands.INIT
1:(UIVideoPlayerCommands.PREVIOUS
2:(UIVideoPlayerCommands.PLAY
3:(UIVideoPlayerCommands.PAUSE
4:(UIVideoPlayerCommands.NEXT
*/

export const VideoPlayerBar = forwardRef<VideoPlayerBarHandle, VideoPlayerBarIfc>((
                                 {commands,onclick,barclassname,iconclass}, ref) => {

    const [btnsDisabled, setBtnsDisabled] =  useState<boolean[]>([false,false,false,true,false]);

    let seciconclass = AppIcons.DEF_ICON_SIZE;
    if (iconclass) {seciconclass = iconclass;}

    useImperativeHandle(ref, () => ({
        setPlayMode: (mode: string) => {
            console.log("setPlayMode");
            //exeCommand(mode);
        }
    }));

    useEffect(() => { 

    },[]);


    const exeCommand = (operation:string) => {
        if (operation ==  UIVideoPlayerCommands.PLAY.operation) {
            setBtnsDisabled([true,true,true,false,true]);
        }
         else if (operation == UIVideoPlayerCommands.PAUSE.operation) {
            setBtnsDisabled([false,false,false,true,false]);
        }         
        if (onclick) {
            onclick(operation);
        }
    };
    
    const getClassName = (index:number) => {
        let classn = "btn btn-md";
        if (commands[index].color) {
            classn += " ".concat(commands[index].color);
        }
        return classn;
    }

    const renderContent = () => (
        <div className="w-full flex items-center justify-center space-x-2 p-1 bg-black">
            {commands.map((command, index) => (
                <button
                    key={`cmd-${index}`}
                    className={getClassName(index)}
                    onClick={() => exeCommand(command.cmd.operation)}
                    disabled={btnsDisabled?.[index]}>
                    {command.icon ? (RenderIcon(command.icon, seciconclass)) : null}                        
                    {command.cmd.text && command.cmd.text}
                </button>
            ))}
        </div>
    );
    return barclassname ? (<div className={barclassname}>{renderContent()}</div>)
                        : (renderContent())
    
});
