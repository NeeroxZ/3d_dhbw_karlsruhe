import { useEffect, useState, useRef } from "react";
import * as THREE from "three";

// Begriffe, die ignoriert werden sollen
const EXCLUDED_NAMES = ["säule",
    "decke",
    "träger",
    "wand",
    "küche"
];

export function useRooms(scene, onRoomsExtracted) {
    const [rooms, setRooms] = useState([]);
    const roomsLoadedRef = useRef(false); // Prevents infinite loop

    useEffect(() => {
        if (!scene || roomsLoadedRef.current) return; // Verhindert mehrfaches Ausführen
        roomsLoadedRef.current = true;

        console.log("🔄 Räume werden extrahiert...");

        const foundRooms = [];
        scene.traverse((object) => {
            if (object.isMesh) {
                const originalName = object.name.toLowerCase();

                if (EXCLUDED_NAMES.some((term) => originalName.includes(term))) {
                    console.log(`❌ Ignorierter Raum: ${originalName}`);
                    return;
                }

                foundRooms.push({
                    id: object.uuid,
                    name: originalName,
                    normalizedName: originalName.replace(/[_\-\s]/g, ""),
                    mesh: object,
                });


                object.material = object.material.clone();
                object.material.side = THREE.DoubleSide;
                object.castShadow = true;
                object.receiveShadow = true;
            }
        });

        setRooms(foundRooms);
        if (typeof onRoomsExtracted === "function") {
            onRoomsExtracted(foundRooms);
        }

        console.log("✅ Räume erfolgreich extrahiert:", foundRooms.length);
    }, [scene, onRoomsExtracted]); // Scene darf sich nicht ständig ändern

    return { rooms };
}
