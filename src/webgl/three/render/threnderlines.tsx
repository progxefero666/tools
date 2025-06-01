
import { JSX } from 'react';
import { GeoMaterials } from '../material/geomaterials';
import { LineBasicMaterial, SphereGeometry, Vector3 } from 'three';


import { Line } from '@react-three/drei'
import * as THREE from 'three';
import { Canvas, useThree, useFrame, extend } from '@react-three/fiber';
import { ThreeSegment } from '../model/thsegment';



export const RenderThreeSegment = ({start, end,color,opacity = 1.0}: 
                                   {start: THREE.Vector3;end: THREE.Vector3; color: string; opacity?: number;}) => {
    return (
        <Line
            points={[start, end]}
            color={color}
            lineWidth={5}
            transparent={opacity < 1}
            opacity={opacity}
            vertexColors={[new THREE.Color(color), new THREE.Color(color)]}
        />
    );
};


export const RenderThreeLine = ({obj_vertex,color,opacity = 1.0}: 
                                {obj_vertex: THREE.Vector3[];color: string; opacity?: number;}) => {
    let vertex_colors:THREE.Color[] = [];
    for(let idx=0;idx<obj_vertex.length;idx++){
        vertex_colors.push(new THREE.Color(color));
    }                 
    return (
        <Line key="1"
            points={obj_vertex}
            color={color}
            lineWidth={5}
            transparent={opacity < 1}
            opacity={opacity}
            vertexColors={vertex_colors}
        />
    );
};
