
import * as THREE from 'three';
import { Vector3, Mesh, Group } from "three";

import { Math2D } from "@/common/math/math2d";
import { Point2D } from "@/common/graphics/model/point2d";
import { Rotation3d, Vector3d } from "@/types/types";
import { Math3dPlane } from "@/common/math/math3dplane";
import { System3d } from "@/common/system3d/system3d";
import { Point3d } from "@/common/system3d/model/point3d";
import { Plane2dDef } from '@/common/geometry/model/plane2ddef';
import { DataUtil } from '@/common/math/datautil';
import { XMath } from '@/common/math/xmath';
import { ThreeGeneratorPlane } from '@/webgl/three/generator/thgenplane';
import { GeoMaterials } from '@/webgl/three/material/geomaterials';


import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree, MeshBVH } from 'three-mesh-bvh';
import { PySphere } from './pysphere';
import { Math3d } from '@/common/math/math3d';
import { GravityUtil } from '../gravity/gravity';
import { MathPoly2d } from '@/common/math/mathpoly2d';

/**
 * class PyPlane
 * this.plane2dDef = new Plane2dDef(size,size,sides,sides);
 * public sizeunit: number = 0;
 * this.sizeunit = this.size / this.sides;
 */
export class PlaneSquareY {

    public axis: number = 1;
    public size: number;
    public sides: number;

    public position: Vector3d;
    public direction: Vector3d = [0, 0, 0];
    public rotation: Rotation3d = [0, 0, 0];

    //materials
    public meshAlpha: number = 1.0;
    public meshColor: string = "#00ff00";
    public gridColor: string = "#000000";
    public geometry: THREE.BufferGeometry | null = null;
    public material: THREE.MeshStandardMaterial;

    //grid
    //public plane2dDef:Plane2dDef;
    public planeCatV: number[][];
    public vertex: Point3d[];
    public vertex_sel: Point3d[] = [];

    constructor(size: number, sides: number,
        position: Vector3d, rotation: Rotation3d,
        meshColor: string, gridColor: string) {
        this.size = size
        this.sides = sides;
        this.position = position;
        this.rotation = rotation;
        this.direction = [0.0, 1.0, 0.0];
        this.meshColor = meshColor;
        this.gridColor = gridColor;

        //obj mesh 
        this.vertex = Math3dPlane.getPointsPlaneY(this.position, this.size, this.sides);
        this.material = GeoMaterials.getGeoObjMaterial(this.meshColor, this.meshAlpha, 0.8, 0.1);
        this.planeCatV = Math3dPlane.getPlaneCatalogVertex(this.size, this.size, 8);
    }

    public selectVertex(vertexflags: boolean[]): void {
        this.vertex_sel = [];
        for (let idx: number = 0; idx < vertexflags.length; idx++) {
            if (vertexflags[idx]) {
                this.vertex[idx].flag_selected = 1;
                this.vertex_sel.push(this.vertex[idx]);
            }
        }
    }

    public applyTransform(sphere: PySphere) {
        Math3d.chargeDistances(sphere.position, this.vertex);
        const pyspherePolyVertex: Point2D[] = sphere.getProy2dPolyPoints();
        const vertexflags: boolean[]= MathPoly2d.analizePlainVertex(pyspherePolyVertex, this.vertex);
        this.selectVertex(vertexflags);
        //console.log("vertexflags: ", vertexflags);

        const totalInfluenceFlux = GravityUtil.calculateDeformationInfluenceFlux(sphere.mass);
        for (let i = 0; i < this.vertex.length; i++) {
            if(this.vertex[i].flag_selected === 1) {
                const effectiveDistance = Math.max(this.vertex[i].flag_distance, sphere.radius * 0.1);

                const deformationMagnitude = GravityUtil.calculateDeformationFieldMagnitude(
                    totalInfluenceFlux, effectiveDistance);

                this.vertex[i].position[1] = this.vertex[i].position[1] + (deformationMagnitude * sphere.factorF);                
            }
        }

        this.geometry = ThreeGeneratorPlane.getBufferGeometry(this.sides, this.sides, this.vertex);
    }

    public getThreeDirection(): THREE.Vector3 {
        return new THREE.Vector3
            (this.direction[0], this.direction[1], this.direction[2]);
    }



}//end class    