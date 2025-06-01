import { Vector3d } from "@/types/types";
import { Point3d } from "../system3d/model/point3d";

/**
 * class Math3d.calculateChordLength(radius: number, angleRadians: number)
 */
export class Math3d {
    /**
     * getDistance
     * @param p1 
     * @param p2 
     * @returns distance
     */
    public static getDistance(p1: Vector3d, p2: Vector3d): number {
        const dx = p1[0] - p2[0];
        const dy = p1[1] - p2[1];
        const dz = p1[2] - p2[2];
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
    /**
     * getLineCenter
     * @param p1 
     * @param p2 
     * @returns center point of line
     */
    static getLineCenter(p1: Vector3d, p2: Vector3d) {
        var coordCalc = [];
        for (let idx = 0; idx < 3; idx++) {
            coordCalc[idx] = p1[idx] + ((p2[idx] - p1[idx]) / 2.0);
        }
        return coordCalc;
    }//end 	



    /**
     * // ρ = Q / V
     * @param valueQ The total "charge" or "deforming influence" 
     * @param volume The volume over which the "charge" is distributed.
     * @returns The volume density.
     */
    public static getVolumeDensity(valueQ: number, volume: number): number {
        return valueQ / volume;
    }

    /**
     * chargeDistances
     * @param origin Vector3d
     * @param vertex Point3d[]
     * 
     * This method calculates the distance from each vertex to the origin point.
     */
    public static chargeDistances(origin: Vector3d, vertex: Point3d[]): void {
        for (let elem of vertex) {
            elem.flag_distance = Math3d.getDistance(origin, elem.position);
        }
    }

}//end class Math3d