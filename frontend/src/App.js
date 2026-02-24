import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import SendPIXWithCrypto from './components/SendPIXWithCrypto';
import BuyCrypto from './components/BuyCrypto';
import SellCrypto from './components/SellCrypto';
import CheckTransaction from './components/CheckTransaction';
import Login from './components/Login';
import Register from './components/Register';
import AffiliateDashboard from './components/AffiliateDashboard';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [user, setUser] = useState(null);
  const [userTransactions, setUserTransactions] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('cryptopix_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleTransactionCreated = (transaction) => {
    if (user) {
      setUserTransactions([transaction, ...userTransactions]);
    }
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'home':
        return (
          <>
            <HeroSection setActiveSection={setActiveSection} />
            <HowItWorks />
            <Features />
            <div className="py-5 text-center bg-light">
              <div className="container">
                <h2 className="display-5 fw-bold mb-3">Pronto para Enviar Dinheiro ao Brasil?</h2>
                <p className="lead text-muted mb-4">
                  Junte-se a milhares de pessoas que j\u00e1 enviam dinheiro rapidamente, 
                  com seguran\u00e7a e sem complica\u00e7\u00f5es com o CryptoPIX.
                </p>
                <button 
                  className="btn btn-primary btn-lg rounded-pill px-5"
                  onClick={() => setActiveSection('send')}
                >
                  Enviar PIX
                </button>
              </div>
            </div>
          </>
        );
      case 'send':
        return <SendPIXWithCrypto user={user} onTransactionCreated={handleTransactionCreated} />;
      case 'buy':
        return <BuyCrypto user={user} onTransactionCreated={handleTransactionCreated} />;
      case 'sell':
        return <SellCrypto user={user} onTransactionCreated={handleTransactionCreated} />;
      case 'check':
        return <CheckTransaction />;
      case 'login':
        return <Login setUser={setUser} setActiveSection={setActiveSection} />;
      case 'register':
        return <Register setUser={setUser} setActiveSection={setActiveSection} />;
      case 'dashboard':
        return user && user.role === 'affiliate' ? <AffiliateDashboard user={user} /> : <div>Acesso negado</div>;
      case 'admin':
        return user && user.role === 'admin' ? <AdminDashboard /> : <div>Acesso negado</div>;
      case 'history':
        return (
          <div className="container py-5">
            <h2 className="fw-bold mb-4">Meu Hist\u00f3rico</h2>
            {userTransactions.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-muted">Voc\u00ea ainda n\u00e3o tem transa\u00e7\u00f5es.</p>
                <button 
                  className="btn btn-primary rounded-pill px-4"
                  onClick={() => setActiveSection('send')}
                >
                  Fazer Primeira Transa\u00e7\u00e3o
                </button>
              </div>
            ) : (
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Tipo</th>
                          <th>Valor</th>
                          <th>Status</th>
                          <th>Data</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userTransactions.map(tx => (
                          <tr key={tx.id}>
                            <td><code>{tx.id}</code></td>
                            <td>{tx.type}</td>
                            <td>R$ {tx.amount?.toFixed(2) || tx.brlAmount?.toFixed(2)}</td>
                            <td>
                              <span className={`badge ${tx.status === 'completed' ? 'bg-success' : 'bg-warning'}`}>
                                {tx.status}
                              </span>
                            </td>
                            <td>{new Date(tx.createdAt).toLocaleString('pt-BR')}</td>
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
      default:
        return (
          <>
            <HeroSection setActiveSection={setActiveSection} />
            <HowItWorks />
            <Features />
          </>
        );
    }
  };

  return (
    <div className="App">
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        user={user}
        setUser={setUser}
      />
      <main>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
