import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import {Group, Material, Object3DEventMap} from "three";

// Begriffe, die ignoriert werden sollen
const EXCLUDED_NAMES = [
    "säule",
    "decke",
    "träger",
    "wand",
    "küche"
];

export interface Room {
    id: string;
    name: string;
    fluegel:string;
    stockwerk:string;
    raum: string;
    normalizedName: string;
    mesh: THREE.Mesh;
}

interface UseRoomsProps {
    scene: THREE.Scene | null;
    onRoomsExtracted?: (rooms: Room[]) => void;
}

export function useRooms(
    scene: Group<Object3DEventMap>,
    onRoomsExtracted?: (rooms: Room[]) => void
): { rooms: Room[] } {
    const [rooms, setRooms] = useState<Room[]>([]);
    const roomsLoadedRef = useRef<boolean>(false); // Prevents infinite loop

    useEffect(() => {
        if (!scene || roomsLoadedRef.current) return; // Verhindert mehrfaches Ausführen
        roomsLoadedRef.current = true;

      //  console.log("🔄 Räume werden extrahiert...");

        const foundRooms: Room[] = [];
        scene.traverse((object) => {
            // Prüfe, ob das Objekt ein Mesh ist
            if ((object as THREE.Mesh).isMesh) {
                const mesh = object as THREE.Mesh;
                const originalName = mesh.name.toLowerCase();

                if (EXCLUDED_NAMES.some((term) => originalName.includes(term))) {
//                    console.log(`❌ Ignorierter Raum: ${originalName}`);
                    return;
                }

              //  console.log(originalName.replace(/[_\-\s]/g, ""));
                // Erstelle den Raum und pushe ihn in den Array
                foundRooms.push({
                    id: mesh.uuid,
                    name: originalName,
                    fluegel:originalName.substring(0,1).toUpperCase(),
                    stockwerk: originalName.substring(2,3),
                    raum: originalName.substring(4).replace(/[()]/g, ""),
                    normalizedName: originalName.replace(/[_\-\s]/g, ""),
                    mesh: mesh,
                });

                // Klonen des Materials, falls vorhanden, und Anpassungen
                if (mesh.material) {
                    // Falls material ein Array sein könnte, können wir das optional behandeln:
                    if (Array.isArray(mesh.material)) {
                        mesh.material = mesh.material.map((mat) => mat.clone());
                    } else {
                        mesh.material = mesh.material.clone();
                    }
                }

                if (mesh.material instanceof Material) {
                    mesh.material.side = THREE.DoubleSide;
                }
                mesh.castShadow = true;
                mesh.receiveShadow = true;
            }
        });

        setRooms(foundRooms);
        if (typeof onRoomsExtracted === "function") {
            onRoomsExtracted(foundRooms);
        }

    //    console.log("✅ Räume erfolgreich extrahiert:", foundRooms.length);
    }, [scene, onRoomsExtracted]);

    return { rooms };
}
