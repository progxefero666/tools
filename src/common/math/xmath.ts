import Complex from "complex.js";


/**
 * class XMath.esPar
 */
export class XMath {

    public static readonly RAD: number = Math.PI / 180;
    public static readonly DEG_TO_RAD_FACTOR: number = 180 / Math.PI;


    public static esPar(numero: number): boolean {
        return numero % 2 === 0;
    }


    public static getPercent(value100: number, valueCalc: number): number {
        let v1 = new Complex(1, 0);
        return (valueCalc * 100) / value100;
    }

    public static getValueOfPercent(value100: number, percCalc: number): number {
        return (value100 * percCalc) / 100.0;
    }

    public static toGrades(valueRad: number): number {
        return valueRad * XMath.DEG_TO_RAD_FACTOR;
    }



}//end class