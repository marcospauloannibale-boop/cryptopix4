# 📱 GUIA: CRIAR APK ANDROID - CryptoPIX

## 📋 Visão Geral

Este guia ensina a transformar o **CryptoPIX Web** em um **App Android (APK)**.

**3 Opções Disponíveis:**

1. **Capacitor** ⭐ RECOMENDADO - Converte React Web em App nativo
2. **React Native** - Requer reescrever o app
3. **PWA** - Progressive Web App (mais simples, limitado)

---

## 🎯 OPÇÃO 1: CAPACITOR (Recomendado) ⭐

### **Vantagens:**
- ✅ Usa o código React existente
- ✅ Não precisa reescrever nada
- ✅ Acesso a recursos nativos
- ✅ Gera APK real
- ✅ Fácil de configurar

### **Desvantagens:**
- ⚠️ Webview (não é 100% nativo)
- ⚠️ Performance levemente inferior

---

## 📦 PRÉ-REQUISITOS

### **Windows:**
```bash
# Node.js e npm (já instalado)
# JDK 11 ou superior
# Android Studio
```

### **Instalar JDK:**

1. Baixe: https://www.oracle.com/java/technologies/downloads/#java11
2. Instale o JDK 11
3. Configure variável de ambiente:
   - Painel de Controle → Sistema → Variáveis de Ambiente
   - JAVA_HOME = `C:\Program Files\Java\jdk-11`
   - Path += `%JAVA_HOME%\bin`

### **Instalar Android Studio:**

1. Baixe: https://developer.android.com/studio
2. Instale com configuração padrão
3. Abra Android Studio
4. Tools → SDK Manager
5. Instale:
   - Android SDK Platform 33
   - Android SDK Build-Tools 33
   - Android SDK Command-line Tools

6. Configure variável de ambiente:
   - ANDROID_HOME = `C:\Users\SEU_USUARIO\AppData\Local\Android\Sdk`
   - Path += `%ANDROID_HOME%\platform-tools`
   - Path += `%ANDROID_HOME%\tools`

---

## 🔧 PASSO 1: Instalar Capacitor

### 1.1 No Projeto Frontend

```bash
cd /app/frontend

# Instalar Capacitor
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android

# Inicializar Capacitor
npx cap init
```

**Responda as perguntas:**
```
App name: CryptoPIX
App Package ID: com.cryptopix.app
```

### 1.2 Configurar Capacitor

**Editar:** `/app/frontend/capacitor.config.ts`

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cryptopix.app',
  appName: 'CryptoPIX',
  webDir: 'build',
  server: {
    androidScheme: 'https',
    cleartext: true
  },
  android: {
    allowMixedContent: true
  }
};

export default config;
```

---

## 🔧 PASSO 2: Configurar Backend URL

### 2.1 Usar URL de Produção

**Editar:** `/app/frontend/.env.production`

```env
REACT_APP_BACKEND_URL=https://cryptopix-backend.railway.app
```

**OU se ainda não fez deploy:**

```env
REACT_APP_BACKEND_URL=https://crypto-exchange-255.preview.emergentagent.com/api
```

---

## 🔧 PASSO 3: Build e Adicionar Android

### 3.1 Build do React

```bash
cd /app/frontend

# Build de produção
npm run build
# ou
yarn build
```

### 3.2 Adicionar Plataforma Android

```bash
# Adicionar Android
npx cap add android

# Sincronizar arquivos
npx cap sync
```

Isso cria a pasta `/app/frontend/android/`

---

## 🔧 PASSO 4: Abrir no Android Studio

### 4.1 Abrir Projeto

```bash
# Abrir Android Studio com o projeto
npx cap open android
```

**OU manualmente:**
1. Abra Android Studio
2. File → Open
3. Selecione: `/app/frontend/android/`

### 4.2 Aguardar Gradle Sync

- Android Studio vai fazer sync automático
- Aguarde terminar (5-10 minutos na primeira vez)
- Verifique no canto inferior se terminou

---

## 🔧 PASSO 5: Configurar App

### 5.1 Atualizar Ícone

**Preparar ícones:**
1. Crie ícone 1024x1024 px
2. Use gerador: https://icon.kitchen
3. Baixe os ícones Android

**Substituir:**
```
/app/frontend/android/app/src/main/res/
  ├── mipmap-hdpi/ic_launcher.png
  ├── mipmap-mdpi/ic_launcher.png
  ├── mipmap-xhdpi/ic_launcher.png
  ├── mipmap-xxhdpi/ic_launcher.png
  └── mipmap-xxxhdpi/ic_launcher.png
```

### 5.2 Atualizar Nome do App

**Editar:** `/app/frontend/android/app/src/main/res/values/strings.xml`

```xml
<resources>
    <string name="app_name">CryptoPIX</string>
    <string name="title_activity_main">CryptoPIX</string>
    <string name="package_name">com.cryptopix.app</string>
    <string name="custom_url_scheme">com.cryptopix.app</string>
