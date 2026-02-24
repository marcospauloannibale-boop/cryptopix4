# Guia de Teste - CryptoPIX

## 🧪 Como Testar a Aplicação

### 1. Testar Como Usuário Normal

#### 1.1 Enviar PIX com Cripto
1. Acesse a aplicação
2. Clique em "Enviar PIX" no menu
3. Selecione uma criptomoeda (ex: Bitcoin)
4. Insira um valor em BRL (ex: 1000)
5. Insira uma chave PIX fictícia (ex: 11987654321)
6. Adicione uma mensagem (opcional)
7. Clique em "Criar Invoice"
8. Observe:
   - QR Code gerado
   - Timer de expiração (15 minutos)
   - Detalhes da transação com taxas
9. Clique no botão "Simular Pagamento" (pequeno e sutil)
10. Aguarde 3 segundos
11. Verifique que o status mudou para "Processando" e depois "Concluído"

#### 1.2 Comprar Cripto
1. Clique em "Comprar Cripto"
2. Selecione uma criptomoeda
3. Insira a quantidade que deseja comprar
4. Clique em "Gerar PIX para Pagamento"
5. Observe o QR Code PIX e o código Copia e Cola
6. Clique em "Simular Pagamento"
7. Verifique a confirmação

#### 1.3 Vender Cripto
1. Clique em "Vender Cripto"
2. Selecione uma criptomoeda
3. Insira a quantidade que deseja vender
4. Insira sua chave PIX para receber
5. Clique em "Gerar Endereço para Depósito"
6. Observe o endereço crypto e QR Code
7. Clique em "Simular Pagamento"
8. Verifique a confirmação

#### 1.4 Verificar Transação
1. Clique em "Verificar" no menu
2. Insira o código de exemplo: `CPX-20260114-2RXY27`
3. Clique em "Verificar"
4. Observe os detalhes da transação encontrada

### 2. Testar Com Cadastro

#### 2.1 Criar Conta de Usuário
1. Clique em "Cadastrar"
2. Selecione "Usuário Regular"
3. Preencha nome, email e senha
4. Clique em "Criar Conta"
5. Será redirecionado para a home logado

#### 2.2 Fazer Transações e Ver Histórico
1. Faça algumas transações (enviar PIX, comprar ou vender)
2. Complete as transações com "Simular Pagamento"
3. Clique no seu nome no menu > "Histórico"
4. Observe suas transações listadas

### 3. Testar Como Afiliado

#### 3.1 Criar Conta de Afiliado
1. Clique em "Cadastrar"
2. Selecione "Afiliado (Acesso à API)"
3. Preencha nome, email, nome da loja e senha
4. Clique em "Criar Conta"
5. Será redirecionado para o Dashboard

#### 3.2 Explorar Dashboard
1. Observe as estatísticas:
   - Volume Total
   - Total de Transações
   - Taxa Média
   - Status da conta
2. Navegue pelas abas:
   - **Visão Geral**: Transações recentes e info da loja
   - **API**: Chave API e documentação completa
   - **Transações**: Lista completa de transações

#### 3.3 Testar Com Contas Pré-Criadas
**Loja Tech Brasil**
- Email: `joao@lojatech.com.br`
- Senha: `senha123`

**E-commerce Premium**
- Email: `maria@ecommercepremium.com`
- Senha: `senha123`

**Digital Store Pro**
- Email: `carlos@digitalstore.com.br`
- Senha: `senha123`

### 4. Testar Como Admin

#### 4.1 Login Admin
1. Clique em "Entrar"
2. Digite:
   - Usuário: `admin`
   - Senha: `000000`
3. Clique em "Entrar"

#### 4.2 Explorar Painel Admin
1. Clique em "Admin" no menu
2. Observe as estatísticas gerais da plataforma
3. Navegue pelas abas:
   - **Visão Geral**: Dashboard com transações e crescimento
   - **Usuários**: Lista de todos os usuários
   - **Lojas/Afiliados**: Lista das 3 lojas de demonstração
   - **Transações**: Todas as transações da plataforma
   - **Configurações**: Configurar taxas, tempo de expiração, etc.

### 5. Testar a API REST

#### 5.1 Obter Chave API
1. Faça login como afiliado
2. Vá para "Dashboard" > aba "API"
3. Clique em "Mostrar" para ver a chave
4. Copie a chave (ex: `cpx_live_4f8g9h2j3k4l5m6n7o8p9q0r`)

#### 5.2 Testar Endpoints com cURL

**Criar Pagamento:**
```bash
curl -X POST https://crypto-exchange-255.preview.emergentagent.com/api/v1/payments/create \
  -H "Authorization: Bearer cpx_live_4f8g9h2j3k4l5m6n7o8p9q0r" \
  -H "Content-Type: application/json" \
  -d '{
    "crypto": "bitcoin",
    "amount": 1000.00,
    "pix_key": "11987654321",
    "message": "Pagamento teste",
    "product_name": "Produto XYZ"
  }'
```

**Verificar Transação:**
```bash
curl https://crypto-exchange-255.preview.emergentagent.com/api/v1/transactions/CPX-20260114-ABC123 \
  -H "Authorization: Bearer cpx_live_4f8g9h2j3k4l5m6n7o8p9q0r"
```

