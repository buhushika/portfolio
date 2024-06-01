//41.30
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader";
// import IslandNewCanvas from '../models/Island2'
import IslandNewCanvas from "../models/IslandNew";
// import Island from "../models/Island";
import Firefly from "../components/Firefly";

{
  /* <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
      POPUP
    </div> */
}

export const Home = () => {
  const adjestIsalndforScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1,4.7,0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 8.9];
    } else {
      screenScale = [1, 1, 1];
    }
    return [screenPosition, screenScale,rotation];
  };

  const [islandScale, islandPosition,islandRotation] = adjestIsalndforScreenSize();

  return (
    <section className="w-full h-screen relative bg-black overflow-hidden">
      <Firefly/>
      <div className="absolute top-0 left-0 w-full h-full">
        <IslandNewCanvas/>
      </div>
      {/* <Canvas
        className="w-full h-screen bg-transparent"
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight />
          <ambientLight />
          <pointLight />
          <spotLight />
          <hemisphereLight />
          <Island 
          position ={islandPosition}
          scale = {islandScale}
          rotation = {islandRotation}
          />
        </Suspense>
      </Canvas> */}
    </section>
  );
};
