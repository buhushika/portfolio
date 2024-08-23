import React, { createContext, useContext, useState } from 'react';

const RotationContext = createContext();

export const useRotation = () => useContext(RotationContext);

export const RotationProvider = ({ children }) => {
  const [rotation, setRotation] = useState([0, 0, 0]);

  const updateRotation = (newRotation) => {
    setRotation(newRotation);
  };

  return (
    <RotationContext.Provider value={{ rotation, updateRotation }}>
      {children}
    </RotationContext.Provider>
  );
};
