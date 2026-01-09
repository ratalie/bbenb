# Lovable Deployment Setup

## Configuración de Variables de Entorno

Para que el frontend se conecte al backend de Brother Ben, necesitas configurar la variable de entorno en Lovable.

### Paso 1: Acceder a Lovable Environment Variables

1. Ve a tu proyecto en Lovable: https://lovable.dev
2. Abre tu proyecto `bbenb`
3. Ve a **Settings** → **Environment Variables**

### Paso 2: Agregar la Variable de Entorno

Agrega la siguiente variable:

```
VITE_API_BASE_URL=https://v6nfnsyr8f.execute-api.us-east-1.amazonaws.com/prod
```

**Importante**:
- El nombre debe ser exactamente `VITE_API_BASE_URL`
- Vite requiere que las variables empiecen con `VITE_` para exponerlas al frontend
- No incluyas comillas alrededor del valor

### Paso 3: Redeploy

Después de agregar la variable de entorno:
1. Guarda los cambios
2. Lovable automáticamente redespleará la aplicación
3. O puedes hacer un nuevo commit/push para forzar el redeploy

### Verificar el Deployment

Una vez deployado, visita tu URL de Lovable y:
1. Abre las DevTools del navegador (F12)
2. Ve a la pestaña **Console**
3. Envía un mensaje en Brother Ben
4. Deberías ver el request a `https://v6nfnsyr8f.execute-api.us-east-1.amazonaws.com/prod/chat`
5. Si funciona, verás la respuesta de Brother Ben

### Troubleshooting

**Si ves errores CORS:**
- ✅ Ya están configurados en el backend
- El error debería desaparecer después del nuevo deployment

**Si no se conecta:**
1. Verifica que la variable de entorno esté correctamente configurada
2. Revisa la consola del navegador para ver el error exacto
3. Asegúrate de que Lovable haya redespleado después de agregar la variable

**Si ves respuestas mock en lugar de Brother Ben:**
- El frontend está usando el fallback
- Verifica la variable de entorno `VITE_API_BASE_URL`
- Revisa la consola para ver errores de conexión

## Estado Actual

✅ Backend deployado con CORS abierto
✅ Frontend código pusheado a GitHub
✅ API funcionando correctamente (probado con curl)
⏳ Pendiente: Configurar variable de entorno en Lovable

## Testing Local vs Production

**Local (localhost:8080):**
```bash
# En .env local (ya existe)
VITE_API_BASE_URL=https://v6nfnsyr8f.execute-api.us-east-1.amazonaws.com/prod
```

**Production (Lovable):**
- Configurar la misma variable en Lovable Settings
- La URL de producción será algo como: `https://your-project.lovable.app`

## Arquitectura

```
Frontend (Lovable)
    ↓ fetch POST
API Gateway (AWS)
    ↓ invoke
Lambda: brother-ben-api
    ↓ invoke
Bedrock Agent: Brother Ben
    ↓ query
OpenSearch: Vector Database
```

## URLs Importantes

- **Frontend Repo**: https://github.com/ratalie/bbenb
- **Backend Repo**: https://github.com/ratalie/brotherben
- **API Endpoint**: https://v6nfnsyr8f.execute-api.us-east-1.amazonaws.com/prod/chat
- **Lovable Project**: (agrega tu URL aquí)
