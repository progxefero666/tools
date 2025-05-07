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
    
    /**
     * Método para mover el punto a nuevas coordenadas.
     * @param newX - Nueva coordenada X.
     * @param newY - Nueva coordenada Y.
     */
    move(newX: number, newY: number): void {
      this.x = newX;
      this.y = newY;
    }
  
    /**
     * Método para calcular la distancia entre este punto y otro.
     * @param other - Otro punto 2D.
     * @returns Distancia euclidiana entre los dos puntos.
     */
    distanceTo(other: Point2D): number {
      const dx = this.x - other.x;
      const dy = this.y - other.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  
    /**
     * Método para clonar el punto actual.
     * @returns Una nueva instancia de Point2D con las mismas coordenadas.
     */
    clone(): Point2D {
      return new Point2D(this.x, this.y);
    }
  
    /**
     * Método para representar el punto como una cadena.
     * @returns Una representación en formato "(x, y)".
     */
    toString(): string {
      return `(${this.x}, ${this.y})`;
    }
  }