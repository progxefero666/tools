
import { OpCfg } from "../opconfig";


/**
 * class OpDataResult
 */
export class OpDataResult {

    public static DEF:OpDataResult = new OpDataResult(OpCfg.RES_SUCCESS);

    public result:string;
    public data: string; //json string

    constructor(result: string, data?: string) {
        this.result = result;
        this.data = data ?? OpCfg.RES_UNDEFINED;
    }
    
    public toRespFormat(){
        return JSON.stringify(this);
    }

}