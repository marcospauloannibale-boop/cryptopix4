@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

:MENU
cls
echo ╔════════════════════════════════════════════════════════╗
echo ║         🚀 CRYPTOPIX - AUTOMAÇÃO COMPLETA             ║
echo ║              Deploy e Configuração                     ║
echo ╚════════════════════════════════════════════════════════╝
echo.
echo  Escolha uma opção:
echo.
echo  [1] 🔧 Corrigir Erro de Deploy Railway (Node 20)
echo  [2] 📦 Preparar Deploy Completo (Railway)
echo  [3] 🌐 Preparar Deploy Render
echo  [4] 📱 Preparar App Android (Capacitor)
echo  [5] 🪙 Adicionar Nova Criptomoeda
echo  [6] ℹ️  Informações do Projeto
echo  [0] ❌ Sair
echo.
echo ════════════════════════════════════════════════════════
set /p opcao="Digite o número da opção: "

if "%opcao%"=="1" goto FIX_RAILWAY
if "%opcao%"=="2" goto DEPLOY_RAILWAY
if "%opcao%"=="3" goto DEPLOY_RENDER
if "%opcao%"=="4" goto ANDROID_SETUP
if "%opcao%"=="5" goto ADD_COIN
if "%opcao%"=="6" goto INFO
if "%opcao%"=="0" goto EXIT
goto MENU

REM =====================================================
REM OPÇÃO 1: CORRIGIR ERRO RAILWAY
REM =====================================================
:FIX_RAILWAY
cls
echo ╔════════════════════════════════════════════════════════╗
echo ║     🔧 CORREÇÃO: Erro Node.js Railway                 ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Verificar pasta
if not exist "frontend" (
    echo ❌ ERRO: Execute na pasta /app do projeto!
    pause
    goto MENU
)

echo [1/6] Criando .node-version...
echo 20> .node-version
echo ✅ Concluído
echo.

echo [2/6] Criando railway.toml...
(
echo [build]
echo builder = "nixpacks"
echo buildCommand = "cd frontend && yarn install && yarn build && cd ../backend && pip install -r requirements.txt"
echo.
echo [deploy]
echo startCommand = "cd backend && uvicorn server:app --host 0.0.0.0 --port $PORT"
echo restartPolicyType = "ON_FAILURE"
echo restartPolicyMaxRetries = 10
echo.
echo [env]
echo NIXPACKS_PYTHON_VERSION = "3.11"
echo NODE_VERSION = "20"
) > railway.toml
echo ✅ Concluído
echo.

echo [3/6] Criando nixpacks.toml...
(
echo [phases.setup]
echo nixPkgs = ["python311", "nodejs-20_x", "yarn"]
echo.
echo [phases.install]
echo cmds = [
echo   "cd frontend && yarn install",
echo   "cd backend && pip install -r requirements.txt"
echo ]
echo.
echo [phases.build]
echo cmds = [
echo   "cd frontend && yarn build"
echo ]
echo.
echo [start]
echo cmd = "cd backend && uvicorn server:app --host 0.0.0.0 --port $PORT"
) > nixpacks.toml
echo ✅ Concluído
echo.

echo [4/6] Adicionando ao Git...
git add .node-version railway.toml nixpacks.toml
echo ✅ Concluído
echo.

echo [5/6] Fazendo commit...
git commit -m "Fix: Força Node 20 para react-router-dom v7"
echo ✅ Concluído
echo.

echo [6/6] Enviando para GitHub...
git push origin main
if errorlevel 1 (
    echo ⚠️ Erro ao fazer push. Faça manualmente: git push origin main
) else (
    echo ✅ Push realizado com sucesso!
)
echo.

echo ════════════════════════════════════════════════════════
echo  ✅ CORREÇÃO APLICADA!
echo.
echo  O Railway fará redeploy automaticamente.
echo  Acompanhe em: https://railway.app/dashboard
echo ════════════════════════════════════════════════════════
echo.
pause
goto MENU

REM =====================================================
REM OPÇÃO 2: DEPLOY RAILWAY COMPLETO
REM =====================================================
:DEPLOY_RAILWAY
cls
echo ╔════════════════════════════════════════════════════════╗
echo ║     📦 PREPARAR DEPLOY COMPLETO - RAILWAY             ║
echo ╚════════════════════════════════════════════════════════╝
echo.

if not exist "frontend" (
    echo ❌ ERRO: Execute na pasta /app do projeto!
    pause
    goto MENU
)

echo Este script vai preparar todos os arquivos necessários
echo para fazer deploy no Railway.
echo.
set /p confirma="Deseja continuar? (S/N): "
if /i not "%confirma%"=="S" goto MENU

