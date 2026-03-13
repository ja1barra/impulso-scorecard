# 🚀 Impulso Emprendedor — Scorecard de Emprendimiento

Webapp interactiva con IA que evalúa emprendimientos en 6 dimensiones y conecta al emprendedor con servicios personalizados de **Impulso Emprendedor**.

![Impulso Emprendedor](https://img.shields.io/badge/Impulso_Emprendedor-Scorecard-FF6B2B?style=for-the-badge)
![License](https://img.shields.io/badge/license-Private-red?style=for-the-badge)

---

## ¿Qué hace?

El Scorecard analiza un emprendimiento a través de un formulario de 4 pasos y genera:

- **Score general (0-100)** con grado (A+ a F)
- **6 categorías evaluadas individualmente:**
  - 🚀 Producto y Propuesta de Valor
  - 📊 Mercado y Oportunidad
  - 🌐 Presencia Digital
  - 📈 Ventas y Demanda
  - 💰 Modelo de Negocio
  - 👥 Equipo y Operaciones
- **3 recomendaciones prioritarias** con service tags
- **Match de servicios** de Impulso Emprendedor

## Motor de Análisis

El sistema tiene un **motor dual**:

1. **IA (Claude Sonnet)** — Envía todos los datos a la API de Anthropic para un análisis contextual profundo
2. **Algoritmo Fallback** — Si la API no está disponible, un scoring determinístico calcula las métricas automáticamente

## Stack Técnico

- **HTML/CSS/JS** — Single-file, zero dependencies (excepto Google Fonts)
- **API de Anthropic** — Claude Sonnet para análisis con IA
- **Zero backend** — Corre 100% en el navegador

## Deployment

### Opción 1: GitHub Pages (Gratis — Recomendado para pruebas)

1. Sube este repo a GitHub
2. Ve a **Settings → Pages**
3. En "Source" selecciona **Deploy from a branch**
4. Selecciona `main` y `/ (root)`
5. Tu app estará en: `https://tu-usuario.github.io/impulso-scorecard/`

### Opción 2: Vercel (Gratis — Recomendado para producción)

1. Conecta tu repo de GitHub en [vercel.com](https://vercel.com)
2. Framework Preset: **Other**
3. Output Directory: `.` (root)
4. Deploy automático con cada push

```bash
# O con CLI:
npm i -g vercel
vercel --prod
```

### Opción 3: Netlify (Gratis)

1. Arrastra la carpeta a [app.netlify.com/drop](https://app.netlify.com/drop)
2. O conecta el repo para CI/CD automático

### Opción 4: Embeber en impulsoemprendedor.com.mx

Agrega un `<iframe>` en tu página:

```html
<iframe 
  src="https://tu-dominio-del-scorecard.vercel.app" 
  width="100%" 
  height="100vh" 
  style="border: none; min-height: 800px;"
  title="Scorecard de Emprendimiento">
</iframe>
```

O si tu sitio es WordPress, usa un bloque HTML personalizado con el mismo iframe.

### Opción 5: Subdominio personalizado

Si usas Vercel o Netlify, puedes configurar un subdominio como:

```
scorecard.impulsoemprendedor.com.mx
```

En tu proveedor DNS agrega un CNAME apuntando al dominio de Vercel/Netlify.

## Configuración de API Key

Para que el análisis con IA funcione en producción, la API key de Anthropic se maneja desde el entorno donde se sirve. En el contexto actual (Claude.ai), la key se inyecta automáticamente.

Para producción standalone, tienes dos opciones:

1. **Proxy backend** (recomendado) — Crea un endpoint serverless (Vercel Function / Netlify Function) que haga la llamada a la API
2. **Rate limiting** — Si es solo para tu comunidad privada, puedes usar la key directamente con restricciones de dominio

## Estructura del Repo

```
impulso-scorecard/
├── index.html          # App completa (single-file)
├── README.md           # Este archivo
├── LICENSE             # Licencia
└── .gitignore          # Git ignore
```

## Roadmap

- [ ] Proxy backend para API key segura
- [ ] Guardar resultados en base de datos
- [ ] Dashboard admin con scorecards de la comunidad
- [ ] Exportar PDF del scorecard
- [ ] Integración con CRM de Impulso Emprendedor
- [ ] Versión en inglés

---

**Impulso Emprendedor** · [impulsoemprendedor.com.mx](https://impulsoemprendedor.com.mx)
