import { Point2D } from "../graphics/model/point2d";


/**
 * class Math2D.getCfPoints() Point2D[]
 */
export class Math2D {
    

    public static getPointsDistance(pointA: Point2D, pointB: Point2D): number {
        const dx = pointA.x - pointB.x;
        const dy = pointA.y - pointB.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    public static getAleatoryRadius(range:number[]):number {
        const [min, max] = range;
        return Math.floor(Math.random() * (max - min + 1)) + min;   
    }

    public static getCfPoints(center: Point2D, radius: number, countPoints: number): Point2D[] {
        const angleStep = (2 * Math.PI) / countPoints; 
        const points: Point2D[] = [];
        for (let i = 0; i < countPoints; i++) {
            const angle = i * angleStep; 
            const x = center.x + radius * Math.cos(angle);
            const y = center.y + radius * Math.sin(angle);
            points.push(new Point2D(x, y));
        }
        return points;
    }

    /**
     * Interpola linealmente entre dos puntos 2D usando un factor alpha.
     * @param startPoint El punto de inicio de la interpolacion (Point2D).
     * @param endPoint El punto final de la interpolacion (Point2D).
     * @param alpha El factor de interpolacion (0 = startPoint, 1 = endPoint).
     * @returns Un nuevo Point2D que representa el punto interpolado.
     */
    public static getPointOnLine(startPoint: Point2D, endPoint: Point2D, alpha: number): Point2D {
        // Calcular las coordenadas del punto interpolado
        const x = startPoint.x + alpha * (endPoint.x - startPoint.x);
        const y = startPoint.y + alpha * (endPoint.y - startPoint.y);

        // Devolver el nuevo punto 2D
        return new Point2D(x, y);
    }

    /*
   /**
     * Calcula el factor de interpolacion (0 a 1) a lo largo del eje de profundidad proyectado en 2D
     * para un punto 3D dado por su coordenada Y (profundidad).
     * 0 corresponde al plano frontal, 1 al plano trasero.
     * Asume que el eje Y 3D va de -this.deepthHalf (frontal) a +this.deepthHalf (trasero).
     * @param coordY La coordenada Y (profundidad) del punto 3D.
     * @returns El factor de interpolacion (alpha) entre 0 y 1.
     
    public getDepthIntFactor(coordY: number): number {

        // Calcular distancias desde el observador a los planos frontal, trasero y al punto 3D
        // Asumimos observador a 'focalLength' *frente* del plano frontal (en Y = -this.deepthHalf)
        // La distancia al punto es focalLength 
        // + su "profundidad relativa al frente" (point3DY + this.deepthHalf)
        const distanceObserverToFront = this.focalLength;
        const distanceObserverToBack = this.focalLength + this.deepth;       
        const distanceObserverToPoint = this.focalLength + (coordY + this.deepthHalf);
        const invDistFront  = 1 / distanceObserverToFront;
        const invDistBack   = 1 / distanceObserverToBack;
        const invDistPoint  = 1 / distanceObserverToPoint;
        // la interpolacion lineal en el espacio de la inversa de la distancia
        //  = (invDistFront - invDistPoint) / (invDistFront - invDistBack)
        const invDistRange = invDistFront - invDistBack;
        return ((invDistFront - invDistPoint) / invDistRange);
    }    
    */
}//end class