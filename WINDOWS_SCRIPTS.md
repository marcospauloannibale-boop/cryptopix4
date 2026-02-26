# 🖥️ GUIA: Scripts de Automação Windows (.bat)

## 📋 Scripts Disponíveis

Criamos **2 scripts .bat** para automatizar tarefas no Windows:

---

## 🔧 SCRIPT 1: fix-railway.bat

### **O que faz:**
Corrige o erro de Node.js no deploy do Railway (react-router-dom v7 requer Node 20+)

### **Como usar:**

1. **Baixe ou copie o arquivo** para a pasta `/app` do projeto

2. **Clique duas vezes** em `fix-railway.bat`

3. **Aguarde o script:**
   - Criar .node-version
   - Criar railway.toml  
   - Criar nixpacks.toml
   - Fazer commit
   - Fazer push para GitHub

4. **Pronto!** Railway fará redeploy automático

### **Localização:**
```
/app/fix-railway.bat
```

### **Quando usar:**
- Quando ver erro: "node" is incompatible with this module
- Quando deploy do Railway falhar por versão do Node
- Para forçar Node 20 no Railway

---

## 🚀 SCRIPT 2: cryptopix-automacao.bat (COMPLETO)

### **O que faz:**
Menu interativo com 6 opções de automação:

1. **Corrigir Erro Railway** (mesmo que script 1)
2. **Preparar Deploy Completo Railway** 
3. **Preparar Deploy Render**
4. **Configurar App Android**
5. **Adicionar Nova Moeda**
6. **Ver Informações do Projeto**

### **Como usar:**

1. **Clique duas vezes** em `cryptopix-automacao.bat`

2. **Veja o menu:**
```
╔════════════════════════════════════════════════════════╗
║         🚀 CRYPTOPIX - AUTOMAÇÃO COMPLETA             ║
║              Deploy e Configuração                     ║
╚════════════════════════════════════════════════════════╝

  [1] 🔧 Corrigir Erro de Deploy Railway (Node 20)
  [2] 📦 Preparar Deploy Completo (Railway)
  [3] 🌐 Preparar Deploy Render
  [4] 📱 Preparar App Android (Capacitor)
  [5] 🪙 Adicionar Nova Criptomoeda
  [6] ℹ️  Informações do Projeto
  [0] ❌ Sair
```

3. **Digite o número** da opção desejada

4. **Siga as instruções** na tela

### **Localização:**
```
/app/cryptopix-automacao.bat
```

---

## 📖 DETALHES DE CADA OPÇÃO

### **Opção 1: Corrigir Erro Railway**
- Cria arquivos de configuração
- Força Node.js 20
- Faz commit e push automático
- ✅ Corrige erro de deploy

### **Opção 2: Deploy Completo Railway**
- Cria .gitignore
- Cria arquivos de configuração
- Inicializa Git (se necessário)
- Faz commit de tudo
- Prepara para deploy
- ✅ Projeto pronto para Railway

### **Opção 3: Deploy Render**
- Abre o guia DEPLOY_RENDER.md
- Instruções completas
- ℹ️ Apenas informativo

### **Opção 4: App Android**
- Instala Capacitor
- Inicializa projeto Android
- Faz build do React
- Adiciona plataforma Android
- ✅ Pronto para gerar APK

### **Opção 5: Adicionar Moeda**
- Abre guia HOW_TO_ADD_COINS.md
- Instruções de como adicionar
- ℹ️ Apenas informativo

### **Opção 6: Informações**
- Mostra URLs do projeto
- Mostra acessos (admin, afiliado)
- Lista documentação disponível
- ℹ️ Referência rápida

---

## 🎯 CASOS DE USO

### **Caso 1: Deploy Falhou no Railway**
```
1. Execute: cryptopix-automacao.bat
2. Escolha: [1] Corrigir Erro Railway
3. Aguarde conclusão
4. Verifique Railway Dashboard
```

### **Caso 2: Primeiro Deploy no Railway**
```
1. Execute: cryptopix-automacao.bat
2. Escolha: [2] Deploy Completo Railway
3. Siga instruções finais
4. Vá para Railway e conecte GitHub
```

### **Caso 3: Criar App Android**
```
1. Instale pré-requisitos (JDK, Android Studio)
2. Execute: cryptopix-automacao.bat
3. Escolha: [4] App Android
4. Aguarde instalação
5. Abra Android Studio
```

---

## 📝 PRÉ-REQUISITOS

### **Para usar os scripts:**

**Obrigatórios:**
- ✅ Windows 7 ou superior
- ✅ Git instalado
- ✅ Estar na pasta `/app` do projeto

**Para Opção 4 (Android):**
- ✅ Node.js instalado
- ✅ JDK 11+ instalado
- ✅ Android Studio instalado

---

## 🔄 COMO BAIXAR OS SCRIPTS

