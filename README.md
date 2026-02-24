# CryptoPIX - Plataforma de Conversão Cripto para PIX

## 📋 Sobre o Projeto

CryptoPIX é uma plataforma completa que permite a conversão de criptomoedas para Reais brasileiros via PIX, além de funcionalidades de compra e venda de criptomoedas. O projeto inclui:

- 🌐 **Single Page Application** com React e Bootstrap
- 🔐 **Sistema de Autenticação** (Usuários, Afiliados e Admin)
- 💳 **Sistema de Pagamentos** mockado com invoices realistas
- 🔌 **API REST completa** para integração de lojas
- 📊 **Dashboard** para afiliados e administradores
- 💰 **Suporte a múltiplas criptomoedas**: Bitcoin, Ethereum, USDT, USDC, BNB e DREX

## 🚀 Funcionalidades

### Para Usuários Normais
- ✅ Enviar PIX com criptomoedas (conversão automática)
- ✅ Comprar criptomoedas (pagamento via PIX)
- ✅ Vender criptomoedas (receber via PIX)
- ✅ Verificar status de transações
- ✅ Histórico de transações (com cadastro)

### Para Afiliados
- ✅ Dashboard completo com estatísticas
- ✅ Chave API para integração
- ✅ Documentação da API integrada
- ✅ Gerenciamento de transações
- ✅ Visualização de volume e taxas

### Para Administradores
- ✅ Painel administrativo completo
- ✅ Gestão de usuários, lojas e transações
- ✅ Estatísticas da plataforma
- ✅ Configurações de taxas e criptomoedas

## 💻 Tecnologias

### Frontend
- React 19
- Bootstrap 5.3.8
- Lucide React (ícones)
- QRCode.js
- Axios

### Backend
- FastAPI
- MongoDB (Motor)
- Python 3.x
- Pydantic

## 🔧 Instalação e Execução

### Pré-requisitos
- Node.js e Yarn
- Python 3.x
- MongoDB

### Configuração

1. **Frontend** já está configurado e rodando na porta 3000
2. **Backend** já está configurado e rodando na porta 8001

### URLs de Acesso

- **Frontend**: https://crypto-exchange-255.preview.emergentagent.com
- **Backend API**: https://crypto-exchange-255.preview.emergentagent.com/api

## 🔐 Contas de Teste

### Admin
- **Usuário**: `admin`
- **Senha**: `000000`

### Afiliados (Lojas de Demonstração)
1. **Loja Tech Brasil**
   - Email: `joao@lojatech.com.br`
   - Senha: `senha123`
   - API Key: `cpx_live_4f8g9h2j3k4l5m6n7o8p9q0r`

2. **E-commerce Premium**
   - Email: `maria@ecommercepremium.com`
   - Senha: `senha123`
   - API Key: `cpx_live_8s9t0u1v2w3x4y5z6a7b8c9d`

3. **Digital Store Pro**
   - Email: `carlos@digitalstore.com.br`
   - Senha: `senha123`
   - API Key: `cpx_live_2e3f4g5h6i7j8k9l0m1n2o3p`

### Usuários Normais
- Qualquer email e senha (sistema de cadastro mockado)

## 📡 API REST - Documentação

### Autenticação
Todas as requisições da API devem incluir o header:
```
Authorization: Bearer {API_KEY}
```

### Endpoints Principais

#### 1. Criar Pagamento PIX com Cripto
```http
POST /api/v1/payments/create
Content-Type: application/json
Authorization: Bearer cpx_live_xxxxx

{
  "crypto": "bitcoin",
  "amount": 1000.00,
  "pix_key": "11987654321",
  "message": "Pagamento de produto",
  "product_name": "Nome do Produto"
}
```

**Response:**
```json
{
  "id": "CPX-20260114-ABC123",
  "status": "pending",
  "amount": 1000.00,
  "crypto": "bitcoin",
  "crypto_amount": 0.002857,
  "pix_key": "11987654321",
  "crypto_address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  "qr_code_data": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  "expires_at": "2026-01-14T11:00:00",
  "invoice_url": "https://cryptopix.com.br/invoice/CPX-20260114-ABC123"
}
```

#### 2. Verificar Status da Transação
```http
GET /api/v1/transactions/{transaction_id}
Authorization: Bearer cpx_live_xxxxx
```

**Response:**
```json
{
  "id": "CPX-20260114-ABC123",
  "status": "completed",
  "amount": 1000.00,
  "crypto": "bitcoin",
  "created_at": "2026-01-14T10:00:00",
  "completed_at": "2026-01-14T10:05:00"
}
```

