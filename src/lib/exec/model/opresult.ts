//only server

import { OpCfg } from "../opconfig";


/**
 * class OpResult
 */
export class OpResult {
    static DEFAULT = new OpResult(OpCfg.RES_SUCCESS);

    public result:string;
    public message:string;

    constructor(result:string,message?:string){
        this.result = result;
        this.message = message ?? OpCfg.RES_UNDEFINED;
    }
    

}//end class


