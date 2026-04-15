/**
 * Composable para manejar notificaciones toast globales
 * Usa un patrón reactivo compartido para emitir toasts desde cualquier componente
 */
import { reactive } from 'vue'

const state = reactive({
  toasts: []
})

let toastId = 0

/**
 * Agrega una notificación toast
 * @param {'success'|'error'} type - Tipo de notificación
 * @param {string} message - Mensaje a mostrar
 * @param {number} duration - Duración en ms (default 4000)
 */
function addToast (type, message, duration = 4000) {
  const id = ++toastId
  state.toasts.push({ id, type, message })

  // Auto-remover después de la duración
  setTimeout(() => {
    removeToast(id)
  }, duration)
}

function removeToast (id) {
  const index = state.toasts.findIndex(t => t.id === id)
  if (index > -1) {
    state.toasts.splice(index, 1)
  }
}

export function useToast () {
  return {
    toasts: state.toasts,
    success: (msg) => addToast('success', msg),
    error: (msg) => addToast('error', msg),
    remove: removeToast
  }
}
