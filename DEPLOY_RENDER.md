# 🚀 GUIA DE DEPLOY - RENDER (Full-Stack)

## 📋 Visão Geral

Deploy completo do **CryptoPIX** no **Render** (Frontend + Backend).

**✅ VANTAGENS:**
- Plano grátis permanente
- Deploy automático do GitHub
- SSL gratuito
- Fácil configuração

**⚠️ LIMITAÇÕES (Free Tier):**
- Backend "hiberna" após 15min de inatividade
- Primeira requisição pode levar 30-60s
- 750 horas/mês (suficiente para 1 app)

---

## 📦 PRÉ-REQUISITOS

1. **Conta no Render**: https://render.com
2. **Conta no MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
3. **Conta no GitHub**: https://github.com
4. **Git instalado**

---

## 🔧 PASSO 1: MongoDB Atlas

### 1.1 Criar Cluster (se não tiver)

1. Acesse: https://www.mongodb.com/cloud/atlas
2. **"Try Free"** → Cadastro/Login
3. **"Build a Database"** → **"FREE"** (M0)
4. Provider: AWS, Region: São Paulo
5. **"Create"**

### 1.2 Configurar Acesso

**Database Access:**
1. Sidebar → "Database Access"
2. **"Add New Database User"**
3. Username: `cryptopix`
4. Password: (gere e salve!)
5. Privileges: "Atlas admin"
6. **"Add User"**

**Network Access:**
1. Sidebar → "Network Access"
2. **"Add IP Address"**
3. **"Allow Access from Anywhere"** (0.0.0.0/0)
4. **"Confirm"**

### 1.3 String de Conexão

1. "Database" → **"Connect"**
2. **"Connect your application"**
3. Driver: Python 3.6+
4. Copie a string:
```
mongodb+srv://cryptopix:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```
5. Substitua `<password>` e salve!

---

## 🔧 PASSO 2: Preparar Projeto

### 2.1 Criar Arquivos de Configuração

**Criar:** `/app/render.yaml`

```yaml
services:
  # Backend Service
  - type: web
    name: cryptopix-backend
    env: python
    region: oregon
    plan: free
    branch: main
    buildCommand: "cd backend && pip install -r requirements.txt"
    startCommand: "cd backend && uvicorn server:app --host 0.0.0.0 --port $PORT"
    envVars:
      - key: MONGO_URL
        sync: false
      - key: DB_NAME
        value: cryptopix
      - key: PORT
        value: 10000

  # Frontend Service
  - type: web
    name: cryptopix-frontend
    env: static
    region: oregon
    plan: free
    branch: main
    buildCommand: "cd frontend && yarn install && yarn build"
    staticPublishPath: frontend/build
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
    envVars:
      - key: REACT_APP_BACKEND_URL
        fromService:
          type: web
          name: cryptopix-backend
          envVarKey: RENDER_EXTERNAL_URL
```

**Criar:** `/app/backend/build.sh`

```bash
#!/usr/bin/env bash
# exit on error
set -o errexit

pip install --upgrade pip
pip install -r requirements.txt
```

Tornar executável:
```bash
chmod +x /app/backend/build.sh
```

**Criar:** `/app/frontend/build.sh`

```bash
#!/usr/bin/env bash
# exit on error
set -o errexit

yarn install
yarn build
```

Tornar executável:
```bash
chmod +x /app/frontend/build.sh
```

### 2.2 Atualizar requirements.txt

**Verificar:** `/app/backend/requirements.txt`

Adicionar se não tiver:
```
gunicorn==21.2.0
```

### 2.3 Atualizar .gitignore

```bash
# Frontend
/frontend/node_modules
/frontend/build
/frontend/.env.local
/frontend/.env.production

# Backend
/backend/__pycache__
/backend/*.pyc
/backend/.env
/backend/venv
/backend/*.db

# Outros
.DS_Store
*.log
.env
```

---

## 🔧 PASSO 3: Push para GitHub

```bash
cd /app

# Inicializar Git
git init

# Adicionar tudo
git add .

# Commit
git commit -m "Configurado para Render"

# Criar repositório no GitHub
# Vá em https://github.com/new
# Nome: cryptopix
# Criar

# Conectar
git remote add origin https://github.com/SEU_USUARIO/cryptopix.git
git branch -M main
git push -u origin main
```

---

## 🔧 PASSO 4: Deploy Backend no Render

