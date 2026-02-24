import React, { useState } from 'react';
import { Users, Store, Activity, DollarSign, TrendingUp, Settings } from 'lucide-react';
import { mockStores } from '../data/mockData';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    totalUsers: 1247,
    totalStores: mockStores.length,
    totalTransactions: 4776,
    totalVolume: 891784.60,
    monthlyGrowth: 23.5
  };

  const recentUsers = [
    { id: 1, name: 'Pedro Costa', email: 'pedro@email.com', role: 'user', createdAt: '2026-01-14' },
    { id: 2, name: 'Ana Silva', email: 'ana@email.com', role: 'user', createdAt: '2026-01-13' },
    { id: 3, name: 'Lucas Santos', email: 'lucas@email.com', role: 'user', createdAt: '2026-01-13' }
  ];

  const allTransactions = [
    { id: 'CPX-001', store: 'Loja Tech Brasil', user: 'João Silva', amount: 500.00, status: 'completed', date: '2026-01-14' },
    { id: 'CPX-002', store: 'E-commerce Premium', user: 'Maria Santos', amount: 1200.00, status: 'completed', date: '2026-01-14' },
    { id: 'CPX-003', store: 'Digital Store Pro', user: 'Carlos Oliveira', amount: 850.00, status: 'pending', date: '2026-01-13' },
    { id: 'CPX-004', store: 'Loja Tech Brasil', user: 'Ana Costa', amount: 1500.00, status: 'completed', date: '2026-01-13' }
  ];

  return (
    <div className="container py-5">
      <div className="mb-4">
        <h2 className="fw-bold mb-2">Painel Administrativo</h2>
        <p className="text-muted">Visão completa da plataforma CryptoPIX</p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-3 p-4" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white'}}>
            <DollarSign size={32} className="mb-2" />
            <h3 className="fw-bold mb-1">R$ {stats.totalVolume.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</h3>
            <small>Volume Total</small>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-3 p-4">
            <Activity size={32} className="mb-2" style={{color: '#667eea'}} />
            <h3 className="fw-bold mb-1">{stats.totalTransactions}</h3>
            <small className="text-muted">Transações</small>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-3 p-4">
            <Users size={32} className="mb-2" style={{color: '#10b981'}} />
            <h3 className="fw-bold mb-1">{stats.totalUsers}</h3>
            <small className="text-muted">Usuários</small>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-3 p-4">
            <Store size={32} className="mb-2" style={{color: '#f59e0b'}} />
            <h3 className="fw-bold mb-1">{stats.totalStores}</h3>
            <small className="text-muted">Lojas Ativas</small>
          </div>
        </div>
      </div>

      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <a 
            className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`} 
            href="#" 
            onClick={() => setActiveTab('overview')}
          >
            Visão Geral
          </a>
        </li>
        <li className="nav-item">
          <a 
            className={`nav-link ${activeTab === 'users' ? 'active' : ''}`} 
            href="#" 
            onClick={() => setActiveTab('users')}
          >
            Usuários
          </a>
        </li>
        <li className="nav-item">
          <a 
            className={`nav-link ${activeTab === 'stores' ? 'active' : ''}`} 
            href="#" 
            onClick={() => setActiveTab('stores')}
          >
            Lojas/Afiliados
          </a>
        </li>
        <li className="nav-item">
          <a 
            className={`nav-link ${activeTab === 'transactions' ? 'active' : ''}`} 
            href="#" 
            onClick={() => setActiveTab('transactions')}
          >
            Transações
          </a>
        </li>
        <li className="nav-item">
          <a 
            className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`} 
            href="#" 
            onClick={() => setActiveTab('settings')}
          >
            Configurações
          </a>
        </li>
      </ul>

      {activeTab === 'overview' && (
        <div className="row">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-3 mb-4">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">Transações Recentes</h5>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Loja</th>
                        <th>Valor</th>
                        <th>Status</th>
                        <th>Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allTransactions.slice(0, 5).map(tx => (
                        <tr key={tx.id}>
                          <td><code>{tx.id}</code></td>
                          <td>{tx.store}</td>
                          <td>R$ {tx.amount.toFixed(2)}</td>
                          <td>
                            <span className={`badge ${tx.status === 'completed' ? 'bg-success' : 'bg-warning'}`}>
                              {tx.status}
                            </span>
                          </td>
                          <td>{new Date(tx.date).toLocaleDateString('pt-BR')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-3 mb-4">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">Crescimento Mensal</h5>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <TrendingUp size={48} style={{color: '#10b981'}} />
                  <div>
                    <h2 className="fw-bold mb-0" style={{color: '#10b981'}}>+{stats.monthlyGrowth}%</h2>
                    <small className="text-muted">vs mês anterior</small>
                  </div>
                </div>
                <div className="progress" style={{height: '8px'}}>
                  <div className="progress-bar bg-success" role="progressbar" style={{width: `${stats.monthlyGrowth}%`}}></div>
                </div>
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">Novos Usuários</h5>
                {recentUsers.map(user => (
                  <div key={user.id} className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
                    <div className="rounded-circle d-flex align-items-center justify-content-center" 
                         style={{width: '40px', height: '40px', background: '#f0f4ff', color: '#667eea', fontWeight: 'bold'}}>
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex-grow-1">
                      <div className="fw-bold">{user.name}</div>
                      <small className="text-muted">{user.email}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="card border-0 shadow-sm rounded-3">
          <div className="card-body p-4">
            <h5 className="fw-bold mb-4">Todos os Usuários</h5>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Tipo</th>
                    <th>Data de Cadastro</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td><span className="badge bg-primary">{user.role}</span></td>
                      <td>{new Date(user.createdAt).toLocaleDateString('pt-BR')}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary rounded-pill me-2">Ver</button>
                        <button className="btn btn-sm btn-outline-danger rounded-pill">Bloquear</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'stores' && (
        <div className="card border-0 shadow-sm rounded-3">
          <div className="card-body p-4">
            <h5 className="fw-bold mb-4">Lojas / Afiliados</h5>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Nome da Loja</th>
                    <th>Proprietário</th>
                    <th>Email</th>
                    <th>Transações</th>
                    <th>Volume</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {mockStores.map(store => (
                    <tr key={store.id}>
                      <td className="fw-bold">{store.name}</td>
                      <td>{store.owner}</td>
                      <td>{store.email}</td>
                      <td>{store.totalTransactions}</td>
                      <td>R$ {store.totalVolume.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                      <td>
                        <span className={`badge ${store.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                          {store.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary rounded-pill me-2">Ver</button>
                        <button className="btn btn-sm btn-outline-warning rounded-pill">Editar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="card border-0 shadow-sm rounded-3">
          <div className="card-body p-4">
            <h5 className="fw-bold mb-4">Todas as Transações</h5>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Loja</th>
                    <th>Usuário</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Data</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {allTransactions.map(tx => (
                    <tr key={tx.id}>
                      <td><code>{tx.id}</code></td>
                      <td>{tx.store}</td>
                      <td>{tx.user}</td>
                      <td>R$ {tx.amount.toFixed(2)}</td>
                      <td>
                        <span className={`badge ${tx.status === 'completed' ? 'bg-success' : 'bg-warning'}`}>
                          {tx.status}
                        </span>
                      </td>
                      <td>{new Date(tx.date).toLocaleDateString('pt-BR')}</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary rounded-pill">Detalhes</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="card border-0 shadow-sm rounded-3">
          <div className="card-body p-4">
            <h5 className="fw-bold mb-4">Configurações da Plataforma</h5>
            
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card bg-light border-0 rounded-3 p-4">
                  <h6 className="fw-bold mb-3">Taxas</h6>
                  <div className="mb-3">
                    <label className="form-label">Taxa da Plataforma (%)</label>
                    <input type="number" className="form-control" defaultValue="1.5" step="0.1" />
                  </div>
                  <button className="btn btn-primary rounded-pill">Salvar</button>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="card bg-light border-0 rounded-3 p-4">
                  <h6 className="fw-bold mb-3">Tempo de Expiração</h6>
                  <div className="mb-3">
                    <label className="form-label">Invoice Expira em (minutos)</label>
                    <input type="number" className="form-control" defaultValue="15" />
                  </div>
                  <button className="btn btn-primary rounded-pill">Salvar</button>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="card bg-light border-0 rounded-3 p-4">
                  <h6 className="fw-bold mb-3">Criptomoedas Suportadas</h6>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" defaultChecked id="btc" />
                    <label className="form-check-label" htmlFor="btc">Bitcoin (BTC)</label>
                  </div>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" defaultChecked id="eth" />
                    <label className="form-check-label" htmlFor="eth">Ethereum (ETH)</label>
                  </div>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" defaultChecked id="usdt" />
                    <label className="form-check-label" htmlFor="usdt">USDT</label>
                  </div>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" defaultChecked id="drex" />
                    <label className="form-check-label" htmlFor="drex">DREX</label>
                  </div>
                  <button className="btn btn-primary rounded-pill mt-3">Salvar</button>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="card bg-light border-0 rounded-3 p-4">
                  <h6 className="fw-bold mb-3">Manutenção</h6>
                  <div className="form-check form-switch mb-3">
                    <input className="form-check-input" type="checkbox" id="maintenance" />
                    <label className="form-check-label" htmlFor="maintenance">
                      Modo de Manutenção
                    </label>
                  </div>
                  <small className="text-muted">Ativar para bloquear novas transações temporariamente</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;