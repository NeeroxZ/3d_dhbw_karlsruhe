import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

import {DirectionalLightWithHelper, PointLightWithHelper} from "../components/Lights";
import {DHBWModel} from "../components/DHBWModel";

export function MainScene({ selectedRoom, action, onRoomsExtracted }) {
    return (
        <Canvas
            camera={{ position: [-20, 40, 120], fov: 45 }}
            style={{ width: '100vw', height: '100vh' }}
            shadows
            gl={{ antialias: true }}
        >
            {/* Koordinatensystem */}
            <axesHelper args={[500]} />

            <ambientLight intensity={0.2} />

            <DirectionalLightWithHelper
                position={[-100, 40, -120]}
                intensity={1.1}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />
            <DirectionalLightWithHelper
                position={[20, 40, 120]}
                intensity={1.1}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />

            <PointLightWithHelper position={[-100, 40, 120]} intensity={0.8} />
            <PointLightWithHelper position={[-100, 4, 20]} intensity={0.8} />

            <Suspense fallback={null}>
                <DHBWModel
                    selectedRoom={selectedRoom}
                    action={action}
                    onRoomsExtracted={onRoomsExtracted}
                />
            </Suspense>

            <ContactShadows
                position={[0, -0.8, 0]}
                opacity={0.5}
                scale={10}
                blur={1.5}
                far={10}
            />
            <OrbitControls enableDamping dampingFactor={0.1} rotateSpeed={0.5} />
        </Canvas>
    );
}
