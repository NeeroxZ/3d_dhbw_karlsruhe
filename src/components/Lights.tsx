import React, {JSX, useRef} from 'react';
import { useHelper } from '@react-three/drei';
import * as THREE from 'three';

export function PointLightWithHelper(props: any): JSX.Element {
    const lightRef = useRef<THREE.PointLight>(null!);
    useHelper(lightRef, THREE.PointLightHelper, 2, 'blue');
    return <pointLight ref={lightRef} {...props} />;
}


export function DirectionalLightWithHelper(props: any): JSX.Element {
    const lightRef = useRef<THREE.DirectionalLight>(null!);
    useHelper(lightRef, THREE.DirectionalLightHelper, 5, 'red'); // Größe: 5, Farbe: Rot
    return <directionalLight ref={lightRef} {...props} />;
}
