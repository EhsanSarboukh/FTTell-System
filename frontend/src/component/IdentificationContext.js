import React, { createContext, useState } from 'react';

const IdentificationContext = createContext();

export const IdentificationProvider = ({ children }) => {
  const [identification, setIdentification] = useState('');

  return (
    <IdentificationContext.Provider value={{ identification, setIdentification }}>
      {children}
    </IdentificationContext.Provider>
  );
};

export default IdentificationContext;
