'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';

function Model(props: any) {
    const { scene } = useGLTF('/model/model-1.glb');
    return <primitive object={scene} scale={3} {...props} />;
}

export function Hero3DModel() {
    return (
        <div className="w-full h-full min-h-[400px] flex items-center justify-center">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.2} />
                <directionalLight position={[10, 10, 5]} intensity={2} color="hsl(3.2, 100%, 59.4%)" />
                <spotLight position={[-5, 5, 5]} angle={0.5} penumbra={1} intensity={3} color="hsl(3.2, 100%, 59.4%)" />
                <pointLight position={[0, -2, 2]} intensity={1} color="hsl(3.2, 100%, 59.4%)" />
                <Suspense fallback={null}>
                    <Model position={[0, 0, 0]} rotation={[6, 4.4, 0.15]} />
                    <Environment preset="city" />
                </Suspense>
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    );
}

useGLTF.preload('/model/model-1.glb');
