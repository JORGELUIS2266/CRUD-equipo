/**
 * Router principal de la aplicación
 * Define las rutas para los dos módulos CRUD
 */
import { createRouter, createWebHistory } from 'vue-router'
import RecordsView from '../views/RecordsView.vue'
import FormsView from '../views/FormsView.vue'

const routes = [
  {
    path: '/',
    redirect: '/registros'
  },
  {
    path: '/registros',
    name: 'Registros',
    component: RecordsView
  },
  {
    path: '/formularios',
    name: 'Formularios',
    component: FormsView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
