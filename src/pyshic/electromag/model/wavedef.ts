import { Physic } from "@/pyshic/pyshic";

/*
x(t)= A * sen(2pi*frec*t)		
u(x,t)= A cos(kx−ωt+ϕ)		
k = 2π/λ
λ = v/f=> λ=c/f =>v= λ*f
w = 2pi*f o(ω=2π /T)    
*/
/**
 * class WaveDef 
 *  mass: masa de la partícula asociada a la onda
 *  momentum: momento de la partícula asociada a la onda
 *  lambda: longitud de onda
 *  (relativista): La velocidad de la PARTÍCULA se relaciona con su momento  y masa 
 *  actual-->no relativista:p = sqrt(2mE)-> E = p^2 / (2m)* 
 */
export class WaveDef {

    // φ(x, t) = kx - ωt + φ
    // w :velocodad oscilamiento angular
    public partmass: number;
    public energy: number = 0; // E
    public momentum: number = 0;
    public amplitudeM: number; // Amax
    public period: number = 0; // T
    public lambda: number = 0; // λ
    public velocity: number = 0;
    public frequency: number;
    public partvelocity: number = 0;
    public w: number = 0;
    public  k: number = 0;
    public phase: number = 0;

    constructor(frequency: number, amplitude: number, mass: number) {
        this.frequency = frequency;
        this.amplitudeM = amplitude;
        this.partmass = mass;
        this.calculateAllParameters();
    }

    private calculateAllParameters(): void {
        this.w = 2 * Math.PI * this.frequency;
        this.energy = Physic.PLANCK_CONSTANT * this.frequency;
        this.momentum = Math.sqrt(2 * this.partmass * this.energy);
        this.lambda = Physic.PLANCK_CONSTANT / this.momentum;
        this.partvelocity = this.momentum / this.partmass;
        this.k = 2 * Math.PI / this.lambda;
        this.period = 1 / this.frequency;
        this.velocity = this.lambda * this.frequency;

        //this.momentum = Physic.PLANCK_CONSTANT *this.k
        //
    }

    //+ this.phase = 0
    public getAmplitudeAt(time: number): number {
        return this.amplitudeM * Math.cos((this.w * time));
    }

    //+ this.phase = 0
    public getPhaseAt(distance: number, time: number): number {
        return ((this.k * distance) - (this.w * time));
    }

    /**
     * Calcula la velocidad de oscilación (vertical) de un punto de la onda en un momento dado.
     * Esta es la primera derivada de la función de amplitud con respecto al tiempo.
     * dy/dt​=−Aωsin(ωt) 
     * @param time El tiempo en segundos.
     * @returns La velocidad de oscilación en unidades de amplitud/segundo.
     */
    public getOscillationVelocityAt(time: number): number {
        // La fórmula es -A * ω * sin(ωt)
        return -this.amplitudeM * this.w * Math.sin(this.w * time);
    }

    // Suponiendo que estas propiedades ya existen en tu clase WaveDef
    // public amplitudeM: number; // A
    // public wfrequency: number; // ω (lo llamas 'w' en tu getAmplitudeAt, lo usaré como 'w')

    /**
     * Calcula la aceleración de oscilación (vertical) de un punto de la onda en un momento dado.
     * Esta es la segunda derivada de la función de amplitud con respecto al tiempo.
     * @param time El tiempo en segundos.
     * @returns La aceleración de oscilación en unidades de amplitud/segundo^2.
     */
    public getOscillationAccelerationAt(time: number): number {
        // La fórmula es -A * ω^2 * cos(ωt)
        return -this.amplitudeM * Math.pow(this.w, 2) * Math.cos(this.w * time);
    }
    
    public toJSonString(): string {
        return JSON.stringify(this, null, 4);
    }

    public print(): void {
        console.log(this.toJSonString);
    }


    /*
    public getDistanceAt(time: number): number {
        return this.amplitudeM * Math.sin((Math.PI*2)* this.frequency * time);
    }*/

}//end class


// CUIDADO: La velocidad de la onda asociada a una partícula CON MASA
// Es la 'velocidad de fase' (v_p = omega / k).
// Y el momento de la partícula es p = h / lambda.

// Si definimos la frecuencia, y la masa, podemos calcular la energía de la partícula
// (si la energía de la partícula se relaciona con la frecuencia de su onda de la misma forma que un fotón)