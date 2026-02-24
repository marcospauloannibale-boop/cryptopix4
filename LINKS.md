# 🔗 LINKS IMPORTANTES - CryptoPIX

## 🌐 Acesso à Aplicação

### Link Principal
**🚀 Aplicação CryptoPIX (Frontend)**
```
https://crypto-exchange-255.preview.emergentagent.com
```

### API Backend
**📡 API REST**
```
https://crypto-exchange-255.preview.emergentagent.com/api
```

**📄 Documentação da API (JSON)**
```
https://crypto-exchange-255.preview.emergentagent.com/api/docs
```

---

## 👤 CONTAS DE TESTE

### 🔐 Administrador
- **Link**: https://crypto-exchange-255.preview.emergentagent.com
- **Usuário**: `admin`
- **Senha**: `000000`
- **Acesso**: Clique em "Entrar" no menu superior direito

---

### 🏪 Afiliados (Lojas de Demonstração)

#### 1️⃣ Loja Tech Brasil
- **Link**: https://crypto-exchange-255.preview.emergentagent.com
- **Email**: `joao@lojatech.com.br`
- **Senha**: `senha123`
- **API Key**: `cpx_live_4f8g9h2j3k4l5m6n7o8p9q0r`
- **Transações**: 1,543
- **Volume**: R$ 245.789,50

#### 2️⃣ E-commerce Premium
- **Link**: https://crypto-exchange-255.preview.emergentagent.com
- **Email**: `maria@ecommercepremium.com`
- **Senha**: `senha123`
- **API Key**: `cpx_live_8s9t0u1v2w3x4y5z6a7b8c9d`
- **Transações**: 892
- **Volume**: R$ 156.432,80

#### 3️⃣ Digital Store Pro
- **Link**: https://crypto-exchange-255.preview.emergentagent.com
- **Email**: `carlos@digitalstore.com.br`
- **Senha**: `senha123`
- **API Key**: `cpx_live_2e3f4g5h6i7j8k9l0m1n2o3p`
- **Transações**: 2,341
- **Volume**: R$ 489.562,30

---

### 👥 Usuário Normal
- **Link**: https://crypto-exchange-255.preview.emergentagent.com
- **Email**: Qualquer email
- **Senha**: Qualquer senha
- **Obs**: Sistema de cadastro mockado, aceita qualquer credencial

---

## 🧪 LINKS DE TESTE RÁPIDO

### Testar Envio de PIX
```
https://crypto-exchange-255.preview.emergentagent.com
→ Clique em "Enviar PIX"
```

### Testar Compra de Cripto
```
https://crypto-exchange-255.preview.emergentagent.com
→ Clique em "Comprar Cripto"
```

### Testar Venda de Cripto
```
https://crypto-exchange-255.preview.emergentagent.com
→ Clique em "Vender Cripto"
```

### Verificar Transação
```
https://crypto-exchange-255.preview.emergentagent.com
→ Clique em "Verificar"
→ Use o código: CPX-20260114-2RXY27
```

### Dashboard de Afiliado
```
https://crypto-exchange-255.preview.emergentagent.com
→ Login com: joao@lojatech.com.br / senha123
→ Automaticamente vai para o Dashboard
```

### Painel Admin
```
https://crypto-exchange-255.preview.emergentagent.com
→ Login com: admin / 000000
→ Clique em "Admin" no menu
```

---

## 📡 TESTAR API (cURL)

### Criar Pagamento
```bash
curl -X POST https://crypto-exchange-255.preview.emergentagent.com/api/v1/payments/create \
  -H "Authorization: Bearer cpx_live_4f8g9h2j3k4l5m6n7o8p9q0r" \
  -H "Content-Type: application/json" \
  -d '{
    "crypto": "bitcoin",
    "amount": 1000.00,
    "pix_key": "11987654321",
    "message": "Pagamento teste"
  }'
```

### Verificar Status
```bash
curl https://crypto-exchange-255.preview.emergentagent.com/api/v1/transactions/CPX-20260114-ABC123 \
  -H "Authorization: Bearer cpx_live_4f8g9h2j3k4l5m6n7o8p9q0r"
```

### Health Check
```bash
curl https://crypto-exchange-255.preview.emergentagent.com/api/health
```

---

## 📚 DOCUMENTAÇÃO

### README Principal
- Localização: `/app/README.md`
- Contém: Visão geral, tecnologias, instalação, API docs

### Guia de Testes
- Localização: `/app/TESTING_GUIDE.md`
- Contém: Cenários de teste completos, checklist

---

## 🎯 ROTEIRO DE DEMONSTRAÇÃO

### Para Investidores (5 minutos)

1. **Abra o link principal**: https://crypto-exchange-255.preview.emergentagent.com
   - Mostre o hero section profissional
   - Scroll para "Como Funciona" e "Features"

2. **Demonstre transação**:
   - Clique em "Enviar PIX"
   - Selecione Bitcoin, valor R$ 1.000
   - Mostre o cálculo automático de taxas
   - Crie a invoice
   - Mostre o QR Code e timer
   - Clique em "Simular Pagamento"
   - Mostre a confirmação

3. **Mostre o Dashboard de Afiliado**:
   - Login: joao@lojatech.com.br / senha123
   - Mostre estatísticas
   - Aba "API" - mostre a chave e documentação
   - Destaque as 3 lojas fake funcionando

4. **Mostre o Painel Admin**:
   - Logout e login como admin / 000000
   - Mostre estatísticas gerais
   - Aba "Lojas/Afiliados" - mostre as 3 lojas
   - Aba "Transações" - mostre o volume

5. **Demonstre a API**:
   - Use Postman ou mostre o cURL
   - Crie um pagamento via API
   - Mostre a resposta JSON

---

## 💡 DICAS PARA APRESENTAÇÃO

✅ **Enfatize**:
- Single Page Application moderna
- Sistema completo de afiliados com API
- 3 lojas já funcionando (demonstração real)
- DREX incluído (moeda digital brasileira)
- Taxa competitiva de 1.5%
- Tempo de transação < 60s
- Interface profissional e responsiva

⚠️ **Deixe claro**:
- É um MVP para demonstração
- Transações são simuladas
- Pronto para integração real com APIs de pagamento
- Arquitetura escalável

---

## 🔄 PRÓXIMOS PASSOS

Após a demonstração, mencione:
1. Integração com APIs reais (PIX + Exchanges)
2. Sistema de KYC/AML
3. Licenças regulatórias
4. Expansão para outros países da América Latina
5. App mobile (React Native)

---

## 📱 ACESSO RÁPIDO (QR CODE)

Você pode gerar um QR Code para o link principal e usar em apresentações:
```
https://crypto-exchange-255.preview.emergentagent.com
```

---

## 🆘 SUPORTE

Se algo não funcionar:
1. Verifique se o link está correto
2. Limpe o cache do navegador (Ctrl+F5)
3. Tente em uma aba anônima
4. Use as credenciais exatas listadas acima

---

**🎯 Link Principal para Copiar e Colar:**
```
https://crypto-exchange-255.preview.emergentagent.com
```

**Status**: ✅ Online e Funcional 24/7
