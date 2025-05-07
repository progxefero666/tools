
export class Dimension {

    public static DEF = new Dimension(0,0);

    public width: number = 0;
    public height: number = 0;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public getAspectRatio (): number {
        const asp = this.width! / this.height!;
        return asp;
    }
    public getResolution(): string {
        const widthstr = this.width.toString();
        const resolution = widthstr.concat("x").concat(this.height.toString()); 
        return resolution;
    }
    public clone(): Dimension {
        return new Dimension(this.width, this.height);
    }

}