
/**
 * class TextHelper.getCountExtraLines
 */
export class TextHelper {

    public static readonly ERR_NOTCONTAIN:string = "error: empty text";
    public static readonly ERR_INCORRECT_CHARS = "error: invalid content";

    public static check(text: string): boolean {
        if(!text || text.length < 1 ){
            return false;
        }
        return true;
    }

    public static getCountExtraLines(text: string): number {
        const lines = text.split('\n');
    
        let count = 0;
        let consecutiveBlankLines = 0;
        let inParagraph = true; 
        for (let line of lines) {
            if (line.trim() === '') {
                if (inParagraph) {
                    inParagraph = false;
                } 
                else {
                    consecutiveBlankLines++;
                }
            }
            else {
                if (consecutiveBlankLines > 0) {
                    count += consecutiveBlankLines; 
                    consecutiveBlankLines = 0; 
                }
                inParagraph = true;
            }
        }
        if (consecutiveBlankLines > 0) {
            count += consecutiveBlankLines;
        }
        return count;
    }

    public static removeExtraLines(text: string): string {
        const lines = text.split('\n');
        let result: string[] = [];
        let inParagraph = true;  
        for (let line of lines) {
            if (line.trim() === '') {
                if (inParagraph) {

                    result.push('');
                    inParagraph = false;
                }
            } else {
                result.push(line);
                inParagraph = true;
            }
        }
        return result.join('\n');
    }    

    public static getParagraphCount(text: string): number {
        const paragraphs = text.split('\n').filter(line => line.trim() !== '');
        return paragraphs.length;
    }

    public static getCountParagraphBlankLines(text: string): number {
        const paragraphs = text.split('\n').filter(line => line.trim() !== '');
        return paragraphs.length-1;
    }

    public static getParagraphs(text: string): string[] {
        const paragraphs = text.split('\n').filter(line => line.trim() !== '');
        return paragraphs;
    }



} //end class