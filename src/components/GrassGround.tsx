import React, {JSX} from "react";
import * as THREE from "three";
import {useGrassGroundTexture} from "../hooks/useGrassGroundTexture";

export function GrassGround(): JSX.Element {
    const grassTexture = useGrassGroundTexture();

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
            <planeGeometry args={[200, 200]} />
            <meshStandardMaterial map={grassTexture} />
        </mesh>
    );
}