**Comprar Crypto:**
```bash
curl -X POST https://crypto-exchange-255.preview.emergentagent.com/api/v1/crypto/buy \
  -H "Authorization: Bearer cpx_live_4f8g9h2j3k4l5m6n7o8p9q0r" \
  -H "Content-Type: application/json" \
  -d '{
    "crypto": "bitcoin",
    "amount": 0.001
  }'
```

**Vender Crypto:**
```bash
curl -X POST https://crypto-exchange-255.preview.emergentagent.com/api/v1/crypto/sell \
  -H "Authorization: Bearer cpx_live_4f8g9h2j3k4l5m6n7o8p9q0r" \
  -H "Content-Type: application/json" \
  -d '{
    "crypto": "bitcoin",
    "amount": 0.001,
    "pix_key": "11987654321"
  }'
```

### 6. Testar Responsividade

1. Abra as ferramentas de desenvolvedor do navegador (F12)
2. Ative o modo de visualização responsiva
3. Teste diferentes tamanhos:
   - Mobile (375px)
   - Tablet (768px)
   - Desktop (1920px)
4. Verifique que todos os elementos se adaptam corretamente

### 7. Cenários de Teste Completos

#### Cenário 1: Usuário Novo Enviando Dinheiro
1. Acesse a home page
2. Clique em "Enviar PIX"
3. Selecione DREX (moeda brasileira digital)
4. Valor: R$ 500
5. Chave PIX: seu-email@email.com
6. Mensagem: "Aluguel"
7. Crie a invoice
8. Observe o timer contando
9. Simule o pagamento
10. Veja a confirmação

#### Cenário 2: Afiliado Integrando Loja
1. Crie conta de afiliado com nome da loja "Minha Loja Teste"
2. Acesse o Dashboard
3. Copie a chave API
4. Leia a documentação na aba API
5. Use Postman ou cURL para criar um pagamento
6. Verifique que a transação aparece no dashboard

#### Cenário 3: Admin Gerenciando Plataforma
1. Login como admin
2. Veja estatísticas gerais
3. Acesse "Lojas/Afiliados"
4. Observe as 3 lojas de demonstração
5. Veja transações totais
6. Vá para "Configurações"
7. Simule mudança de taxa

### 8. Checklist de Funcionalidades

- [ ] Hero section com design atraente
- [ ] Seção "Como Funciona" com 3 passos
- [ ] Seção "Por Que Escolher" com 6 features
- [ ] Footer completo
- [ ] Navbar responsiva com dropdown
- [ ] Sistema de login/cadastro
- [ ] Enviar PIX com cripto
- [ ] Comprar cripto
- [ ] Vender cripto
- [ ] Verificar transação
- [ ] QR Codes gerados
- [ ] Timer de expiração funcional
- [ ] Botão "Simular Pagamento"
- [ ] Dashboard de afiliado
- [ ] Documentação da API
- [ ] Painel administrativo
- [ ] 3 lojas de demonstração
- [ ] API REST funcional
- [ ] Histórico de transações para usuários
- [ ] Todos os endpoints da API respondendo

### 9. Bugs Conhecidos / Limitações

✅ **Funcionando Perfeitamente:**
- Interface responsiva
- Navegação SPA
- Sistema de autenticação
- Geração de invoices
- QR Codes
- Timers
- Dashboards
- API REST

⚠️ **Limitações Intencionais (MVP):**
- Transações são simuladas
- QR Codes não são funcionais para pagamento real
- Sem persistência real de dados de pagamento
- Taxas de câmbio são fixas (não em tempo real)
- Sem integração com blockchains reais
- Sem integração com sistema PIX real

### 10. Próximos Passos Para Produção

Para tornar este MVP em um produto real:

1. **Integração PIX Real**
   - Integrar com provedor PIX (ex: Asaas, PagSeguro, Mercado Pago)
   - Implementar webhooks para confirmações

2. **Integração Crypto Real**
   - Integrar com exchanges (Binance, Coinbase)
   - Implementar carteiras reais
   - Sistema de confirmação de blockchain

3. **Segurança**
   - Implementar JWT tokens
   - Adicionar rate limiting
   - Implementar KYC/AML
   - Criptografia de dados sensíveis

4. **Escalabilidade**
   - Implementar cache (Redis)
   - Fila de processamento (Celery)
   - Load balancing
   - CDN para assets

5. **Compliance**
   - Termos de uso
   - Política de privacidade
   - Conformidade LGPD
   - Licenças necessárias

---

## 📊 Métricas de Sucesso do MVP

- ✅ Tempo de carregamento < 3s
- ✅ Interface responsiva em todos os dispositivos
- ✅ API REST totalmente funcional
- ✅ 3 lojas de demonstração ativas
- ✅ Sistema de roles completo
- ✅ Documentação completa
- ✅ Pronto para demonstração

## 🎯 Objetivo do MVP

Este MVP foi criado para demonstrar a **viabilidade técnica e comercial** da plataforma CryptoPIX em apresentações para investidores, mostrando:

1. Interface profissional e moderna
2. Fluxos de usuário bem definidos
3. API REST pronta para integração
4. Modelo de negócio (taxas e afiliados)
5. Escalabilidade da solução

**Status**: ✅ Pronto para Pitch