#### 3. Comprar Criptomoeda
```http
POST /api/v1/crypto/buy
Authorization: Bearer cpx_live_xxxxx

{
  "crypto": "bitcoin",
  "amount": 0.001
}
```

#### 4. Vender Criptomoeda
```http
POST /api/v1/crypto/sell
Authorization: Bearer cpx_live_xxxxx

{
  "crypto": "bitcoin",
  "amount": 0.001,
  "pix_key": "11987654321"
}
```

## 💰 Criptomoedas Suportadas

| Moeda | Símbolo | Taxa (BRL) | Taxa de Rede |
|-------|---------|------------|--------------|
| Bitcoin | BTC | R$ 350.000 | 0.0001 BTC |
| Ethereum | ETH | R$ 15.000 | 0.002 ETH |
| Tether | USDT | R$ 5,80 | 0.5 USDT |
| USD Coin | USDC | R$ 5,80 | 0.5 USDC |
| Binance Coin | BNB | R$ 2.800 | 0.0005 BNB |
| DREX | DREX | R$ 1,00 | 0 DREX |

## 📊 Taxas

- **Taxa da Plataforma**: 1,5% sobre o valor da transação
- **Taxa de Rede**: Varia conforme a criptomoeda
- **Tempo Médio**: < 60 segundos
- **Expiração de Invoice**: 15 minutos

## 🎯 Fluxo de Uso

### Enviar PIX com Cripto
1. Usuário seleciona a criptomoeda
2. Informa o valor em BRL e a chave PIX do destinatário
3. Sistema gera invoice com QR Code
4. Usuário envia a cripto para o endereço fornecido
5. Sistema processa e envia o PIX (simulado)

### Comprar Cripto
1. Usuário seleciona a criptomoeda e quantidade
2. Sistema gera PIX para pagamento
3. Usuário paga o PIX
4. Sistema credita a criptomoeda (simulado)

### Vender Cripto
1. Usuário seleciona a criptomoeda e quantidade
2. Informa a chave PIX para receber
3. Sistema gera endereço para depósito
4. Usuário envia a cripto
5. Sistema envia o PIX (simulado)

## 🔒 Segurança

⚠️ **IMPORTANTE**: Este é um projeto de demonstração (MVP) para captação de fundos. Todas as transações são **SIMULADAS** e não envolvem movimentação real de dinheiro ou criptomoedas.

- QR Codes são gerados mas não são funcionais
- Invoices são mockadas
- Botão "Simular Pagamento" marca transações como pagas
- Não há integração real com APIs de pagamento

## 🛠️ Desenvolvimento

### Estrutura do Projeto
```
/app
├── frontend/
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── data/            # Mock data
│   │   └── App.js           # Aplicação principal
│   └── package.json
├── backend/
│   ├── server.py            # API FastAPI
│   ├── models.py            # Modelos Pydantic
│   └── requirements.txt
└── README.md
```

### Comandos Úteis

```bash
# Reiniciar frontend
sudo supervisorctl restart frontend

# Reiniciar backend
sudo supervisorctl restart backend

# Ver logs do frontend
tail -f /var/log/supervisor/frontend.out.log

# Ver logs do backend
tail -f /var/log/supervisor/backend.out.log
```

## 📱 Responsivo

A aplicação é totalmente responsiva e funciona em:
- 💻 Desktop
- 📱 Mobile
- 🖥️ Tablet

## 🌟 Features Destacadas

- ✨ Design moderno com gradientes suaves
- 🎨 Interface limpa e intuitiva
- ⚡ Navegação fluida (SPA)
- 📊 Dashboards informativos
- 🔔 Feedback visual com badges e alertas
- ⏱️ Timer de expiração de invoices
- 📋 QR Codes para todas as transações
- 🔐 Sistema de roles (user/affiliate/admin)

## 🎓 Uso Como MVP

Este projeto foi desenvolvido especificamente para ser utilizado como **MVP (Minimum Viable Product)** em apresentações para investidores. Ele demonstra:

1. **Viabilidade Técnica**: Arquitetura completa e funcional
2. **UX/UI Profissional**: Design atraente e usabilidade
3. **Escalabilidade**: API REST pronta para crescimento
4. **Modelo de Negócio**: Sistema de afiliados e taxas
5. **Documentação**: API bem documentada

## 📞 Suporte

Para dúvidas ou sugestões sobre o projeto, consulte a documentação da API integrada no dashboard de afiliados.

---

**Desenvolvido com ❤️ para demonstração de conceito**

**Status**: ✅ Funcional | 🎯 MVP | 💰 Pronto para Pitch
