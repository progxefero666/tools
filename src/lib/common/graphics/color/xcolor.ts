

export class XColor {

    public static DEF = new XColor(0,0,0,1);
    public r: number; // 0-255
    public g: number; // 0-255
    public b: number; // 0-255
    public alpha: number; // 0.0-1.0
    public cvcolor:string;
    public sharpColor: { r: number; g: number; b: number; alpha: number };

    constructor(r: number, g: number, b: number, alpha: number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.alpha = alpha;
        this.cvcolor= `rgba(${this.r}, ${this.g}, ${this.b}, ${this.alpha})`;
        this.sharpColor = { r: this.r, g: this.g, b: this.b, alpha: this.alpha };
    }

    public toSharpColor(){
        return { r: this.r, g: this.g, b: this.b, alpha: this.alpha };
    }


    // Método opcional: convertir a HEX (útil si lo necesitas)
    public toHex(): string {
        const hexR = this.r.toString(16).padStart(2, '0');
        const hexG = this.g.toString(16).padStart(2, '0');
        const hexB = this.b.toString(16).padStart(2, '0');
        return `#${hexR}${hexG}${hexB}`;
    }

    // Método privado para asegurar valores dentro del rango
    private clampValue(value: number, min: number, max: number): number {
        return Math.min(Math.max(value, min), max);
    }
    
}