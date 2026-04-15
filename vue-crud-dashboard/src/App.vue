<template>
  <!-- Sidebar de navegación -->
  <aside class="sidebar">
    <div class="sidebar-logo">
      <div class="sidebar-logo-icon">D</div>
      <h1>Dashboard</h1>
    </div>

    <nav class="sidebar-nav">
      <span class="nav-section-title">Módulos</span>

      <router-link to="/registros" class="nav-link" active-class="active">
        <span class="nav-icon">📋</span>
        <span>Registros</span>
      </router-link>

      <router-link to="/formularios" class="nav-link" active-class="active">
        <span class="nav-icon">📝</span>
        <span>Formularios</span>
      </router-link>

      <span class="nav-section-title" style="margin-top: auto">Info</span>

      <div class="nav-link" style="cursor: default; opacity: 0.7">
        <span class="nav-icon">⚡</span>
        <span class="text-sm">Vue 3 + Vite</span>
      </div>
    </nav>
  </aside>

  <!-- Contenido principal -->
  <main class="main-content">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>

  <!-- Toast notifications -->
  <ToastNotification />
</template>

<script setup>
import ToastNotification from './components/ToastNotification.vue'
</script>
