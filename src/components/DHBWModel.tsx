import React, {JSX, useEffect} from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useLoadModel } from "../hooks/useLoadModel";
import { useRooms } from "../hooks/useRooms";
import { useRoomActions } from "../hooks/useRoomActions";


interface DHBWModelProps {
    selectedRoom: string; // Name des ausgewählten Raums
    action: string;
    onRoomsExtracted: (rooms: any[]) => void; // Passe hier den Typ ggf. an (z. B. Room[])
}

export function DHBWModel({ selectedRoom, action, onRoomsExtracted }: DHBWModelProps): JSX.Element {
    const MODEL_PATH = "./model/dhbw_modell2.glb";
    const { scene } = useLoadModel(MODEL_PATH);
    const { rooms } = useRooms(scene, onRoomsExtracted);

    // 🔹 Lade die Putz-Texturen
    const [wallAlbedo, wallNormal, wallRoughness, wallDisplacement] = useTexture([
        "textures/wall/painted_plaster_color.jpg",
        "textures/wall/painted_plaster_normal.jpg",
        "textures/wall/painted_plaster_roughness.jpg",
        "textures/wall/painted_plaster_displacement.jpg",
    ]);

    // 🔹 Texturen für Wiederholung & Optik einstellen
    [wallAlbedo, wallNormal, wallRoughness, wallDisplacement].forEach((texture) => {
        if (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(5, 5);
        }
    });

    useEffect(() => {
        if (!scene) return;

        //console.log("⏳ Suche nach Wänden für Putztextur...");
        scene.traverse((object) => {
            if ((object as THREE.Mesh).isMesh) {
                const mesh = object as THREE.Mesh;

                // Material klonen: je nachdem ob es sich um ein Array oder ein einzelnes Material handelt
                if (Array.isArray(mesh.material)) {
                    mesh.material = mesh.material.map((mat) => mat.clone());
                } else {
                    mesh.material = mesh.material.clone();
                }

                const nameLower = mesh.name.toLowerCase();
                if (
                    nameLower.includes("cube") ||
                    nameLower.includes("glass") ||
                    nameLower.includes("würfel") ||
                    nameLower.includes("fenster")
                ) {
                    // Falls Material ein Array ist, iteriere über alle Elemente
                    if (Array.isArray(mesh.material)) {
                        mesh.material.forEach((mat) => {
                            const material = mesh.material as any;
                            material.transparent = true;
                            material.opacity = 0.5;
                            material.color.set("#87CEEB");
                            material.roughness = 0.5;
                            material.metalness = 0.9;
                            material.side = THREE.DoubleSide;
                            material.depthWrite = false;
                            material.blending = THREE.NormalBlending;
                            material.refractionRatio = 0.98;
                        });
                    } else {
                        const material = mesh.material as any;
                        material.transparent = true;
                        material.opacity = 0.5;
                        material.color.set("#87CEEB");
                        material.roughness = 0.5;
                        material.metalness = 0.9;
                        material.side = THREE.DoubleSide;
                        material.depthWrite = false;
                        material.blending = THREE.NormalBlending;
                        material.refractionRatio = 0.98;
                    }
                } else {
                    // Für alle anderen Objekte
                    if (Array.isArray(mesh.material)) {
                        mesh.material.forEach((mat) => {
                            mat.side = THREE.DoubleSide;
                        });
                    } else {
                        mesh.material.side = THREE.DoubleSide;
                    }
                    mesh.castShadow = true;
                    mesh.receiveShadow = true;

                    // Setze hier ggf. weitere Texturzuweisungen, z. B.:
                    // mesh.material.map = wallAlbedo;
                    // mesh.material.normalMap = wallNormal;
                    // mesh.material.roughnessMap = wallRoughness;
                    // mesh.material.roughness = 0.8;
                }
            }
        });

    }, [scene, wallAlbedo, wallNormal, wallRoughness, wallDisplacement]);

    // Debugging: Zeige extrahierte Räume in der Konsole an
    useEffect(() => {
       // console.log("Extrahierte Räume:", rooms);
    }, [rooms]);

    // Wende Aktionen (hide, transparent, blink, etc.) auf Räume an
    useRoomActions(rooms, selectedRoom, action);

    return <primitive object={scene} />;
}
