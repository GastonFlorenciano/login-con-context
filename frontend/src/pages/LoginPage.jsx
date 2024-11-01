import React, { useEffect } from 'react'; 
import { set, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAuth } from '../contexts/SessionProvider';

function LoginForm() {

  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await login(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error during login:', error);
    }
  }
  useEffect(() => {
    console.log('loading', isLoading);
  } , [isLoading]);

  return (
    <div className="bg-blue-300 h-screen grid grid-cols-8 grid-rows-8">
      {isLoading ? (
        <div className="absolute bg-black bg-opacity-50 h-screen w-screen z-50">
          <h1>Cargando...</h1>
        </div>
      ) : (
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white shadow-md rounded h-fit p-5 col-span-6 row-span-4 col-start-2 row-start-3 md:col-span-2 md:col-start-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Usuario
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="username"
                type="text"
                {...register('username', { required: 'El nombre de usuario es obligatorio' })}
                placeholder="Nombre de usuario"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="password"
                type="password"
                {...register('password', { required: 'La contraseña es obligatoria' })}
                placeholder="******************"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Ingresar
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default LoginForm;
