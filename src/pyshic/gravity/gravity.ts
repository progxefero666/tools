

//public static EULERS_NUMBER: number = Math.E; 
//console.log(EULERS_NUMBER); // Salida: 2.718281828459045

/**
 * class Gravity
 */
export class Gravity {

    public static readonly C: number = 299792458; // metros por segundo (m/s)
    public static readonly NEWTON_G:number = 9.80665; // m/s²

    public static readonly G: number = 6.67430e-11; // m³/kg s²    
    public static readonly EINSTEIN_FACTOR: number = (8*Math.PI*Gravity.G)/Math.pow(Gravity.C,4);
    // 2.076616 × 10⁻⁴³ s²/kg·m.

    public static getMassEnergy(mass:number):number {
        return mass * Math.pow(Gravity.C,2);
    }

}//end class

export class GravityUtil {

    /**
     * get Two object Gravity Attraction Forze
     * @param distance 
     * @param mass_a 
     * @param mass_b 
     * @returns Newtons
     */
    public static getAttractionForze(distance: number, mass_a: number, mass_b: number): number {
        if (distance<=0||mass_a<0||mass_b<0) {return 0;}
        const force: number = Gravity.G * (mass_a * mass_b) / (distance * distance);
        return force;
    }

    public static getWeight(mass: number):number {
        return Gravity.NEWTON_G * mass;
    }
  
}//end class