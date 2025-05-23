
/**
 * class Point3D 
 */
export class PointXYZ {
    
    public static DEF = new PointXYZ(0, 0, 0);
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    asArray(): number[] {
        return [this.x, this.y, this.z];
    }

    getCloned(): PointXYZ {
        return new PointXYZ(this.x, this.y, this.z);
    }

    // json format
    toString(): string {
        return JSON.stringify(this);
    }


    //distance to
    /*
    // move to
    move(newX: number, newY: number): void {
        this.x = newX;
        this.y = newY;
    }    
    distanceTo(other: Point3D): number {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    */

}