# 🚀 GUIA DE DEPLOY - RAILWAY (Full-Stack)

## 📋 Visão Geral

Este guia ensina a fazer deploy do **CryptoPIX completo** no **Railway** (Frontend + Backend juntos).

**✅ VANTAGENS:**
- Tudo em um único lugar
- Configuração simplificada
- Créditos grátis ($5/mês)
- Deploy automático do GitHub

---

## 📦 PRÉ-REQUISITOS

1. **Conta no Railway**: https://railway.app
2. **Conta no MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
3. **Conta no GitHub**: https://github.com
4. **Git instalado**

---

## 🔧 PASSO 1: Preparar MongoDB Atlas

### 1.1 Criar Cluster

1. Acesse: https://www.mongodb.com/cloud/atlas
2. Clique em **"Try Free"** e faça cadastro
3. Clique em **"Build a Database"**
4. Escolha **"FREE"** (M0 Sandbox)
5. Provider: AWS
6. Region: escolha mais próximo (ex: São Paulo)
7. Clique em **"Create"**

### 1.2 Configurar Usuário

1. Vai aparecer modal "Security Quickstart"
2. **Username**: `cryptopix`
3. **Password**: (gere uma senha forte - SALVE!)
4. Clique em **"Create User"**

### 1.3 Liberar IP

1. No modal, em "Where would you like to connect from?"
2. Clique em **"Add My Current IP Address"**
3. Clique também em **"Add a Different IP Address"**
4. Digite: `0.0.0.0/0` (permite de qualquer lugar)
5. Clique em **"Finish and Close"**

### 1.4 Obter String de Conexão

1. Clique em **"Connect"** no cluster
2. Escolha **"Connect your application"**
3. Driver: **Python**, Version: **3.6 or later**
4. Copie a string:
```
mongodb+srv://cryptopix:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```
5. **Substitua** `<password>` pela senha que você criou
6. **Salve** esta string!

---

## 🔧 PASSO 2: Preparar Projeto para Railway

### 2.1 Criar Estrutura de Arquivos

**Criar:** `/app/Procfile`

```
web: sh -c 'cd frontend && yarn build && cd ../backend && uvicorn server:app --host 0.0.0.0 --port $PORT'
```

**Criar:** `/app/railway.toml`

```toml
[build]
builder = "nixpacks"
buildCommand = "cd frontend && yarn install && yarn build && cd ../backend && pip install -r requirements.txt"

[deploy]
startCommand = "cd backend && uvicorn server:app --host 0.0.0.0 --port $PORT"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10

[env]
NIXPACKS_PYTHON_VERSION = "3.11"
NODE_VERSION = "18"
```

**Criar:** `/app/nixpacks.toml`

```toml
[phases.setup]
nixPkgs = ["python311", "nodejs-18_x", "yarn"]

[phases.install]
cmds = [
  "cd frontend && yarn install",
  "cd backend && pip install -r requirements.txt"
]

[phases.build]
cmds = [
  "cd frontend && yarn build"
]

[start]
cmd = "cd backend && uvicorn server:app --host 0.0.0.0 --port $PORT"
```

### 2.2 Atualizar Backend para Servir Frontend

**Editar:** `/app/backend/server.py`

Adicione no início (depois dos imports):

```python
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from pathlib import Path

# Configuração para servir frontend
ROOT_DIR = Path(__file__).parent
FRONTEND_BUILD = ROOT_DIR.parent / "frontend" / "build"
```

Adicione antes de `app.add_middleware`:

```python
# Servir arquivos estáticos do frontend
if FRONTEND_BUILD.exists():
    app.mount("/static", StaticFiles(directory=str(FRONTEND_BUILD / "static")), name="static")
    
    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        # Se é uma rota da API, deixa passar
        if full_path.startswith("api/"):
            return None
            
        # Tentar servir arquivo
        file_path = FRONTEND_BUILD / full_path
        if file_path.is_file():
            return FileResponse(file_path)
        
        # Se não encontrar, servir index.html (SPA)
        return FileResponse(FRONTEND_BUILD / "index.html")
```

### 2.3 Atualizar Frontend .env

