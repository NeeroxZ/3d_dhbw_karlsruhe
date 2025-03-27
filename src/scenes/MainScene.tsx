import React, {JSX, Suspense} from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Sky, useTexture, Environment } from '@react-three/drei';
import { DHBWModel } from "../components/DHBWModel";
import { LoadingScreen } from './LoadingScreen';
import * as THREE from "three";
import {GrassGround} from "../components/GrassGround";

interface MainSceneProps {
    selectedRoom: string;
    action: string;
    // Falls du die Room-Struktur importierst, könntest du hier den konkreten Typ angeben:
    onRoomsExtracted: (rooms: any[]) => void;
}


export function MainScene({ selectedRoom, action, onRoomsExtracted }: MainSceneProps): JSX.Element {
    return (
        <Canvas
            camera={{ position: [-70, 80, 220], fov: 45 }}
            style={{ width: '100vw', height: '100vh' }}
            shadows
            gl={{ antialias: true }}
        >
            <Suspense fallback={<LoadingScreen />}>
                {/* 🌍 Optionale HDRI-Umgebung */}

                {/* 🔹 Himmel mit realistischen Wolken */}
                <Sky sunPosition={[5, 1, 8]} inclination={0.6} azimuth={0.25} />

                {/* 🔹 Beleuchtung */}
                <ambientLight intensity={0.5} />

                {/* 🔥 Haupt-Sonnenlicht mit weichen Schatten */}
                <directionalLight
                    castShadow
                    position={[10, 50, 10]}
                    intensity={1.5}
                    shadow-mapSize={[2048, 2048]}
                    shadow-radius={5}
                />
                {/* Beispiel für weitere Lichtquellen */}
                <pointLight position={[0, 0, 0]} intensity={0.5} distance={60} decay={2} color={"#55aaff"} />

                {/* 🔹 Grasboden */}
                <GrassGround />
                <Environment preset="park" backgroundIntensity={0.1} />

                {/* 🔹 3D-Modell */}
                <DHBWModel
                    selectedRoom={selectedRoom}
                    action={action}
                    onRoomsExtracted={onRoomsExtracted}
                />
            </Suspense>

            {/* 🔹 Schatten unter Objekten */}
            <ContactShadows position={[0, -1, 0]} opacity={0.5} scale={20} blur={2} far={10} />

            {/* 🔹 Kamera-Steuerung mit Limitierung */}
            <OrbitControls minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} />
        </Canvas>
    );
}