echo.
echo [1/8] Criando .gitignore...
(
echo # Frontend
echo /frontend/node_modules
echo /frontend/build
echo /frontend/.env.local
echo.
echo # Backend
echo /backend/__pycache__
echo /backend/*.pyc
echo /backend/.env
echo /backend/venv
echo.
echo # Outros
echo .DS_Store
echo *.log
) > .gitignore
echo ✅ Concluído
echo.

echo [2/8] Criando .node-version...
echo 20> .node-version
echo ✅ Concluído
echo.

echo [3/8] Criando railway.toml...
(
echo [build]
echo builder = "nixpacks"
echo buildCommand = "cd frontend && yarn install && yarn build && cd ../backend && pip install -r requirements.txt"
echo.
echo [deploy]
echo startCommand = "cd backend && uvicorn server:app --host 0.0.0.0 --port $PORT"
echo restartPolicyType = "ON_FAILURE"
echo restartPolicyMaxRetries = 10
echo.
echo [env]
echo NIXPACKS_PYTHON_VERSION = "3.11"
echo NODE_VERSION = "20"
) > railway.toml
echo ✅ Concluído
echo.

echo [4/8] Criando nixpacks.toml...
(
echo [phases.setup]
echo nixPkgs = ["python311", "nodejs-20_x", "yarn"]
echo.
echo [phases.install]
echo cmds = [
echo   "cd frontend && yarn install",
echo   "cd backend && pip install -r requirements.txt"
echo ]
echo.
echo [phases.build]
echo cmds = [
echo   "cd frontend && yarn build"
echo ]
echo.
echo [start]
echo cmd = "cd backend && uvicorn server:app --host 0.0.0.0 --port $PORT"
) > nixpacks.toml
echo ✅ Concluído
echo.

echo [5/8] Inicializando Git (se necessário)...
git init >nul 2>&1
echo ✅ Concluído
echo.

echo [6/8] Adicionando arquivos ao Git...
git add .
echo ✅ Concluído
echo.

echo [7/8] Fazendo commit...
git commit -m "Preparado para deploy no Railway"
echo ✅ Concluído
echo.

echo [8/8] Verificando repositório remoto...
git remote -v | find "origin" >nul
if errorlevel 1 (
    echo.
    echo ⚠️ Repositório remoto não configurado!
    echo.
    echo Por favor, configure o repositório:
    echo 1. Crie um repositório no GitHub
    echo 2. Execute: git remote add origin https://github.com/SEU_USUARIO/cryptopix.git
    echo 3. Execute: git push -u origin main
    echo.
) else (
    echo Fazendo push...
    git push origin main
    if errorlevel 1 (
        echo ⚠️ Erro ao fazer push
    ) else (
        echo ✅ Push realizado com sucesso!
    )
)
echo.

echo ════════════════════════════════════════════════════════
echo  ✅ ARQUIVOS PREPARADOS!
echo.
echo  Próximos passos:
echo  1. Crie conta no Railway: https://railway.app
echo  2. New Project → Deploy from GitHub
echo  3. Selecione seu repositório
echo  4. Adicione variáveis de ambiente:
echo     - MONGO_URL (string de conexão MongoDB)
echo     - DB_NAME=cryptopix
echo.
echo  Guia completo: /app/DEPLOY_RAILWAY.md
echo ════════════════════════════════════════════════════════
echo.
pause
goto MENU

REM =====================================================
REM OPÇÃO 3: DEPLOY RENDER
REM =====================================================
:DEPLOY_RENDER
cls
echo ╔════════════════════════════════════════════════════════╗
echo ║     🌐 PREPARAR DEPLOY - RENDER                       ║
echo ╚════════════════════════════════════════════════════════╝
echo.

echo [INFO] Para deploy no Render, você precisa:
echo.
echo 1. Backend como Web Service
echo 2. Frontend como Static Site
echo 3. MongoDB Atlas configurado
echo.
echo Guia completo disponível em:
echo /app/DEPLOY_RENDER.md
echo.
echo Pressione qualquer tecla para abrir o guia...
pause >nul
start notepad DEPLOY_RENDER.md
goto MENU

REM =====================================================
REM OPÇÃO 4: ANDROID SETUP
REM =====================================================
:ANDROID_SETUP
cls
echo ╔════════════════════════════════════════════════════════╗
echo ║     📱 PREPARAR APP ANDROID                           ║
echo ╚════════════════════════════════════════════════════════╝
echo.

if not exist "frontend" (
    echo ❌ ERRO: Execute na pasta /app do projeto!
    pause
    goto MENU
)

echo Este script vai instalar o Capacitor e preparar o app Android.
echo.
echo PRÉ-REQUISITOS:
echo  ✓ Node.js instalado
echo  ✓ JDK 11+ instalado
echo  ✓ Android Studio instalado
echo.
set /p confirma="Todos os pré-requisitos instalados? (S/N): "
if /i not "%confirma%"=="S" (
    echo.
    echo Instale os pré-requisitos e tente novamente.
    echo Guia completo: /app/CREATE_APK_ANDROID.md
    pause
    goto MENU
)

echo.
echo [1/5] Instalando Capacitor...
cd frontend
call npm install @capacitor/core @capacitor/cli @capacitor/android
echo ✅ Concluído
echo.

echo [2/5] Inicializando Capacitor...
call npx cap init
echo.

echo [3/5] Fazendo build do React...
call npm run build
echo ✅ Concluído
echo.

echo [4/5] Adicionando plataforma Android...
call npx cap add android
echo ✅ Concluído
echo.

echo [5/5] Sincronizando arquivos...
call npx cap sync
echo ✅ Concluído
echo.

cd ..

echo ════════════════════════════════════════════════════════
echo  ✅ ANDROID CONFIGURADO!
echo.
echo  Próximos passos:
echo  1. Abrir no Android Studio:
echo     npx cap open android
echo.
echo  2. Build → Build APK
echo.
echo  Guia completo: /app/CREATE_APK_ANDROID.md
echo ════════════════════════════════════════════════════════
echo.
pause
goto MENU

REM =====================================================
REM OPÇÃO 5: ADICIONAR MOEDA
REM =====================================================
:ADD_COIN
cls
echo ╔════════════════════════════════════════════════════════╗
echo ║     🪙 ADICIONAR NOVA CRIPTOMOEDA                     ║
echo ╚════════════════════════════════════════════════════════╝
echo.

echo Esta funcionalidade requer edição manual dos arquivos:
echo.
echo 1. /app/frontend/src/data/mockData.js
echo    - Adicionar moeda na array cryptocurrencies
echo.
echo 2. /app/backend/server.py
echo    - Adicionar taxa em CRYPTO_RATES
echo    - Adicionar endereço em generate_crypto_address
echo.
echo 3. Reiniciar serviços:
echo    - Frontend: supervisorctl restart frontend
echo    - Backend: supervisorctl restart backend
echo.
echo Guia completo com exemplos:
echo /app/HOW_TO_ADD_COINS.md
echo.
set /p abrir="Deseja abrir o guia? (S/N): "
if /i "%abrir%"=="S" start notepad HOW_TO_ADD_COINS.md
pause
goto MENU

REM =====================================================
REM OPÇÃO 6: INFORMAÇÕES
REM =====================================================
:INFO
cls
echo ╔════════════════════════════════════════════════════════╗
echo ║     ℹ️  INFORMAÇÕES DO PROJETO                        ║
echo ╚════════════════════════════════════════════════════════╝
echo.
echo 🌐 URL Atual:
echo    https://crypto-exchange-255.preview.emergentagent.com
echo.
echo 👤 Acessos:
echo    Admin: admin / 000000
echo    Afiliado: joao@lojatech.com.br / senha123
echo.
echo 🪙 Criptomoedas: 14 disponíveis
echo    BTC, ETH, USDT, USDC, BNB, DREX
echo    SOL, ADA, DOT, LTC, LINK, MATIC, XRP, AVAX
echo.
echo 📚 Documentação Disponível:
echo    - README.md (principal)
echo    - QUICKSTART.md (início rápido)
echo    - DEPLOY_GUIDE.md (guia de deploy)
echo    - DEPLOY_RAILWAY.md (Railway)
echo    - DEPLOY_RENDER.md (Render)
echo    - DEPLOY_VERCEL.md (Vercel)
echo    - CREATE_APK_ANDROID.md (app Android)
echo    - HOW_TO_ADD_COINS.md (adicionar moedas)
echo    - INDEX.md (índice completo)
echo.
echo 🔗 Links Diretos:
echo    /admin - Painel administrativo
echo    /send - Enviar PIX
echo    /buy - Comprar cripto
echo    /sell - Vender cripto
echo    /dashboard - Dashboard afiliado
echo.
echo ════════════════════════════════════════════════════════
pause
goto MENU

REM =====================================================
REM SAIR
REM =====================================================
:EXIT
cls
echo.
echo ════════════════════════════════════════════════════════
echo   Obrigado por usar CryptoPIX Automação!
echo   🚀 Boa sorte com seu projeto!
echo ════════════════════════════════════════════════════════
echo.
timeout /t 2 >nul
exit

endlocal
