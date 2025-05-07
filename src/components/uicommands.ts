

import { ButtonsColors } from "@/style/apptheme";
import { Command, UICommand } from "@/common/model/base/command";


export const UIVideoPlayerCommands: Record<string, Command> = {
   INIT : new Command("init"),
    STOP : new Command("stop"),
    PLAY : new Command("play"),
    PAUSE : new Command("pause"),
    RECORD : new Command("record"),
    PREVIOUS : new Command("previous"),
    NEXT : new Command("next"),    
    MUTE : new Command("mute"),
    UNMUTE : new Command("unmute"),
    INCVOLUMEN : new Command("volumeninc"),
    DECVOLUMEN : new Command("volumendesc")    
 };

 /*
     new UICommand(UIVideoPlayerCommands.RECORD,ButtonsColors.INFO,null,"VideoCameraIcon"),
    new UICommand(UIVideoPlayerCommands.STOP,ButtonsColors.ACCENT,null,"StopIcon"),
 */
 export const UIBarVideoPlayerCommands:UICommand[]= [
    new UICommand(UIVideoPlayerCommands.INIT,ButtonsColors.WARNING,null,"ChevronDoubleLeftIcon"),
    new UICommand(UIVideoPlayerCommands.PREVIOUS,ButtonsColors.SECONDARY,null,"ChevronLeftIcon"),
    new UICommand(UIVideoPlayerCommands.PLAY,ButtonsColors.WARNING,null,"PlayIcon"),
    new UICommand(UIVideoPlayerCommands.PAUSE,ButtonsColors.SECONDARY,null,"PauseIcon"),
    new UICommand(UIVideoPlayerCommands.NEXT,ButtonsColors.ACCENT,null,"ChevronRightIcon"),
 ];
 
 /*
 export const UIVideoPlayerCommands: Record<string, Command> = {
   INIT : new Command("init"),
    STOP : new Command("stop"),
    PLAY : new Command("play"),
    PAUSE : new Command("pause"),
    RECORD : new Command("record"),
    PREVIOUS : new Command("previous"),
    NEXT : new Command("next"),    
    MUTE : new Command("mute"),
    UNMUTE : new Command("unmute"),
    INCVOLUMEN : new Command("volumeninc"),
    DECVOLUMEN : new Command("volumendesc")    
 };
 */
 export const UIBaFontCommands:UICommand[]= [
   new UICommand(UIVideoPlayerCommands.INIT,ButtonsColors.WARNING,null,"ChevronDoubleLeftIcon"),
   new UICommand(UIVideoPlayerCommands.PREVIOUS,ButtonsColors.SECONDARY,null,"ChevronLeftIcon"),
   new UICommand(UIVideoPlayerCommands.PLAY,ButtonsColors.WARNING,null,"PlayIcon"),
   new UICommand(UIVideoPlayerCommands.PAUSE,ButtonsColors.SECONDARY,null,"PauseIcon"),
   new UICommand(UIVideoPlayerCommands.NEXT,ButtonsColors.ACCENT,null,"ChevronRightIcon"),
];