### 4.1 Criar Web Service

1. Acesse: https://render.com
2. **"Dashboard"**
3. **"New +"** → **"Web Service"**
4. **"Connect account"** (GitHub)
5. Selecione repositório **cryptopix**
6. Configure:

```
Name: cryptopix-backend
Region: Oregon (US West)
Branch: main
Root Directory: backend
Environment: Python 3
Build Command: pip install -r requirements.txt
Start Command: uvicorn server:app --host 0.0.0.0 --port $PORT
Instance Type: Free
```

### 4.2 Adicionar Environment Variables

No mesmo formulário, em "Environment Variables":

```
MONGO_URL = mongodb+srv://cryptopix:SUA_SENHA@cluster0.xxxxx.mongodb.net/cryptopix?retryWrites=true&w=majority
DB_NAME = cryptopix
PYTHON_VERSION = 3.11.0
```

### 4.3 Deploy

1. Clique em **"Create Web Service"**
2. Aguarde build (5-10 minutos)
3. Quando aparecer "Live", copie a URL:
   ```
   https://cryptopix-backend.onrender.com
   ```

---

## 🔧 PASSO 5: Deploy Frontend no Render

### 5.1 Criar Static Site

1. **"Dashboard"**
2. **"New +"** → **"Static Site"**
3. Selecione repositório **cryptopix**
4. Configure:

```
Name: cryptopix
Branch: main
Root Directory: frontend
Build Command: yarn install && yarn build
Publish Directory: build
```

### 5.2 Adicionar Environment Variable

Em "Environment Variables":

```
REACT_APP_BACKEND_URL = https://cryptopix-backend.onrender.com
```

### 5.3 Deploy

1. **"Create Static Site"**
2. Aguarde build (3-5 minutos)
3. Quando aparecer "Live", sua URL será:
   ```
   https://cryptopix.onrender.com
   ```

---

## 🔧 PASSO 6: Configurar CORS no Backend

Se der erro de CORS, editar `/app/backend/server.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[
        "https://cryptopix.onrender.com",  # Seu frontend
        "http://localhost:3000",            # Desenvolvimento
        "*"                                 # Permitir todos (remover em produção)
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Commit e push:
```bash
git add .
git commit -m "Fix CORS"
git push origin main
```

Render fará redeploy automaticamente.

---

## ✅ PASSO 7: Testar

### 7.1 Acessar

```
Frontend: https://cryptopix.onrender.com
Backend: https://cryptopix-backend.onrender.com/api/
```

### 7.2 Primeiro Acesso

⚠️ **IMPORTANTE**: 
- Backend grátis "hiberna" após 15min inativo
- Primeira requisição após hibernar leva 30-60s
- Seja paciente!

### 7.3 Testar Funcionalidades

1. Home: https://cryptopix.onrender.com
2. Enviar PIX: https://cryptopix.onrender.com/send
3. Login Admin: admin / 000000
4. API Health: https://cryptopix-backend.onrender.com/api/health

---

## 🔄 DEPLOY AUTOMÁTICO

### Como Funciona

```bash
# Fazer mudanças
git add .
git commit -m "Atualização"
git push origin main

