
import { PointXYZ } from '@/common/system3d/model/pointxyz';
import { Vector3d } from '@/types/types';
import { Vector3 } from 'three';
import * as THREE from 'three';

import { GlSegment } from '../primitives/model/glsegment';
import { ThreeSegment } from './model/threesegment';

/**
 * class ThreeUtil.getColorsBuffer
 */
export class ThreeUtil {

    public static getPointArray(point: PointXYZ): number[] {
        return [point.x, point.y, point.z];
    }

    public static getVector3dArray(vector3d: Vector3d): number[] {
        return vector3d;
    }

    public static getThreeVertex(point: Vector3d): THREE.Vector3 {
        return new THREE.Vector3(point[0], point[1], point[2]);
    }

    public static getThreeSegment(segment: GlSegment): ThreeSegment {
        return new ThreeSegment(
            ThreeUtil.getThreeVertex(segment.start),
            ThreeUtil.getThreeVertex(segment.end));
    }

    public static getThreeVector(point: PointXYZ): THREE.Vector3 {
        return new THREE.Vector3(point.x, point.y, point.z);
    }

    public static getVector3d(point: PointXYZ): Vector3d {
        return [point.x, point.y, point.z];
    }

    public static getColorsBuffer(colors: string[]): Float32Array {
        const numPoints = colors.length;
        const colorValues = new Float32Array(numPoints * 3);
        for (let i = 0; i < numPoints; i++) {
            const color = new THREE.Color(colors[i]);
            colorValues[i * 3] = color.r;
            colorValues[i * 3 + 1] = color.g;
            colorValues[i * 3 + 2] = color.b;
        }
        return colorValues;
    }


}//end class