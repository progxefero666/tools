import { Point2D } from "../graphics/model/point2d";

/**
 * class GeoPolyHelper
 */
export class GeoPolyHelper {

    /*
    public static getTempPoints(): Point2D[] {
        let points: Point2D[] = [];
        return points;
    }
    */
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

}//end class