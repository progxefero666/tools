import { ServerPaths } from "@/application/toolvfa/server/vfaserverpaths";


export class VfaViProcData {

    public userId : number;
    public unit: number;
    public currvalue:number;
    public videoIndex: number; 

    public viListPaths:string[] = [];

    constructor(userId : number,unit: number,currvalue:number){
        this.userId=userId;
        this.unit=unit;
        this.currvalue=currvalue;
        this.videoIndex = 0;        
    }
    public getNextViFilePath():string {
        const path: string = ServerPaths.getVideoFilePath(this.userId,this.videoIndex);
        this.viListPaths.push(path);
        this.videoIndex++;
        return path;
    }

}//end class