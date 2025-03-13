import { useEffect } from "react";

export function useRoomActions(rooms, selectedRoom, action) {
    useEffect(() => {
        if (!rooms || rooms.length === 0) {
            console.log("❌ Keine Räume geladen.");
            return;
        }

        console.log("🔥 useRoomActions läuft für Raum:", selectedRoom, "Aktion:", action);

        // **Alle Räume zurücksetzen**
        rooms.forEach((room) => {
            if (!room || !room.mesh || !room.mesh.material) {
                console.log("❌ Überspringe Raum ohne Mesh oder Material:", room);
                return;
            }

            if (Array.isArray(room.mesh.material)) {
                room.mesh.material.forEach((mat) => {
                    mat.emissive?.set("#000000");
                    mat.emissiveIntensity = 1;
                    mat.color.set("#FFFFFF");
                    mat.transparent = false;
                    mat.opacity = 1;
                });
            } else {
                room.mesh.material.emissive?.set("#000000");
                room.mesh.material.emissiveIntensity = 1;
                room.mesh.material.color.set("#FFFFFF");
                room.mesh.material.transparent = false;
                room.mesh.material.opacity = 1;
            }

            room.mesh.visible = true; // Setze alle Räume sichtbar
        });

        // **Falls kein Raum ausgewählt wurde, beenden**
        if (!selectedRoom) {
            console.log("⚠ Kein Raum ausgewählt.");
            return;
        }

        // **Finde den ausgewählten Raum**
        const selected = rooms.find((r) => r.name === selectedRoom);
        if (!selected || !selected.mesh || !selected.mesh.material) {
            console.log("❌ Gewählter Raum nicht gefunden oder hat kein Material:", selectedRoom);
            return;
        }

        console.log("🎯 Ausgewählter Raum:", selectedRoom, "Aktion:", action);

        // **Aktionen anwenden**
        if (action === "hide") {
            console.log("🚀 Verstecke Raum:", selectedRoom);
            selected.mesh.visible = false;
        }

        if (action === "transparent") {
            console.log("🔎 Mache Raum transparent:", selectedRoom);
            if (Array.isArray(selected.mesh.material)) {
                selected.mesh.material.forEach((mat) => {
                    mat.transparent = true;
                    mat.opacity = 0.5;
                });
            } else {
                selected.mesh.material.transparent = true;
                selected.mesh.material.opacity = 0.5;
            }
        }

        if (action === "blink") {
            console.log("💡 Blinke Raum:", selectedRoom);

            // **Alle anderen Räume transparent machen**
            rooms.forEach((room) => {
                if (room !== selected && room.mesh?.material) {
                    if (Array.isArray(room.mesh.material)) {
                        room.mesh.material.forEach((mat) => {
                            mat.transparent = true;
                            mat.opacity = 0.2; // 🔥 Alle anderen Räume werden leicht transparent
                        });
                    } else {
                        room.mesh.material.transparent = true;
                        room.mesh.material.opacity = 0.2; // 🔥 Transparenz setzen
                    }
                }
            });

            let blink = true;
            const interval = setInterval(() => {
                if (!selected.mesh.material) return;

                if (Array.isArray(selected.mesh.material)) {
                    selected.mesh.material.forEach((mat) => {
                        mat.emissive?.set(blink ? "#8B0000" : "#FFFFFF");
                        mat.emissiveIntensity = blink ? 20 : 1;
                    });
                } else {
                    selected.mesh.material.emissive?.set(blink ? "#8B0000" : "#FFFFFF");
                    selected.mesh.material.emissiveIntensity = blink ? 20 : 1;
                }

                blink = !blink;
            }, 300);

            setTimeout(() => {
                clearInterval(interval);
                resetRoomMaterials(rooms);
            }, 10000);

            return () => {
                clearInterval(interval);
                resetRoomMaterials(rooms);
            };
        }
    }, [selectedRoom, action, rooms]);
}

// **Hilfsfunktion zum Zurücksetzen aller Räume**
function resetRoomMaterials(rooms) {
    rooms.forEach((room) => {
        if (!room.mesh || !room.mesh.material) return;

        if (Array.isArray(room.mesh.material)) {
            room.mesh.material.forEach((mat) => {
                mat.emissive?.set("#000000");
                mat.emissiveIntensity = 1;
                mat.color.set("#FFFFFF");
                mat.transparent = false;
                mat.opacity = 1;
            });
        } else {
            room.mesh.material.emissive?.set("#000000");
            room.mesh.material.emissiveIntensity = 1;
            room.mesh.material.color.set("#FFFFFF");
            room.mesh.material.transparent = false;
            room.mesh.material.opacity = 1;
        }

        room.mesh.visible = true; // Falls Räume vorher versteckt wurden, wieder sichtbar machen
    });
}
