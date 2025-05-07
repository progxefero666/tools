//only server

import { OpDataResult } from "./model/opdataresult";
import { OpResult } from "./model/opresult";
import { OpCfg } from "./opconfig";

/**
 * class OpHelper 
 */
export class OpHelper {

    // OpResult
    //.......................................................................
    static genOpRespSuccess(): OpResult {
        return new OpResult(OpCfg.RES_SUCCESS);
    }

    static genOpRespError(message?:string ): OpResult {
        if(message){return new OpResult(OpCfg.RES_ERROR,message);}
        else {return new OpResult(OpCfg.RES_ERROR);}        
    }

    // OpDataResult
    //.......................................................................    

    static genOpDtRespSuccess(data:string,message:string|null): OpDataResult {
        return new OpDataResult(OpCfg.RES_SUCCESS,message,data);
    }
    static genOpDtRespError(message?:string ): OpDataResult {
        if(message){return new OpDataResult(OpCfg.RES_ERROR,message);}
        else {return new OpDataResult(OpCfg.RES_ERROR,OpCfg.RES_UNDEFINED);}        
    }
    //OpDataResult

} //end class