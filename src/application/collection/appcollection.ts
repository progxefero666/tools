
import { Command, UICommand } from "@/common/model/base/command";
import { ButtonsColors } from "../../style/apptheme";


export class CollCommandsIds {

    static OPID_DELETE = "DELETE";
    static OPID_UPDATE = "UPDATE";
    static OPID_REPLACE = "REPLACE";
    static OPID_MOVEUP = "MOVEUP";
    static OPID_MOVEDOWN = "MOVEDOWN";
    static OPID_DELETEALL = "CLEAR";
    static OPID_ADD = "ADD";
    static OPID_INSERT = "INSERTN";
 
 
    static OPTEXT_DELETE = "delete";
    static OPTEXT_UPDATE = "update";
    static OPTEXT_INSERT = "insert";
    static OPTEXT_REPLACE = "update";
    static OPTEXT_MOVEUP = "up";
    static OPTEXT_MOVEDOWN = "down";
    static OPTEXT_DELETEALL = "clear";
    static OPTEXT_ADD = "add";
 
 
    static OPID_LOADPREVPAGE = "LOADPAGEPREV";
    static OPID_LOADNEXTPAGE = "LOADPAGENEXT";
 }
 
export const CollCommands: Record<string, Command> = {
   DELETE : new Command("DELETE"),
   ADD : new Command("ADD", "add"),
   INSERT : new Command("INSERT", "insert"),
   UPDATE : new Command("UPDATE"),
   REPLACE : new Command("REPLACE"),
   DELETEALL : new Command("DELETEALL", "clear"),
   MOVEUP : new Command("MOVEUP"),
   MOVEDOWN : new Command("MOVEDOWN"),   
};

export const UICollButtons: Record<string, UICommand> = {
    DELETE : new UICommand(CollCommands.DELETE,ButtonsColors.PRIMARY,null,"PlusIcon"),
    ADD : new UICommand(CollCommands.ADD,ButtonsColors.ACCENT,null,"PlusIcon"),
    INSERT : new UICommand(CollCommands.INSERT,ButtonsColors.SECONDARY,null,"PlusIcon"),  
    DELETEALL: new UICommand(CollCommands.DELETEALL,ButtonsColors.WARNING,null,"PlusIcon"),
    UPDATE : new UICommand(CollCommands.UPDATE,ButtonsColors.PRIMARY,null,"PlusIcon"),
    REPLACE : new UICommand(CollCommands.REPLACE,ButtonsColors.PRIMARY,null,"PlusIcon"),
    MOVEUP: new UICommand(CollCommands.MOVEUP,ButtonsColors.PRIMARY,null,"PlusIcon"),
    MOVEDOWN: new UICommand(CollCommands.MOVEDOWN,ButtonsColors.PRIMARY,null,"PlusIcon"),
 }
 
 export const UiBarCrudCommands:UICommand[]= [
    new UICommand(CollCommands.DELETEALL,ButtonsColors.WARNING,null,"PlusIcon"),
    new UICommand(CollCommands.ADD,ButtonsColors.ACCENT,null,"PlusIcon"),
    new UICommand(CollCommands.INSERT,ButtonsColors.SECONDARY,null,"PlusIcon")
 ];

 export const UiRowCrudCommands:UICommand[]= [
    new UICommand(CollCommands.DELETE,ButtonsColors.PRIMARY,null,"PlusIcon"),
    new UICommand(CollCommands.MOVEUP,ButtonsColors.PRIMARY,null,"PlusIcon"),
    new UICommand(CollCommands.MOVEDOWN,ButtonsColors.PRIMARY,null,"PlusIcon")
 ];