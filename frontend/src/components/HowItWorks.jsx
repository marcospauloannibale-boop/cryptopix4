import React from 'react';
import { FileText, QrCode, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FileText size={48} />,
      title: 'Preencha o Formulário',
      description: 'Escolha a criptomoeda (Bitcoin, Ethereum, USDT, USDC, BNB, DREX), insira o valor e a chave PIX do destinatário. A conversão é automática.'
    },
    {
      icon: <QrCode size={48} />,
      title: 'Escaneie o QR Code',
      description: 'Escaneie o QR Code gerado e transfira a criptomoeda para nossa carteira usando sua wallet favorita.'
    },
    {
      icon: <CheckCircle size={48} />,
      title: 'Receba Imediatamente!',
      description: 'Assim que a transação for confirmada, o destinatário recebe o valor em BRL via PIX. Um comprovante é gerado instantaneamente.'
    }
  ];

  return (
    <div className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">Como Funciona?</h2>
          <p className="lead text-muted">Três passos simples para enviar dinheiro ao Brasil em segundos</p>
        </div>
        
        <div className="row g-4">
          {steps.map((step, index) => (
            <div key={index} className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 hover-card" style={{transition: 'transform 0.3s'}}>
                <div className="card-body p-4 text-center">
                  <div className="mb-4 d-inline-flex align-items-center justify-content-center rounded-circle" 
                       style={{width: '80px', height: '80px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white'}}>
                    {step.icon}
                  </div>
                  <div className="position-absolute top-0 start-0 m-3">
                    <span className="badge rounded-circle" style={{width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#667eea', fontSize: '1.2rem'}}>
                      {index + 1}
                    </span>
                  </div>
                  <h4 className="fw-bold mb-3">{step.title}</h4>
                  <p className="text-muted">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;