

/**
 * ImageFrame class represents a frame of an image with an index and alpha value.
 */
export class ImageFrame {

    public srcindex: number=0;      
    public alpha:number=0;

    constructor(objIndex: number,alpha:number){
        this.srcindex = objIndex;
        this.alpha    = alpha;
    }

    clone(): ImageFrame {
        return new ImageFrame(this.srcindex, this.alpha);
    }

}//end class ImageFrame
