import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Register = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    storeName: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (formData.role === 'affiliate' && !formData.storeName) {
      setError('Nome da loja é obrigatório para afiliados');
      return;
    }

    const newUser = {
      id: formData.email,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      storeName: formData.storeName || null
    };

    setUser(newUser);
    localStorage.setItem('cryptopix_user', JSON.stringify(newUser));
    
    if (formData.role === 'affiliate') {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card border-0 shadow-lg rounded-4">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <UserPlus size={48} className="mb-3" style={{color: '#667eea'}} />
                <h2 className="fw-bold mb-2">Criar Conta</h2>
                <p className="text-muted">Junte-se ao CryptoPIX</p>
              </div>

              {error && (
                <div className="alert alert-danger">{error}</div>
              )}

              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Tipo de Conta</label>
                  <select 
                    className="form-select form-select-lg rounded-3"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="user">Usuário Regular</option>
                    <option value="affiliate">Afiliado (Acesso à API)</option>
                  </select>
                  <small className="text-muted">
                    {formData.role === 'user' 
                      ? 'Para realizar transações e ter histórico'
                      : 'Para integrar com sua loja e usar a API'}
                  </small>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Nome</label>
                  <input 
                    type="text" 
                    className="form-control form-control-lg rounded-3" 
                    placeholder="Seu nome completo"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Email</label>
                  <input 
                    type="email" 
                    className="form-control form-control-lg rounded-3" 
                    placeholder="seu@email.com"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {formData.role === 'affiliate' && (
                  <div className="mb-3">
                    <label className="form-label fw-bold">Nome da Loja</label>
                    <input 
                      type="text" 
                      className="form-control form-control-lg rounded-3" 
                      placeholder="Nome da sua loja"
                      name="storeName"
                      value={formData.storeName}
                      onChange={handleChange}
                      required={formData.role === 'affiliate'}
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label fw-bold">Senha</label>
                  <input 
                    type="password" 
                    className="form-control form-control-lg rounded-3" 
                    placeholder="Mínimo 6 caracteres"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Confirmar Senha</label>
                  <input 
                    type="password" 
                    className="form-control form-control-lg rounded-3" 
                    placeholder="Confirme sua senha"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill mb-3">
                  Criar Conta
                </button>

                <div className="text-center">
                  <small className="text-muted">
                    Já tem uma conta? {' '}
                    <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }} style={{color: '#667eea'}}>Entrar</a>
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;