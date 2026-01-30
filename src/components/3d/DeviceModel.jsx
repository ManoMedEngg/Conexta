import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, MeshWobbleMaterial, OrbitControls } from '@react-three/drei';

const SpinningBox = ({ status }) => {
    const mesh = useRef();
    useFrame((state, delta) => (mesh.current.rotation.x = mesh.current.rotation.y += delta * 0.5));

    const color = status === 'Online' ? '#05ff00' : status === 'Maintenance' ? '#fbbf24' : '#ef4444';

    return (
        <Box args={[1.5, 1.5, 1.5]} ref={mesh}>
            <MeshWobbleMaterial attach="material" factor={0.6} speed={1} color={color} metalness={0.8} />
        </Box>
    );
};

export const DeviceModel = ({ status }) => {
    return (
        <div className="h-64 w-full bg-black/40 rounded-lg overflow-hidden border border-white/5 relative">
            <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-black/50 text-xs rounded border border-white/10 text-gray-400">
                Interactive 3D View
            </div>
            <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <SpinningBox status={status} />
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    );
};
