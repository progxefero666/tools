import { GoogleVoAnalizer } from "../gcvoices/gcanalizer";


/**
 * class GoogleTextVo
 */
export class GoogleTextVo {

    public static readonly DEF_WORDS_PM: number = 160;
    public static readonly DEF_FRASE_PD: number = 200;
    public static readonly DEF_PARAG_PD: number = 400;

    public static DEF_VO_ANALIZER:GoogleVoAnalizer 
        = new GoogleVoAnalizer(GoogleTextVo.DEF_WORDS_PM,
                               GoogleTextVo.DEF_FRASE_PD,
                               GoogleTextVo.DEF_PARAG_PD);
            
}//end class