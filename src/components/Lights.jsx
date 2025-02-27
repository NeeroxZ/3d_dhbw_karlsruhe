import React, { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import * as THREE from 'three';

// Punktlicht mit Hilfsobjekt
export function PointLightWithHelper(props) {
    const lightRef = useRef();
    useHelper(lightRef, THREE.PointLightHelper, 2, 'blue'); // Größe: 2, Farbe: Blau
    return <pointLight ref={lightRef} {...props} />;
}

// Richtungslicht mit Hilfsobjekt
export function DirectionalLightWithHelper(props) {
    const lightRef = useRef();
    useHelper(lightRef, THREE.DirectionalLightHelper, 5, 'red'); // Größe: 5, Farbe: Rot
    return <directionalLight ref={lightRef} {...props} />;
}
