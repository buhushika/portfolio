import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Butterfly({ isRotating, ...props }) {
  const { scene, animations } = useGLTF("/butterfly/scene.gltf");

  return (
    <Canvas> {/* Wrap everything inside Canvas */}
      <primitive object={scene} {...props} />
    </Canvas>
  );
}
