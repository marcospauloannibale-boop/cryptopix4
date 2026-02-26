# 🚀 GUIA DE DEPLOY - VERCEL (Full-Stack)

## 📋 Visão Geral

Este guia ensina a fazer deploy do **CryptoPIX completo** (Frontend + Backend) na **Vercel**.

**⚠️ IMPORTANTE**: A Vercel tem limitações para backend Python. Vamos usar uma configuração especial com **Vercel Serverless Functions**.

---

## 🎯 Opção 1: VERCEL (Frontend) + RAILWAY/RENDER (Backend)

### **Esta é a opção RECOMENDADA** ✅

**Por quê?**
- Vercel é otimizada para frontend React
- Railway/Render são melhores para backend Python
- Separar garante melhor performance

**Siga o guia:**
- [VERCEL_RAILWAY.md](#) para esta configuração

---

## 🎯 Opção 2: VERCEL Full-Stack (Experimental)

### **Limitações:**
- Backend em Python via Serverless Functions
- Timeouts de 10s (hobby) / 60s (pro)
- Não recomendado para produção intensiva

---

## 📦 PRÉ-REQUISITOS

1. **Conta na Vercel**: https://vercel.com
2. **Conta no MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
3. **Conta no GitHub**: https://github.com
4. **Git instalado** no seu computador

---

## 🔧 PASSO 1: Preparar o Projeto

### 1.1 Criar Repositório no GitHub

```bash
# Na pasta /app do seu projeto
cd /app

# Inicializar git (se não estiver inicializado)
git init

# Criar .gitignore
cat > .gitignore << 'EOF'
# Frontend
/frontend/node_modules
/frontend/build
/frontend/.env.local

# Backend
/backend/__pycache__
/backend/*.pyc
/backend/.env
/backend/venv

# Outros
.DS_Store
*.log
EOF

# Adicionar arquivos
git add .

# Commit
git commit -m "Initial commit - CryptoPIX"

# Criar repositório no GitHub (via interface web)
# Depois conectar:
git remote add origin https://github.com/SEU_USUARIO/cryptopix.git
git branch -M main
git push -u origin main
```

---

## 🔧 PASSO 2: Configurar MongoDB Atlas

### 2.1 Criar Cluster Grátis

1. Acesse: https://www.mongodb.com/cloud/atlas
2. Clique em **"Try Free"**
3. Faça login/cadastro
4. Clique em **"Build a Database"**
5. Escolha **"FREE"** (Shared)
6. Clique em **"Create"**

### 2.2 Configurar Acesso

1. **Database Access**:
   - Vá em "Database Access"
   - Clique em "Add New Database User"
   - Username: `cryptopix`
   - Password: (gere uma senha forte, salve!)
   - Database User Privileges: "Read and write to any database"
   - Clique em "Add User"

2. **Network Access**:
   - Vá em "Network Access"
   - Clique em "Add IP Address"
   - Clique em "Allow Access from Anywhere" (0.0.0.0/0)
   - Clique em "Confirm"

### 2.3 Obter String de Conexão

1. Vá em "Database" → "Connect"
2. Escolha "Connect your application"
3. Driver: Python, Version: 3.6 or later
4. Copie a string de conexão:
```
mongodb+srv://cryptopix:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```
5. **Substitua** `<password>` pela senha do usuário
6. **Salve** esta string!

---

## 🔧 PASSO 3: Configurar Vercel (Frontend)

### 3.1 Preparar Frontend para Build

**Arquivo:** `/app/frontend/package.json`

Verifique se tem:
```json
{
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test"
  }
}
```

### 3.2 Criar vercel.json

**Crie:** `/app/vercel.json`

```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "frontend/build"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "https://SEU-BACKEND.railway.app/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/build/$1"
    }
  ]
}
```

**⚠️ Nota**: Vamos configurar o backend separado (Railway/Render).

---

## 🔧 PASSO 4: Deploy na Vercel

### 4.1 Via Interface Web (Mais Fácil)

1. Acesse: https://vercel.com
2. Clique em **"Add New Project"**
3. Clique em **"Import Git Repository"**
4. Selecione seu repositório `cryptopix`
5. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `yarn build`
   - **Output Directory**: `build`
   - **Install Command**: `yarn install`

6. **Environment Variables** (Adicionar):
   ```
   REACT_APP_BACKEND_URL = https://SEU-BACKEND.railway.app
   ```
   (Vamos pegar essa URL depois do deploy do backend)

7. Clique em **"Deploy"**

### 4.2 Via CLI (Alternativa)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Fazer login
vercel login

# Deploy
cd /app/frontend
vercel

# Seguir as instruções:
# - Set up and deploy? Yes
# - Which scope? (escolha sua conta)
# - Link to existing project? No
# - Project name? cryptopix
# - In which directory is your code located? ./
# - Want to override settings? No

# Deploy em produção
vercel --prod
```

---

## 🔧 PASSO 5: Deploy Backend (Railway)

### 5.1 Preparar Backend

**Criar:** `/app/backend/railway.json`

```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn server:app --host 0.0.0.0 --port $PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

**Criar:** `/app/backend/Procfile`

```
web: uvicorn server:app --host 0.0.0.0 --port $PORT
```

**Criar:** `/app/backend/runtime.txt`

```
python-3.11
```

### 5.2 Deploy no Railway

1. Acesse: https://railway.app
2. Clique em **"Start a New Project"**
3. Escolha **"Deploy from GitHub repo"**
4. Selecione seu repositório `cryptopix`
5. Clique em **"Add variables"**:
   ```
   MONGO_URL = mongodb+srv://cryptopix:SUA_SENHA@cluster0.xxxxx.mongodb.net/cryptopix?retryWrites=true&w=majority
   DB_NAME = cryptopix
   PORT = 8001
   ```
6. Clique em **"Deploy"**
7. Aguarde o build terminar
8. Copie a URL gerada (ex: `cryptopix-backend.railway.app`)

---

## 🔧 PASSO 6: Conectar Frontend ao Backend

### 6.1 Atualizar Vercel

1. Vá para seu projeto na Vercel
2. Clique em **"Settings"**
3. Vá em **"Environment Variables"**
4. Edite `REACT_APP_BACKEND_URL`:
   ```
   https://cryptopix-backend.railway.app
   ```
5. Clique em **"Save"**
6. Vá em **"Deployments"**
7. Clique em **"Redeploy"** no último deploy

---

## ✅ PASSO 7: Testar

### 7.1 Acessar Aplicação

```
https://SEU-PROJETO.vercel.app
```

### 7.2 Testar Funcionalidades

1. **Home**: Carrega corretamente
2. **Enviar PIX**: https://SEU-PROJETO.vercel.app/send
3. **Login Admin**: admin / 000000
4. **Dashboard**: Funciona após login
5. **API**: Testar endpoint:
   ```bash
   curl https://cryptopix-backend.railway.app/api/
   ```

---

## 🎯 VARIÁVEIS DE AMBIENTE

### Frontend (Vercel)

```env
REACT_APP_BACKEND_URL=https://cryptopix-backend.railway.app
```

### Backend (Railway)

```env
MONGO_URL=mongodb+srv://cryptopix:SUA_SENHA@cluster0.xxxxx.mongodb.net/cryptopix
DB_NAME=cryptopix
PORT=8001
```

---

## 🐛 SOLUÇÃO DE PROBLEMAS

### **Frontend não carrega**
- Verifique se o build foi bem-sucedido
- Veja os logs na Vercel
- Confirme que `REACT_APP_BACKEND_URL` está correto

### **Backend não responde**
- Verifique se o deploy do Railway foi bem-sucedido
- Teste a URL do backend diretamente
- Verifique a string de conexão do MongoDB

### **CORS Error**
- Confirme que o backend tem `allow_origins=["*"]`
- Verifique se a URL do backend está correta no frontend

### **MongoDB Connection Error**
- Confirme a string de conexão
- Verifique se o IP está liberado (0.0.0.0/0)
- Confirme usuário e senha

---

## 📊 LIMITES E CUSTOS

### **Vercel (Hobby - Grátis)**
- Builds ilimitados
- 100 GB de bandwidth/mês
- Domínio personalizado gratuito
- SSL automático

### **Railway (Trial)**
- $5 de crédito grátis/mês
- Sem cartão de crédito
- Após acabar: $5/mês

### **MongoDB Atlas (Free Tier)**
- 512 MB de armazenamento
- Compartilhado
- Suficiente para MVP

---

## 🎨 DOMÍNIO PERSONALIZADO

### No Vercel:

1. Vá em **"Settings"** → **"Domains"**
2. Clique em **"Add"**
3. Digite seu domínio: `cryptopix.com`
4. Configure DNS conforme instruções
5. Aguarde propagação (até 24h)

---

## 🔄 ATUALIZAÇÃO CONTÍNUA

### Deploy Automático

1. Conecte GitHub à Vercel (já feito)
2. Toda vez que fizer `git push`:
   - Vercel faz rebuild automático do frontend
   - Railway faz rebuild automático do backend

```bash
# Fazer mudança
git add .
git commit -m "Atualização"
git push origin main

# Deploy automático acontece!
```

---

## 📝 CHECKLIST FINAL

- [ ] MongoDB Atlas configurado
- [ ] Repositório no GitHub criado
- [ ] Frontend deployed na Vercel
- [ ] Backend deployed no Railway
- [ ] Variáveis de ambiente configuradas
- [ ] URLs conectadas corretamente
- [ ] Testado todas as funcionalidades
- [ ] Domínio personalizado (opcional)

---

## 🎉 PRONTO!

Seu CryptoPIX está no ar em:

```
Frontend: https://SEU-PROJETO.vercel.app
Backend: https://cryptopix-backend.railway.app
Admin: https://SEU-PROJETO.vercel.app/admin
```

---

**📚 Próximos Guias:**
- [DEPLOY_RENDER.md](#) - Backend no Render
- [DEPLOY_HEROKU.md](#) - Deploy no Heroku
- [DEPLOY_AWS.md](#) - Deploy na AWS

**Status**: ✅ Guia completo | 🚀 Pronto para deploy | 🌐 Online em minutos!
