

import { Canvas, useThree, useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { Html, OrthographicCamera } from '@react-three/drei'
import { OrbitControls } from '@react-three/drei';
import { ColorManagement, Line, SphereGeometry } from 'three'
import { GlSegment } from './primitives/model/glsegment';
import { Vector3d } from '@/types/types';
import { System3d } from '@/common/system3d/system3d';



/*
    <pointLight position={[5, 5, 5]} intensity={1}
                color="#ffffff"
                castShadow />    
*/

/**
 * class GlWorld.Vector3d
 */
export class GlWorld {

    // world physic
    
    public static readonly CM:Vector3d = [0.0,0.0,0.0];
    public static readonly RADIUS:number = 50.0;

    //ambient
    public static readonly AMBIENT_LIGHT_COLOR:string = "#FFFFFF";   
    public static readonly AMBIENT_LIGHT_INT:number = 1.0; 

    // 3d axis
    public static readonly AXIS_X: GlSegment = new GlSegment(
        System3d.AXIS_X_COLOR,
        [(GlWorld.RADIUS*(-1)),0.0,0.0],
        [GlWorld.RADIUS,0.0,0.0]);

    public static readonly AXIS_Y: GlSegment = new GlSegment(
        System3d.AXIS_Y_COLOR,
        [0.0,(GlWorld.RADIUS*(-1)),0.0],
        [0.0, GlWorld.RADIUS,0.0]);  

    public static readonly AXIS_Z: GlSegment = new GlSegment(
        System3d.AXIS_Z_COLOR,
        [0.0,0.0,(GlWorld.RADIUS*(-1))],
        [0.0,0.0, GlWorld.RADIUS]);  

    // lights
    public static readonly LIGHT_DEF_COLOR:string = "#FFFFFF";    
    public static readonly LIGHT_DEF_INT:number = 1.0; 

}//end clas


 