# Render detecta automaticamente
# Frontend: rebuild em ~3min
# Backend: rebuild em ~5min
```

---

## 🐛 SOLUÇÃO DE PROBLEMAS

### **Backend Lento/Timeout**

**Causa**: Hibernação do plano grátis

**Soluções**:
1. **Primeira requisição**: Aguarde 30-60s
2. **Keep-Alive**: Use serviço como UptimeRobot para pingar a cada 14min
3. **Upgrade**: Plano pago ($7/mês) não hiberna

### **Build Failed - Python**

**Erro**: `python: not found`

**Solução**: Adicionar em Environment Variables:
```
PYTHON_VERSION = 3.11.0
```

### **Build Failed - Node**

**Erro**: `yarn: not found`

**Solução**: Render usa Node 14 por padrão. Criar `.node-version`:
```bash
echo "18" > /app/frontend/.node-version
```

### **CORS Error**

**Solução**: Verificar `allow_origins` no server.py

### **MongoDB Connection Error**

**Soluções**:
1. Confirme string de conexão
2. Verifique IP 0.0.0.0/0 liberado
3. Teste conexão local primeiro

---

## 💰 CUSTOS E LIMITES

### **Render Free Tier**

**Static Sites (Frontend):**
- ✅ Grátis forever
- ✅ SSL automático
- ✅ CDN global
- ✅ Builds ilimitados
- ✅ 100 GB bandwidth/mês

**Web Services (Backend):**
- ✅ Grátis forever
- ✅ SSL automático
- ✅ 750 horas/mês
- ⚠️ Hiberna após 15min inatividade
- ⚠️ 512 MB RAM
- ⚠️ 0.1 CPU

### **Planos Pagos**

**Starter ($7/mês):**
- ✅ Sem hibernação
- ✅ 512 MB RAM
- ✅ 0.5 CPU

**Standard ($25/mês):**
- ✅ 2 GB RAM
- ✅ 1 CPU

### **MongoDB Atlas Free**
- ✅ 512 MB storage
- ✅ Grátis forever

**Total**: Grátis (com limitações)

---

## 🚀 OTIMIZAÇÕES

### 1. Evitar Hibernação (Free Tier)

**UptimeRobot** (grátis):
1. Acesse: https://uptimerobot.com
2. Crie monitor:
   - Type: HTTP(S)
   - URL: https://cryptopix-backend.onrender.com/api/health
   - Interval: 14 minutos
3. Isso mantém backend "acordado"

### 2. Build Cache

Render faz automaticamente!

### 3. Reduzir Tamanho do Build

**Frontend** (`package.json`):
```json
{
  "scripts": {
    "build": "GENERATE_SOURCEMAP=false craco build"
  }
}
```

---

## 🎨 DOMÍNIO PERSONALIZADO

### Frontend

1. No Render, vá no **cryptopix** (frontend)
2. **"Settings"** → **"Custom Domain"**
3. **"Add Custom Domain"**
4. Digite: `cryptopix.com`
5. Configure DNS:
   ```
   Type: CNAME
   Name: @
   Value: cryptopix.onrender.com
   ```
6. Aguarde propagação

### Backend

1. No **cryptopix-backend**
2. **"Settings"** → **"Custom Domain"**
3. **"Add Custom Domain"**
4. Digite: `api.cryptopix.com`
5. Configure DNS:
   ```
   Type: CNAME
   Name: api
   Value: cryptopix-backend.onrender.com
   ```

---

## 📊 MONITORAMENTO

### Ver Logs

1. Dashboard → Seu serviço
2. Aba **"Logs"**
3. Logs em tempo real

### Métricas

1. Aba **"Metrics"**
2. Veja:
   - Request count
   - Response time
   - Memory usage
   - CPU usage

### Alertas

1. **"Settings"** → **"Notifications"**
2. Configure alertas por email

---

## 📝 CHECKLIST

- [ ] MongoDB Atlas configurado
- [ ] String de conexão salva
- [ ] Arquivos de config criados
- [ ] .gitignore atualizado
- [ ] Push para GitHub
- [ ] Backend deployed
- [ ] Frontend deployed
- [ ] CORS configurado
- [ ] Variáveis de ambiente setadas
- [ ] Testado e funcionando
- [ ] (Opcional) UptimeRobot configurado
- [ ] (Opcional) Domínio custom

---

## 🎉 PRONTO!

```
🌐 Frontend: https://cryptopix.onrender.com
🔧 Backend: https://cryptopix-backend.onrender.com
👤 Admin: admin / 000000
💰 Custo: GRÁTIS!
```

---

## 🔗 LINKS ÚTEIS

- Render Dashboard: https://dashboard.render.com
- Render Docs: https://render.com/docs
- MongoDB Atlas: https://cloud.mongodb.com
- UptimeRobot: https://uptimerobot.com

---

## ⚡ COMPARAÇÃO: Render vs Railway vs Vercel

| Feature | Render Free | Railway Free | Vercel Hobby |
|---------|-------------|--------------|--------------|
| **Custo** | Grátis | $5/mês trial | Grátis |
| **Hibernação** | Sim (15min) | Não | N/A |
| **Backend** | Python ✅ | Python ✅ | Limitado |
| **Frontend** | Sim | Sim | Sim (melhor) |
| **SSL** | Sim | Sim | Sim |
| **Domínio** | Sim | Sim | Sim |

**Recomendação**: 
- **Render**: Melhor para começar grátis
- **Railway**: Melhor performance ($5/mês)
- **Vercel**: Melhor só para frontend

---

**Status**: ✅ Guia completo | 🆓 100% Grátis | 🚀 Deploy em minutos!
