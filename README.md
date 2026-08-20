# 🎀 Plataforma de Invitaciones Web Interactivas para 15 Años

Plataforma moderna, elegante y escalable desarrollada con **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion** y **Canvas Confetti** para crear invitaciones digitales de alta gama con control de asistencia en tiempo real.

---

## 🌟 Características Principales

1. **Experiencia Multimedia Inmersiva**:
   - 🎵 **Música de fondo**: Reproductor flotante con control play/pause y animación de ecualizador.
   - ⏱️ **Cuenta regresiva**: Reloj en tiempo real hacia el día del evento.
   - 📸 **Galería de fotos de la sesión pre-15**: Grid interactivo con visor *Lightbox* a pantalla completa.
   - 🗺️ **Ubicaciones GPS**: Botones directos con navegación a **Google Maps** y **Waze**.
   - 📅 **Itinerario de la noche**: Línea de tiempo visual con íconos para cada etapa de la celebración.
   - 👗 **Código de vestimenta**: Indicaciones de estilo, colores sugeridos y paleta reservada.
   - 🎁 **Mesa de regalos / Lluvia de sobres**: Cuentas bancarias con botón de un clic para copiar al portapapeles.
   - 💌 **Confirmación de asistencia (RSVP)**: Formulario interactivo con confeti animado, registro de acompañantes, teléfono y mensajes para la quinceañera.

2. **Panel de Control para los Padres (`/[slug]/admin`)**:
   - 🔒 **Protegido por PIN** (por ejemplo `1515`).
   - 📊 **Métricas en tiempo real**: Total de confirmados (Sí), cancelaciones (No), y suma total de pases para el salón de fiestas.
   - 🔍 **Buscador y filtros** por nombre, notas y dedicatorias.
   - 📥 **Exportar a Excel (CSV)**: Descarga directa con formato UTF-8 listo para el catering o la recepcionista.
   - 📲 **Compartir por WhatsApp**: Botón para copiar el enlace de la invitación en un toque.

3. **Arquitectura Multi-Cliente**:
   - Cada cliente cuenta con su propia ruta personalizada:
     - Demo Completa: `http://localhost:3000/valeria-15` (Panel: `/valeria-15/admin`, PIN: `1515`)
     - Plantilla en Blanco: `http://localhost:3000/plantilla-en-blanco` (Panel: `/plantilla-en-blanco/admin`, PIN: `1234`)

---

## 🚀 Cómo Ejecutar en Local

1. Instalar dependencias (si no lo has hecho):
   ```bash
   npm install
   ```

2. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Abrir en el navegador:
   - Catálogo / Inicio: [http://localhost:3000](http://localhost:3000)
   - Invitación de Valeria: [http://localhost:3000/valeria-15](http://localhost:3000/valeria-15)
   - Panel de Valeria: [http://localhost:3000/valeria-15/admin](http://localhost:3000/valeria-15/admin) (PIN: `1515`)
   - Plantilla en blanco: [http://localhost:3000/plantilla-en-blanco](http://localhost:3000/plantilla-en-blanco)

---

## ☁️ Cómo Desplegar en GitHub y Vercel

1. **Inicializar y Subir a GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: plataforma de invitaciones de 15 años interactivas"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/invitaciones-15-anos.git
   git push -u origin main
   ```

2. **Desplegar en Vercel**:
   - Ve a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
   - Haz clic en **Add New... -> Project**.
   - Selecciona el repositorio `invitaciones-15-anos` y presiona **Deploy**.
   - ¡Listo! En menos de 1 minuto tendrás tu enlace activo con certificado SSL (HTTPS) gratuito.

---

## ➕ Cómo Agregar una Nueva Quinceañera (Nuevo Cliente)

Solo abre el archivo `data/events.ts` y añade una nueva entrada con el identificador del nuevo cliente:

```typescript
'camila-15': {
  id: 'evt-003',
  slug: 'camila-15',
  name: 'Camila Andrea',
  age: 15,
  subtitle: 'Mis Quince Años',
  date: '2026-12-15T19:00:00',
  heroImage: 'https://...',
  musicUrl: 'https://...',
  musicTitle: 'Canción Elegida',
  phrase: 'Frase emotiva...',
  phraseAuthor: 'Camila',
  parents: {
    mother: 'Nombre Mamá',
    father: 'Nombre Papá',
  },
  ceremony: { ... },
  party: { ... },
  gallery: [ ... ],
  itinerary: [ ... ],
  dressCode: { ... },
  giftRegistry: { ... },
  rsvpDeadline: '1 de Diciembre de 2026',
  adminPin: '4321', // PIN privado para la mamá de Camila
  theme: {
    palette: 'rose-gold',
  },
},
```

Automáticamente se habilitarán:
- La invitación en `tudominio.com/camila-15`
- Su panel privado de asistencia en `tudominio.com/camila-15/admin` con su PIN `4321`.
