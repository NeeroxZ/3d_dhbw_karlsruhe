import { useEffect } from "react";
import { Mesh, MeshStandardMaterial } from "three";

export interface Room {
    name: string;
    mesh?: Mesh;
}

export function useRoomActions(
    rooms: Room[] | undefined,
    selectedRoom: string,
    action: string
): void {
    useEffect(() => {
        if (!rooms || rooms.length === 0) {
            console.log("❌ Keine Räume geladen.");
            return;
        }

        console.log("🔥 useRoomActions läuft für Raum:", selectedRoom, "Aktion:", action);

        // **Alle Räume zurücksetzen**
        rooms.forEach((room) => {
            if (!room || !room.mesh || !room.mesh.material) {
             //   console.log("❌ Überspringe Raum ohne Mesh oder Material:", room);
                return;
            }

            if (Array.isArray(room.mesh.material)) {
                room.mesh.material.forEach((mat) => {
                    const material = mat as MeshStandardMaterial;
                    material.emissive?.set("#000000");
                    material.emissiveIntensity = 1;
                    material.color.set("#FFFFFF");
                    material.transparent = false;
                    material.opacity = 1;
                });
            } else {
                const material = room.mesh.material as MeshStandardMaterial;
                material.emissive?.set("#000000");
                material.emissiveIntensity = 1;
                material.color.set("#FFFFFF");
                material.transparent = false;
                material.opacity = 1;
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
          //  console.log("❌ Gewählter Raum nicht gefunden oder hat kein Material:", selectedRoom);
            return;
        }

        // Mit diesem Zwischenspeicher weiß TypeScript, dass selectedMesh existiert.
        const selectedMesh = selected.mesh;

        //console.log("🎯 Ausgewählter Raum:", selectedRoom, "Aktion:", action);

        // **Aktionen anwenden**
        if (action === "hide") {
            console.log("🚀 Verstecke Raum:", selectedRoom);
            selectedMesh.visible = false;
        }

        if (action === "transparent") {
            console.log("🔎 Mache Raum transparent:", selectedRoom);
            if (Array.isArray(selectedMesh.material)) {
                selectedMesh.material.forEach((mat) => {
                    const material = mat as MeshStandardMaterial;
                    material.transparent = true;
                    material.opacity = 0.5;
                });
            } else {
                const material = selectedMesh.material as MeshStandardMaterial;
                material.transparent = true;
                material.opacity = 0.5;
            }
        }

        if (action === "blink") {
       //     console.log("💡 Blinke Raum:", selectedRoom);

            // **Alle anderen Räume transparent machen**
            rooms.forEach((room) => {
                if (room !== selected && room.mesh?.material) {
                    if (Array.isArray(room.mesh.material)) {
                        room.mesh.material.forEach((mat) => {
                            const material = mat as MeshStandardMaterial;
                            material.transparent = true;
                            material.opacity = 0.2;
                        });
                    } else {
                        const material = room.mesh.material as MeshStandardMaterial;
                        material.transparent = true;
                        material.opacity = 0.2;
                    }
                }
            });

            let blink = true;
            const interval = setInterval(() => {
                if (!selectedMesh.material) return;

                if (Array.isArray(selectedMesh.material)) {
                    selectedMesh.material.forEach((mat) => {
                        const material = mat as MeshStandardMaterial;
                        material.emissive?.set(blink ? "#8B0000" : "#FFFFFF");
                        material.emissiveIntensity = blink ? 20 : 1;
                    });
                } else {
                    const material = selectedMesh.material as MeshStandardMaterial;
                    material.emissive?.set(blink ? "#8B0000" : "#FFFFFF");
                    material.emissiveIntensity = blink ? 20 : 1;
                }
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
    }, [selectedRoom, action, rooms]);
}

// **Hilfsfunktion zum Zurücksetzen aller Räume**
function resetRoomMaterials(rooms: Room[]): void {
    rooms.forEach((room) => {
        if (!room.mesh || !room.mesh.material) return;

        if (Array.isArray(room.mesh.material)) {
            room.mesh.material.forEach((mat) => {
                const material = mat as MeshStandardMaterial;
                material.emissive?.set("#000000");
                material.emissiveIntensity = 1;
                material.color.set("#FFFFFF");
                material.transparent = false;
                material.opacity = 1;
            });
        } else {
            const material = room.mesh.material as MeshStandardMaterial;
            material.emissive?.set("#000000");
            material.emissiveIntensity = 1;
            material.color.set("#FFFFFF");
            material.transparent = false;
            material.opacity = 1;
        }

        room.mesh.visible = true; // Räume wieder sichtbar machen
    });
}
