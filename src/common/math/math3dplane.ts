import { Vector3d } from "@/types/types";
import { Point3d } from "../system3d/model/point3d";
import { Plane2dDef } from "../geometry/model/plane2ddef";

/**
 * class Math3dPlane.getVertexPlaneY(System3d.AXIS_Y,10.0, [0,0,0],100)
 */
export class Math3dPlane {

    //countVertex = Math.pow((sides+1),2);
    
    public static getVertexPlaneY(size: number, position: Vector3d, sides: number): Vector3d[] {
        const segmentSize: number = size / sides;
        const halfSize: number = size / 2.0;
        const planeVertex: Vector3d[] = []; // Array 1D para almacenar los vértices

        // Calcular el punto de inicio para la esquina superior izquierda del plano
        // (Z más alta, X más a la izquierda) en tu sistema de coordenadas (plano XZ).
        const startX: number = position[0] - halfSize;
        const startZ: number = position[2] + halfSize; // Z más alta

        // Iterar para generar los vértices en orden de filas (Z, luego X)
        // La "fila" se define por Z (va de startZ hacia abajo)
        for (let zIndex: number = 0; zIndex <= sides; zIndex++) { 
            const currentZ: number = startZ - (zIndex * segmentSize);
            for (let xIndex: number = 0; xIndex <= sides; xIndex++) { 
                const currentX: number = startX + (xIndex * segmentSize);
                planeVertex.push([currentX, position[1], currentZ]);
            }
        }
        return planeVertex;
    }

    
    public static getPointsPlaneY( position: Vector3d,size: number, sides: number): Point3d[] {
        const direction: Vector3d = [0.0,1.0,0.0];
        const segmentSize: number = size / sides;
        const halfSize: number = size / 2.0;
        const planeVertex: Point3d[] = []; // Array 1D para almacenar los vértices

        // (Z más alta, X más a la izquierda) 
        const startX: number = position[0] - halfSize;
        const startZ: number = position[2] + halfSize; // Z más alta

        for (let zIndex: number = 0; zIndex <= sides; zIndex++) { 
            const currentZ: number = startZ - (zIndex * segmentSize);
            for (let xIndex: number = 0; xIndex <= sides; xIndex++) { 
                const currentX: number = startX + (xIndex * segmentSize);
                planeVertex.push(new Point3d([currentX, position[1], currentZ],direction));
            }
        }
        return planeVertex;
    }

    /*
     * @param sidesw El número de segmentos a lo largo del ancho (eje X).
     * @param sidesd El número de segmentos a lo largo de la profundidad (eje Z).
     * @param countNeighbors Este parámetro no se usa directamente para decidir 
     * cuántos vecinos buscar (siempre se buscan los 8 teóricos),
     * sino para recordar el contexto de 8 vecinos para los interiores.
     * @returns Un array de arrays de números, donde cada sub-array contiene los índices de los vértices vecinos
     * del vértice correspondiente.
     */
    public static getPlaneCatalogVertex(sidesw: number, sidesd: number, countNeighbors: number): number[][] {
        const catalog: number[][] = [];
        const numVerticesX = sidesw + 1; // Total de vértices en una fila (X)
        const numVerticesZ = sidesd + 1; // Total de vértices en una columna (Z)

        // Recorrer los vértices en el orden que los genera THREE.PlaneGeometry (Z descendente, X creciente)
        for (let z = 0; z < numVerticesZ; z++) { // Recorre filas (Z-index en el grid)
            for (let x = 0; x < numVerticesX; x++) { // Recorre columnas (X-index en el grid)
                const currentIndex = z * numVerticesX + x;
                const neighbors: number[] = [];

                // Definir los offsets para los 8 vecinos en un grid 2D
                // (dX, dZ) representa el movimiento desde (x, z) al vecino
                const neighborOffsets = [
                    [-1, -1], [0, -1], [1, -1], // Arriba-Izquierda, Arriba, Arriba-Derecha
                    [-1, 0],           [1, 0],   // Izquierda,            Derecha
                    [-1, 1],  [0, 1],  [1, 1]    // Abajo-Izquierda, Abajo, Abajo-Derecha
                ];

                for (const offset of neighborOffsets) {
                    const neighborX = x + offset[0];
                    const neighborZ = z + offset[1];

                    // Comprobar si el vecino está dentro de los límites del grid
                    if (neighborX >= 0 && neighborX < numVerticesX &&
                        neighborZ >= 0 && neighborZ < numVerticesZ) {
                        // Calcular el índice 1D del vecino
                        const neighborIndex = neighborZ * numVerticesX + neighborX;
                        neighbors.push(neighborIndex);
                    }
                }
                catalog.push(neighbors);
            }
        }

        return catalog;
    }

    public static getVertexFcPlaneY(size: number, position: Vector3d, sides: number): Vector3d[][] {
        const segmentSize: number = size / sides;
        const halfSize: number = size / 2.0;
        const planeVertex: Vector3d[][] = [];

        let currentX: number = position[0] - halfSize;

        for (let xIndex: number = 0; xIndex <= sides; xIndex++) {
            planeVertex[xIndex] = [];
            let currentZ: number = position[2] + halfSize;
            for (let zIndex: number = 0; zIndex <= sides; zIndex++) {
                planeVertex[xIndex].push([currentX, position[1], currentZ]);
                currentZ -= segmentSize;
            }
            currentX += segmentSize;
        }
        return planeVertex;
    }

    public static getPointsPlaneFcY(size: number, position: Vector3d, sides: number): Point3d[][] {
        const segmentSize: number = size / sides;
        const halfSize: number = size / 2.0;

        const direction: Vector3d = [0.0,1.0,0.0];
        const planeVertex: Point3d[][] = [];

        let currentX: number = position[0] - halfSize;

        for (let xIndex: number = 0; xIndex <= sides; xIndex++) {
            planeVertex[xIndex] = [];
            let currentZ: number = position[2] + halfSize;
            for (let zIndex: number = 0; zIndex <= sides; zIndex++) {
                const currPoint = new Point3d([currentX, position[1], currentZ],direction);
                planeVertex[xIndex].push(currPoint);
                currentZ -= segmentSize;
            }
            currentX += segmentSize;
        }
        return planeVertex;
    }
    
}//end class