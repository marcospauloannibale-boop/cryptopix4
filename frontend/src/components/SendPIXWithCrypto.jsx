import React, { useState, useEffect } from 'react';
import { cryptocurrencies, PLATFORM_FEE_PERCENT, INVOICE_EXPIRY_MINUTES, generateInvoiceId, generateCryptoAddress } from '../data/mockData';
import { QrCode, Clock, AlertCircle, Copy, CheckCircle2 } from 'lucide-react';
import QRCode from 'qrcode';

const SendPIXWithCrypto = ({ user, onTransactionCreated }) => {
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [amount, setAmount] = useState('');
  const [pixKey, setPixKey] = useState('');
  const [message, setMessage] = useState('');
  const [invoice, setInvoice] = useState(null);
  const [qrCodeImage, setQrCodeImage] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(INVOICE_EXPIRY_MINUTES * 60);
  const [copied, setCopied] = useState(false);
  const [paymentSimulated, setPaymentSimulated] = useState(false);

  const crypto = cryptocurrencies.find(c => c.id === selectedCrypto);
  const cryptoAmount = amount ? parseFloat(amount) / crypto.rate : 0;
  const platformFee = amount ? (parseFloat(amount) * PLATFORM_FEE_PERCENT) / 100 : 0;
  const networkFeeInBRL = cryptoAmount * crypto.networkFee * crypto.rate;
  const totalAmount = amount ? parseFloat(amount) + platformFee : 0;
  const totalCrypto = cryptoAmount + crypto.networkFee;

  useEffect(() => {
    if (invoice && !paymentSimulated) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [invoice, paymentSimulated]);

  useEffect(() => {
    if (invoice) {
      const address = generateCryptoAddress(selectedCrypto);
      QRCode.toDataURL(address, { width: 300, margin: 2 })
        .then(url => setQrCodeImage(url))
        .catch(err => console.error(err));
    }
  }, [invoice, selectedCrypto]);

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    
    if (!amount || !pixKey) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const newInvoice = {
      id: generateInvoiceId(),
      type: 'crypto_to_pix',
      status: 'pending',
      amount: parseFloat(amount),
      crypto: selectedCrypto,
      cryptoAmount: cryptoAmount,
      totalCrypto: totalCrypto,
      pixKey: pixKey,
      message: message,
      fee: platformFee,
      networkFee: networkFeeInBRL,
      cryptoAddress: generateCryptoAddress(selectedCrypto),
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + INVOICE_EXPIRY_MINUTES * 60000).toISOString()
    };

    setInvoice(newInvoice);
    setTimeRemaining(INVOICE_EXPIRY_MINUTES * 60);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatePayment = () => {
    setPaymentSimulated(true);
    const updatedInvoice = {
      ...invoice,
      status: 'processing',
      paidAt: new Date().toISOString()
    };
    setInvoice(updatedInvoice);
    
    setTimeout(() => {
      const completedInvoice = {
        ...updatedInvoice,
        status: 'completed'
      };
      setInvoice(completedInvoice);
      if (onTransactionCreated) {
        onTransactionCreated(completedInvoice);
      }
    }, 3000);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (invoice) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg rounded-4">
              <div className="card-body p-5">
                {timeRemaining === 0 && !paymentSimulated ? (
                  <div className="text-center py-5">
                    <AlertCircle size={64} className="text-danger mb-3" />
                    <h3 className="fw-bold mb-3">Invoice Expirada</h3>
                    <p className="text-muted mb-4">Esta invoice expirou. Por favor, crie uma nova transação.</p>
                    <button className="btn btn-primary rounded-pill px-4" onClick={() => setInvoice(null)}>
                      Criar Nova Transação
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="text-center mb-4">
                      <h3 className="fw-bold mb-2">Invoice de Pagamento</h3>
                      <p className="text-muted">ID: {invoice.id}</p>
                      {!paymentSimulated && (
                        <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
                          <Clock size={20} className="text-warning" />
                          <span className="fw-bold" style={{color: timeRemaining < 300 ? '#dc3545' : '#ffc107'}}>
                            Expira em: {formatTime(timeRemaining)}
                          </span>
                        </div>
                      )}
                      {invoice.status === 'completed' && (
                        <div className="alert alert-success d-flex align-items-center gap-2">
                          <CheckCircle2 size={20} />
                          Pagamento confirmado! PIX enviado com sucesso.
                        </div>
                      )}
                      {invoice.status === 'processing' && (
                        <div className="alert alert-info">
                          Processando pagamento... Aguarde.
                        </div>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="text-center mb-4">
                          <h5 className="fw-bold mb-3">Escaneie o QR Code</h5>
                          {qrCodeImage && (
                            <img src={qrCodeImage} alt="QR Code" className="img-fluid rounded-3 border" style={{maxWidth: '250px'}} />
                          )}
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <h5 className="fw-bold mb-3">Detalhes da Transação</h5>
                        <div className="mb-3">
                          <small className="text-muted">Criptomoeda</small>
                          <div className="fw-bold">{crypto.name} ({crypto.symbol})</div>
                        </div>
                        <div className="mb-3">
                          <small className="text-muted">Valor em BRL</small>
                          <div className="fw-bold">R$ {invoice.amount.toFixed(2)}</div>
                        </div>
                        <div className="mb-3">
                          <small className="text-muted">Taxa da Plataforma ({PLATFORM_FEE_PERCENT}%)</small>
                          <div className="fw-bold">R$ {invoice.fee.toFixed(2)}</div>
                        </div>
                        <div className="mb-3">
                          <small className="text-muted">Taxa de Rede</small>
                          <div className="fw-bold">{crypto.networkFee} {crypto.symbol} (≈ R$ {invoice.networkFee.toFixed(2)})</div>
                        </div>
                        <div className="border-top pt-3 mb-3">
                          <small className="text-muted">Total a Enviar</small>
                          <div className="fw-bold fs-5" style={{color: '#667eea'}}>{invoice.totalCrypto.toFixed(8)} {crypto.symbol}</div>
                        </div>
                        <div className="mb-3">
                          <small className="text-muted">Endereço</small>
                          <div className="d-flex align-items-center gap-2">
                            <input 
                              type="text" 
                              className="form-control form-control-sm" 
                              value={invoice.cryptoAddress} 
                              readOnly 
                            />
                            <button 
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleCopy(invoice.cryptoAddress)}
                            >
                              {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                            </button>
                          </div>
                        </div>
                        <div className="mb-3">
                          <small className="text-muted">Chave PIX Destino</small>
                          <div className="fw-bold">{invoice.pixKey}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 d-flex gap-2 justify-content-between">
                      <button 
                        className="btn btn-outline-secondary rounded-pill px-4"
                        onClick={() => setInvoice(null)}
                      >
                        Cancelar
                      </button>
                      {!paymentSimulated && invoice.status === 'pending' && (
                        <button 
                          className="btn btn-sm btn-outline-success rounded-pill px-3"
                          onClick={handleSimulatePayment}
                          style={{opacity: 0.7}}
                        >
                          Simular Pagamento
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg rounded-4">
            <div className="card-body p-5">
              <h2 className="fw-bold mb-4">Enviar PIX com Criptomoeda</h2>
              
              <form onSubmit={handleCreateInvoice}>
                <div className="mb-4">
                  <label className="form-label fw-bold">Selecione a Criptomoeda</label>
                  <select 
                    className="form-select form-select-lg rounded-3"
                    value={selectedCrypto}
                    onChange={(e) => setSelectedCrypto(e.target.value)}
                  >
                    {cryptocurrencies.map(crypto => (
                      <option key={crypto.id} value={crypto.id}>
                        {crypto.name} ({crypto.symbol}) - R$ {crypto.rate.toLocaleString('pt-BR')}
                      </option>
                    ))}
                  </select>
                  <small className="text-muted">Rede: {crypto.network}</small>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Valor em BRL</label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text">R$</span>
                    <input 
                      type="number" 
                      className="form-control rounded-end-3" 
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      step="0.01"
                      min={crypto.minAmount * crypto.rate}
                    />
                  </div>
                  {amount && (
                    <small className="text-muted">
                      ≈ {cryptoAmount.toFixed(8)} {crypto.symbol}
                    </small>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Chave PIX do Destinatário</label>
                  <input 
                    type="text" 
                    className="form-control form-control-lg rounded-3" 
                    placeholder="CPF, telefone, e-mail ou chave aleatória"
                    value={pixKey}
                    onChange={(e) => setPixKey(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Mensagem (Opcional)</label>
                  <textarea 
                    className="form-control rounded-3" 
                    rows="3"
                    placeholder="Adicione uma mensagem para o destinatário"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                {amount && (
                  <div className="card bg-light border-0 rounded-3 p-4 mb-4">
                    <h5 className="fw-bold mb-3">Resumo da Transação</h5>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Valor do PIX:</span>
                      <span className="fw-bold">R$ {parseFloat(amount).toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Taxa da Plataforma ({PLATFORM_FEE_PERCENT}%):</span>
                      <span className="fw-bold">R$ {platformFee.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Taxa de Rede:</span>
                      <span className="fw-bold">{crypto.networkFee} {crypto.symbol} (≈ R$ {networkFeeInBRL.toFixed(2)})</span>
                    </div>
                    <div className="border-top pt-3 mt-2">
                      <div className="d-flex justify-content-between">
                        <span className="fw-bold">Total a Enviar:</span>
                        <span className="fw-bold fs-5" style={{color: '#667eea'}}>{totalCrypto.toFixed(8)} {crypto.symbol}</span>
                      </div>
                    </div>
                  </div>
                )}

                <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill" disabled={!amount || !pixKey}>
                  Criar Invoice
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendPIXWithCrypto;