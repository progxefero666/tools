
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

import { WebColors } from '@/common/graphics/color/webcolors';
import { Point3d } from '@/common/system3d/model/point3d';
import { PlaneSquareY } from '@/pyshic/model/pyplane';
import GlPlaneOld from '@/webgl/geomodel/glplaneoldy';
import { RenderSystem } from '../app/world3d';





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

export const AppGravity = () => {
    const [scene, setScene] = useState<THREE.Scene | null>(null);
    const pyplane = useMemo(() => {
        return new PlaneSquareY( 10, 64, [0, 0, 0], [0, 0, 0], "#00ff00", WebColors.COLOR_BLACK);
    }, []);

    /*
    const pysphere = useMemo(() => {        
        return new PySphere("esferaA", 100.0, 3, [0.0, 4.0, 0.0], WebColors.COLOR_PLATE);
    }, []);

    const sphere_mesh = useMemo(() => {
        return chargeSphere(pysphere);
    }, []);
    const pyspherePolyLine = useMemo(() => {
        return GlPrimitiveUtil.getCfThreeLine(WebColors.COLOR_RED, System3d.CM,pysphere.radius, 64);
    }, []);
        */

    if(!scene){
        const {scene} = useThree();
        
        //init code
        //selectPlaneVertex(pyplane, pysphere);

        //webgl scene    
        scene.background = new THREE.Color(WebColors.COLOR_BLACK);
        scene.rotation.set(0, -0.1, 0);
        setLightning(scene);
        //scene.add(sphere_mesh);

        setScene(scene);       
    }


    if (!scene) { return <div>Loading...</div>; }

    
    //executeRays(scene, pyplane, "esferaA");
    
    return (
        <>
            {/*render scene base */}
            <OrbitControls />
            <RenderSystem />

            {/*render plane */}
            <GlPlaneOld size={pyplane.size}
                sides={pyplane.sides}
                position={pyplane.position}
                meshColor={pyplane.meshColor}
                gridColor={pyplane.gridColor}
                showmesh={true}
                showgrid={true} />
           
            
            {/*render sphere 
            {RenderSphere(pysphereId,pysphere.position, pysphere.radius, pysphere.color)}*/}

        </>
    );

};

/*
{RenderMiniSpheresP(0.05, WebColors.COLOR_BLUE, pyplane.vertex_sel)}

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