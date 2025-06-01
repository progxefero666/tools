
/**
 * class MatGrappAxisXY
 * axisX_unit:number,axisY_unit:number
 */
export class MathGrappAxisXY {
    
    public axisX_size: number=0;
    public axisY_size: number=0;
    public axisX_unit: number=0;
    public axisY_unit: number=0;    
    public dataX: number[] = [];
    public dataY: number[] = [];
    public dataPhi: number[] = [];

    constructor(axisX_size:number,axisY_size:number,dataX:number[],dataY:number[],dataPhi:number[]) {
        this.axisX_size = axisX_size;
        this.axisY_size = axisY_size;
        this.dataX = dataX;
        this.dataY = dataY;
        this.dataPhi = dataPhi;    
    }

    public toJSonString(): string {
        return JSON.stringify(this,null,4);
    }

    public print(): void {
        console.log(this.toJSonString);
    }

}//enc class