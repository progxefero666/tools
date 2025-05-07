import { TextHelper } from "@/common/text/texthelper";
import { TimeUtil } from "@/common/util/timeutil";
import { GoogleTextVo } from "../motor/gctext";

/**
 * class GoogleTtsTimeHelper
 */
export class GoogleVoAnalizer {

    public wordspermin: number = 0;
    public pdurationphase: number = 0;
    public pdurationparag: number = 0;

    constructor(wordsPerMin: number, pauseDurPhase: number, pauseDurParagraph: number) {
        this.wordspermin = wordsPerMin;
        this.pdurationphase = pauseDurPhase;
        this.pdurationparag = pauseDurParagraph;
    }

    // return miliseconds
    public estimateParagraphDuration(text: string): number {  
        const wordCount = text.split(/\s+/).length;
        const durationMilliseconds = (wordCount / this.wordspermin) * 60000;
        const pauseCount = (text.match(/[.,!?;:]/g) || []).length;
        return (durationMilliseconds + (pauseCount * this.pdurationphase));
    }

    // return seconds
    public estimateTextDuration(text: string): number { 

        const countExtraLines:number = TextHelper.getCountExtraLines(text);
        const textModA:string = TextHelper.removeExtraLines(text);
        const countBlanckLines:number =  TextHelper.getCountParagraphBlankLines(textModA);
        const parragraphs:string[] = TextHelper.getParagraphs(textModA);

        let parrsTotalDuration: number = 0;
        for (const item of parragraphs) {
            parrsTotalDuration += this.estimateParagraphDuration(item);
        }
        const extraLinesDuration: number = countExtraLines * this.pdurationparag;
        const blankLinesDuration: number = countBlanckLines * this.pdurationparag;
        const textDurationMill: number = parrsTotalDuration + blankLinesDuration + extraLinesDuration;
        
        return Math.floor(TimeUtil.milisecToSeconds(textDurationMill));
    }

}