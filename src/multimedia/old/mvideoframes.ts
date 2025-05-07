
import { Dimension } from "../../common/model/base/dimension";
import { Point2D } from "@/common/graphics/model/point2d";


export class ArrSrcsFrameDataImageIndex {
    public index: number = -1;
    public dimension: Dimension =new Dimension(800,600);
    public coord: Point2D = new Point2D(0, 0);
    public opacity: number = 1.0;
    public iscloned:boolean = false;

    constructor(index: number, dimension: Dimension, coord: Point2D, opacity: number,iscloned?:boolean) {
        this.index = index;
        this.dimension = dimension;
        this.coord = coord; 
        this.opacity = opacity;
        if(iscloned){this.iscloned= iscloned};
    }
}//end class

export class FrameDataTwoImages {
    //DEFAULT_ASrcsFrameDImageIndex
    public imageA: ArrSrcsFrameDataImageIndex | null = null;
    public imageB?: ArrSrcsFrameDataImageIndex;
    constructor(imageA: ArrSrcsFrameDataImageIndex, imageB?: ArrSrcsFrameDataImageIndex) {
        this.imageA = imageA;
        this.imageB = imageB;
    }
}//end class

/*
    const jsonData = JSON.stringify(listFrames, null, 4);
    const fileContent = FileUtil.stringToArrayBuffer(jsonData);
    const fileFolder: string = ServerPaths.getToolFolder(userId);
    const filePath: string = path.join(fileFolder,"videoframes.json");    
    const res= await SystemFileUtil.createFile(fileContent, filePath);
    console.log("createFile end");
*/