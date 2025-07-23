import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Home = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="p-6">
      <h2>Welcome, {user?.firstName}</h2>
      <button onClick={logout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
        Logout
      </button>
    </div>
  );
};

export default Home;
