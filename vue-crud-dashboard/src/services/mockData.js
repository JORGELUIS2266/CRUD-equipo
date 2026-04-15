/**
 * Servicio de datos mock - Genera 1000 registros simulados
 * y maneja las operaciones CRUD del dashboard
 */

// Nombres y apellidos para generar datos realistas
const nombres = [
  'Carlos', 'María', 'Juan', 'Ana', 'Pedro', 'Laura', 'Miguel', 'Sofía',
  'Diego', 'Valentina', 'Andrés', 'Camila', 'Ricardo', 'Isabella', 'Fernando',
  'Daniela', 'Roberto', 'Lucía', 'Alejandro', 'Gabriela', 'José', 'Mariana',
  'Luis', 'Paula', 'David', 'Natalia', 'Javier', 'Andrea', 'Francisco', 'Elena'
]

const apellidos = [
  'García', 'Rodríguez', 'Martínez', 'López', 'González', 'Hernández',
  'Pérez', 'Sánchez', 'Ramírez', 'Torres', 'Flores', 'Rivera', 'Gómez',
  'Díaz', 'Cruz', 'Morales', 'Reyes', 'Gutiérrez', 'Ortiz', 'Ramos'
]

const descripciones = [
  'Registro de actividad principal del sistema',
  'Operación de mantenimiento programada',
  'Actualización de datos del módulo',
  'Revisión de seguridad completada',
  'Backup automático del servidor',
  'Sincronización de base de datos',
  'Auditoría de acceso realizada',
  'Configuración de parámetros actualizada',
  'Reporte generado exitosamente',
  'Proceso de validación finalizado',
  'Migración de datos completada',
  'Optimización de rendimiento aplicada',
  'Registro de monitoreo del servicio',
  'Verificación de integridad de datos',
  'Notificación del sistema procesada',
  'Tarea de limpieza ejecutada',
  'Evento de seguridad registrado',
  'Análisis de métricas completado',
  'Proceso de integración finalizado',
  'Checkpoint del sistema creado'
]

const categorias = ['Sistema', 'Usuario', 'Seguridad', 'Datos', 'Red', 'Aplicación']
const estados = ['Activo', 'Inactivo', 'Pendiente', 'Completado']

/**
 * Genera una fecha aleatoria dentro del último año
 */
function randomDate () {
  const end = new Date()
  const start = new Date()
  start.setFullYear(start.getFullYear() - 1)
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return date.toISOString().split('T')[0]
}

/**
 * Genera un nombre completo aleatorio
 */
function randomName () {
  const nombre = nombres[Math.floor(Math.random() * nombres.length)]
  const apellido = apellidos[Math.floor(Math.random() * apellidos.length)]
  return `${nombre} ${apellido}`
}

/**
 * Genera los 1000 registros mock
 */
function generateRecords () {
  const records = []
  for (let i = 1; i <= 1000; i++) {
    records.push({
      id: i,
      nombre: randomName(),
      descripcion: descripciones[Math.floor(Math.random() * descripciones.length)],
      fecha: randomDate(),
      categoria: categorias[Math.floor(Math.random() * categorias.length)],
      estado: estados[Math.floor(Math.random() * estados.length)]
    })
  }
  return records
}

// Cache de registros para mantener consistencia
let cachedRecords = null

/**
 * Simula delay de red
 */
function delay (ms = 600) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ============================================
// API MOCK - Endpoints simulados
// ============================================

/**
 * GET /api/records - Obtiene los 1000 registros
 * Soporta paginación y búsqueda
 */
export async function fetchRecords ({ page = 1, perPage = 20, search = '', categoria = '' } = {}) {
  await delay(Math.random() * 400 + 300)

  if (!cachedRecords) {
    cachedRecords = generateRecords()
  }

  let filtered = [...cachedRecords]

  // Filtro de búsqueda
  if (search) {
    const term = search.toLowerCase()
    filtered = filtered.filter(
      r =>
        r.nombre.toLowerCase().includes(term) ||
        r.descripcion.toLowerCase().includes(term) ||
        r.id.toString().includes(term)
    )
  }

  // Filtro de categoría
  if (categoria) {
    filtered = filtered.filter(r => r.categoria === categoria)
  }

  const total = filtered.length
  const totalPages = Math.ceil(total / perPage)
  const start = (page - 1) * perPage
  const data = filtered.slice(start, start + perPage)

  return {
    data,
    meta: {
      page,
      perPage,
      total,
      totalPages
    }
  }
}

/**
 * POST /api/users - Crear usuario
 */
export async function createUser (userData) {
  await delay(Math.random() * 300 + 400)

  // Validación simulada
  if (!userData.nombre || !userData.email) {
    throw new Error('Nombre y email son obligatorios')
  }

  if (userData.email && !userData.email.includes('@')) {
    throw new Error('El formato del email no es válido')
  }

  return {
    success: true,
    message: 'Usuario creado exitosamente',
    data: {
      id: Math.floor(Math.random() * 10000) + 1000,
      ...userData,
      createdAt: new Date().toISOString()
    }
  }
}

/**
 * POST /api/products - Crear producto
 */
export async function createProduct (productData) {
  await delay(Math.random() * 300 + 400)

  if (!productData.nombre || !productData.precio) {
    throw new Error('Nombre y precio son obligatorios')
  }

  if (isNaN(productData.precio) || Number(productData.precio) <= 0) {
    throw new Error('El precio debe ser un número positivo')
  }

  return {
    success: true,
    message: 'Producto creado exitosamente',
    data: {
      id: Math.floor(Math.random() * 10000) + 1000,
      ...productData,
      precio: Number(productData.precio),
      createdAt: new Date().toISOString()
    }
  }
}

/**
 * POST /api/orders - Crear orden
 */
export async function createOrder (orderData) {
  await delay(Math.random() * 300 + 400)

  if (!orderData.cliente || !orderData.producto || !orderData.cantidad) {
    throw new Error('Cliente, producto y cantidad son obligatorios')
  }

  if (isNaN(orderData.cantidad) || Number(orderData.cantidad) <= 0) {
    throw new Error('La cantidad debe ser un número positivo')
  }

  return {
    success: true,
    message: 'Orden creada exitosamente',
    data: {
      id: `ORD-${Math.floor(Math.random() * 100000)}`,
      ...orderData,
      cantidad: Number(orderData.cantidad),
      total: Number(orderData.cantidad) * (Number(orderData.precioUnitario) || 0),
      estado: 'Pendiente',
      createdAt: new Date().toISOString()
    }
  }
}

export { categorias, estados }
