import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function DHBWModel({ selectedRoom, action, onRoomsExtracted }) {
    const MODEL_PATH = '/model/dhbw_modell2102.glb';
    const { scene } = useGLTF(MODEL_PATH);

    // Räume, die wir gefunden haben
    const [rooms, setRooms] = useState([]);
    const roomsLoadedRef = useRef(false);

    // 1) Räume aus dem Modell nur EINMAL extrahieren
    useEffect(() => {
        if (!scene) return;
        if (roomsLoadedRef.current) return;
        roomsLoadedRef.current = true;

        console.log('⏳ Extrahiere Räume aus Szene...');

        const foundRooms = [];
        scene.traverse((object) => {
            if (object.isMesh) {
                // Material klonen für getrennte Farb-Effekte
                object.material = object.material.clone();
                object.material.side = THREE.DoubleSide;
                object.castShadow = true;
                object.receiveShadow = true;

                // Beispielhaft: Alles sammeln
                foundRooms.push(object);
            }
        });

        // Räume speichern
        setRooms(foundRooms);

        // Nur die Namen weitergeben
        const roomNames = foundRooms.map((r) => r.name);
        console.log('✅ Räume extrahiert:', roomNames);

        // Weiterleitung an Parent
        if (typeof onRoomsExtracted === 'function') {
            onRoomsExtracted(roomNames);
        }
    }, [scene, onRoomsExtracted]);

    // 2) Blinken / Verstecken
    useEffect(() => {
        // Erstmal alles zurücksetzen
        rooms.forEach((room) => {
            room.material.emissive.set('#000000');
            room.material.emissiveIntensity = 1;
            room.material.color.set('#FFFFFF');
            room.visible = true;
        });

        const selected = rooms.find((r) => r.name === selectedRoom);
        if (!selected) {
            console.log('❌ Gewählter Raum nicht gefunden:', selectedRoom);
            return;
        }

        console.log('🔍 SELECTED ROOM:', selectedRoom, 'ACTION:', action);

        if (action === 'blink') {
            let blink = true;
            const interval = setInterval(() => {
                selected.material.emissiveIntensity = blink ? 20 : 1;
                selected.material.color.set(blink ? '#8B0000' : '#FFFFFF');
                blink = !blink;
            }, 300);

            const timeout = setTimeout(() => {
                clearInterval(interval);
                selected.material.emissiveIntensity = 1;
                selected.material.color.set('#FFFFFF');
            }, 10000);

            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
                selected.material.emissive.set('#000000');
                selected.material.emissiveIntensity = 1;
                selected.material.color.set('#FFFFFF');
            };
        } else if (action === 'hide') {
            selected.visible = false;
        }
    }, [selectedRoom, action, rooms]);

    return <primitive object={scene} />;
}

// Dieses Preload ist optional, falls mehrere Komponenten das Model laden.
useGLTF.preload('/model/dhbw_modell2102.glb');
