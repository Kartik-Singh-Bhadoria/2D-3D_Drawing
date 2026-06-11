import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Grid } from '@react-three/drei';
import * as THREE from 'three';

interface Viewer3DProps {
  walls: any[];
  wireframe: boolean;
}

function WallMesh({ wallData, wireframe }: { wallData: any, wireframe: boolean }) {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    if (!wallData || !wallData.outer || wallData.outer.length < 3) return s;
    s.moveTo(wallData.outer[0].x, wallData.outer[0].y);
    for (let i = 1; i < wallData.outer.length; i++) {
      s.lineTo(wallData.outer[i].x, wallData.outer[i].y);
    }
    s.lineTo(wallData.outer[0].x, wallData.outer[0].y);

    if (wallData.holes) {
      wallData.holes.forEach((hole: any[]) => {
        if (hole.length < 3) return;
        const path = new THREE.Path();
        path.moveTo(hole[0].x, hole[0].y);
        for (let i = 1; i < hole.length; i++) {
          path.lineTo(hole[i].x, hole[i].y);
        }
        path.lineTo(hole[0].x, hole[0].y);
        s.holes.push(path);
      });
    }

    return s;
  }, [wallData]);

  // Settings for extrusion (height of the wall)
  const extrudeSettings = {
    depth: 3.0, // wall height
    bevelEnabled: false,
  };

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
      <extrudeGeometry args={[shape, extrudeSettings]} />
      <meshStandardMaterial 
         color="#cbd5e1" 
         roughness={0.7} 
         metalness={0.1}
         wireframe={wireframe}
      />
    </mesh>
  );
}

export default function Viewer3D({ walls, wireframe }: Viewer3DProps) {
  return (
    <Canvas 
      camera={{ position: [0, 15, 20], fov: 50 }} 
      shadows
      className="w-full h-full"
    >
      <ambientLight intensity={0.4} />
      <directionalLight 
         position={[10, 20, 10]} 
         intensity={1.0} 
         castShadow 
         shadow-mapSize={[2048, 2048]}
         shadow-camera-left={-20}
         shadow-camera-right={20}
         shadow-camera-top={20}
         shadow-camera-bottom={-20}
      />
      
      <group position={[0, -0.1, 0]}>
        <Grid 
           args={[50, 50]} 
           cellSize={1} 
           cellThickness={0.5} 
           cellColor="#334155" 
           sectionSize={5} 
           sectionThickness={1} 
           sectionColor="#475569" 
           fadeDistance={40}
        />
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>

      <group>
        {walls.map((wallData, index) => (
          <WallMesh key={index} wallData={wallData} wireframe={wireframe} />
        ))}
      </group>

      <OrbitControls 
         makeDefault 
         minPolarAngle={0} 
         maxPolarAngle={Math.PI / 2 + 0.1}
         maxDistance={60}
      />
      <Environment preset="city" opacity={0.3} background={false} />
    </Canvas>
  );
}
