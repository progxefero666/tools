// models/Point2D.ts

export class Point2D {
    public static DEF = new Point2D(0,0);    
    public x: number= 0;
    public y: number= 0;
    constructor(x: number, y: number) {
      this.x = x; 
      this.y = y;
    }
  
    getCloned(): Point2D {
      return new Point2D(this.x,this.y);
    }
    
    // move to
    move(newX: number, newY: number): void {
      this.x = newX;
      this.y = newY;
    }
  
    // distance to
    distanceTo(other: Point2D): number {
      const dx = this.x - other.x;
      const dy = this.y - other.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  
    //clone
    clone(): Point2D {
      return new Point2D(this.x, this.y);
    }
  
    // json format
    toString(): string {
      return `(${this.x}, ${this.y})`;
    }

  }