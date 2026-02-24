import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

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

// Home component
const Home = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <HeroSection setActiveSection={(section) => navigate(`/${section}`)} />
      <HowItWorks />
      <Features />
      <div className="py-5 text-center bg-light">
        <div className="container">
          <h2 className="display-5 fw-bold mb-3">Pronto para Enviar Dinheiro ao Brasil?</h2>
          <p className="lead text-muted mb-4">
            Junte-se a milhares de pessoas que já enviam dinheiro rapidamente, 
            com segurança e sem complicações com o CryptoPIX.
          </p>
          <button 
            className="btn btn-primary btn-lg rounded-pill px-5"
            onClick={() => navigate('/send')}
          >
            Enviar PIX
          </button>
        </div>
      </div>
    </>
  );
};

// History component
const History = ({ userTransactions }) => {
  const navigate = useNavigate();
  
  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Meu Histórico</h2>
      {userTransactions.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">Você ainda não tem transações.</p>
          <button 
            className="btn btn-primary rounded-pill px-4"
            onClick={() => navigate('/send')}
          >
            Fazer Primeira Transação
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
};

// Protected route component
const ProtectedRoute = ({ user, requiredRole, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// App wrapper with routing
function AppContent() {
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

  return (
    <div className="App">
      <Navbar 
        user={user}
        setUser={setUser}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/send" element={<SendPIXWithCrypto user={user} onTransactionCreated={handleTransactionCreated} />} />
          <Route path="/buy" element={<BuyCrypto user={user} onTransactionCreated={handleTransactionCreated} />} />
          <Route path="/sell" element={<SellCrypto user={user} onTransactionCreated={handleTransactionCreated} />} />
          <Route path="/check" element={<CheckTransaction />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route 
            path="/history" 
            element={
              <ProtectedRoute user={user}>
                <History userTransactions={userTransactions} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute user={user} requiredRole="affiliate">
                <AffiliateDashboard user={user} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute user={user} requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
