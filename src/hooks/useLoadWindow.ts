import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { Group, Object3DEventMap } from "three";

const WINDOW_TERMS = [
    "fenster",
    "cube",
    "glass",
    "würfel",
];

export interface WindowObject {
    id: string;
    name: string;
    mesh: THREE.Mesh;
}

export function useLoadWindows(scene: Group<Object3DEventMap>): { windows: WindowObject[] } {
    const [windows, setWindows] = useState<WindowObject[]>([]);
    const windowsLoadedRef = useRef<boolean>(false);

    useEffect(() => {
        if (!scene || windowsLoadedRef.current) return;
        windowsLoadedRef.current = true;

        const foundWindows: WindowObject[] = [];
        console.log(foundWindows);
        scene.traverse((object) => {
            if ((object as THREE.Mesh).isMesh) {
                const mesh = object as THREE.Mesh;
                const originalName = mesh.name.toLowerCase();

                if (WINDOW_TERMS.some((term) => originalName.includes(term))) {
                    foundWindows.push({
                        id: mesh.uuid,
                        name: originalName,
                        mesh: mesh,
                    });
                }
            }
        });

        setWindows(foundWindows);
    }, [scene]);

    return { windows };
}
