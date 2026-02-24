import React from 'react';
import { ArrowLeftRight, Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <div className="d-flex align-items-center mb-3">
              <ArrowLeftRight className="me-2" size={32} />
              <span className="fw-bold fs-4">CryptoPIX</span>
            </div>
            <p className="text-white-50">
              A forma mais rápida e segura de converter criptomoedas para Reais e enviar via PIX.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-white-50 hover-white">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-white-50 hover-white">
                <Github size={24} />
              </a>
              <a href="#" className="text-white-50 hover-white">
                <Mail size={24} />
              </a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Produto</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Enviar PIX</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Comprar Cripto</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Vender Cripto</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Verificar Status</a></li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Empresa</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Sobre Nós</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Como Funciona</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Afiliados</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">API</a></li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Suporte</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Central de Ajuda</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">FAQ</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Contato</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Status</a></li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Legal</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Termos de Uso</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Privacidade</a></li>
              <li className="mb-2"><a href="#" className="text-white-50 text-decoration-none">Segurança</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-top border-secondary pt-4 mt-4">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <p className="text-white-50 mb-0">
                &copy; 2026 CryptoPIX. Todos os direitos reservados.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="d-flex gap-4 justify-content-center justify-content-md-end">
                <div className="d-flex align-items-center gap-2">
                  <div className="bg-success rounded-circle" style={{width: '8px', height: '8px'}}></div>
                  <small className="text-white-50">1000+ Transações</small>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="bg-success rounded-circle" style={{width: '8px', height: '8px'}}></div>
                  <small className="text-white-50">98% Satisfação</small>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="bg-success rounded-circle" style={{width: '8px', height: '8px'}}></div>
                  <small className="text-white-50">&lt;60s Tempo Médio</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;