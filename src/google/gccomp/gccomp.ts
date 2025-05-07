import { UiOperation } from "@/common/model/base/uioperation";
import { ButtonsColors } from "@/style/apptheme";
import { AppThemifyIcons } from "@/style/appthicons";



/**
 * class GoogleComp
 */
export class GoogleComp {

    public static readonly UIOP_TEXT_TO_SPEECH:UiOperation =
        new UiOperation("generate",ButtonsColors.PRIMARY,"generate",AppThemifyIcons.TI_PULSE);

    public static readonly UIOP_ANALIZE_TEXT:UiOperation =
        new UiOperation("analize_text",ButtonsColors.PRIMARY,null,AppThemifyIcons.TI_TIMER);

    public static readonly UIOP_ANALIZE_SPEECH:UiOperation = 
        new UiOperation("analize_speech",ButtonsColors.PRIMARY,null,AppThemifyIcons.TI_STATSUP);

     
/*
    class UiOperation:
        id:string;
        color:string;            
        text?:string;
        symbol?:string;
*/

}//end class