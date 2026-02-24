import React, { useState } from 'react';
import { Search, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

const CheckTransaction = () => {
  const [transactionId, setTransactionId] = useState('');
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const mockTransactions = {
    'CPX-20260114-2RXY27': {
      id: 'CPX-20260114-2RXY27',
      type: 'crypto_to_pix',
      status: 'completed',
      amount: 1500.00,
      crypto: 'bitcoin',
      cryptoAmount: 0.0042857,
      pixKey: '11987654321',
      fee: 22.50,
      networkFee: 35.00,
      createdAt: '2026-01-14T10:30:00',
      paidAt: '2026-01-14T10:32:15',
      completedAt: '2026-01-14T10:33:00'
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setNotFound(false);
    setTransaction(null);

    setTimeout(() => {
      const found = mockTransactions[transactionId.toUpperCase()];
      if (found) {
        setTransaction(found);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }, 1000);
  };

  const getStatusInfo = (status) => {
    switch(status) {
      case 'completed':
        return { icon: <CheckCircle size={48} />, color: 'success', text: 'Finalizada' };
      case 'processing':
        return { icon: <Clock size={48} />, color: 'warning', text: 'Processando' };
      case 'pending':
        return { icon: <AlertCircle size={48} />, color: 'info', text: 'Aguardando Pagamento' };
      case 'failed':
        return { icon: <XCircle size={48} />, color: 'danger', text: 'Falhou' };
      default:
        return { icon: <AlertCircle size={48} />, color: 'secondary', text: 'Desconhecido' };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const getTypeText = (type) => {
    switch(type) {
      case 'crypto_to_pix':
        return 'Cripto para PIX';
      case 'buy_crypto':
        return 'Comprar Cripto';
      case 'sell_crypto':
        return 'Vender Cripto';
      default:
        return type;
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Verificar Status da Transação</h2>
            <p className="lead text-muted">Tenha controle total sobre seus pagamentos. Verifique o status de qualquer transação em segundos.</p>
          </div>

          <div className="card border-0 shadow-lg rounded-4">
            <div className="card-body p-5">
              <form onSubmit={handleSearch}>
                <div className="mb-4">
                  <label className="form-label fw-bold">Código da Transação</label>
                  <div className="input-group input-group-lg">
                    <input 
                      type="text" 
                      className="form-control rounded-start-3" 
                      placeholder="CPX-20260114-2RXY27"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                    />
                    <button 
                      type="submit" 
                      className="btn btn-primary rounded-end-3 px-4"
                      disabled={!transactionId || loading}
                    >
                      <Search size={20} className="me-2" />
                      {loading ? 'Buscando...' : 'Verificar'}
                    </button>
                  </div>
                  <small className="text-muted">Exemplo: CPX-20260114-2RXY27</small>
                </div>
              </form>

              {notFound && (
                <div className="alert alert-warning d-flex align-items-center gap-2">
                  <AlertCircle size={20} />
                  Transação não encontrada. Verifique o código e tente novamente.
                </div>
              )}

              {transaction && (
                <div className="mt-4">
                  <div className="text-center mb-4">
                    <div className={`text-${getStatusInfo(transaction.status).color} mb-3`}>
                      {getStatusInfo(transaction.status).icon}
                    </div>
                    <h4 className="fw-bold mb-2">{getStatusInfo(transaction.status).text}</h4>
                    <p className="text-muted">ID: {transaction.id}</p>
                  </div>

                  <div className="card bg-light border-0 rounded-3 p-4">
                    <h5 className="fw-bold mb-3">Detalhes da Transação</h5>
                    
                    <div className="row mb-3">
                      <div className="col-6">
                        <small className="text-muted">Tipo</small>
                        <div className="fw-bold">{getTypeText(transaction.type)}</div>
                      </div>
                      <div className="col-6">
                        <small className="text-muted">Status</small>
                        <div className="fw-bold">{getStatusInfo(transaction.status).text}</div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-6">
                        <small className="text-muted">Valor</small>
                        <div className="fw-bold">R$ {transaction.amount.toFixed(2)}</div>
                      </div>
                      <div className="col-6">
                        <small className="text-muted">Taxa</small>
                        <div className="fw-bold">R$ {transaction.fee.toFixed(2)}</div>
                      </div>
                    </div>

                    {transaction.crypto && (
                      <div className="mb-3">
                        <small className="text-muted">Criptomoeda</small>
                        <div className="fw-bold">{transaction.cryptoAmount} {transaction.crypto.toUpperCase()}</div>
                      </div>
                    )}

                    {transaction.pixKey && (
                      <div className="mb-3">
                        <small className="text-muted">Chave PIX</small>
                        <div className="fw-bold">{transaction.pixKey}</div>
                      </div>
                    )}

                    <div className="border-top pt-3 mt-3">
                      <div className="row">
                        <div className="col-6">
                          <small className="text-muted">Criada em</small>
                          <div className="fw-bold">{formatDate(transaction.createdAt)}</div>
                        </div>
                        {transaction.completedAt && (
                          <div className="col-6">
                            <small className="text-muted">Concluída em</small>
                            <div className="fw-bold">{formatDate(transaction.completedAt)}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {transaction.status === 'completed' && (
                    <div className="text-center mt-4">
                      <button className="btn btn-outline-primary rounded-pill px-4">
                        Baixar Comprovante
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-muted">
              <CheckCircle size={16} className="me-1" />
              Verifique o status em tempo real<br />
              <CheckCircle size={16} className="me-1" />
              Baixe o comprovante quando disponível<br />
              <CheckCircle size={16} className="me-1" />
              Acompanhe todas as informações da transação
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckTransaction;