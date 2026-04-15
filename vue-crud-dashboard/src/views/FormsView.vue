<template>
  <div>
    <!-- Encabezado de la página -->
    <div class="page-header">
      <h2>Formularios</h2>
      <p>Crear nuevos registros usando 3 endpoints POST diferentes</p>
    </div>

    <!-- Tabs de selección del formulario -->
    <div class="tabs">
      <button
        :class="['tab-btn', { active: activeTab === 'user' }]"
        @click="activeTab = 'user'"
      >
        👤 Crear Usuario
      </button>
      <button
        :class="['tab-btn', { active: activeTab === 'product' }]"
        @click="activeTab = 'product'"
      >
        📦 Crear Producto
      </button>
      <button
        :class="['tab-btn', { active: activeTab === 'order' }]"
        @click="activeTab = 'order'"
      >
        🛒 Crear Orden
      </button>
    </div>

    <!-- FORMULARIO: Crear Usuario -->
    <transition name="fade" mode="out-in">
      <div v-if="activeTab === 'user'" key="user" class="card">
        <div class="card-header">
          <span class="card-title">Nuevo Usuario</span>
          <span class="badge badge-info">POST /api/users</span>
        </div>

        <form @submit.prevent="submitUser" novalidate>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Nombre completo *</label>
              <input
                class="form-input"
                type="text"
                placeholder="Ej: Carlos García"
                v-model="userForm.nombre"
                :class="{ 'input-error': userErrors.nombre }"
              />
              <span v-if="userErrors.nombre" class="form-error">{{ userErrors.nombre }}</span>
            </div>

            <div class="form-group">
              <label class="form-label">Correo electrónico *</label>
              <input
                class="form-input"
                type="email"
                placeholder="correo@ejemplo.com"
                v-model="userForm.email"
                :class="{ 'input-error': userErrors.email }"
              />
              <span v-if="userErrors.email" class="form-error">{{ userErrors.email }}</span>
            </div>

            <div class="form-group">
              <label class="form-label">Teléfono</label>
              <input
                class="form-input"
                type="tel"
                placeholder="+52 123 456 7890"
                v-model="userForm.telefono"
              />
            </div>

            <div class="form-group">
              <label class="form-label">Rol</label>
              <select class="form-select" v-model="userForm.rol">
                <option value="">Seleccionar rol</option>
                <option value="admin">Administrador</option>
                <option value="editor">Editor</option>
                <option value="viewer">Visualizador</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Notas</label>
            <textarea
              class="form-textarea"
              placeholder="Notas adicionales sobre el usuario..."
              v-model="userForm.notas"
            ></textarea>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="resetUserForm">
              Limpiar
            </button>
            <button type="submit" class="btn btn-primary" :disabled="submitting">
              <span v-if="submitting" class="spinner-sm"></span>
              {{ submitting ? 'Creando...' : 'Crear Usuario' }}
            </button>
          </div>
        </form>
      </div>

      <!-- FORMULARIO: Crear Producto -->
      <div v-else-if="activeTab === 'product'" key="product" class="card">
        <div class="card-header">
          <span class="card-title">Nuevo Producto</span>
          <span class="badge badge-info">POST /api/products</span>
        </div>

        <form @submit.prevent="submitProduct" novalidate>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Nombre del producto *</label>
              <input
                class="form-input"
                type="text"
                placeholder="Ej: Laptop Pro 15"
                v-model="productForm.nombre"
                :class="{ 'input-error': productErrors.nombre }"
              />
              <span v-if="productErrors.nombre" class="form-error">{{ productErrors.nombre }}</span>
            </div>

            <div class="form-group">
              <label class="form-label">Precio (MXN) *</label>
              <input
                class="form-input"
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                v-model="productForm.precio"
                :class="{ 'input-error': productErrors.precio }"
              />
              <span v-if="productErrors.precio" class="form-error">{{ productErrors.precio }}</span>
            </div>

            <div class="form-group">
              <label class="form-label">Categoría</label>
              <select class="form-select" v-model="productForm.categoria">
                <option value="">Seleccionar categoría</option>
                <option value="electronica">Electrónica</option>
                <option value="ropa">Ropa</option>
                <option value="hogar">Hogar</option>
                <option value="deportes">Deportes</option>
                <option value="alimentos">Alimentos</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Stock inicial</label>
              <input
                class="form-input"
                type="number"
                placeholder="0"
                min="0"
                v-model="productForm.stock"
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Descripción del producto</label>
            <textarea
              class="form-textarea"
              placeholder="Describe las características del producto..."
              v-model="productForm.descripcion"
            ></textarea>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="resetProductForm">
              Limpiar
            </button>
            <button type="submit" class="btn btn-primary" :disabled="submitting">
              <span v-if="submitting" class="spinner-sm"></span>
              {{ submitting ? 'Creando...' : 'Crear Producto' }}
            </button>
          </div>
        </form>
      </div>

      <!-- FORMULARIO: Crear Orden -->
      <div v-else key="order" class="card">
        <div class="card-header">
          <span class="card-title">Nueva Orden</span>
          <span class="badge badge-info">POST /api/orders</span>
        </div>

        <form @submit.prevent="submitOrder" novalidate>
          <div class="form-grid">
            <div class="form-group">
              <label class="form-label">Nombre del cliente *</label>
              <input
                class="form-input"
                type="text"
                placeholder="Ej: María López"
                v-model="orderForm.cliente"
                :class="{ 'input-error': orderErrors.cliente }"
              />
              <span v-if="orderErrors.cliente" class="form-error">{{ orderErrors.cliente }}</span>
            </div>

            <div class="form-group">
              <label class="form-label">Producto *</label>
              <input
                class="form-input"
                type="text"
                placeholder="Ej: Laptop Pro 15"
                v-model="orderForm.producto"
                :class="{ 'input-error': orderErrors.producto }"
              />
              <span v-if="orderErrors.producto" class="form-error">{{ orderErrors.producto }}</span>
            </div>

            <div class="form-group">
              <label class="form-label">Cantidad *</label>
              <input
                class="form-input"
                type="number"
                placeholder="1"
                min="1"
                v-model="orderForm.cantidad"
                :class="{ 'input-error': orderErrors.cantidad }"
              />
              <span v-if="orderErrors.cantidad" class="form-error">{{ orderErrors.cantidad }}</span>
            </div>

            <div class="form-group">
              <label class="form-label">Precio unitario (MXN)</label>
              <input
                class="form-input"
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                v-model="orderForm.precioUnitario"
              />
            </div>

            <div class="form-group">
              <label class="form-label">Método de pago</label>
              <select class="form-select" v-model="orderForm.metodoPago">
                <option value="">Seleccionar método</option>
                <option value="tarjeta">Tarjeta de crédito</option>
                <option value="transferencia">Transferencia bancaria</option>
                <option value="efectivo">Efectivo</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Prioridad</label>
              <select class="form-select" v-model="orderForm.prioridad">
                <option value="normal">Normal</option>
                <option value="urgente">Urgente</option>
                <option value="baja">Baja</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Dirección de envío</label>
            <textarea
              class="form-textarea"
              placeholder="Dirección completa de envío..."
              v-model="orderForm.direccion"
            ></textarea>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="resetOrderForm">
              Limpiar
            </button>
            <button type="submit" class="btn btn-primary" :disabled="submitting">
              <span v-if="submitting" class="spinner-sm"></span>
              {{ submitting ? 'Creando...' : 'Crear Orden' }}
            </button>
          </div>
        </form>
      </div>
    </transition>

    <!-- Sección: Últimas respuestas del servidor -->
    <div v-if="responses.length" class="card mt-3">
      <div class="card-header">
        <span class="card-title">Últimas Respuestas del Servidor</span>
        <button class="btn btn-ghost btn-sm" @click="responses = []">Limpiar</button>
      </div>
      <div class="responses-list">
        <div
          v-for="(res, i) in responses"
          :key="i"
          class="response-item"
        >
          <div class="response-header">
            <span :class="['badge', res.success ? 'badge-success' : 'badge-error']">
              {{ res.success ? '200 OK' : 'Error' }}
            </span>
            <span class="text-sm text-muted">{{ res.endpoint }} — {{ res.time }}</span>
          </div>
          <pre class="response-body">{{ JSON.stringify(res.data, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * Vista de Formularios - Módulo 2
 * Implementa 3 formularios POST: Usuario, Producto, Orden
 * Con validación de campos obligatorios y feedback visual
 */
import { ref, reactive } from 'vue'
import { createUser, createProduct, createOrder } from '../services/mockData'
import { useToast } from '../composables/useToast'

const toast = useToast()

// Tab activo
const activeTab = ref('user')

// Estado de envío
const submitting = ref(false)

// Historial de respuestas del servidor
const responses = ref([])

// ============================================
// FORMULARIO DE USUARIO
// ============================================
const userForm = reactive({
  nombre: '',
  email: '',
  telefono: '',
  rol: '',
  notas: ''
})

const userErrors = reactive({
  nombre: '',
  email: ''
})

function validateUser () {
  let valid = true
  userErrors.nombre = ''
  userErrors.email = ''

  if (!userForm.nombre.trim()) {
    userErrors.nombre = 'El nombre es obligatorio'
    valid = false
  }

  if (!userForm.email.trim()) {
    userErrors.email = 'El email es obligatorio'
    valid = false
  } else if (!userForm.email.includes('@')) {
    userErrors.email = 'Formato de email inválido'
    valid = false
  }

  return valid
}

async function submitUser () {
  if (!validateUser()) return
  submitting.value = true
  try {
    const result = await createUser({ ...userForm })
    toast.success(result.message)
    addResponse('POST /api/users', true, result.data)
    resetUserForm()
  } catch (error) {
    toast.error(error.message)
    addResponse('POST /api/users', false, { error: error.message })
  } finally {
    submitting.value = false
  }
}

function resetUserForm () {
  Object.assign(userForm, { nombre: '', email: '', telefono: '', rol: '', notas: '' })
  userErrors.nombre = ''
  userErrors.email = ''
}

// ============================================
// FORMULARIO DE PRODUCTO
// ============================================
const productForm = reactive({
  nombre: '',
  precio: '',
  categoria: '',
  stock: '',
  descripcion: ''
})

const productErrors = reactive({
  nombre: '',
  precio: ''
})

function validateProduct () {
  let valid = true
  productErrors.nombre = ''
  productErrors.precio = ''

  if (!productForm.nombre.trim()) {
    productErrors.nombre = 'El nombre del producto es obligatorio'
    valid = false
  }

  if (!productForm.precio) {
    productErrors.precio = 'El precio es obligatorio'
    valid = false
  } else if (isNaN(productForm.precio) || Number(productForm.precio) <= 0) {
    productErrors.precio = 'Ingrese un precio válido mayor a 0'
    valid = false
  }

  return valid
}

async function submitProduct () {
  if (!validateProduct()) return
  submitting.value = true
  try {
    const result = await createProduct({ ...productForm })
    toast.success(result.message)
    addResponse('POST /api/products', true, result.data)
    resetProductForm()
  } catch (error) {
    toast.error(error.message)
    addResponse('POST /api/products', false, { error: error.message })
  } finally {
    submitting.value = false
  }
}

function resetProductForm () {
  Object.assign(productForm, { nombre: '', precio: '', categoria: '', stock: '', descripcion: '' })
  productErrors.nombre = ''
  productErrors.precio = ''
}

// ============================================
// FORMULARIO DE ORDEN
// ============================================
const orderForm = reactive({
  cliente: '',
  producto: '',
  cantidad: '',
  precioUnitario: '',
  metodoPago: '',
  prioridad: 'normal',
  direccion: ''
})

const orderErrors = reactive({
  cliente: '',
  producto: '',
  cantidad: ''
})

function validateOrder () {
  let valid = true
  orderErrors.cliente = ''
  orderErrors.producto = ''
  orderErrors.cantidad = ''

  if (!orderForm.cliente.trim()) {
    orderErrors.cliente = 'El nombre del cliente es obligatorio'
    valid = false
  }

  if (!orderForm.producto.trim()) {
    orderErrors.producto = 'El producto es obligatorio'
    valid = false
  }

  if (!orderForm.cantidad) {
    orderErrors.cantidad = 'La cantidad es obligatoria'
    valid = false
  } else if (isNaN(orderForm.cantidad) || Number(orderForm.cantidad) <= 0) {
    orderErrors.cantidad = 'Ingrese una cantidad válida'
    valid = false
  }

  return valid
}

async function submitOrder () {
  if (!validateOrder()) return
  submitting.value = true
  try {
    const result = await createOrder({ ...orderForm })
    toast.success(result.message)
    addResponse('POST /api/orders', true, result.data)
    resetOrderForm()
  } catch (error) {
    toast.error(error.message)
    addResponse('POST /api/orders', false, { error: error.message })
  } finally {
    submitting.value = false
  }
}

function resetOrderForm () {
  Object.assign(orderForm, {
    cliente: '', producto: '', cantidad: '', precioUnitario: '',
    metodoPago: '', prioridad: 'normal', direccion: ''
  })
  orderErrors.cliente = ''
  orderErrors.producto = ''
  orderErrors.cantidad = ''
}

// ============================================
// HISTORIAL DE RESPUESTAS
// ============================================
function addResponse (endpoint, success, data) {
  responses.value.unshift({
    endpoint,
    success,
    data,
    time: new Date().toLocaleTimeString('es-MX')
  })
  // Mantener solo las últimas 5 respuestas
  if (responses.value.length > 5) {
    responses.value.pop()
  }
}
</script>

<style scoped>
/* Grid de formularios: 2 columnas */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 24px;
}

@media (max-width: 640px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

/* Acciones del formulario */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--border-light);
  margin-top: 8px;
}

/* Input con error */
.input-error {
  border-color: var(--error) !important;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.08) !important;
}

/* Spinner pequeño para botones */
.spinner-sm {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  display: inline-block;
}

/* Lista de respuestas del servidor */
.responses-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.response-item {
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  padding: 14px 18px;
  background: var(--bg-tertiary);
}

.response-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.response-body {
  font-family: 'SF Mono', 'Fira Code', monospace;
  font-size: 12px;
  line-height: 1.6;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-sm);
  padding: 12px 16px;
  overflow-x: auto;
  margin: 0;
  white-space: pre-wrap;
}
</style>
