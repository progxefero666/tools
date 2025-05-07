import { ImageFrame } from "./imgframe";

/**
 * class VfaVideoFrame 
 */
export class ViImagerame {

    public static buildOne(imgframeA:ImageFrame):ViImagerame{
        return new ViImagerame([imgframeA]);
    }    

    public static buildTwo(imgframeA:ImageFrame,imgframeB:ImageFrame):ViImagerame{
        return new ViImagerame([imgframeA,imgframeB]);
    }
    public imgframes:ImageFrame[];      

    constructor(imgframes:ImageFrame[]){
        this.imgframes = imgframes;
    }

    clone(): ViImagerame {
        const clonedImgFrames = this.imgframes.map(frame => frame.clone());
        return new ViImagerame(clonedImgFrames);
    }

}//end class VfaVideoFrame