</resources>
```

### 5.3 Configurar Permissões

**Editar:** `/app/frontend/android/app/src/main/AndroidManifest.xml`

Adicione permissões antes de `<application>`:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.CAMERA" />
```

---

## 🔧 PASSO 6: Gerar APK

### 6.1 Via Android Studio (Mais Fácil)

1. No Android Studio
2. **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
3. Aguarde o build
4. Clique em "locate" quando terminar
5. APK estará em: `/app/frontend/android/app/build/outputs/apk/debug/app-debug.apk`

### 6.2 Via Linha de Comando

```bash
cd /app/frontend/android

# Windows
gradlew.bat assembleDebug

# Linux/Mac
./gradlew assembleDebug
```

APK gerado em: `app/build/outputs/apk/debug/app-debug.apk`

---

## 🔧 PASSO 7: Testar APK

### 7.1 Instalar em Celular (USB)

1. **Habilitar Modo Desenvolvedor** no Android:
   - Configurações → Sobre o telefone
   - Toque 7x em "Número da compilação"
   - Volte → Opções do desenvolvedor
   - Ative "Depuração USB"

2. **Conectar celular via USB**

3. **Instalar APK:**

```bash
cd /app/frontend/android

# Via Android Studio
# Run → Run 'app'

# Via linha de comando
adb install app/build/outputs/apk/debug/app-debug.apk
```

### 7.2 Testar no Emulador

**Criar Emulador:**
1. Android Studio → Tools → Device Manager
2. Create Device
3. Escolha: Pixel 5
4. System Image: Android 13 (API 33)
5. Finish

**Rodar:**
```bash
# No Android Studio
Run → Run 'app'
```

---

## 🔧 PASSO 8: Gerar APK de Produção (Release)

### 8.1 Criar Keystore (Chave de Assinatura)

```bash
cd /app/frontend/android/app

# Gerar keystore
keytool -genkey -v -keystore cryptopix-release.keystore -alias cryptopix -keyalg RSA -keysize 2048 -validity 10000

# Responda as perguntas:
# Senha: (crie uma senha forte e SALVE!)
# Nome: Seu Nome
# Organização: CryptoPIX
# Cidade: Sua Cidade
# Estado: Seu Estado
# País: BR
```

### 8.2 Configurar Gradle

**Criar:** `/app/frontend/android/key.properties`

```properties
storePassword=SUA_SENHA_AQUI
keyPassword=SUA_SENHA_AQUI
keyAlias=cryptopix
storeFile=cryptopix-release.keystore
```

**⚠️ Adicionar ao .gitignore:**
```bash
echo "android/app/cryptopix-release.keystore" >> /app/.gitignore
echo "android/key.properties" >> /app/.gitignore
```

### 8.3 Atualizar build.gradle

**Editar:** `/app/frontend/android/app/build.gradle`

Adicione antes de `android {`:

