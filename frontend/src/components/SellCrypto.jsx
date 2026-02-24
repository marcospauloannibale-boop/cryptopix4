import React, { useState } from 'react';
import { cryptocurrencies, PLATFORM_FEE_PERCENT, generateInvoiceId, generateCryptoAddress } from '../data/mockData';
import { CheckCircle2, Copy, QrCode as QrCodeIcon } from 'lucide-react';
import QRCode from 'qrcode';

const SellCrypto = ({ user, onTransactionCreated }) => {
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [pixKey, setPixKey] = useState('');
  const [invoice, setInvoice] = useState(null);
  const [qrCodeImage, setQrCodeImage] = useState('');
  const [copied, setCopied] = useState(false);
  const [paymentSimulated, setPaymentSimulated] = useState(false);

  const crypto = cryptocurrencies.find(c => c.id === selectedCrypto);
  const brlAmount = cryptoAmount ? parseFloat(cryptoAmount) * crypto.rate : 0;
  const platformFee = brlAmount ? (brlAmount * PLATFORM_FEE_PERCENT) / 100 : 0;
  const netBRL = brlAmount - platformFee;

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    
    if (!cryptoAmount || !pixKey) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const cryptoAddress = generateCryptoAddress(selectedCrypto);
    const newInvoice = {
      id: generateInvoiceId(),
      type: 'sell_crypto',
      status: 'pending',
      crypto: selectedCrypto,
      cryptoAmount: parseFloat(cryptoAmount),
      brlAmount: brlAmount,
      fee: platformFee,
      netBRL: netBRL,
      pixKey: pixKey,
      cryptoAddress: cryptoAddress,
      createdAt: new Date().toISOString()
    };

    try {
      const qrCode = await QRCode.toDataURL(cryptoAddress, { width: 300, margin: 2 });
      setQrCodeImage(qrCode);
    } catch (err) {
      console.error(err);
    }

    setInvoice(newInvoice);
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

  if (invoice) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg rounded-4">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h3 className="fw-bold mb-2">Vender {crypto.name}</h3>
                  <p className="text-muted">ID: {invoice.id}</p>
                  {invoice.status === 'completed' && (
                    <div className="alert alert-success d-flex align-items-center gap-2">
                      <CheckCircle2 size={20} />
                      Criptomoeda recebida! PIX enviado para sua conta.
                    </div>
                  )}
                  {invoice.status === 'processing' && (
                    <div className="alert alert-info">
                      Aguardando confirmação da rede... Seu PIX será enviado em breve.
                    </div>
                  )}
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="text-center mb-4">
                      <h5 className="fw-bold mb-3">Envie sua Cripto</h5>
                      {qrCodeImage && (
                        <img src={qrCodeImage} alt="QR Code" className="img-fluid rounded-3 border" style={{maxWidth: '250px'}} />
                      )}
                      <div className="mt-3">
                        <small className="text-muted d-block mb-2">Endereço</small>
                        <div className="d-flex gap-2">
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
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <h5 className="fw-bold mb-3">Detalhes da Venda</h5>
                    <div className="mb-3">
                      <small className="text-muted">Criptomoeda</small>
                      <div className="fw-bold">{crypto.name} ({crypto.symbol})</div>
                    </div>
                    <div className="mb-3">
                      <small className="text-muted">Quantidade</small>
                      <div className="fw-bold">{invoice.cryptoAmount} {crypto.symbol}</div>
                    </div>
                    <div className="mb-3">
                      <small className="text-muted">Valor Bruto</small>
                      <div className="fw-bold">R$ {invoice.brlAmount.toFixed(2)}</div>
                    </div>
                    <div className="mb-3">
                      <small className="text-muted">Taxa ({PLATFORM_FEE_PERCENT}%)</small>
                      <div className="fw-bold">- R$ {invoice.fee.toFixed(2)}</div>
                    </div>
                    <div className="border-top pt-3 mb-3">
                      <small className="text-muted">Valor Líquido</small>
                      <div className="fw-bold fs-5" style={{color: '#667eea'}}>R$ {invoice.netBRL.toFixed(2)}</div>
                    </div>
                    <div className="mb-3">
                      <small className="text-muted">PIX para receber</small>
                      <div className="fw-bold">{invoice.pixKey}</div>
                    </div>
                  </div>
                </div>

                <div className="alert alert-warning mt-4">
                  <strong>Importante:</strong> Envie exatamente {invoice.cryptoAmount} {crypto.symbol} para o endereço acima. Após a confirmação na rede, o PIX será enviado automaticamente.
                </div>

                <div className="mt-4 d-flex gap-2 justify-content-between">
                  <button 
                    className="btn btn-outline-secondary rounded-pill px-4"
                    onClick={() => setInvoice(null)}
                  >
                    Voltar
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
              <h2 className="fw-bold mb-4">Vender Criptomoeda</h2>
              
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
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Quantidade a Vender</label>
                  <div className="input-group input-group-lg">
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="0.00000000"
                      value={cryptoAmount}
                      onChange={(e) => setCryptoAmount(e.target.value)}
                      step="0.00000001"
                      min={crypto.minAmount}
                    />
                    <span className="input-group-text">{crypto.symbol}</span>
                  </div>
                  {cryptoAmount && (
                    <small className="text-muted">
                      ≈ R$ {brlAmount.toFixed(2)}
                    </small>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Sua Chave PIX para Receber</label>
                  <input 
                    type="text" 
                    className="form-control form-control-lg rounded-3" 
                    placeholder="CPF, telefone, e-mail ou chave aleatória"
                    value={pixKey}
                    onChange={(e) => setPixKey(e.target.value)}
                  />
                </div>

                {cryptoAmount && (
                  <div className="card bg-light border-0 rounded-3 p-4 mb-4">
                    <h5 className="fw-bold mb-3">Resumo da Venda</h5>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Valor Bruto:</span>
                      <span className="fw-bold">R$ {brlAmount.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Taxa ({PLATFORM_FEE_PERCENT}%):</span>
                      <span className="fw-bold">- R$ {platformFee.toFixed(2)}</span>
                    </div>
                    <div className="border-top pt-3 mt-2">
                      <div className="d-flex justify-content-between">
                        <span className="fw-bold">Você Receberá:</span>
                        <span className="fw-bold fs-5" style={{color: '#667eea'}}>R$ {netBRL.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}

                <button type="submit" className="btn btn-primary btn-lg w-100 rounded-pill" disabled={!cryptoAmount || !pixKey}>
                  Gerar Endereço para Depósito
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellCrypto;