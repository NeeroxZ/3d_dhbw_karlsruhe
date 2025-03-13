import React, { useEffect } from "react";
import { useLoadModel } from "../hooks/useLoadModel";
import { useRooms } from "../hooks/useRooms";
import { useRoomActions } from "../hooks/useRoomActions";

export function DHBWModel({ selectedRoom, action, onRoomsExtracted }) {
    const MODEL_PATH = "./model/dhbw_modell_1303.glb";
    const { scene } = useLoadModel(MODEL_PATH);
    const { rooms } = useRooms(scene, onRoomsExtracted);

    // Debugging: Zeige die Räume in der Konsole an
    useEffect(() => {
        console.log("🏠 Geladene Räume in DHBWModel:", rooms);
    }, [rooms]);

    // Wende Aktionen auf Räume an
    useRoomActions(rooms, selectedRoom, action);

    return <primitive object={scene} />;
}
