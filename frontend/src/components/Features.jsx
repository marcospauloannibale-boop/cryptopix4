import React from 'react';
import { Zap, DollarSign, Shield, Clock, Coins, UserCheck } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Zap size={32} />,
      title: 'Transferências Instantâneas',
      description: 'Seu dinheiro chega em segundos via PIX. Sem espera, sem complicações.'
    },
    {
      icon: <DollarSign size={32} />,
      title: 'Taxas Competitivas',
      description: 'Apenas 1.5% de taxa. Sem custos ocultos ou surpresas desagradáveis.'
    },
    {
      icon: <Shield size={32} />,
      title: 'Segurança Garantida',
      description: 'Seus dados e transações protegidos com criptografia de ponta.'
    },
    {
      icon: <Clock size={32} />,
      title: 'Disponível 24/7',
      description: 'Envie dinheiro a qualquer hora, qualquer dia. Estamos sempre online.'
    },
    {
      icon: <Coins size={32} />,
      title: 'Múltiplas Criptomoedas',
      description: 'Aceitamos Bitcoin, Ethereum, USDT, USDC, BNB, DREX e muitas outras.'
    },
    {
      icon: <UserCheck size={32} />,
      title: 'Sem Cadastro Complicado',
      description: 'Processo simples e rápido. Comece a enviar em minutos.'
    }
  ];

  return (
    <div className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">Por Que Escolher o CryptoPIX?</h2>
          <p className="lead text-muted">A melhor solução para enviar cripto e receber reais no Brasil</p>
        </div>
        
        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4" style={{transition: 'all 0.3s'}}>
                <div className="card-body">
                  <div className="mb-3 d-inline-flex p-3 rounded-3" style={{background: '#f0f4ff', color: '#667eea'}}>
                    {feature.icon}
                  </div>
                  <h5 className="fw-bold mb-3">{feature.title}</h5>
                  <p className="text-muted mb-0">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;