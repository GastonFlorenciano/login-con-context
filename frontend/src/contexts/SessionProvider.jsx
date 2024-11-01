import React, { useContext, createContext, useReducer } from 'react'
import { loginRequest, logoutRequest } from '../hook/useSession.jsx';
import { profileReducer } from '../contexts/authReducer.js';
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

const authContext = createContext()

export function SessionProvider({ children }) {

  const initialState = {
    user: null,
    isAuth: null,
    error: null
  };

  const cookieState = Cookies.get('token')

  if (cookieState) {
    const parsedState = JSON.parse(cookieState);
    initialState.user = parsedState.user;
    initialState.isAuth = parsedState.isAuth;
  }

  const [state, dispatch] = useReducer(profileReducer, initialState);


  const login = async (user) => {
    try {
      const response = await loginRequest(user);
      if (response) {
        const { data } = response;
        console.log('context', data);
        dispatch({ type: 'LOGIN', payload: data });
        return toast.success(`Bienvenido`)
      }
    } catch (error) {
      console.log('context', error);
      dispatch({ type: 'ERROR', payload: error });
      return toast.error('Credenciales incorrectas');
    }
  }

  const logout = async () => {
    try {
      const response = await logoutRequest();
      if (response) {
        dispatch({ type: 'LOGOUT' });
        console.log('Logout success. Current state:', state);
      }
      return response;
    } catch (error) {
      console.log('context', error);
      dispatch({ type: 'ERROR', payload: error });
      return toast.error('Error al cerrar sesión');
    }
  }



  return (
    <authContext.Provider value={{ state, login, logout }}>
      {children}
    </authContext.Provider>
  )
}

export const useAuth = () => useContext(authContext);