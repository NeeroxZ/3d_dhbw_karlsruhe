import { useEffect } from "react";
import * as THREE from "three";

export function useRoomActions(rooms, selectedRoom, action) {
    useEffect(() => {
        if (!rooms.length) return;

        rooms.forEach((room) => {
            room.material.emissive.set("#000000");
            room.material.emissiveIntensity = 1;
            room.material.color.set("#FFFFFF");
            room.visible = true;
        });

        const selected = rooms.find((r) => r.name === selectedRoom);
        if (!selected) {
            console.log("❌ Gewählter Raum nicht gefunden:", selectedRoom);
            return;
        }

        console.log("🔍 SELECTED ROOM:", selectedRoom, "ACTION:", action);

        if (action === "blink") {
            let blink = true;
            rooms.forEach((room) => {
                if (room !== selected) {
                    room.material.transparent = true;
                    room.material.opacity = 0.5;
                }
            });

            const interval = setInterval(() => {
                selected.material.emissiveIntensity = blink ? 20 : 1;
                selected.material.color.set(blink ? "#8B0000" : "#FFFFFF");
                blink = !blink;
            }, 300);

            const timeout = setTimeout(() => {
                clearInterval(interval);
                resetRoomMaterials(rooms);
            }, 10000);

            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
                resetRoomMaterials(rooms);
            };
        }

        if (action === "hide") {
            selected.visible = false;
        }

        if (action === "transparent") {
            selected.material.transparent = true;
            selected.material.opacity = 0.5;
        }
    }, [selectedRoom, action, rooms]);
}

// Hilfsfunktion zum Zurücksetzen aller Räume
function resetRoomMaterials(rooms) {
    rooms.forEach((room) => {
        room.material.emissive.set("#000000");
        room.material.emissiveIntensity = 1;
        room.material.color.set("#FFFFFF");
        room.material.transparent = false;
        room.material.opacity = 1;
    });
}
