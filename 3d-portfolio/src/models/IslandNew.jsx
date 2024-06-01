// IslandNewCanvas.jsx
import React, { Suspense, useEffect, useState } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "../pages/LoaderNew";

extend({ OrbitControls, Preload, useGLTF });

const IslandNew = ({ isMobile }) => {
  const { scene, nodes, materials } = useGLTF("/fantasy_island/scene.gltf");

  if (!scene) {
    console.error("Failed to load GLTF model");
    return null;
  }

  return (
    <mesh>
      <hemisphereLight intensity={1} groundColor="black" skyColor="white" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.25}
        penumbra={1}
        intensity={2}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
      <directionalLight position={[-5, 10, 5]} intensity={1.2} castShadow />
      <primitive
        object={scene}
        scale={isMobile ? 0.04 : 0.06}
        position={isMobile ? [0, -3, -0.2] : [0, -3.25, -0.01]}
        rotation={[-0.02, -0.1, -0.01]}
      />
    </mesh>
  );
};

const IslandNewCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
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
        <IslandNew isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default IslandNewCanvas;
