import React, {JSX, Suspense} from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Sky, useTexture, Environment } from '@react-three/drei';
import { DHBWModel } from "../components/DHBWModel";
import { LoadingScreen } from './LoadingScreen';
import * as THREE from "three";

interface MainSceneProps {
    selectedRoom: string;
    action: string;
    // Falls du die Room-Struktur importierst, könntest du hier den konkreten Typ angeben:
    onRoomsExtracted: (rooms: any[]) => void;
}

// 🔹 Grasboden als extra Komponente
function GrassGround(): JSX.Element {
    const grassTexture = useTexture("textures/asphalt.jpg");
    grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(10, 10);
    grassTexture.anisotropy = 16;
    grassTexture.minFilter = THREE.LinearMipMapLinearFilter;
    grassTexture.magFilter = THREE.LinearFilter;

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
            <planeGeometry args={[200, 200]} />
            <meshStandardMaterial map={grassTexture} />
        </mesh>
    );
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
                <Environment preset="park" />

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