```gradle
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

Dentro de `android {`, adicione antes de `buildTypes`:

```gradle
signingConfigs {
    release {
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
        storePassword keystoreProperties['storePassword']
    }
}
```

Dentro de `buildTypes`, modifique `release`:

```gradle
buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

### 8.4 Gerar APK Release

```bash
cd /app/frontend/android

# Windows
gradlew.bat assembleRelease

# Linux/Mac
./gradlew assembleRelease
```

**APK Assinado:**
```
/app/frontend/android/app/build/outputs/apk/release/app-release.apk
```

---

## 📦 PASSO 9: Publicar na Play Store

### 9.1 Criar Conta de Desenvolvedor

1. Acesse: https://play.google.com/console
2. Crie conta ($25 taxa única)
3. Preencha informações

### 9.2 Criar App

1. Play Console → **"Criar app"**
2. Nome: CryptoPIX
3. Idioma padrão: Português (Brasil)
4. App ou jogo: App
5. Gratuito ou pago: Gratuito
6. Aceite os termos → **"Criar app"**

### 9.3 Preparar Recursos

**Screenshots:**
- Celular: 2-8 imagens (mínimo 320px)
- Tablet 7": 1-8 imagens (opcional)
- Tablet 10": 1-8 imagens (opcional)

**Ícone:**
- 512x512 px PNG
- Fundo transparente

**Gráfico de recursos:**
- 1024x500 px
- Banner principal

### 9.4 Upload do APK

1. **Produção** → **Criar nova versão**
2. Upload: `app-release.apk`
3. Nome da versão: 1.0.0
4. Código da versão: 1
5. **Salvar**

### 9.5 Preencher Informações

**Conteúdo do app:**
1. Classificação etária: +13 (jogos de azar/apostas)
2. Avisos de conteúdo: Nenhum
3. Público-alvo: Maiores de 18 anos

**Ficha da loja:**
1. Título: CryptoPIX - Cripto para PIX
2. Descrição curta: (80 caracteres)
   ```
   Converta criptomoedas para Reais e envie via PIX em segundos!
   ```
3. Descrição completa: (4000 caracteres)
   ```
   CryptoPIX é a solução mais rápida para converter suas criptomoedas
   em Reais e enviar para qualquer chave PIX no Brasil.
   
   🚀 RECURSOS:
   • Suporte a 14 criptomoedas
   • Conversão instantânea
   • Taxa de apenas 1,5%
   • Envio via PIX em menos de 60 segundos
   • Interface simples e intuitiva
   
   💰 CRIPTOMOEDAS SUPORTADAS:
   Bitcoin, Ethereum, USDT, USDC, BNB, DREX, Solana, Cardano,
   Polkadot, Litecoin, Chainlink, Polygon, Ripple, Avalanche
   
   📱 FUNCIONALIDADES:
   • Enviar PIX com cripto
   • Comprar criptomoedas
   • Vender criptomoedas
   • Verificar status de transações
   • Histórico completo
   ```

4. Upload screenshots
5. Upload ícone
6. Upload gráfico

### 9.6 Enviar para Análise

1. Revisar todas as seções
2. **"Enviar para análise"**
3. Aguardar aprovação (1-7 dias)

---

## 🔄 ATUALIZAR APP

### Quando fizer mudanças:

```bash
# 1. Atualizar código React
cd /app/frontend
# Fazer mudanças...

# 2. Build
npm run build

# 3. Sincronizar
npx cap sync

# 4. Aumentar versionCode
# Editar: android/app/build.gradle
# versionCode 2
# versionName "1.0.1"

# 5. Gerar novo APK
cd android
./gradlew assembleRelease

# 6. Upload na Play Store
```

---

## 🎯 OPÇÃO 2: PWA (Progressive Web App)

### **Mais Simples, Sem APK**

**Vantagens:**
- ✅ Instalável pelo navegador
- ✅ Funciona offline (com service worker)
- ✅ Não precisa Play Store
- ✅ Atualizações automáticas

**Desvantagens:**
- ⚠️ Não é app nativo
- ⚠️ Recursos limitados
- ⚠️ Depende do navegador

### **Como Configurar:**

**1. Criar manifest.json:**

**Criar:** `/app/frontend/public/manifest.json`

```json
{
  "short_name": "CryptoPIX",
  "name": "CryptoPIX - Cripto para PIX",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#667eea",
  "background_color": "#ffffff",
  "orientation": "portrait"
}
```

**2. Adicionar no index.html:**

**Editar:** `/app/frontend/public/index.html`

```html
<head>
  <!-- Já existe -->
  <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
  
  <!-- Adicionar -->
  <meta name="theme-color" content="#667eea" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="CryptoPIX" />
</head>
```

**3. Deploy e Use:**

1. Faça deploy (Vercel/Render/Railway)
2. No celular, abra o site no Chrome
3. Menu (⋮) → "Adicionar à tela inicial"
4. Pronto! Agora tem ícone como app

---

## 🐛 SOLUÇÃO DE PROBLEMAS

### **Gradle Build Failed**

**Erro:** `SDK location not found`

**Solução:**
```bash
# Criar local.properties
echo "sdk.dir=C:\\Users\\SEU_USUARIO\\AppData\\Local\\Android\\Sdk" > /app/frontend/android/local.properties
```

### **JDK Not Found**

**Erro:** `JAVA_HOME is not set`

**Solução:**
1. Instalar JDK 11
2. Configurar JAVA_HOME
3. Reiniciar terminal

### **App não conecta ao backend**

**Solução:**
1. Verificar REACT_APP_BACKEND_URL
2. Backend deve estar em HTTPS
3. Adicionar CORS no backend

### **Keystore Permission Denied**

**Windows:**
```bash
# Executar como administrador
```

---

## 📊 TAMANHO DO APK

| Versão | Tamanho Aproximado |
|--------|-------------------|
| Debug | ~50-60 MB |
| Release | ~20-30 MB |
| Release (otimizado) | ~15-20 MB |

---

## 🎨 OTIMIZAÇÕES

### 1. Reduzir Tamanho do APK

**Editar:** `/app/frontend/android/app/build.gradle`

```gradle
android {
    buildTypes {
        release {
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

### 2. Adicionar Ícones Adaptativos

Use: https://icon.kitchen

### 3. Splash Screen

**Instalar plugin:**
```bash
npm install @capacitor/splash-screen
npx cap sync
```

---

## 📝 CHECKLIST

- [ ] JDK 11 instalado
- [ ] Android Studio instalado
- [ ] SDK configurado
- [ ] Capacitor instalado
- [ ] Backend URL configurada
- [ ] Build React feito
- [ ] Android adicionado
- [ ] Ícone personalizado
- [ ] APK debug gerado
- [ ] Testado no celular/emulador
- [ ] Keystore criado
- [ ] APK release gerado
- [ ] Conta Play Store criada
- [ ] App publicado

---

## 🎉 PRONTO!

Seu CryptoPIX agora é um app Android!

```
📱 APK Debug: android/app/build/outputs/apk/debug/app-debug.apk
📦 APK Release: android/app/build/outputs/apk/release/app-release.apk
🏪 Play Store: Em análise
```

---

**Status**: ✅ Guia completo | 📱 APK pronto | 🏪 Publicável na Play Store!
