import React, { useContext } from 'react';
import { Navigate } from 'react-router';
import { AuthContext } from '../../Auth/AuthProvider';

const HomePage = () => {
    const { tokens, user, logout } = useContext(AuthContext);

    if (!tokens) return <Navigate to="/login" />;
    console.log(user)



    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className="max-w-md mx-auto p-6 bg-white shadow-lg mt-10 rounded-md text-center">
                <h1 className="text-2xl font-bold mb-4">Welcome, {user.firstName}!</h1>
                <img
                    src={user.image}
                    alt={user.firstName}
                    className="w-32 h-32 mx-auto rounded-full mb-4 border-2 border-red-500"
                />
                <p className="text-lg font-semibold">{user.firstName} {user.lastName}</p>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500 capitalize">Gender: {user.gender}</p>

                <button className='px-4 py-2 rounded-lg bg-red-500 text-white font-bold mt-5' onClick={logout}>Log Out</button>
            </div>
        </div>
    );
};

export default HomePage;
