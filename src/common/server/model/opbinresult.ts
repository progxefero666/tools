import { OpCfg } from "../opconfig";


/**
 * class OpBinaryResult
 */
export class OpBinaryResult {

    public static DEF: OpBinaryResult = new OpBinaryResult(OpCfg.RES_SUCCESS,null);

    public result: string;
    public buffer:Buffer | null; 
    constructor(result:string,buffer:Buffer | null){
        this.result = result;        
        this.buffer = buffer;
    }

    public toRespFormat() {
        return JSON.stringify(this);
    }

}