**Editar:** `/app/frontend/.env`

```env
REACT_APP_BACKEND_URL=
WDS_SOCKET_PORT=443
ENABLE_HEALTH_CHECK=false
```

⚠️ Deixe vazio pois vamos usar URL relativa (mesmo domínio).

### 2.4 Atualizar Frontend para usar URL Relativa

**Editar:** `/app/frontend/src/App.js`

Se tiver:
```javascript
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
```

Mude para:
```javascript
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
```

---

## 🔧 PASSO 3: Push para GitHub

```bash
cd /app

# Criar .gitignore
cat > .gitignore << 'EOF'
# Frontend
/frontend/node_modules
/frontend/build
/frontend/.env.local

# Backend
/backend/__pycache__
/backend/*.pyc
/backend/venv

# Outros
.DS_Store
*.log
.env
EOF

# Inicializar Git (se necessário)
git init

# Adicionar arquivos
git add .

# Commit
git commit -m "Configurado para Railway"

# Criar repositório no GitHub
# 1. Vá em https://github.com/new
# 2. Nome: cryptopix
# 3. Clique em "Create repository"

# Conectar ao GitHub
git remote add origin https://github.com/SEU_USUARIO/cryptopix.git
git branch -M main
git push -u origin main
```

---

## 🔧 PASSO 4: Deploy no Railway

### 4.1 Criar Projeto

1. Acesse: https://railway.app
2. Clique em **"Start a New Project"**
3. Clique em **"Deploy from GitHub repo"**
4. Autorize o Railway a acessar seu GitHub
5. Selecione o repositório **cryptopix**

### 4.2 Configurar Variáveis de Ambiente

1. Após o deploy iniciar, clique no projeto
2. Clique na aba **"Variables"**
3. Adicione as seguintes variáveis:

```env
MONGO_URL=mongodb+srv://cryptopix:SUA_SENHA@cluster0.xxxxx.mongodb.net/cryptopix?retryWrites=true&w=majority
DB_NAME=cryptopix
PORT=8001
PYTHON_VERSION=3.11
NODE_VERSION=18
```

4. Clique em **"Save"**

### 4.3 Aguardar Build

- Railway vai fazer build automaticamente
- Acompanhe os logs
- Processo leva 5-10 minutos
- Aguarde aparecer "Success"

### 4.4 Obter URL

1. Clique em **"Settings"**
2. Em "Environment", clique em **"Generate Domain"**
3. Copie a URL gerada (ex: `cryptopix-production.up.railway.app`)

---

## ✅ PASSO 5: Testar

### 5.1 Acessar Aplicação

```
https://cryptopix-production.up.railway.app
```

### 5.2 Testar Funcionalidades

1. **Home**: https://cryptopix-production.up.railway.app/
2. **Enviar PIX**: https://cryptopix-production.up.railway.app/send
3. **Login Admin**: admin / 000000
4. **Backend API**: https://cryptopix-production.up.railway.app/api/

---

## 🔄 DEPLOY AUTOMÁTICO

### Como Funciona

1. Você faz mudanças no código
2. Faz commit e push:
   ```bash
   git add .
   git commit -m "Atualização"
   git push origin main
   ```
3. Railway detecta automaticamente
4. Faz rebuild e redeploy
5. Nova versão no ar!

---

## 🐛 SOLUÇÃO DE PROBLEMAS

### **Build Falha - Python Error**

**Erro**: `python: command not found`

**Solução**: Adicionar em `railway.toml`:
```toml
[env]
NIXPACKS_PYTHON_VERSION = "3.11"
```

### **Build Falha - Node Error**

**Erro**: `node: command not found`

**Solução**: Adicionar variável:
```env
NODE_VERSION=18
```

### **Frontend não carrega**

**Erro**: 404 nas rotas

**Solução**: Verificar se `app.mount` está correto no server.py

### **MongoDB Connection Failed**

**Erro**: `ServerSelectionTimeoutError`

**Solução**:
1. Verifique a string de conexão
2. Confirme que IP 0.0.0.0/0 está liberado
3. Teste a conexão localmente primeiro

### **Port Already in Use**

**Erro**: `Address already in use`

