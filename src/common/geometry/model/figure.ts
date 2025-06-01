import { Dimension } from "@/common/model/base/dimension";

/**
 * Figure class represents a geometric figure.
 */
export class FigureCf {

    public static readonly DEF_COLOR: string = "#0000FF"; // Default color is blue
    public color: string;
    public radius: number = 0; // Reverted from petalCenterDist
    public dimension:Dimension;

    constructor(radius: number,color?: string) { // Reverted from petalCenterDist
        this.radius = radius;
        this.color = color || FigureCf.DEF_COLOR;
        this.dimension = new Dimension(this.radius*2,this.radius*2);
    }

}//end class Figure