import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import { GLTF } from "three-stdlib";
import {Group, Object3DEventMap, Scene} from "three";

export function useLoadModel(modelPath: string): { scene: Group<Object3DEventMap> } {
    const { scene } = useGLTF(modelPath) as GLTF;

    // Memoize the scene to avoid unnecessary re-renders
    return useMemo(() => ({ scene }), [scene]);
}
