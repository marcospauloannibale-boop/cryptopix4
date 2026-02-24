import React from 'react';
import { ArrowRight, Zap, Shield, Clock } from 'lucide-react';

const HeroSection = ({ setActiveSection }) => {
  return (
    <div className="bg-gradient-to-br" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '600px'
    }}>
      <div className="container py-5">
        <div className="row align-items-center py-5">
          <div className="col-lg-6 text-white">
            <h1 className="display-3 fw-bold mb-4" style={{lineHeight: '1.2'}}>
              Envie Dinheiro para o Brasil em Segundos!
            </h1>
            <p className="lead mb-4" style={{fontSize: '1.25rem', opacity: 0.95}}>
              Converta suas criptomoedas para Reais e envie via PIX
            </p>
            <div className="d-flex gap-3 mb-5">
              <button 
                className="btn btn-light btn-lg rounded-pill px-4 d-flex align-items-center gap-2"
                onClick={() => setActiveSection('send')}
                style={{fontWeight: '500'}}
              >
                Enviar PIX
                <ArrowRight size={20} />
              </button>
              <button 
                className="btn btn-outline-light btn-lg rounded-pill px-4"
                onClick={() => setActiveSection('about')}
              >
                Saiba Mais
              </button>
            </div>
            
            <div className="row g-4 mt-4">
              <div className="col-4">
                <div className="d-flex align-items-center gap-2">
                  <Zap size={24} />
                  <div>
                    <div className="fw-bold">Instantâneo</div>
                    <small style={{opacity: 0.8}}>Transferências</small>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="d-flex align-items-center gap-2">
                  <Shield size={24} />
                  <div>
                    <div className="fw-bold">100%</div>
                    <small style={{opacity: 0.8}}>Seguro</small>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="d-flex align-items-center gap-2">
                  <Clock size={24} />
                  <div>
                    <div className="fw-bold">Sem</div>
                    <small style={{opacity: 0.8}}>Complicações</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="card shadow-lg border-0 rounded-4 p-4" style={{backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.95)'}}>
              <div className="text-center mb-4">
                <h3 className="fw-bold mb-3">Transferência Rápida e Segura</h3>
                <div className="row text-center">
                  <div className="col-4">
                    <div className="p-3 rounded-3" style={{background: '#f0f4ff'}}>
                      <div className="fw-bold" style={{fontSize: '1.5rem', color: '#667eea'}}>1.5%</div>
                      <small className="text-muted">Taxa</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-3 rounded-3" style={{background: '#f0f4ff'}}>
                      <div className="fw-bold" style={{fontSize: '1.5rem', color: '#667eea'}}>&lt;60s</div>
                      <small className="text-muted">Tempo</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="p-3 rounded-3" style={{background: '#f0f4ff'}}>
                      <div className="fw-bold" style={{fontSize: '1.5rem', color: '#667eea'}}>24/7</div>
                      <small className="text-muted">Disponível</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;