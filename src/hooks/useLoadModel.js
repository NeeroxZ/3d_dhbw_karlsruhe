import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function useLoadModel(modelPath, onRoomsExtracted) {
    const { scene } = useGLTF(modelPath);
    const [rooms, setRooms] = useState([]);
    const roomsLoadedRef = useRef(false);

    useEffect(() => {
        if (!scene || roomsLoadedRef.current) return;
        roomsLoadedRef.current = true;

        console.log("⏳ Extrahiere Räume aus Szene...");

        const foundRooms = [];
        scene.traverse((object) => {
            if (object.isMesh) {
                object.material = object.material.clone();
                object.material.side = THREE.DoubleSide;
                object.castShadow = true;
                object.receiveShadow = true;
                foundRooms.push(object);
            }
        });

        setRooms(foundRooms);
        const roomNames = foundRooms.map((r) => r.name);
        console.log("✅ Räume extrahiert:", roomNames);

        if (typeof onRoomsExtracted === "function") {
            onRoomsExtracted(roomNames);
        }
    }, [scene, onRoomsExtracted]);

    return { scene, rooms };
}
