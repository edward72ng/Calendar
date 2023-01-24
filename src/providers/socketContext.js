import React, { createContext, useState } from 'react';

const SocketContext = createContext();

function SocketProvider({ children }){
  const [socket, setSocket] = useState(null);

  return (
    <SocketContext.Provider value={{socket, setSocket}}>
      {children}
    </SocketContext.Provider>
  );
};

export {SocketProvider, SocketContext}