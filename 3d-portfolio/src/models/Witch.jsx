import React, { useEffect, useState, forwardRef } from "react";
import { useGLTF, Preload } from "@react-three/drei";
import { SpotLight } from 'three';

const Witch = forwardRef(({ position, rotation, ...props }, ref) => {
  const { scene } = useGLTF("/witch/scene.gltf");
  const [scale, setScale] = useState(0.13); // Default scale

  useEffect(() => {
    if (scene) {
      console.log("Witch scene loaded:", scene);
    }
  }, [scene]);

  // Adjust scale based on window width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setScale(0.08); 
      } else {
        setScale(0.13); 
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set the initial scale

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!scene) {
    console.error("Failed to load GLTF model");
    return null;
  }

  return (
    <>
      <primitive
        ref={ref}
        object={scene}
        scale={scale}
        position={position} // Use props for position
        rotation={rotation} // Use props for rotation
        {...props}
      />
      {/* Additional light specifically for the Witch */}
      <spotLight
        position={[5, 5, 5]}  // Adjust position as needed
        angle={0.3}
        penumbra={10}
        intensity={5}
        castShadow
        shadow-mapSize={1024}
      />
    </>
  );
});

export default Witch;
