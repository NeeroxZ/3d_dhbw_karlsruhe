import React, {JSX, useEffect} from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useLoadModel } from "../hooks/useLoadModel";
import { useRooms } from "../hooks/useRooms";
import { useRoomActions } from "../hooks/useRoomActions";
import {useWallTexture} from "../hooks/useWallTexture";
import {applyGenericMaterial, applyWindowMaterial, cloneMeshMaterial} from "../utils/materialUtils";


interface DHBWModelProps {
    selectedRoom: string; // Name des ausgewählten Raums
    action: string;
    onRoomsExtracted: (rooms: any[]) => void; // Passe hier den Typ ggf. an (z. B. Room[])
}

export function DHBWModel({ selectedRoom, action, onRoomsExtracted }: DHBWModelProps): JSX.Element {
    const MODEL_PATH = "./model/final_model.glb";
    const { scene } = useLoadModel(MODEL_PATH);
    const { rooms } = useRooms(scene, onRoomsExtracted);

    // 🔹 Lade die Putz-Texturen

    const { wallAlbedo, wallNormal, wallRoughness, wallDisplacement } = useWallTexture();

    // 🔹 Texturen für Wiederholung & Optik einstellen
    [wallAlbedo, wallNormal, wallRoughness, wallDisplacement].forEach((texture) => {
        if (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(5, 5);
        }
    });

    useEffect(() => {
        if (!scene) return;

        scene.traverse((object) => {
            if (!(object as THREE.Mesh).isMesh) return;
            const mesh = object as THREE.Mesh;

            // Material klonen
            cloneMeshMaterial(mesh);

            const nameLower = mesh.name.toLowerCase();
            console.log(nameLower);
            const isWindow =
                nameLower.includes("cube") ||
                nameLower.includes("glass") ||
                nameLower.includes("würfel") ||
                nameLower.includes("037_");
            console.log(isWindow);
            if (isWindow) {
                // Fenster-spezifische Einstellungen
                applyWindowMaterial(mesh.material,true);
            } else {
                // Generelle Einstellungen für andere Objekte
                applyGenericMaterial(mesh);
                // Hier kannst du auch zusätzliche Texturzuweisungen machen, z. B.:
                // (mesh.material as any).map = wallAlbedo;
                // (mesh.material as any).normalMap = wallNormal;
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
