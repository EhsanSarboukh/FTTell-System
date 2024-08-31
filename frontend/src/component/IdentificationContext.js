// This component provides the IdentificationContext to its children, it manages the state of the 'identification' value, which can be accessed and updated by any component within the provider.
import React, { createContext, useState } from 'react';

const IdentificationContext = createContext();

export const IdentificationProvider = ({ children }) => {
  // Define a state variable to hold the identification value, initialized as an empty string.
  const [identification, setIdentification] = useState('');

  return (
    // Provide the identification and setIdentification function to the context's consumers.
    <IdentificationContext.Provider value={{ identification, setIdentification }}>
      {children}
    </IdentificationContext.Provider>
  );
};

export default IdentificationContext;
