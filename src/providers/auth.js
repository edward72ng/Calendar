import React, { useContext,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from './socketContext';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const {setSocket} = useContext(SocketContext)
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null)

  const checkLocal = () => {
    const localToken = localStorage.getItem('MANAGER_TOKEN')
    console.log('REVISANDO LOCALSTORAGE')
    if (localToken){
      setToken(localToken)
      console.log('TOKEN DETECTADO, REDIRIGIENDO')
      return true
    }
  }

  const login = (objeto) => {
    fetch('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify(objeto),
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
      }
    })
    .then(async res => {
      if (res.status === 401) {
      const error = await res.json();
      throw error;
      }
      return res.json();
    })
    .then(data => {
      setToken(data.token);
      const socket = io();
      setSocket(socket);
      navigate('/app/');
      console.log('GUARDA TOKEN EN LOCALSTORAGE')
      localStorage.setItem('MANAGER_TOKEN',data.token)
    })
      .catch(err => {
      setError(err.message);
    });
    };
  
  
  const logout = () => {
    localStorage.clear('MANAGER_TOKEN')
    setToken(null);
    setError(null)
    navigate('/')
  };
  
  const auth = { token, login, logout, error, checkLocal};

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const auth = React.useContext(AuthContext);
  return auth;
}

export {
  AuthProvider,
  useAuth,
};