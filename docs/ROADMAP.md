# Portfolio Renovation Roadmap

[Portfolios inspo](https://github.com/emmabostian/developer-portfolios)

**Objetivo:** Convertir el portafolio actual en una herramienta de marketing personal que genere confianza y atracción inmediata en reclutadores, empresas y clientes potenciales.

**Fecha de redacción:** 2026-04-22

---

## Diagnóstico del estado actual

| Aspecto          | Estado actual                                            | Problema                                 |
| ---------------- | -------------------------------------------------------- | ---------------------------------------- |
| Hero section     | Nombre + título + 2 botones                              | No comunica valor ni personalidad        |
| Proyectos        | 5 side projects básicos (calculadora, tic-tac-toe, etc.) | No demuestran capacidad profesional real |
| Experiencia      | 2 jobs con descripción genérica                          | No cuantifica impacto ni logros          |
| About / Bio      | No existe                                                | Falta contexto humano y profesional      |
| Testimonios      | No existen                                               | Sin prueba social                        |
| Blog / contenido | No existe                                                | Sin posicionamiento como experto         |
| SEO              | Mínimo (sin metadata significativa)                      | No indexable por nombre o especialidad   |
| Analytics        | No configurado                                           | Sin datos de visitas ni conversiones     |
| CV descargable   | Existe (botón)                                           | No se sabe qué hay adentro               |
| Idioma           | Inglés                                                   | OK para mercado global                   |

---

## Fase 1 — Contenido: lo que dices (PRIORIDAD ALTA)

Esta es la fase más impactante. El diseño atrae, pero el contenido convence.

### 1.1 Hero section rediseñado

**Objetivo:** En 5 segundos, el visitante debe saber quién eres, qué haces y por qué debería contactarte.

```
Propuesta de copy:

"Hi, I'm Jose — Full Stack Developer
I build fast, accessible web and mobile apps
with React, Next.js and TypeScript.
Currently @ BlueCore, open to new opportunities."

[View my work]  [Download CV]  [Let's talk]
```

- Agregar foto profesional o avatar ilustrado (genera confianza y humaniza)
- Agregar indicador de disponibilidad: `🟢 Open to work` o `🟡 Freelance available`
- Subtítulo con especialización clara: no solo "Full Stack", sino qué tipo de productos construyes

### 1.2 About Me — nueva sección (CRÍTICO, falta hoy)

Los reclutadores quieren saber quién eres antes de ver el código. Una sección breve (150-200 palabras) con:

- De dónde eres y dónde estás ubicado
- Años de experiencia y en qué te especializas
- Qué te motiva o diferencia como developer
- Hobbies breves (humaniza, hace memorable)
- Un dato curioso o logro personal

Ubicación sugerida: entre Home y Experience.

### 1.3 Proyectos — reemplazar o complementar los actuales

Los proyectos actuales (calculadora, tic-tac-toe, Rick & Morty wiki) son ejercicios de aprendizaje, no demuestran capacidad senior. Opciones:

**Opción A — Agregar proyectos profesionales/freelance:**

- Si tienes proyectos de trabajo que puedas mostrar (aunque sea con permiso), inclúyelos
- Capturas de pantalla + descripción del problema que resolviste
- Métricas si las tienes (usuarios, performance, etc.)

**Opción B — Construir 1-2 proyectos showcase:**

- Un proyecto full-stack real: Next.js + API + DB (ej. SaaS mini, dashboard, marketplace)
- Que demuestre tus habilidades actuales (TypeScript, Next.js, Node.js, DB)
- README bien escrito en el repo de GitHub

**Para cada proyecto, agregar:**

- Descripción del problema que resuelve (no solo "qué es")
- Stack usado con justificación breve
- Desafíos técnicos que enfrentaste
- Link al repo + demo en vivo
- Status: `Live`, `WIP`, `Archived`

### 1.4 Experiencia — enriquecer con logros cuantificados

Cambiar el estilo genérico actual por logros con números. Ejemplo:

```
Antes: "I develop and maintain the mobile applications"
Después: "Built and shipped 3 mobile banking apps used by 10k+ users
          in the financial sector using Ionic + Angular"
```

Para cada job agregar:

- Logro principal con métricas (si las tienes)
- Tecnologías específicas usadas (ya existen los chips)
- Por qué fue relevante o difícil ese rol

---

## Fase 2 — Diseño: cómo te ves (PRIORIDAD MEDIA-ALTA)

### 2.1 Renovación visual general

El teal monocromático actual es seguro pero no diferenciador. Opciones:

- **Opción A (conservadora):** Mantener teal pero agregar un color de acento (amber, cyan, violet)
- **Opción B (renovación):** Palette dark & modern — fondo casi negro (#0a0a0a), texto blanco/gris, acento eléctrico (verde neón, azul eléctrico, etc.)
- **Opción C (minimalista):** Fondo blanco/crema para look editorial/clean, muy popular en portafolios 2025

Referencia de palettes populares en portafolios de devs:

- Dark: `#0f172a` (slate-900) + verde lima o cyan
- Light: `#fafaf9` + negro + acento naranja o violeta

### 2.2 Hero section con foto / avatar

- Foto profesional real: aumenta la tasa de respuesta de reclutadores
- Alternativa: avatar ilustrado (contratable en Fiverr o IA generativa)
- Layout sugerido: texto a la izquierda, foto a la derecha (split screen)

### 2.3 Sección "About Me" con timeline visual

- Timeline horizontal o vertical mostrando evolución profesional
- O layout de dos columnas: foto/avatar izq, párrafo der

### 2.4 Cards de proyectos más visuales

Actualmente las project cards probablemente muestran solo imagen + descripción. Mejoras:

- Badge de status (`Live`, `WIP`)
- Tech stack como chips visuales (ya tienes el componente Chip)
- Botones de acción más claros: `View live` + `GitHub`
- Hover effect que muestre más info (preview del proyecto)

### 2.5 Animaciones y microinteracciones

Ya tienes `FadeIn`. Para hacer el sitio más premium:

- Cursor personalizado (opcional, no exagerar)
- Typing animation en el hero para el título/subtítulo
- Parallax sutil en el fondo del hero
- Scroll progress indicator en la navbar

### 2.6 Dark/Light mode toggle

Casi obligatorio hoy en día. El sitio actual es solo dark.

---

## Fase 3 — UX y navegación (PRIORIDAD MEDIA)

### 3.1 Reconsiderar scroll snapping

El snap-y mandatory es llamativo pero puede ser frustrante en mobile. Considerar:

- Mantenerlo solo en desktop
- En mobile: scroll libre normal
- Alternativa: eliminar snap y usar scroll suave con anchors

### 3.2 Tiempo de carga en mobile

- El `background.mp4` puede ser muy pesado en conexiones lentas
- Reemplazar con: imagen estática en mobile + video solo en desktop (media query CSS)
- Agregar `loading="lazy"` en imágenes de proyectos

### 3.3 Navbar mejorada

- Indicador de sección activa (ya tienes el observer, falta reflejarlo en la nav)
- Botón "Hire me" / "Contact" destacado en la navbar con color de acento

### 3.4 Footer con info rápida

Agregar un footer simple (visible en la última sección o global):

- Email directo clickeable
- Links a LinkedIn y GitHub (ya tienes mediaLinks)
- Año + nombre

---

## Fase 4 — SEO y descubribilidad (PRIORIDAD MEDIA)

Hoy el sitio no es encontrable por Google para tu nombre o especialidad.

### 4.1 Metadata básica en layout.tsx

```tsx
export const metadata: Metadata = {
  title: 'Jose Arpaia — Full Stack Developer',
  description:
    'Full Stack Developer specializing in React, Next.js and TypeScript. Based in [ciudad]. Open to remote opportunities.',
  openGraph: {
    title: 'Jose Arpaia — Full Stack Developer',
    description: '...',
    url: 'https://tu-dominio.com',
    images: [{ url: '/og-image.png' }], // imagen 1200x630
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@tuhandle',
  },
};
```

### 4.2 Dominio personalizado

Si actualmente está en Vercel con dominio genérico, registrar `josearpaia.dev` o `josearpaia.com`. Cuesta ~$15/año y aumenta mucho la credibilidad.

### 4.3 robots.txt y sitemap.xml

Next.js App Router los genera automáticamente:

- `src/app/robots.ts`
- `src/app/sitemap.ts`

### 4.4 Google Analytics o Plausible

- Saber cuántas visitas tienes, de dónde vienen, qué secciones leen
- Plausible es más privacy-friendly y más simple de configurar

---

## Fase 5 — Prueba social y credibilidad (PRIORIDAD MEDIA-BAJA)

### 5.1 Sección de testimonios

Pedir 2-3 testimonios cortos a:

- Ex-compañeros de trabajo
- Managers anteriores
- Clientes freelance (si aplica)

Formato simple: avatar + nombre + cargo + empresa + 2-3 frases.

### 5.2 Badges y certificaciones

Si tienes certificaciones (AWS, Google, Coursera, etc.), mostrarlas como badges visuales.

### 5.3 GitHub stats (opcional)

Widget con tu actividad en GitHub. Muestra que estás activo. Librerías como `github-readme-stats` tienen versiones embebibles.

---

## Fase 6 — Funcionalidades extra (PRIORIDAD BAJA / FUTURO)

| Feature             | Descripción                                                         | Esfuerzo |
| ------------------- | ------------------------------------------------------------------- | -------- |
| Blog / artículos    | Escribir sobre temas técnicos. Posicionamiento como experto.        | Alto     |
| Newsletter          | Capturar emails de visitantes interesados                           | Medio    |
| Case studies        | Proyectos en formato long-form: problema → solución → resultado     | Alto     |
| Modo multiidioma    | Inglés + Español para mercado LATAM y España                        | Medio    |
| Chatbot de contacto | Bot que responde preguntas frecuentes antes de llenar el formulario | Medio    |

---

## Orden de implementación sugerido

```
Semana 1-2: Fase 1 — Contenido (impacto máximo, cero código nuevo)
  - Reescribir Hero copy
  - Escribir sección About Me
  - Mejorar descripciones de Experience con logros
  - Definir qué proyectos mostrar (reemplazar o agregar)

Semana 3-4: Fase 2 — Diseño
  - Decidir nueva paleta de colores
  - Implementar About Me como nueva sección
  - Mejorar project cards
  - Agregar foto/avatar al Hero

Semana 5: Fases 3 y 4 — UX + SEO
  - Metadata en layout.tsx
  - Ajustes de scroll en mobile
  - Footer básico
  - Dominio personalizado

Después: Fases 5 y 6 según energía disponible
```

---

## Recursos y referencias

- **Inspiración de portafolios:** [brittanychiang.com](https://brittanychiang.com), [leerob.com](https://leerob.com), [delba.dev](https://delba.dev)
- **Palettes de colores:** [coolors.co](https://coolors.co), [realtime colors](https://www.realtimecolors.com)
- **Fotos profesionales baratas:** Contratar fotógrafo local (~$50-100) vale la pena
- **Avatar ilustrado:** Midjourney, DALL-E, o artistas en Fiverr (~$30-50)
- **Dominio:** Namecheap o Cloudflare Registrar (más baratos que GoDaddy)
- **Analytics:** Plausible.io (privacy-first, $9/mes) o Google Analytics (gratis)
- **CV template:** [rxresume.me](https://rxresume.me) (open source, profesional)

---

## Métricas de éxito

Sabrás que el rediseño funcionó cuando:

- [ ] Reclutadores te contactan sin que hayas aplicado a la vacante
- [ ] El formulario de contacto recibe mensajes espontáneos
- [ ] Tu nombre aparece en Google cuando alguien busca "Jose Arpaia developer"
- [ ] La tasa de rebote baja (gente que lee más de una sección)
- [ ] Colegas te piden el link del portafolio para mostrarlo como referencia
