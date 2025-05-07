
import { Dimension } from "../common/model/base/dimension";
import { MMBase } from "./objtypes";
import { ProfileDimension } from "./model/profdimension";

/**
 * class DimensionProfiles.ALL_REP
 */
export class MMDimProfiles {

    public static ALL: Map<string, ProfileDimension> = new Map();
    static {
        MMDimProfiles.ALL.set(MMBase.PERSONALIZED,new ProfileDimension(new Dimension(800, 600), MMBase.PERSONALIZED));
        MMDimProfiles.ALL.set("YouTube",new ProfileDimension(new Dimension(1920, 1080), "YouTube"));
        MMDimProfiles.ALL.set("Instagram", new ProfileDimension(new Dimension(1080, 1920), "Instagram"));
        MMDimProfiles.ALL.set("TikTok", new ProfileDimension(new Dimension(1080, 1920), "TikTok"));
    }
    
    public static ALL_KEYS: string[] = Array.from(MMDimProfiles.ALL.keys());
    public static ALL_REP: string[] = MMDimProfiles.getALLProfStringArray(MMDimProfiles.ALL_KEYS);

    public static getProfileDimension(name:string):Dimension{
        if(!MMDimProfiles.ALL.has(name)){return MMBase.DEF_DIMENSION;}
        return MMDimProfiles.ALL.get(name)!.dimension;
    }

    public static getALLProfStringArray(keys:string[]):string[] {
        let res:string[] = [];
        for(let idx=0;idx<keys.length;idx++){
            res.push(MMDimProfiles.ALL.get(keys[idx])!.resolution);
        }        
        return res;
    }

}//end class