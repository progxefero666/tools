import { Dimension } from "@/common/model/base/dimension";


/**
 * class ProfileDimension
 */
export class ProfileDimension {

    public dimension: Dimension;
    public name: string;
    public resolution: string;

    constructor(dimension: Dimension, name: string) {
        this.dimension = dimension;
        this.name = name;
        this.resolution = this.dimension.getResolution();
    }

}//end class
