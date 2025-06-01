
import { point, polygon, booleanPointInPolygon } from '@turf/turf';
import { Point2D } from '../graphics/model/point2d';
import { PlaneSquareY } from '@/pyshic/model/pyplane';
import { Vector3d } from '@/types/types';
import { Point3d } from '../system3d/model/point3d';


/**
 * class MathPoly2d
 * Vector3d
 */
export class MathPoly2d {

    public static isPointInsidePolygon(point2d:Point2D, polygonPoints:Point2D[]): boolean {    
        const turfPoint = point([point2d.x, point2d.y]);
        const turfPolygon = polygon([polygonPoints.map(p => [p.x, p.y])]); // Usar p.x y p.y
        return booleanPointInPolygon(turfPoint, turfPolygon);
    }

    public static analizePlainVertex(polyVertex:Point2D[],vertex: Point3d[]): boolean[]{    
        let flags:boolean[] = [];
        for(let idx=0;idx<vertex.length;idx++){
            const point_xy= new Point2D(
                vertex[idx].position[0],
                vertex[idx].position[2]);
            flags[idx]= MathPoly2d.isPointInsidePolygon(point_xy,polyVertex);
        }
        return flags;        
    }    
    
    /*
    public static analizePlainFcVertex(polyVertex:Point2D[],planeY:PyPlaneSquare): boolean[][]{    
        let flags:boolean[][] = [];

        for(let idx=0;idx<planeY.vertex.length;idx++){
            flags[idx] = [];
            for(let idy=0;idy<planeY.vertex[idx].length;idy++){
                const point_xy= new Point2D(
                    planeY.vertex[idx][idy].position[0],
                    planeY.vertex[idx][idy].position[2]);
                flags[idx][idy]= MathPoly2d.isPointInsidePolygon(point_xy,polyVertex);
            }
        }
        return flags;        
    }
    */

}//end class


/*
const isInside = isPointInsidePolygon(
    vertex.x,
    vertex.z,
    polygonPoints
);*/
