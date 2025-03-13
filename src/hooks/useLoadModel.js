import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";

export function useLoadModel(modelPath) {
    const { scene } = useGLTF(modelPath);

    // Memoize the scene to avoid unnecessary re-renders
    return useMemo(() => ({ scene }), [scene]);
}
