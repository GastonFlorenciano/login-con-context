import React from 'react'
import { useAuth } from '../contexts/SessionProvider'
import toast from 'react-hot-toast';

function Home() {

    const { state, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Sesión cerrada');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }

    return (
        <>
            <div className='bg-blue-300 h-screen grid grid-cols-8 grid-rows-9'>
                <h1 className='bg-white font-semibold text-center text-3xl shadow-md rounded h-fit p-5 col-span-6 row-span-4 col-start-2 row-start-3 md:col-span-2 md:col-start-4'>Bienvenido {state.user.user.username}!</h1>
                <button
                onClick={() => handleLogout()}
                    className='bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline h-fit w-fit absolute left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2'>
                    Cerrar Sesión
                </button>
            </div>
        </>
    )
}

export default Home