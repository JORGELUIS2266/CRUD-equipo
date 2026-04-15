<template>
  <!-- Contenedor de notificaciones toast -->
  <div class="toast-container" v-if="toasts.length">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="['toast', `toast-${toast.type}`]"
        @click="remove(toast.id)"
      >
        <span class="toast-icon">
          {{ toast.type === 'success' ? '✓' : '✕' }}
        </span>
        <span>{{ toast.message }}</span>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
/**
 * Componente de notificaciones toast
 * Se renderiza de forma fija en la esquina superior derecha
 */
import { useToast } from '../composables/useToast'

const { toasts, remove } = useToast()
</script>

<style scoped>
.toast-enter-active {
  animation: slideInRight 0.3s ease-out;
}

.toast-leave-active {
  animation: fadeOut 0.2s ease-in forwards;
}
</style>
