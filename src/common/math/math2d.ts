// src/common/math/math2d.ts

import { Vector2d } from "@/types/types";
import { Point2D } from "../graphics/model/point2d";


/**
 * class Math2D.getDistance
 */
export class Math2D {

    public static getDistance(pointA: Vector2d, pointB: Vector2d): number {
        const dx = pointA[0] - pointB[0];
        const dy = pointA[1] - pointB[1];
        return Math.sqrt(dx * dx + dy * dy);
    }

    public static getPointsDistance(pointA: Point2D, pointB: Point2D): number {
        const dx = pointA.x - pointB.x;
        const dy = pointA.y - pointB.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    public static getTwoPointsAngle(pointA: Vector2d, pointB: Vector2d): number {
        const dx = pointB[0] - pointA[0];
        const dy = pointB[1] - pointA[1];
        const angleRadians = Math.atan2(dy, dx);
        return angleRadians;
    }

    public static getAleatoryRadius(range: number[]): number {
        const [min, max] = range;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public static getCfPoint(centro: Vector2d, radio: number, anguloRadianes: number): Vector2d {

        const xRelativo = radio * Math.cos(anguloRadianes);
        const yRelativo = radio * Math.sin(anguloRadianes);
        const x = centro[0] + xRelativo;
        const y = centro[1] + yRelativo;

        return [x, y];
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


    public static getInter(pA: Vector2d, r1: number, pB: Vector2d, r2: number): Vector2d[] {

        const dx = pB[0] - pA[0];
        const dy = pB[1] - pA[1];
        const dCuadrado = dx * dx + dy * dy;
        const d = Math.sqrt(dCuadrado);

        const a = (r1 * r1 - r2 * r2 + dCuadrado) / (2 * d);
        const h = Math.sqrt(r1 * r1 - a * a);

        const p3x = pA[0] + (dx * a) / d;
        const p3y = pA[1] + (dy * a) / d;

        const offsetX = (h * dy) / d;
        const offsetY = (h * dx) / d;

        const puntoInterseccion1: Vector2d = [p3x + offsetX, p3y - offsetY]
        const puntoInterseccion2: Vector2d = [p3x - offsetX, p3y + offsetY]

        return [puntoInterseccion1, puntoInterseccion2];
    }

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