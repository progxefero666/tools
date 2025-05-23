

/**
 * class ColorUtil.getArrayColors
 */
export class ColorUtil {

    public static getArrayColors(color: string, count: number): string[] {
        let colors: string[] = [];
        for (let idx = 0; idx < count; idx++) {
            colors.push(color);
        }
        return colors;
    }


}//end class