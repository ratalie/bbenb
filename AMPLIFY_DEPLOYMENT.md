# AWS Amplify Deployment Guide

## Opción 1: Deployment Manual via Amplify Console (Recomendado)

### Paso 1: Acceder a AWS Amplify Console

1. Ve a AWS Console: https://console.aws.amazon.com/amplify/home
2. Asegúrate de estar en **us-east-1** (N. Virginia)
3. Asegúrate de estar en la cuenta **124355682808** (gpbible)

### Paso 2: Crear Nueva App

1. Click en **"New app"** → **"Host web app"**
2. Selecciona **"GitHub"** como proveedor
3. Autoriza AWS Amplify a acceder a tu cuenta de GitHub
4. Selecciona el repositorio: **ratalie/bbenb**
5. Selecciona la rama: **main**

### Paso 3: Configurar Build Settings

El archivo `amplify.yml` ya está en el repo, así que Amplify lo detectará automáticamente.

Si necesitas editarlo, aquí está la configuración:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### Paso 4: Variables de Entorno

**MUY IMPORTANTE**: Antes de deployar, agrega esta variable de entorno:

1. En la configuración de Amplify, ve a **"Environment variables"**
2. Agrega:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://v6nfnsyr8f.execute-api.us-east-1.amazonaws.com/prod`

### Paso 5: Deploy

1. Click en **"Save and deploy"**
2. Amplify empezará a:
   - Provisionar recursos
   - Clonar el repo
   - Instalar dependencias (`npm ci`)
   - Build (`npm run build`)
   - Deploy a CloudFront
3. El proceso toma ~3-5 minutos

### Paso 6: Obtener URL

Una vez completado, Amplify te dará una URL como:
```
https://main.d1234567890abc.amplifyapp.com
```

---

## Opción 2: Deployment via CLI (Manual Setup Required)

Si prefieres usar CLI, necesitarás crear un Personal Access Token en GitHub primero.

### Crear GitHub Token

1. Ve a GitHub: https://github.com/settings/tokens
2. Click en **"Generate new token (classic)"**
3. Selecciona estos permisos:
   - `repo` (todos los sub-permisos)
   - `admin:repo_hook` (todos los sub-permisos)
4. Copia el token

### Deploy con CLI

```bash
export GITHUB_TOKEN="tu_token_aqui"

aws amplify create-app \
  --name brother-ben-frontend \
  --repository https://github.com/ratalie/bbenb \
  --access-token $GITHUB_TOKEN \
  --platform WEB \
  --region us-east-1 \
  --profile gpbible

# Obtén el appId del output anterior
export APP_ID="d1234567890abc"

# Crear branch
aws amplify create-branch \
  --app-id $APP_ID \
  --branch-name main \
  --profile gpbible \
  --region us-east-1

# Agregar variable de entorno
aws amplify update-app \
  --app-id $APP_ID \
  --environment-variables VITE_API_BASE_URL=https://v6nfnsyr8f.execute-api.us-east-1.amazonaws.com/prod \
  --profile gpbible \
  --region us-east-1

# Start deployment
aws amplify start-job \
  --app-id $APP_ID \
  --branch-name main \
  --job-type RELEASE \
  --profile gpbible \
  --region us-east-1
```

---

## Configuración Post-Deployment

### Custom Domain (Opcional)

Si tienes un dominio, puedes agregarlo en:
1. Amplify Console → Tu app → **"Domain management"**
2. Click **"Add domain"**
3. Sigue el wizard para configurar DNS

### HTTPS

Amplify automáticamente provisiona certificados SSL gratuitos via AWS Certificate Manager.

### Continuous Deployment

Una vez configurado, cada push a `main` en GitHub disparará un nuevo deployment automáticamente.

### Monitoreo

- **Logs**: Amplify Console → Build logs
- **Metrics**: CloudWatch automático
- **Errors**: Integrado con CloudWatch Logs

---

## Arquitectura del Deployment

```
GitHub (ratalie/bbenb)
    ↓ webhook
AWS Amplify
    ↓ build
    - npm ci
    - npm run build
    - deploy to S3
    ↓ serve
CloudFront CDN
    ↓ user requests
Browser (HTTPS)
    ↓ API calls
API Gateway → Lambda → Bedrock Agent
```

---

## Troubleshooting

### Build falla

1. Revisa los logs en Amplify Console
2. Verifica que `package.json` tenga todos los scripts necesarios
3. Asegúrate de que la variable de entorno esté configurada

### CORS errors

Ya están configurados correctamente en el backend. Si ves errores:
1. Verifica que la URL de API sea correcta
2. Revisa los headers en Network tab del navegador

### App no se conecta al backend

1. Verifica variable de entorno `VITE_API_BASE_URL`
2. Haz un nuevo deployment después de agregar la variable
3. Revisa la consola del navegador para errores específicos

---

## Estado Actual

✅ Código frontend pusheado a GitHub
✅ `amplify.yml` configurado
✅ Backend con CORS deployado y funcionando
⏳ **Siguiente paso**: Crear app en Amplify Console

---

## URLs de Referencia

- **GitHub Repo**: https://github.com/ratalie/bbenb
- **Backend API**: https://v6nfnsyr8f.execute-api.us-east-1.amazonaws.com/prod
- **Amplify Console**: https://console.aws.amazon.com/amplify/home?region=us-east-1
- **Account**: 124355682808 (gpbible profile)
