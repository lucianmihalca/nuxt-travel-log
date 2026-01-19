<script lang="ts" setup>
const authStore = useAuthStore();
await authStore.init();
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppNavBar />
    <main class="flex flex-col flex-1">
      <slot />
    </main>
  </div>
</template>
