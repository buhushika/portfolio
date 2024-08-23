import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../pages/LoaderNew";
import Witch from "../models/Witch"; // Default import

const IslandNew = ({ isMobile, witchPosition, witchRotation }) => {
  const { scene } = useGLTF("/fantasy_island/scene.gltf");
  const islandRef = React.useRef();
  const witchRef = React.useRef();
  const [manualControl, setManualControl] = useState(false);


  useFrame((state, delta) => {
    if (islandRef.current) {
      islandRef.current.rotation.y -= delta * 0.01; // Rotate the island backward
    }
    if (witchRef.current && !manualControl) {
      witchRef.current.rotation.y += delta * 0.02; // Rotate the witch forward
    }
  });
  

  if (!scene) {
    console.error("Failed to load GLTF model");
    return null;
  }

  return (
    <mesh ref={islandRef}>
      <hemisphereLight intensity={1} groundColor="black" skyColor="white" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.25}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight position={[10, 10, 10]} intensity={1.4} castShadow />
      <directionalLight position={[-5, 10, 5]} intensity={1} castShadow />
      <primitive
        object={scene}
        scale={isMobile ? 0.04 : 0.06}
        position={isMobile ? [0, -3, -0.2] : [0, -3.25, 0.01]}
        rotation={[-0.02, -0.1, -0.02]}
      />
      <Witch
        ref={witchRef}
        position={witchPosition} // Pass updated position
        rotation={witchRotation} // Pass updated rotation
      />
    </mesh>
  );
};

const IslandNewCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [witchPosition, setWitchPosition] = useState([5, -1.2, 1]);
  const [witchRotation, setWitchRotation] = useState([0.2, 1, Math.PI / 20]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);


  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <IslandNew
          isMobile={isMobile}
          witchPosition={witchPosition} // Pass the position
          witchRotation={witchRotation} // Pass the rotation
        />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default IslandNewCanvas;
