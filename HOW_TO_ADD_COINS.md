# 📝 GUIA: COMO ADICIONAR NOVAS CRIPTOMOEDAS

## 🎯 Processo Completo para Adicionar Moedas

Para adicionar uma nova criptomoeda ao CryptoPIX, você precisa modificar **2 arquivos**:

---

## 📂 ARQUIVO 1: Frontend (mockData.js)

### **Localização:**
```
/app/frontend/src/data/mockData.js
```

### **Como Adicionar:**

1. **Abra o arquivo** e localize a array `cryptocurrencies` (linha ~3)

2. **Adicione a nova moeda** seguindo este formato:

```javascript
{
  id: 'nome_da_moeda',           // ID único (minúsculas, sem espaços)
  name: 'Nome Completo',         // Nome oficial da moeda
  symbol: 'SÍMBOLO',             // Símbolo da moeda (ex: BTC, ETH)
  icon: '🪙',                    // Ícone/emoji da moeda
  rate: 0000,                    // Taxa em BRL (quanto vale 1 unidade)
  network: 'Nome da Rede',       // Rede blockchain
  networkFee: 0.00,              // Taxa de rede (em cripto)
  minAmount: 0.00                // Quantidade mínima para transação
}
```

### **Exemplo Prático - Adicionar TRON (TRX):**

```javascript
export const cryptocurrencies = [
  // ... moedas existentes ...
  {
    id: 'tron',
    name: 'TRON',
    symbol: 'TRX',
    icon: '⚡',
    rate: 0.85,
    network: 'TRON (TRC-20)',
    networkFee: 0.1,
    minAmount: 10
  }
];
```

---

## 📂 ARQUIVO 2: Backend (server.py)

### **Localização:**
```
/app/backend/server.py
```

### **Como Adicionar:**

#### **Passo 1: Adicionar Taxa (CRYPTO_RATES)**

Localize o dicionário `CRYPTO_RATES` (linha ~29) e adicione:

```python
CRYPTO_RATES = {
    'bitcoin': 350000,
    'ethereum': 15000,
    # ... outras moedas ...
    'tron': 0.85,          # NOVA MOEDA
    'dogecoin': 0.60       # OUTRA NOVA MOEDA
}
```

#### **Passo 2: Adicionar Endereço (generate_crypto_address)**

Localize a função `generate_crypto_address` (linha ~40) e adicione:

```python
def generate_crypto_address(crypto: str) -> str:
    addresses = {
        'bitcoin': '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        'ethereum': '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        # ... outros endereços ...
        'tron': 'TXYZhTm4207Eqf9eMjTfgQ7pFzqJZtKbVX',        # NOVO
        'dogecoin': 'DH5yaieqoZN36fDVciNyRueRGvGLR3mr7L'     # NOVO
    }
    return addresses.get(crypto, addresses['bitcoin'])
```

---

## 🔄 PASSO 3: Reiniciar os Serviços

Após modificar os arquivos, você precisa reiniciar:

```bash
sudo supervisorctl restart backend
sudo supervisorctl restart frontend
```

**OU reiniciar tudo:**

```bash
sudo supervisorctl restart all
```

---

## 📋 EXEMPLO COMPLETO: Adicionar 3 Moedas

### **Moedas a Adicionar:**
1. TRON (TRX) - R$ 0,85
2. Dogecoin (DOGE) - R$ 0,60
3. Stellar (XLM) - R$ 0,70

---

### **1. Editar Frontend (/app/frontend/src/data/mockData.js)**

```javascript
export const cryptocurrencies = [
  // ... moedas existentes (Bitcoin, Ethereum, etc) ...
  
  // NOVAS MOEDAS
  {
    id: 'tron',
    name: 'TRON',
    symbol: 'TRX',
    icon: '⚡',
    rate: 0.85,
    network: 'TRON (TRC-20)',
    networkFee: 0.1,
    minAmount: 10
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    icon: '🐕',
    rate: 0.60,
    network: 'Dogecoin',
    networkFee: 0.01,
    minAmount: 10
  },
  {
    id: 'stellar',
    name: 'Stellar',
    symbol: 'XLM',
    icon: '⭐',
    rate: 0.70,
    network: 'Stellar',
    networkFee: 0.00001,
    minAmount: 10
  }
];
```

---

### **2. Editar Backend (/app/backend/server.py)**

**Adicionar em CRYPTO_RATES (linha ~29):**

```python
CRYPTO_RATES = {
    'bitcoin': 350000,
    'ethereum': 15000,
    'usdt': 5.80,
    'usdc': 5.80,
    'bnb': 2800,
    'drex': 1,
    'solana': 800,
    'cardano': 3.50,
    'polkadot': 45,
    'litecoin': 600,
    'chainlink': 85,
    'polygon': 5.20,
    'ripple': 3.20,
    'avalanche': 220,
    # NOVAS MOEDAS
    'tron': 0.85,
    'dogecoin': 0.60,
    'stellar': 0.70
}
```

**Adicionar em generate_crypto_address (linha ~40):**

```python
def generate_crypto_address(crypto: str) -> str:
    addresses = {
        'bitcoin': '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        'ethereum': '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        'usdt': '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        'usdc': '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        'bnb': 'bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2',
        'drex': 'drex1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0',
        'solana': 'SoLaR1234567890abcdefghijklmnopqrstuvwxyz',
        'cardano': 'addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgs68faae',
        'polkadot': '1zugcavYA9yCuYwiEYeMHNJm9gXznYjNfXQjZsZukF1Mpow',
        'litecoin': 'LTC1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        'chainlink': '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        'polygon': '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
        'ripple': 'rN7n7otQDd6FczFgLdlqtyMVrn3NnkhaWV',
        'avalanche': 'X-avax1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhs',
        # NOVAS MOEDAS
        'tron': 'TXYZhTm4207Eqf9eMjTfgQ7pFzqJZtKbVX',
        'dogecoin': 'DH5yaieqoZN36fDVciNyRueRGvGLR3mr7L',
        'stellar': 'GDQP2KPQGKIHYJGXNUIYOMHARUARCA7DJT5FO2FFOOKY3B2WSQHG4W37'
    }
    return addresses.get(crypto, addresses['bitcoin'])
```

