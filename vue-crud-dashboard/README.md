# CRUD_IA

Dashboard CRUD minimalista construido con **Vue 3** (Composition API) + **Vite**.

## 📋 Módulos

### 1. Listado de Registros
- Consume una API mock que devuelve **1,000 registros**
- Tabla con: ID, Nombre, Descripción, Categoría, Estado, Fecha
- **Paginación** configurable (10, 20, 50, 100 por página)
- **Búsqueda** por nombre, descripción o ID (con debounce)
- **Filtro** por categoría
- Loader mientras cargan los datos

### 2. Formularios POST
Tres formularios con validación y feedback visual:
- **Crear Usuario** → `POST /api/users`
- **Crear Producto** → `POST /api/products`
- **Crear Orden** → `POST /api/orders`

## 🚀 Instrucciones para correr el proyecto

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir en el navegador
# http://localhost:5173
```

## 🏗️ Arquitectura del Proyecto

```
src/
├── components/        # Componentes reutilizables
│   └── ToastNotification.vue
├── composables/       # Composables (hooks) de Vue 3
│   └── useToast.js
├── router/            # Configuración de rutas
│   └── index.js
├── services/          # Servicios y llamadas API
│   └── mockData.js
├── views/             # Vistas principales
│   ├── RecordsView.vue
│   └── FormsView.vue
├── App.vue            # Componente raíz
├── main.js            # Punto de entrada
└── style.css          # Estilos globales
```

## 🛠️ Tecnologías

- Vue 3 (Composition API)
- Vue Router 4
- Vite
- CSS puro (diseño minimalista)
- Google Fonts (Inter)

## 👥 Equipo

- Jorge
- Daysi
- Daniel
- Uriel

## 📌 Ramas del Repositorio

| Rama | Descripción |
|------|-------------|
| `main` | Rama principal |
| `Jorge` | Rama de desarrollo de Jorge |
| `Daysi` | Rama de desarrollo de Daysi |
| `Daniel` | Rama de desarrollo de Daniel |
| `Uriel` | Rama de desarrollo de Uriel |
| `Release` | Rama de pre-producción |
| `Delivery` | Rama de entrega final |
