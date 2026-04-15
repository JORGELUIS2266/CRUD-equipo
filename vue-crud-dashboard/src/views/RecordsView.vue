<template>
  <div>
    <!-- Encabezado de la página -->
    <div class="page-header">
      <h2>Registros</h2>
      <p>Listado completo de 1,000 registros con paginación y búsqueda</p>
    </div>

    <!-- Tarjetas de estadísticas -->
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-label">Total Registros</div>
        <div class="stat-value">{{ meta.total }}</div>
        <div class="stat-detail">En la base de datos</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Página Actual</div>
        <div class="stat-value">{{ meta.page }}</div>
        <div class="stat-detail">de {{ meta.totalPages }} páginas</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Mostrando</div>
        <div class="stat-value">{{ records.length }}</div>
        <div class="stat-detail">registros por página</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Filtrados</div>
        <div class="stat-value">{{ meta.total }}</div>
        <div class="stat-detail">{{ searchQuery ? 'coincidencias' : 'sin filtro' }}</div>
      </div>
    </div>

    <!-- Barra de controles: búsqueda + filtros -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">Explorar Registros</div>
        <div class="flex items-center gap-2">
          <select
            class="form-select"
            style="width: auto; min-width: 160px"
            v-model="selectedCategoria"
            @change="onFilterChange"
          >
            <option value="">Todas las categorías</option>
            <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
          </select>
          <select
            class="form-select"
            style="width: auto; min-width: 120px"
            v-model="perPage"
            @change="onFilterChange"
          >
            <option :value="10">10 / pág</option>
            <option :value="20">20 / pág</option>
            <option :value="50">50 / pág</option>
            <option :value="100">100 / pág</option>
          </select>
        </div>
      </div>

      <!-- Barra de búsqueda -->
      <div class="search-bar mb-3">
        <span class="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Buscar por nombre, descripción o ID..."
          v-model="searchQuery"
          @input="onSearchInput"
        />
      </div>

      <!-- Loader mientras cargan los datos -->
      <div v-if="loading" class="loader-overlay">
        <div class="spinner"></div>
      </div>

      <!-- Tabla de datos -->
      <div v-else class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="record in records" :key="record.id">
              <td>
                <span style="font-weight: 600; color: var(--accent)">#{{ record.id }}</span>
              </td>
              <td>
                <div style="font-weight: 500">{{ record.nombre }}</div>
              </td>
              <td>
                <span class="text-sm text-muted">{{ record.descripcion }}</span>
              </td>
              <td>
                <span class="badge badge-info">{{ record.categoria }}</span>
              </td>
              <td>
                <span :class="['badge', estadoBadge(record.estado)]">
                  {{ record.estado }}
                </span>
              </td>
              <td>
                <span class="text-sm text-muted">{{ formatDate(record.fecha) }}</span>
              </td>
            </tr>

            <!-- Estado vacío -->
            <tr v-if="records.length === 0">
              <td colspan="6" style="text-align: center; padding: 40px; color: var(--text-tertiary)">
                No se encontraron registros
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Paginación -->
      <div v-if="!loading && meta.totalPages > 1" class="pagination">
        <button
          class="pagination-btn"
          :disabled="meta.page <= 1"
          @click="goToPage(meta.page - 1)"
        >
          ‹
        </button>

        <button
          v-for="p in visiblePages"
          :key="p"
          :class="['pagination-btn', { active: p === meta.page }]"
          @click="goToPage(p)"
        >
          {{ p }}
        </button>

        <span v-if="meta.totalPages > 7" class="pagination-info">
          {{ meta.page }} / {{ meta.totalPages }}
        </span>

        <button
          class="pagination-btn"
          :disabled="meta.page >= meta.totalPages"
          @click="goToPage(meta.page + 1)"
        >
          ›
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * Vista de Registros - Módulo 1
 * Muestra 1000 registros con paginación, búsqueda y filtros
 */
import { ref, computed, onMounted } from 'vue'
import { fetchRecords, categorias } from '../services/mockData'

// Estado reactivo
const records = ref([])
const loading = ref(true)
const searchQuery = ref('')
const selectedCategoria = ref('')
const perPage = ref(20)
const meta = ref({
  page: 1,
  perPage: 20,
  total: 0,
  totalPages: 0
})

// Timer para debounce de búsqueda
let searchTimer = null

/**
 * Carga los registros desde la API mock
 */
async function loadRecords (page = 1) {
  loading.value = true
  try {
    const result = await fetchRecords({
      page,
      perPage: perPage.value,
      search: searchQuery.value,
      categoria: selectedCategoria.value
    })
    records.value = result.data
    meta.value = result.meta
  } catch (error) {
    console.error('Error cargando registros:', error)
  } finally {
    loading.value = false
  }
}

/**
 * Maneja input de búsqueda con debounce (300ms)
 */
function onSearchInput () {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    loadRecords(1)
  }, 300)
}

/**
 * Cuando cambia un filtro, reinicia a la página 1
 */
function onFilterChange () {
  loadRecords(1)
}

/**
 * Navega a la página indicada
 */
function goToPage (page) {
  if (page >= 1 && page <= meta.value.totalPages) {
    loadRecords(page)
  }
}

/**
 * Calcula las páginas visibles en la paginación
 * Muestra máximo 7 botones de página
 */
const visiblePages = computed(() => {
  const total = meta.value.totalPages
  const current = meta.value.page
  const pages = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    
    let start = Math.max(2, current - 1)
    let end = Math.min(total - 1, current + 1)
    
    if (current <= 3) {
      start = 2
      end = 5
    } else if (current >= total - 2) {
      start = total - 4
      end = total - 1
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    pages.push(total)
  }

  return pages
})

/**
 * Retorna la clase CSS del badge según el estado
 */
function estadoBadge (estado) {
  const map = {
    Activo: 'badge-success',
    Inactivo: 'badge-error',
    Pendiente: 'badge-warning',
    Completado: 'badge-info'
  }
  return map[estado] || 'badge-info'
}

/**
 * Formatea una fecha ISO a formato legible
 */
function formatDate (dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Carga inicial de datos
onMounted(() => {
  loadRecords()
})
</script>
