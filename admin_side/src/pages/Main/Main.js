import { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './Main.css';

function Main() {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem('accessToken');
      navigate('/');
    }
  };

  useEffect(() => {
    if (!accessToken) {
      handleLogout();
    }
  }, [accessToken, navigate]);

  const isActive = (path) => location.pathname === path;

  return (
    <div className='Main'>
      <div className='container'>
        <div className='navigation'>
          <ul>
            <li className={isActive('/main/dashboard') ? 'active' : ''}>
              <a href="/main/dashboard">Dashboard</a>
            </li>
            <li className={(isActive('/main/movies') || location.pathname.startsWith('/main/movies/')) ? 'active' : ''}>
              <a href="/main/movies">Movies</a>
            </li>
            <li className='logout'>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
        <div className='outlet'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