**Solução**: Railway usa variável `$PORT` automaticamente, não hardcode porta 8001

---

## 💰 CUSTOS E LIMITES

### **Railway Free Trial**

- **$5 de crédito grátis/mês**
- Não precisa cartão de crédito
- Renovável mensalmente
- Suficiente para:
  - 1 projeto pequeno
  - ~500h de execução/mês
  - Ilimitado de builds

### **Após Trial**

- **Starter Plan**: $5/mês
- 500 horas de execução
- $0.000231/GB de egress
- Builds ilimitados

### **MongoDB Atlas Free**

- 512 MB storage
- Suficiente para MVP
- Compartilhado (M0)

**Total**: Grátis por 1 mês, depois ~$5/mês

---

## 🎨 DOMÍNIO PERSONALIZADO

### Adicionar Domínio Custom

1. No Railway, vá em **"Settings"**
2. Role até **"Domains"**
3. Clique em **"Add Custom Domain"**
4. Digite: `cryptopix.com`
5. Configure DNS:
   ```
   Type: CNAME
   Name: @
   Value: cryptopix-production.up.railway.app
   ```
6. Aguarde propagação (até 48h)

---

## 📊 MONITORAMENTO

### Ver Logs

1. No Railway, clique no projeto
2. Vá na aba **"Deployments"**
3. Clique no deployment ativo
4. Veja logs em tempo real

### Métricas

1. Aba **"Metrics"**
2. Veja:
   - CPU usage
   - Memory usage
   - Network traffic
   - Restart count

---

## 🔐 VARIÁVEIS DE AMBIENTE

### Obrigatórias

```env
MONGO_URL=mongodb+srv://cryptopix:SENHA@cluster0.xxxxx.mongodb.net/cryptopix
DB_NAME=cryptopix
PORT=8001
```

### Opcionais

```env
PYTHON_VERSION=3.11
NODE_VERSION=18
NIXPACKS_PYTHON_VERSION=3.11
```

---

## 🚀 OTIMIZAÇÕES

### 1. Caching de Dependências

Railway já faz isso automaticamente!

### 2. Build Time

Adicione em `railway.toml`:
```toml
[build]
buildCommand = "yarn install --frozen-lockfile && cd frontend && yarn build && cd ../backend && pip install --no-cache-dir -r requirements.txt"
```

### 3. Reduzir Tamanho

Adicione em `frontend/package.json`:
```json
{
  "scripts": {
    "build": "GENERATE_SOURCEMAP=false craco build"
  }
}
```

---

## 📝 CHECKLIST DE DEPLOY

- [ ] MongoDB Atlas configurado
- [ ] String de conexão salva
- [ ] IP 0.0.0.0/0 liberado
- [ ] Arquivos de configuração criados (Procfile, railway.toml, nixpacks.toml)
- [ ] server.py atualizado para servir frontend
- [ ] .gitignore configurado
- [ ] Repositório no GitHub criado
- [ ] Push feito para GitHub
- [ ] Projeto criado no Railway
- [ ] Variáveis de ambiente configuradas
- [ ] Build bem-sucedido
- [ ] Domínio gerado
- [ ] Aplicação testada e funcionando

---

## 🎉 PRONTO!

Seu CryptoPIX está no ar:

```
🌐 URL: https://cryptopix-production.up.railway.app
👤 Admin: admin / 000000
📊 Dashboard: /admin
💰 Custo: $5/mês após trial
```

---

## 📚 PRÓXIMOS PASSOS

1. **Domínio Personalizado**: Configure seu próprio domínio
2. **SSL**: Railway fornece automaticamente
3. **Monitoramento**: Configure alertas
4. **Backup**: Faça backup do MongoDB regularmente
5. **Escala**: Upgrade conforme necessário

---

## 🔗 LINKS ÚTEIS

- Railway Dashboard: https://railway.app/dashboard
- Railway Docs: https://docs.railway.app
- MongoDB Atlas: https://cloud.mongodb.com
- Seu Projeto: https://railway.app/project/SEU_PROJETO

---

**Status**: ✅ Guia completo | 🚀 Deploy em minutos | 💯 Tudo funcionando!
