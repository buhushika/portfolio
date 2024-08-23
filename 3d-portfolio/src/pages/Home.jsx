import React, { useState } from "react";
import IslandNewCanvas from "../models/IslandNew"; // Import the updated IslandNewCanvas
import Firefly from "../components/Firefly"; // Keep any additional components like Firefly

export const Home = () => {
  const [isRotating, setIsRotating] = useState(false);

  return (
    <section className="w-full h-screen relative bg-black overflow-hidden">
      <Firefly />
      <div className="absolute top-0 left-0 w-full h-full">
        <IslandNewCanvas isRotating={isRotating} setIsRotating={setIsRotating} />
      </div>
    </section>
  );
};