---

### **3. Reiniciar Serviços**

```bash
sudo supervisorctl restart all
```

---

## 🎯 TABELA DE REFERÊNCIA: Dados Comuns de Criptomoedas

Use esta tabela como referência ao adicionar moedas:

| Moeda | ID | Symbol | Rate (BRL) | Network | Fee | Min Amount |
|-------|-----|--------|------------|---------|-----|------------|
| Bitcoin | bitcoin | BTC | 350000 | Bitcoin | 0.0001 | 0.001 |
| Ethereum | ethereum | ETH | 15000 | Ethereum | 0.002 | 0.01 |
| TRON | tron | TRX | 0.85 | TRON (TRC-20) | 0.1 | 10 |
| Dogecoin | dogecoin | DOGE | 0.60 | Dogecoin | 0.01 | 10 |
| Stellar | stellar | XLM | 0.70 | Stellar | 0.00001 | 10 |
| Shiba Inu | shibainu | SHIB | 0.0001 | Ethereum (ERC-20) | 500 | 1000000 |
| Cosmos | cosmos | ATOM | 35 | Cosmos Hub | 0.01 | 0.1 |
| Near | near | NEAR | 18 | NEAR Protocol | 0.001 | 0.1 |
| Algorand | algorand | ALGO | 1.20 | Algorand | 0.001 | 1 |
| VeChain | vechain | VET | 0.15 | VeChainThor | 0.01 | 10 |

---

## 🔍 ONDE ENCONTRAR INFORMAÇÕES DAS MOEDAS

### **Taxa em BRL (Rate):**
- CoinGecko: https://www.coingecko.com
- CoinMarketCap: https://coinmarketcap.com
- Binance: https://www.binance.com/pt-BR

### **Formato de Endereço:**
- BitcoinWiki: https://en.bitcoin.it/wiki/Address
- Blockchain Explorer de cada moeda
- Documentação oficial da criptomoeda

### **Taxa de Rede:**
- Documentação oficial da blockchain
- Explorers (Etherscan, BscScan, etc.)
- Exchanges (Binance, Coinbase)

---

## ✅ CHECKLIST: Adicionar Nova Moeda

- [ ] Pesquisar taxa atual da moeda em BRL
- [ ] Obter formato correto de endereço
- [ ] Descobrir taxa de rede típica
- [ ] Definir quantidade mínima de transação
- [ ] Adicionar ao mockData.js (frontend)
- [ ] Adicionar ao CRYPTO_RATES (backend)
- [ ] Adicionar endereço em generate_crypto_address (backend)
- [ ] Reiniciar backend: `sudo supervisorctl restart backend`
- [ ] Reiniciar frontend: `sudo supervisorctl restart frontend`
- [ ] Testar no site: https://crypto-exchange-255.preview.emergentagent.com/send
- [ ] Verificar se moeda aparece no dropdown
- [ ] Fazer transação de teste

---

## 🚨 ERROS COMUNS

### **1. Moeda não aparece no dropdown**
- **Causa**: Não adicionou no mockData.js ou erro de sintaxe
- **Solução**: Verifique a sintaxe JSON, reinicie o frontend

### **2. Erro ao criar invoice**
- **Causa**: Não adicionou no CRYPTO_RATES do backend
- **Solução**: Adicione a moeda e reinicie o backend

### **3. Endereço não é gerado**
- **Causa**: Não adicionou em generate_crypto_address
- **Solução**: Adicione o endereço mockado e reinicie

### **4. Frontend não recarrega**
- **Causa**: Cache do navegador
- **Solução**: Ctrl+F5 ou abra em aba anônima

---

## 💡 DICAS

1. **Use IDs únicos**: Sempre em minúsculas, sem espaços
2. **Taxas realistas**: Pesquise valores atuais
3. **Endereços mockados**: Podem ser fictícios (é apenas demonstração)
4. **Teste sempre**: Após adicionar, teste a moeda
5. **Documente**: Anote as moedas que adicionou

---

## 🎓 EXEMPLO RÁPIDO

**Quero adicionar Monero (XMR):**

### Frontend:
```javascript
{
  id: 'monero',
  name: 'Monero',
  symbol: 'XMR',
  icon: 'Ɱ',
  rate: 900,
  network: 'Monero',
  networkFee: 0.00015,
  minAmount: 0.01
}
```

### Backend:
```python
# CRYPTO_RATES
'monero': 900,

# generate_crypto_address
'monero': '4AdUndXHHZ6cfufTMvppY6JwXNouMBzSkbLYfpAV5Usx3skxNgYeYTRj5UzqtReoS44qo9mtmXCqY45DJ852K5Jv2684Rge',
```

### Reiniciar:
```bash
sudo supervisorctl restart all
```

### Testar:
```
https://crypto-exchange-255.preview.emergentagent.com/send
```

---

## 📞 PRECISA DE AJUDA?

Se quiser que eu adicione moedas específicas para você, me diga quais e eu faço as modificações!

**Exemplo:**
"Adicione Bitcoin Cash, Polygon e Cosmos"

---

**Status**: ✅ Guia completo | 📝 Pronto para usar | 🪙 Adicione quantas moedas quiser!
