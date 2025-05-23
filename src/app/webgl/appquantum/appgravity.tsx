import React, { useContext, useEffect, useMemo, useState } from 'react';
import { math } from "@/common/math/mathjslib";


import { Line, OrbitControls } from '@react-three/drei'
import * as THREE from 'three';
import {
    Raycaster, Vector2, Vector3,
    PerspectiveCamera, OrthographicCamera
} from 'three';
import { Canvas, useThree, useFrame, extend } from '@react-three/fiber';
import { Html } from '@react-three/drei'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

import { GlPoliedros, RenderMiniSpheresP, RenderMiniSpheresV, RenderSphere } from '@/webgl/three/render/threnderpoliedros';
import { GlWorld } from '@/webgl/glworld';

import { RenderPlaneY } from '@/webgl/three/render/threnderplanes';
import { Plane3d_Y } from '@/common/system3d/model/plane3d';
import { PySphere } from '@/pyshic/model/pysphere';
import { WebColors } from '@/common/graphics/color/webcolors';
import { Point2D } from '@/common/graphics/model/point2d';
import { GlConfig } from '@/webgl/glconfig';
import { GlPrimitiveUtil } from '@/webgl/primitives/glprimutil';
import { ThreeLine } from '@/webgl/three/model/threeline';
import { RenderThreeLine } from '@/webgl/three/render/threnderlines';
import { System3d } from '@/common/system3d/system3d';
import { MathPoly2d } from '@/common/math/mathpoly2d';
import { Point3d } from '@/common/system3d/model/point3d';
import { ThreeGenPoliedros } from '@/webgl/three/generator/thgenpoliedros';
import { Vector3d } from '@/types/types';
import { MetalMaterials } from '@/webgl/three/material/metalmaterials';
import { PyPlaneSquare } from '@/pyshic/model/pyplane';
import GlPlane from '@/webgl/geomodel/glplaney';
import { RenderSystem } from '../app/world3d';


/*
    new RGBELoader().load('tu_textura_hdr.hdr', (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture; // Establecer la textura como entorno de la escena
    });
   
    const vertexObjs:THREE.Points = ThreeGenPoliedros
        .createSmallSpheres(vertexSelected,WebColors.COLOR_BLUE);
    <points geometry={vertexObjs.geometry} material={vertexObjs.material} />
    
    
*/

const setLightning = (scene: THREE.Scene) => {

    const ambientLight = new THREE.AmbientLight("#ffffff", 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight("#ffffff", 1);
    directionalLight.position.set(1, 2, 3);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight("#ffffff", 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(pointLight);

}//end

const chargeSphere = (pysphere: PySphere): THREE.Mesh => {
    const objMaterial = MetalMaterials.getMaterial(pysphere.color, 0.95, 0.01);
    const geometry = new THREE.SphereGeometry(pysphere.radius, GlPoliedros.SPHERE_SIDES, GlPoliedros.SPHERE_SIDES);
    const mesh = new THREE.Mesh(geometry, objMaterial);
    mesh.name = pysphere.name;
    mesh.position.set(pysphere.position[0], pysphere.position[1], pysphere.position[2]);
    return mesh;
};

const selectPlaneVertex = (pyplane: PyPlaneSquare, pysphere: PySphere) => {
    const pyspherePolyVertex: Point2D[] = pysphere.getProy2dPolyPoints();
    const vertexflags: boolean[][] = MathPoly2d.analizePlainVertex(pyspherePolyVertex, pyplane);
    pyplane.selectVertex(vertexflags);
};

const executeRays = (scene: THREE.Scene, pyplane: PyPlaneSquare, targetName: string) => {

    //const mesh = miEsfera as THREE.Mesh;
    const miEsfera = scene.getObjectByName(targetName);
 
    alert(miEsfera?.name);
    const planePoints: Point3d[] = pyplane.vertex_sel;
    alert(planePoints.length);

    const raycaster = new THREE.Raycaster();

    const originPoint:THREE.Vector3 = planePoints[15].getThreePoint();
    const originDirection:THREE.Vector3 = planePoints[15].getThreeDirection();
    console.log(originPoint);
    console.log(originDirection);
    raycaster.set(originPoint,originDirection);

    const intersects = raycaster.intersectObject(miEsfera!);
    if (intersects.length > 0) {
        const firstIntersection: THREE.Intersection = intersects[0];
        const point: THREE.Vector3 = firstIntersection.point;
        alert("hay intersección");
        console.log("Primera intersección:", firstIntersection);
        console.log("Punto de intersección:", point);

    } else {
        alert("No hay intersección");
    }
    
}//end

export const AppGravity = () => {
    const [scene, setScene] = useState<THREE.Scene | null>(null);

    //scene objects
    const pysphere = useMemo(() => {        
        return new PySphere("esferaA", 100.0, 3, [0.0, 4.0, 0.0], WebColors.COLOR_PLATE);
    }, []);

    const sphere_mesh = useMemo(() => {
        return chargeSphere(pysphere);
    }, []);

    const pyplane = useMemo(() => {
        return new PyPlaneSquare(
            System3d.AXIS_Y, 10, 64, [0, 0, 0], [0, 0, 0], "#00ff00", WebColors.COLOR_BLACK
        );
    }, []);

    const pyspherePolyLine = useMemo(() => {
        return GlPrimitiveUtil.getCfThreeLine(WebColors.COLOR_RED, System3d.CM,pysphere.radius, 64);
    }, []);
        

    if(!scene){
        const {scene} = useThree();
        
        //init code
        selectPlaneVertex(pyplane, pysphere);

        //webgl scene    
        scene.background = new THREE.Color(WebColors.COLOR_BLACK);
        scene.rotation.set(0, -0.1, 0);
        setLightning(scene);
        scene.add(sphere_mesh);

        setScene(scene);       
    }


    if (!scene) { return <div>Loading...</div>; }

    
    executeRays(scene, pyplane, "esferaA");
    
    return (
        <>
            {/*render scene base */}
            <OrbitControls />
            <RenderSystem />

            {/*render plane */}
            <GlPlane size={pyplane.size}
                sides={pyplane.sides}
                position={pyplane.position}
                meshColor={pyplane.meshColor}
                gridColor={pyplane.gridColor}
                showmesh={true}
                showgrid={true} />
           
            {RenderMiniSpheresP(0.05, WebColors.COLOR_BLUE, pyplane.vertex_sel)}

            {/*render sphere 
            {RenderSphere(pysphereId,pysphere.position, pysphere.radius, pysphere.color)}*/}

        </>
    );

};

/*

 <RenderThreeLine color={pyspherePolyLine.color} obj_vertex={pyspherePolyLine.objvertex} />
const chargeSphere = (scene: THREE.Scene) => {
    
    const pysphereId:number = 1;
    const pysphere: PySphere = new PySphere(100.0, 3, [0.0, 4.0, 0.0], WebColors.COLOR_PLATE);
    const objMaterial = MetalMaterials.getMaterial(pysphere.color, 0.95, 0.01);

    return (
        <mesh material={objMaterial} id={pysphereId} 
            position={pysphere.position}>
            <sphereGeometry args={[pysphere.radius, GlPoliedros.SPHERE_SIDES, GlPoliedros.SPHERE_SIDES]} />
        </mesh>
    );
    //scene.add(??);   
}//end
*/