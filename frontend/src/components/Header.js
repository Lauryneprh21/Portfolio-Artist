import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';  
import { HashLink } from 'react-router-hash-link';  
import { FaTimes } from 'react-icons/fa';  
import AuthContext from '../AuthContext';  
import './Header.css'; 
const Header = () => {
   const [isNavOpen, setIsNavOpen] = useState(false);
  
  
  const { user, logout } = useContext(AuthContext);

   const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="header">
      {}
      <nav className={`nav ${isNavOpen ? 'nav-open' : ''}`}>
        <ul className="nav-links">
          {}
          <li>
            <HashLink 
              smooth to="/#home" 
              className={({ isActive }) => (isActive ? 'active' : 'inactive')}
              onClick={handleNavToggle}  
            >Accueil</HashLink>
          </li>
          <li>
            <HashLink 
              smooth to="/#about" 
              className={({ isActive }) => (isActive ? 'active' : 'inactive')}
              onClick={handleNavToggle}
            >À propos</HashLink>
          </li>
          <li>
            <HashLink 
              smooth to="/#project" 
              className={({ isActive }) => (isActive ? 'active' : 'inactive')}
              onClick={handleNavToggle}
            >Projets</HashLink>
          </li>
          <li>
            <HashLink 
              smooth to="/#contact" 
              className={({ isActive }) => (isActive ? 'active' : 'inactive')}
              onClick={handleNavToggle}
            >Contact</HashLink>
          </li>

          { }
          {user ? (
            <>
              {}
              <li>
                <span>{user.email}</span>
              </li>
              {}
              <li>
                <button className="logout-button" onClick={logout}>Déconnexion</button>
              </li>
            </>
          ) : (
            
            <li>
              <NavLink 
                to="/login" 
                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
                onClick={handleNavToggle}
              >Connexion</NavLink>
            </li>
          )}
        </ul>
        
        { }
        
      </nav>

      { }
      <div 
  className={`burger ${isNavOpen ? 'active' : ''}`} 
  role="button" 
  tabIndex="0" 
  aria-label="Toggle navigation menu" 
  onClick={handleNavToggle}
>
  <img 
    src="https://cdn-icons-png.flaticon.com/512/2613/2613045.png" 
    alt="Menu Icon" 
    className="menu-icon" 
  />
</div>
    </header>
  );
}

export default Header;