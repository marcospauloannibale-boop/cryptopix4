import React, { useState } from 'react';
import { Key, Copy, CheckCircle2, TrendingUp, DollarSign, Activity, Eye, Code } from 'lucide-react';
import { mockStores } from '../data/mockData';

const AffiliateDashboard = ({ user }) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const store = mockStores.find(s => s.email === user.email) || {
    id: user.id,
    name: user.storeName,
    owner: user.name,
    email: user.email,
    apiKey: 'cpx_live_' + Math.random().toString(36).substring(2, 22),
    totalTransactions: 0,
    totalVolume: 0,
    status: 'active'
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mockTransactions = [
    { id: 'CPX-001', date: '2026-01-14', amount: 500.00, status: 'completed', type: 'buy_crypto' },
    { id: 'CPX-002', date: '2026-01-14', amount: 1200.00, status: 'completed', type: 'crypto_to_pix' },
    { id: 'CPX-003', date: '2026-01-13', amount: 850.00, status: 'pending', type: 'sell_crypto' }
  ];

  return (
    <div className="container py-5">
      <div className="mb-4">
        <h2 className="fw-bold mb-2">Dashboard - {store.name}</h2>
        <p className="text-muted">Gerencie suas integrações e acompanhe suas transações</p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-3 p-4" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white'}}>
            <DollarSign size={32} className="mb-2" />
            <h3 className="fw-bold mb-1">R$ {store.totalVolume.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</h3>
            <small>Volume Total</small>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-3 p-4">
            <Activity size={32} className="mb-2" style={{color: '#667eea'}} />
            <h3 className="fw-bold mb-1">{store.totalTransactions}</h3>
            <small className="text-muted">Transações</small>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-3 p-4">
            <TrendingUp size={32} className="mb-2" style={{color: '#10b981'}} />
            <h3 className="fw-bold mb-1">1.5%</h3>
            <small className="text-muted">Taxa Média</small>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm rounded-3 p-4">
            <CheckCircle2 size={32} className="mb-2" style={{color: '#10b981'}} />
            <h3 className="fw-bold mb-1">{store.status === 'active' ? 'Ativa' : 'Inativa'}</h3>
            <small className="text-muted">Status</small>
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
            className={`nav-link ${activeTab === 'api' ? 'active' : ''}`} 
            href="#" 
            onClick={() => setActiveTab('api')}
          >
            API
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
                        <th>Data</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockTransactions.map(tx => (
                        <tr key={tx.id}>
                          <td><code>{tx.id}</code></td>
                          <td>{new Date(tx.date).toLocaleDateString('pt-BR')}</td>
                          <td>{tx.type}</td>
                          <td>R$ {tx.amount.toFixed(2)}</td>
                          <td>
                            <span className={`badge ${tx.status === 'completed' ? 'bg-success' : 'bg-warning'}`}>
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-3">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">Informações da Loja</h5>
                <div className="mb-3">
                  <small className="text-muted">Nome</small>
                  <div className="fw-bold">{store.name}</div>
                </div>
                <div className="mb-3">
                  <small className="text-muted">Proprietário</small>
                  <div className="fw-bold">{store.owner}</div>
                </div>
                <div className="mb-3">
                  <small className="text-muted">Email</small>
                  <div className="fw-bold">{store.email}</div>
                </div>
                <div className="mb-3">
                  <small className="text-muted">ID da Loja</small>
                  <div className="fw-bold"><code>{store.id}</code></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'api' && (
        <div className="card border-0 shadow-sm rounded-3">
          <div className="card-body p-4">
            <h5 className="fw-bold mb-4">Configuração da API</h5>
            
            <div className="card bg-light border-0 rounded-3 p-4 mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0">Chave da API</h6>
                <button 
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  <Eye size={16} className="me-1" />
                  {showApiKey ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              <div className="d-flex gap-2">
                <input 
                  type={showApiKey ? 'text' : 'password'}
                  className="form-control"
                  value={store.apiKey}
                  readOnly
                />
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => handleCopy(store.apiKey)}
                >
                  {copied ? <CheckCircle2 size={20} /> : <Copy size={20} />}
                </button>
              </div>
              <small className="text-muted mt-2 d-block">
                <strong>Importante:</strong> Mantenha sua chave em segurança. Não compartilhe publicamente.
              </small>
            </div>

            <h6 className="fw-bold mb-3">Documentação da API</h6>
            
            <div className="accordion" id="apiAccordion">
              <div className="accordion-item border-0 shadow-sm mb-2 rounded-3">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#createPayment">
                    <Code size={20} className="me-2" />
                    Criar Pagamento PIX com Cripto
                  </button>
                </h2>
                <div id="createPayment" className="accordion-collapse collapse show" data-bs-parent="#apiAccordion">
                  <div className="accordion-body">
                    <code className="d-block bg-dark text-white p-3 rounded-3 mb-2">
                      POST https://api.cryptopix.com.br/v1/payments/create
                    </code>
                    <strong>Headers:</strong>
                    <pre className="bg-light p-3 rounded-3">{`{
  "Authorization": "Bearer ${store.apiKey}",
  "Content-Type": "application/json"
}`}</pre>
                    <strong>Body:</strong>
                    <pre className="bg-light p-3 rounded-3">{`{
  "crypto": "bitcoin",
  "amount": 1000.00,
  "pixKey": "11987654321",
  "message": "Pagamento de produto"
}`}</pre>
                  </div>
                </div>
              </div>

              <div className="accordion-item border-0 shadow-sm mb-2 rounded-3">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#checkStatus">
                    <Code size={20} className="me-2" />
                    Verificar Status da Transação
                  </button>
                </h2>
                <div id="checkStatus" className="accordion-collapse collapse" data-bs-parent="#apiAccordion">
                  <div className="accordion-body">
                    <code className="d-block bg-dark text-white p-3 rounded-3 mb-2">
                      GET https://api.cryptopix.com.br/v1/transactions/:id
                    </code>
                    <strong>Headers:</strong>
                    <pre className="bg-light p-3 rounded-3">{`{
  "Authorization": "Bearer ${store.apiKey}"
}`}</pre>
                    <strong>Response:</strong>
                    <pre className="bg-light p-3 rounded-3">{`{
  "id": "CPX-20260114-2RXY27",
  "status": "completed",
  "amount": 1000.00,
  "crypto": "bitcoin",
  "createdAt": "2026-01-14T10:30:00Z"
}`}</pre>
                  </div>
                </div>
              </div>

              <div className="accordion-item border-0 shadow-sm rounded-3">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#buyCrypto">
                    <Code size={20} className="me-2" />
                    Comprar Criptomoeda
                  </button>
                </h2>
                <div id="buyCrypto" className="accordion-collapse collapse" data-bs-parent="#apiAccordion">
                  <div className="accordion-body">
                    <code className="d-block bg-dark text-white p-3 rounded-3 mb-2">
                      POST https://api.cryptopix.com.br/v1/crypto/buy
                    </code>
                    <strong>Body:</strong>
                    <pre className="bg-light p-3 rounded-3">{`{
  "crypto": "bitcoin",
  "amount": 0.001
}`}</pre>
                  </div>
                </div>
              </div>
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
                    <th>Data</th>
                    <th>Tipo</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTransactions.map(tx => (
                    <tr key={tx.id}>
                      <td><code>{tx.id}</code></td>
                      <td>{new Date(tx.date).toLocaleDateString('pt-BR')}</td>
                      <td>{tx.type}</td>
                      <td>R$ {tx.amount.toFixed(2)}</td>
                      <td>
                        <span className={`badge ${tx.status === 'completed' ? 'bg-success' : 'bg-warning'}`}>
                          {tx.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary rounded-pill">
                          Ver Detalhes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AffiliateDashboard;