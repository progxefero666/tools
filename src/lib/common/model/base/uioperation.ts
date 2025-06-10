import { AppConstants } from "@/libold/app/constants";


export class UiOperation {

    public id:string;
    public color:string;
    public symbol?:string;
    public text?:string;

    constructor(id:string,color:string,text:string|null,symbol:string|null ){
        this.id = id;
        this.color = color;
        if(text)    {this.text = text}
        if(symbol)  {this.symbol = symbol}
    }

}//end class