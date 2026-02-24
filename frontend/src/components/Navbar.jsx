import React from 'react';
import { ArrowLeftRight, Search, Users, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('cryptopix_user');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#" onClick={() => setActiveSection('home')}>
          <ArrowLeftRight className="me-2 text-primary" size={32} />
          <span className="fw-bold fs-4" style={{color: '#1a73e8'}}>CryptoPIX</span>
        </a>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => setActiveSection('home')}>Início</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => setActiveSection('send')}>Enviar PIX</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => setActiveSection('buy')}>Comprar Cripto</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => setActiveSection('sell')}>Vender Cripto</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => setActiveSection('check')}>
                <Search size={16} className="me-1" />
                Verificar
              </a>
            </li>
            
            {user ? (
              <>
                {user.role === 'admin' && (
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={() => setActiveSection('admin')}>
                      <Settings size={16} className="me-1" />
                      Admin
                    </a>
                  </li>
                )}
                {user.role === 'affiliate' && (
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={() => setActiveSection('dashboard')}>
                      Dashboard
                    </a>
                  </li>
                )}
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                    {user.name}
                  </a>
                  <ul className="dropdown-menu">
                    {user.role === 'user' && (
                      <li><a className="dropdown-item" href="#" onClick={() => setActiveSection('history')}>Histórico</a></li>
                    )}
                    <li><a className="dropdown-item" href="#" onClick={handleLogout}>Sair</a></li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button className="btn btn-outline-primary btn-sm rounded-pill px-3 me-2" onClick={() => setActiveSection('login')}>
                    Entrar
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-primary btn-sm rounded-pill px-3" onClick={() => setActiveSection('register')}>
                    Cadastrar
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;