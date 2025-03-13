import React from "react";
import { useLoadModel } from "../hooks/useLoadModel";
import { useRoomActions } from "../hooks/useRoomActions";
import {useGLTF} from "@react-three/drei";

export function DHBWModel({ selectedRoom, action, onRoomsExtracted }) {
    const MODEL_PATH = "./model/dhbw_modell_1303.glb";

    // Modell laden und Räume extrahieren
    const { scene, rooms } = useLoadModel(MODEL_PATH, onRoomsExtracted);

    // Aktionen auf die Räume anwenden
    useRoomActions(rooms, selectedRoom, action);

    return <primitive object={scene} />;
}

// Preload für Performance-Optimierung
useGLTF.preload("./model/dhbw_modell_1303.glb");
