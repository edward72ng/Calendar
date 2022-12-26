import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
    const navigate = useNavigate();
  const [token, setToken] = React.useState(null);

  const login = (objeto) => {
    fetch('/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify(
          objeto
        ),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(res=> res.json()).then((data)=>{
        setToken(data.token)
        console.log('token asignado')
        navigate('/home')
    })
  };
  
  const logout = () => {
    setToken(null);
    navigate('/')
  };
  
  const auth = { token, login, logout };

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