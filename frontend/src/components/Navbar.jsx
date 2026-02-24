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
        <a className="navbar-brand d-flex align-items-center" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          <ArrowLeftRight className="me-2 text-primary" size={32} />
          <span className="fw-bold fs-4" style={{color: '#1a73e8'}}>CryptoPIX</span>
        </a>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <a className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Início</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${location.pathname === '/send' ? 'active' : ''}`} href="/send" onClick={(e) => { e.preventDefault(); navigate('/send'); }}>Enviar PIX</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${location.pathname === '/buy' ? 'active' : ''}`} href="/buy" onClick={(e) => { e.preventDefault(); navigate('/buy'); }}>Comprar Cripto</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${location.pathname === '/sell' ? 'active' : ''}`} href="/sell" onClick={(e) => { e.preventDefault(); navigate('/sell'); }}>Vender Cripto</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${location.pathname === '/check' ? 'active' : ''}`} href="/check" onClick={(e) => { e.preventDefault(); navigate('/check'); }}>
                <Search size={16} className="me-1" />
                Verificar
              </a>
            </li>
            
            {user ? (
              <>
                {user.role === 'admin' && (
                  <li className="nav-item">
                    <a className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`} href="/admin" onClick={(e) => { e.preventDefault(); navigate('/admin'); }}>
                      <Settings size={16} className="me-1" />
                      Admin
                    </a>
                  </li>
                )}
                {user.role === 'affiliate' && (
                  <li className="nav-item">
                    <a className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`} href="/dashboard" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
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
                      <li><a className="dropdown-item" href="/history" onClick={(e) => { e.preventDefault(); navigate('/history'); }}>Histórico</a></li>
                    )}
                    <li><a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Sair</a></li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button className="btn btn-outline-primary btn-sm rounded-pill px-3 me-2" onClick={() => navigate('/login')}>
                    Entrar
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-primary btn-sm rounded-pill px-3" onClick={() => navigate('/register')}>
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