import { ConfigCollections } from "./cfgcollections";

export class CtrlUiCollection{

    private uicompCntPageRows:number = 0;

    constructor(uicompCountElements?:number){
        if(uicompCountElements){
            this.uicompCntPageRows = uicompCountElements;
        }
        else {
            this.uicompCntPageRows = ConfigCollections.UICOMP_COUNTELEMENTS;
        }
    }
    

}//end class