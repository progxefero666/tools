
import * as THREE from 'three';
import { Point3d } from "@/common/system3d/model/point3d";

/**
 * class ThreePlane.getBufferGeometry(,,)
 */
export class ThreeGeneratorPlane {

    public static getBufferGeometry(sidesw: number, sidesd: number, vertex: Point3d[]): THREE.BufferGeometry {
        const geometry = new THREE.BufferGeometry();
        const numVerticesX = sidesw + 1; // Total de vértices en X en una fila
        const numVerticesZ = sidesd + 1; // Total de vértices en Z (número de filas)
        const totalVertices = numVerticesX * numVerticesZ;

        // 1. Crear el array de posiciones (Float32Array)
        const positions = new Float32Array(totalVertices * 3);

        for (let i = 0; i < totalVertices; i++) {
            const point = vertex[i].position;
            positions[i * 3 + 0] = point[0]; // X
            positions[i * 3 + 1] = point[1]; // Y
            positions[i * 3 + 2] = point[2]; // Z
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // 2. Crear el array de índices para las caras (Uint32Array)
        const numFaces = sidesw * sidesd * 2;
        const indices = new Uint32Array(numFaces * 3);

        let index = 0;
        for (let z = 0; z < sidesd; z++) { // Recorre filas (Z en el grid lógico)
            for (let x = 0; x < sidesw; x++) { // Recorre columnas (X en el grid lógico)
                // Índices de los 4 vértices del "cuadrado" actual, en tu orden "por filas"
                const topLeft     = z * numVerticesX + x;
                const topRight    = z * numVerticesX + (x + 1);
                const bottomLeft  = (z + 1) * numVerticesX + x;
                const bottomRight = (z + 1) * numVerticesX + (x + 1);

                // Triángulo 1 (TL, TR, BL) - Esto debería generar la normal hacia +Y
                //  TL --- TR
                //  |   /  |
                //  BL -----
                indices[index++] = topLeft;
                indices[index++] = topRight;
                indices[index++] = bottomLeft;

                // Triángulo 2 (TR, BR, BL) - Esto debería generar la normal hacia +Y
                //      --- TR
                //     /  |
                //  BL --- BR
                indices[index++] = topRight;
                indices[index++] = bottomRight;
                indices[index++] = bottomLeft;
            }
        }

        geometry.setIndex(new THREE.BufferAttribute(indices, 1));

        // Calcular las normales de los vértices para que la iluminación funcione correctamente
        geometry.computeVertexNormals();

        return geometry;
    }



}//end class