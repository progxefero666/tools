
import { WebColors } from "@/common/graphics/color/webcolors";
import { Point2D } from "@/common/graphics/model/point2d";
import { math } from "@/common/math/mathjslib";
import { MathPoly2d } from "@/common/math/mathpoly2d";
import { Point3d } from "@/common/system3d/model/point3d";
import { System3d } from "@/common/system3d/system3d";
import { PlaneSquareY } from "@/pyshic/model/pyplane";
import { PySphere } from "@/pyshic/model/pysphere";

import { Vector3d } from "@/types/types";
import { GlCamera } from "@/webgl/cameras/glcamera";
import { GlConfig } from "@/webgl/glconfig";
import { Threemath } from "@/webgl/math/threemath";
import { GlPrimitiveUtil } from "@/webgl/primitives/glprimutil";
import { MetalMaterials } from "@/webgl/three/material/metalmaterials";
import { ThreeLine } from "@/webgl/three/model/thline";
import { GlPoliedros } from "@/webgl/three/render/threnderpoliedros";

import * as THREE from 'three';


/**
 * class AppQuantumControl 
 *  DEF_CAMERA_DIRECTION: [0,0,GlConfig.Z_NEG]
 */
export class AppGravityControl {

    public static readonly DEF_CAMERA_DISTCC: number = 10.0;
    public static readonly DEF_CAMERA_HINC: number = 4.0;
    public static readonly DEF_CAMERA_DIRECTION: Vector3d = [0, 0, GlConfig.Z_NEG];//Z neg

    public backcolor: THREE.Color = new THREE.Color("#000000");
    public cameraMain: GlCamera | null = null;

    public pysphere: PySphere | null = null;
    public sphere_mesh: THREE.Mesh | null = null;
    public pyplane: PlaneSquareY | null = null;

    public pyspherePolyLine: ThreeLine | null = null;

    constructor() {
        this.loadIinitCamera();
        this.loadSphere();
        this.loadPlane();
    }//end 

    loadIinitCamera = () => {
        const cam_position: Vector3d = [0, AppGravityControl.DEF_CAMERA_HINC, AppGravityControl.DEF_CAMERA_DISTCC];
        this.cameraMain = new GlCamera(cam_position,
            AppGravityControl.DEF_CAMERA_DIRECTION,
            GlConfig.CAMERA_FOV,
            GlConfig.CAMERA_ASPECT,
            GlConfig.CAMERA_NEAR,
            GlConfig.CAMERA_FAR);
    }

    private loadSphere = () => {
        this.pysphere = new PySphere("esferaA", (1000.0), 3, [0.0, 4.0, 0.0], WebColors.COLOR_PLATE);
        /*
        const objMaterial = MetalMaterials.getMaterial(this.pysphere.color, 0.95, 0.01);
        const geometry = new THREE.SphereGeometry(this.pysphere.radius, GlPoliedros.SPHERE_SIDES, GlPoliedros.SPHERE_SIDES);
        this.sphere_mesh = new THREE.Mesh(geometry, objMaterial);
        this.sphere_mesh.name = this.pysphere.name;
        this.sphere_mesh.position.set(this.pysphere.position[0], this.pysphere.position[1], this.pysphere.position[2]);
        */
    }

    private loadPlane = () => {
        this.pyplane = new PlaneSquareY(10, 64, [0, 0, 0], [0, 0, 0], "#00ff00", WebColors.COLOR_BLACK );
        this.pyplane.applyTransform(this.pysphere!);
    }



    setLightning = (scene: THREE.Scene) => {
        const ambientLight = new THREE.AmbientLight("#ffffff", 2);
        const directionalLight = new THREE.DirectionalLight("#ffffff", 1);
        directionalLight.position.set(1, 2, 3);
        const pointLight = new THREE.PointLight("#ffffff", 1);
        pointLight.position.set(5, 5, 5);
        scene.add(ambientLight);
        scene.add(directionalLight);
        scene.add(pointLight);
    }//end

    private selectPlaneVertex = () => {
        const pyspherePolyVertex: Point2D[] = this.pysphere!.getProy2dPolyPoints();
        const vertexflags: boolean[] = MathPoly2d.analizePlainVertex(pyspherePolyVertex, this.pyplane!.vertex);
        this.pyplane!.selectVertex(vertexflags);
    };

    public executeRays = (scene: THREE.Scene) => {
        const sphere = scene.getObjectByName(this.sphere_mesh!.name);
        Threemath.chargeIntersections(this.pyplane!.vertex,sphere!);
        //this.pyplane!.applyTransform(this.pysphere!.radius);
        //alert("executeRays end");
    }//end

}//end class