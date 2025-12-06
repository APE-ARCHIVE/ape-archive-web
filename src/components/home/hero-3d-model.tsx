'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

function Model(props: any) {
    const { scene } = useGLTF('/model/model-1.glb');

    // Optimize geometry and materials
    React.useEffect(() => {
        scene.traverse((child: any) => {
            if (child.isMesh) {
                child.frustumCulled = true;
                child.castShadow = false;
                child.receiveShadow = false;
                // Reduce material complexity
                if (child.material) {
                    child.material.precision = 'lowp';
                }
            }
        });
    }, [scene]);

    return <primitive object={scene} scale={3} {...props} />;
}

export function Hero3DModel() {
    return (
        <div className="w-full h-full min-h-[400px] flex items-center justify-center">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                dpr={[1, 1.5]} // Limit pixel ratio for performance
                gl={{
                    antialias: false, // Disable for performance
                    powerPreference: 'high-performance',
                    alpha: true,
                }}
                frameloop="demand" // Only render when needed
                performance={{ min: 0.5 }} // Allow frame drops
            >
                {/* Original lighting setup */}
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={2} color="hsl(3.2, 100%, 59.4%)" />
                <spotLight position={[-5, 5, 5]} angle={0.5} penumbra={1} intensity={3} color="hsl(3.2, 100%, 59.4%)" />
                <pointLight position={[0, -2, 2]} intensity={1} color="hsl(3.2, 100%, 59.4%)" />

                <Suspense fallback={null}>
                    <Model position={[0, 0, 0]} rotation={[6, 4.4, 0.15]} />
                    <Environment preset="studio" />
                </Suspense>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={false}
                    // Only update on interaction
                    onChange={() => { }}
                />
            </Canvas>
        </div>
    );
}

// Preload the model
useGLTF.preload('/model/model-1.glb');

