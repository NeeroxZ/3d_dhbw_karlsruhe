import React, {useEffect} from "react";
import {useLoadModel} from "../hooks/useLoadModel";
import {useRooms} from "../hooks/useRooms";
import {useRoomActions} from "../hooks/useRoomActions";
import * as THREE from "three";
import {useTexture} from "@react-three/drei";

export function DHBWModel({selectedRoom, action, onRoomsExtracted}) {
    const MODEL_PATH = "./model/dhbw_modell2.glb";
    const {scene} = useLoadModel(MODEL_PATH);
    const {rooms} = useRooms(scene, onRoomsExtracted);
    // 🔹 Lade die Putz-Texturen
    const [wallAlbedo, wallNormal, wallRoughness, wallDisplacement] = useTexture([
        "textures/wall/painted_plaster_color.jpg",
        "textures/wall/painted_plaster_normal.jpg",
        "textures/wall/painted_plaster_roughness.jpg",
        "textures/wall/painted_plaster_displacement.jpg",
    ]);

    // 🔹 Texturen für bessere Wiederholung & Optik einstellen
    [wallAlbedo, wallNormal, wallRoughness, wallDisplacement].forEach((texture) => {
        if (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(5, 5); // 🔥 Wiederholt sich 5x5 für realistische Optik
        }
    });

    useEffect(() => {
        if (!scene) return;

        console.log("⏳ Suche nach Wänden für Putztextur...");

        scene.traverse((object) => {
            if (object.isMesh) {
                object.material = object.material.clone(); // Eigenes Material pro Mesh
                if (
                    object.name.toLowerCase().includes("cube") ||
                    object.name.toLowerCase().includes("glass") ||
                    object.name.toLowerCase().includes("glass") ||
                    object.name.toLowerCase().includes("würfel") ||
                    object.name.toLowerCase().includes("fenster")
                ) {
                    object.material.transparent = true;
                    object.material.opacity = 0.5;  // 🔥 Fast klares Glas
                    object.material.color.set("#87CEEB");  // 🔹 Leicht bläuliches Glas
                    object.material.roughness = 0.5;  // 🔥 Wenig Lichtstreuung für ein klares Fenster
                    object.material.metalness = 0.9;  // 🔥 Spiegelungen aktivieren
                    object.material.side = THREE.DoubleSide;  // 🔥 Fenster von innen und außen sichtbar
                    object.material.depthWrite = false;  // 🔥 Stellt sicher, dass Objekte dahinter sichtbar bleiben
                    object.material.blending = THREE.NormalBlending;  // 🔥 Standard-Glas-Blending
                    object.material.refractionRatio = 0.98; // 🔥 Falls Reflektionen verwendet werden sollen


                    console.log(`✅ Fenster gefunden: ${object.name}, Transparenz angewendet!`);
                } else {
                    object.material.side = THREE.DoubleSide;
                    object.castShadow = true;
                    object.receiveShadow = true;

                    // **Falls der Mesh-Name "Wall", "Outer", "Fassade" enthält → Putz-Textur setzen**

                    object.material.map = wallAlbedo;
                    object.material.normalMap = wallNormal;
                    object.material.roughnessMap = wallRoughness;
                    object.material.roughness = 0.8; // 🔥 Wenig Glanz für eine matte Oberfläche
                }
            }
        });

    }, [scene, wallAlbedo, wallNormal, wallRoughness, wallDisplacement]);

    // Debugging: Zeige die Räume in der Konsole an
    useEffect(() => {
    }, [rooms]);

    // Wende Aktionen auf Räume an
    useRoomActions(rooms, selectedRoom, action);

    return <primitive object={scene}/>;
}
