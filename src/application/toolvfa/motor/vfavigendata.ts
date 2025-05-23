import { ServerPaths } from "../server/vfaserverpaths";


/**
 * VfaVideoMData.DEF
 */
export class VfaVideoMData {

    public static DEF:VfaVideoMData = new VfaVideoMData(0,0,0,0,0,0);

    public framerate:number;
    public userId:number=0;
    public videoCf: number=0;
    public elemtrCf: number=0;
    public elemNrCf: number=0;  
    
    public duration:number=0;
    public elemNrDuration:number=0;
    public elemTrDuration:number=0;
    public alphaUnit: number=0;
    public alphaRangeAsc = [0.0, 1.0];
    public alphaRangeDesc = [1.0, 0.0];
    public unit: number=0;
    public currvalue;
    public videoIndex; 

    public viListPaths:string[] = [];

    constructor(framerate:number,videoCf:number,elemTrCf:number,elemNrCf:number,percUnit:number,alphaUnit:number){
        this.framerate = framerate;        
        this.videoCf = videoCf;
        this.elemtrCf = elemTrCf;
        this.elemNrCf = elemNrCf;
        this.unit = percUnit;
        this.alphaUnit = alphaUnit;

        this.duration = this.framerate * this.videoCf ;
        this.elemNrDuration = this.framerate * this.elemNrCf;
        this.elemTrDuration = this.framerate * this.elemtrCf;

        this.currvalue=0;
        this.videoIndex = 0;        
    }

    public getNextViFilePath():string {
        const path: string = ServerPaths.getVideoFilePath(this.userId,this.videoIndex);
        //console.log(path);
        this.viListPaths.push(path);
        this.videoIndex++;
        return path;
    }

}