### **Se estiver no ambiente Emergent:**

Os arquivos já estão em:
```
/app/fix-railway.bat
/app/cryptopix-automacao.bat
```

### **Se estiver em outro lugar:**

1. Copie o conteúdo dos arquivos
2. Crie arquivos .bat no Windows
3. Cole o conteúdo
4. Salve na pasta do projeto

---

## 🐛 SOLUÇÃO DE PROBLEMAS

### **"Git não encontrado"**
**Causa:** Git não instalado ou não está no PATH

**Solução:**
1. Baixe: https://git-scm.com/download/win
2. Instale com opção "Git from command line"
3. Reinicie o terminal

### **"Pasta não encontrada"**
**Causa:** Script executado no local errado

**Solução:**
1. Navegue até a pasta `/app`
2. Execute o script de dentro da pasta
3. Deve ter pastas `frontend` e `backend`

### **"Erro ao fazer push"**
**Causa:** Repositório remoto não configurado ou sem permissão

**Solução:**
```bash
# Configurar Git
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

# Adicionar repositório remoto
git remote add origin https://github.com/SEU_USUARIO/cryptopix.git

# Fazer push
git push -u origin main
```

### **"Node.js não encontrado" (Opção 4)**
**Causa:** Node.js não instalado

**Solução:**
1. Baixe: https://nodejs.org
2. Instale versão LTS
3. Reinicie o terminal

---

## 💡 DICAS

### **Executar como Administrador:**
- Clique direito no .bat
- "Executar como administrador"
- Útil se tiver problemas de permissão

### **Ver o que o script faz:**
- Clique direito no .bat
- "Editar"
- Abre no Notepad

### **Fazer backup antes:**
```bash
# Fazer backup da pasta
xcopy /E /I /Y app app_backup
```

### **Testar antes de usar:**
- Use em um repositório de teste primeiro
- Depois use no projeto real

---

## 📊 COMPARAÇÃO DOS SCRIPTS

| Feature | fix-railway.bat | cryptopix-automacao.bat |
|---------|----------------|-------------------------|
| **Corrigir Railway** | ✅ Sim | ✅ Sim |
| **Deploy Completo** | ❌ Não | ✅ Sim |
| **Menu Interativo** | ❌ Não | ✅ Sim |
| **Setup Android** | ❌ Não | ✅ Sim |
| **Informações** | ❌ Não | ✅ Sim |
| **Uso** | 1 clique | Múltiplas opções |

**Recomendação:**
- Use `fix-railway.bat` para correção rápida
- Use `cryptopix-automacao.bat` para tudo

---

## 🎬 EXEMPLOS DE USO

### **Exemplo 1: Corrigir Deploy**
```
1. Abrir pasta: C:\projetos\cryptopix\app
2. Duplo clique: fix-railway.bat
3. Aguardar: "Push realizado com sucesso!"
4. Verificar: Railway Dashboard
```

### **Exemplo 2: Configurar Android**
```
1. Abrir: cryptopix-automacao.bat
2. Digitar: 4
3. Responder: S (pré-requisitos instalados)
4. Aguardar: Instalação do Capacitor
5. Abrir: npx cap open android
```

### **Exemplo 3: Ver Informações**
```
1. Abrir: cryptopix-automacao.bat
2. Digitar: 6
3. Ver: URLs, acessos, documentação
4. Digitar: 0 (sair)
```

---

## ✅ CHECKLIST

Antes de usar os scripts:

- [ ] Windows instalado
- [ ] Git instalado
- [ ] Estar na pasta `/app`
- [ ] Pastas `frontend` e `backend` existem
- [ ] Git configurado (user.name e user.email)
- [ ] Repositório remoto adicionado (se for fazer push)

Para Android (Opção 4):
- [ ] Node.js instalado
- [ ] JDK 11+ instalado
- [ ] Android Studio instalado
- [ ] Variáveis de ambiente configuradas

---

## 📞 SUPORTE

### **Script não funciona?**

1. **Verifique pré-requisitos**
2. **Leia mensagens de erro**
3. **Consulte solução de problemas**
4. **Execute comandos manualmente se necessário**

### **Comandos manuais (se script falhar):**

```bash
# Corrigir Railway manualmente
echo 20 > .node-version
# Criar railway.toml e nixpacks.toml
git add .node-version railway.toml nixpacks.toml
git commit -m "Fix: Node 20"
git push origin main
```

---

## 🎉 PRONTO!

Agora você tem automação completa no Windows!

**Scripts disponíveis:**
- ✅ `/app/fix-railway.bat` - Correção rápida
- ✅ `/app/cryptopix-automacao.bat` - Menu completo

**Use e simplifique seu workflow!** 🚀

---

**Status**: ✅ 2 Scripts criados | 🖥️ Pronto para Windows | ⚡ Automação completa!
