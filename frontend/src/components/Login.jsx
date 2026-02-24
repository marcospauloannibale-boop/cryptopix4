import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Admin login
    if (email === 'admin' && password === '000000') {
      const adminUser = {
        id: 'admin',
        name: 'Administrador',
        email: 'admin@cryptopix.com.br',
        role: 'admin'
      };
      setUser(adminUser);
      localStorage.setItem('cryptopix_user', JSON.stringify(adminUser));
      navigate('/admin');
      return;
    }

    // Mock affiliates
    const mockAffiliates = [
      { email: 'joao@lojatech.com.br', password: 'senha123', name: 'João Silva', storeName: 'Loja Tech Brasil' },
      { email: 'maria@ecommercepremium.com', password: 'senha123', name: 'Maria Santos', storeName: 'E-commerce Premium' },
      { email: 'carlos@digitalstore.com.br', password: 'senha123', name: 'Carlos Oliveira', storeName: 'Digital Store Pro' }
    ];

    const affiliate = mockAffiliates.find(a => a.email === email && a.password === password);
    if (affiliate) {
      const affiliateUser = {
        id: affiliate.email,
        name: affiliate.name,
        email: affiliate.email,
        storeName: affiliate.storeName,
        role: 'affiliate'
      };
      setUser(affiliateUser);
      localStorage.setItem('cryptopix_user', JSON.stringify(affiliateUser));
      navigate('/dashboard');
      return;
    }

    // Mock regular users
    if (email && password) {
      const regularUser = {
        id: email,
        name: email.split('@')[0],
        email: email,
        role: 'user'
      };
      setUser(regularUser);
      localStorage.setItem('cryptopix_user', JSON.stringify(regularUser));
      navigate('/');
      return;
    }

    setError('Email ou senha inválidos');
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="card border-0 shadow-lg rounded-4">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <LogIn size={48} className="mb-3" style={{color: '#667eea'}} />
                <h2 className="fw-bold mb-2">Entrar</h2>
                <p className="text-muted">Acesse sua conta CryptoPIX</p>
              </div>

              {error && (
                <div className="alert alert-danger">{error}</div>
              )}

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Email ou Usuário</label>
                  <input 
                    type="text" 
                    className="form-control form-control-lg rounded-3" 
                    placeholder="seu@email.com ou admin"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Senha</label>
                  <input 
                    type="password" 
                    className="form-control form-control-lg rounded-3" 
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill mb-3">
                  Entrar
                </button>

                <div className="text-center">
                  <small className="text-muted">
                    Não tem uma conta? {' '}
                    <a href="/register" onClick={(e) => { e.preventDefault(); navigate('/register'); }} style={{color: '#667eea'}}>Cadastre-se</a>
                  </small>
                </div>
              </form>

              <div className="mt-4 p-3 bg-light rounded-3">
                <small className="text-muted d-block mb-2"><strong>Contas de teste:</strong></small>
                <small className="text-muted d-block">Admin: <code>admin</code> / <code>000000</code></small>
                <small className="text-muted d-block">Afiliado: <code>joao@lojatech.com.br</code> / <code>senha123</code></small>
                <small className="text-muted d-block">Usuário: qualquer email / qualquer senha</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;