@echo off
chcp 65001 >nul
cls

echo ========================================
echo   🚀 CORREÇÃO AUTOMÁTICA - RAILWAY
echo   CryptoPIX Deploy Fix
echo ========================================
echo.

REM Verificar se está na pasta correta
if not exist "frontend" (
    echo ❌ ERRO: Pasta 'frontend' não encontrada!
    echo.
    echo Por favor, execute este script na pasta /app do projeto.
    echo Exemplo: C:\projeto\cryptopix\app
    pause
    exit /b 1
)

if not exist "backend" (
    echo ❌ ERRO: Pasta 'backend' não encontrada!
    echo.
    echo Por favor, execute este script na pasta /app do projeto.
    pause
    exit /b 1
)

echo ✅ Pasta do projeto encontrada
echo.

REM ==================================================
REM CRIAR .node-version
REM ==================================================
echo [1/6] Criando arquivo .node-version...
echo 20> .node-version
if exist ".node-version" (
    echo ✅ .node-version criado com sucesso
) else (
    echo ❌ Erro ao criar .node-version
    pause
    exit /b 1
)
echo.

REM ==================================================
REM CRIAR railway.toml
REM ==================================================
echo [2/6] Criando arquivo railway.toml...
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

if exist "railway.toml" (
    echo ✅ railway.toml criado com sucesso
) else (
    echo ❌ Erro ao criar railway.toml
    pause
    exit /b 1
)
echo.

REM ==================================================
REM CRIAR nixpacks.toml
REM ==================================================
echo [3/6] Criando arquivo nixpacks.toml...
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

if exist "nixpacks.toml" (
    echo ✅ nixpacks.toml criado com sucesso
) else (
    echo ❌ Erro ao criar nixpacks.toml
    pause
    exit /b 1
)
echo.

REM ==================================================
REM VERIFICAR GIT
REM ==================================================
echo [4/6] Verificando Git...
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git não encontrado!
    echo.
    echo Por favor, instale o Git:
    echo https://git-scm.com/download/win
    pause
    exit /b 1
)
echo ✅ Git encontrado
echo.

REM ==================================================
REM GIT ADD
REM ==================================================
echo [5/6] Adicionando arquivos ao Git...
git add .node-version railway.toml nixpacks.toml
if errorlevel 1 (
    echo ⚠️ Aviso: Erro ao adicionar arquivos ao Git
    echo Continuando mesmo assim...
) else (
    echo ✅ Arquivos adicionados ao Git
)
echo.

REM ==================================================
REM GIT COMMIT
REM ==================================================
echo [6/6] Fazendo commit...
git commit -m "Fix: Força Node 20 para compatibilidade com react-router-dom v7"
if errorlevel 1 (
    echo ⚠️ Aviso: Nada para commitar ou erro no commit
    echo.
    echo Possíveis motivos:
    echo - Arquivos já foram commitados antes
    echo - Não há mudanças para commitar
    echo.
) else (
    echo ✅ Commit realizado com sucesso
    echo.
)

REM ==================================================
REM GIT PUSH
REM ==================================================
echo.
echo ========================================
echo   📤 ENVIANDO PARA O GITHUB
echo ========================================
echo.
echo Fazendo push para o repositório remoto...
echo.

git push origin main
if errorlevel 1 (
    echo.
    echo ⚠️ Erro ao fazer push!
    echo.
    echo Possíveis soluções:
    echo 1. Verifique sua conexão com a internet
    echo 2. Verifique se você tem permissão no repositório
    echo 3. Faça login no Git se necessário:
    echo    git config --global user.name "Seu Nome"
    echo    git config --global user.email "seu@email.com"
    echo.
    echo Tente fazer o push manualmente:
    echo    git push origin main
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   ✅ CORREÇÃO APLICADA COM SUCESSO!
echo ========================================
echo.
echo Os seguintes arquivos foram criados:
echo   ✅ .node-version (Node.js 20)
echo   ✅ railway.toml (Configuração Railway)
echo   ✅ nixpacks.toml (Configuração Nixpacks)
echo.
echo O push foi enviado para o GitHub!
echo.
echo ⏳ O Railway detectará as mudanças e fará
echo    um novo deploy automaticamente.
echo.
echo 📊 Acompanhe o deploy em:
echo    https://railway.app/dashboard
echo.
echo ⌛ Aguarde 5-10 minutos para o build completar.
echo.
echo ========================================
echo.

pause
