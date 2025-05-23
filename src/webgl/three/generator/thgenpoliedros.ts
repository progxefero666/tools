
import * as THREE from 'three'; // Importa Three.js
import { GeoMaterials } from '../material/geomaterials';
import { Vector3d } from '@/types/types';
import { MetalMaterials } from '../material/metalmaterials';
import { DataUtil } from '@/common/math/datautil';
import { ThreeUtil } from '../threeutil';
import { ColorUtil } from '@/webgl/color/colorutil';


/**
 * class ThreeGenPoliedros.createSmallSpheres(positions: Vector3d[], color: string): THREE.Points
 */
export class ThreeGenPoliedros {

    //same color for all elements
    public static createSmallSpheres(positions: Vector3d[], color: string): THREE.Points {

        const colors = ColorUtil.getArrayColors(color,positions.length);
        const vertices = DataUtil.getVertexBuffer(positions);
        const colorValues = ThreeUtil.getColorsBuffer(colors);

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colorValues, 3));

        const material = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            sizeAttenuation: true
        });
        return new THREE.Points(geometry, material);
    }

    /*
    public static createSmallSpheres(positions: Vector3d[], colors: string[]): THREE.Points {

        const vertices = DataUtil.getVertexBuffer(positions);
        const colorValues = ThreeUtil.getColorsBuffer(colors);

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colorValues, 3));

        const material = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            sizeAttenuation: true
        });
        return new THREE.Points(geometry, material);
    }    
    */
}//end class