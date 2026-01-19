<script lang="ts" setup>
const isSidebarOpen = ref(true);

onMounted(() => {
  isSidebarOpen.value = localStorage.getItem("isSidebarOpen") === "true";
});

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
  localStorage.setItem("isSidebarOpen", isSidebarOpen.value.toString());
}
</script>

<template>
  <div class="flex flex-1">
    <div
      class="bg-base-100 transition-all duration-400 flex flex-col"
      :class="{ 'w-64': isSidebarOpen, 'w-16': !isSidebarOpen }"
    >
      <div
        class="flex hover: cursor-pointer hover:bg-base-200 p-2"
        :class="{ 'justify-center': !isSidebarOpen, 'justify-end': isSidebarOpen }"
        @click="toggleSidebar"
      >
        <Icon
          :name="isSidebarOpen ? 'tabler:chevron-left' : 'tabler:chevron-right'"
          size="32"
        />
      </div>
      <div class="flex flex-col gap-1 flex-1">
        <!-- Grupo de arriba -->
        <div class="flex flex-col gap-1">
          <SidebarButton
            :show-label="isSidebarOpen"
            label="Locations"
            icon="tabler:map"
            href="/dashboard"
          />

          <SidebarButton
            :show-label="isSidebarOpen"
            label="Add Locations"
            icon="tabler:flag-plus"
            href="/dashboard/add"
          />
        </div>
        <!-- Grupo de abajo -->
        <div class="mt-auto mb-2 flex flex-col">
          <SidebarButton
            :show-label="isSidebarOpen"
            label="Sign Out"
            icon="tabler:logout-2"
            href="/sign-out"
          />
        </div>
      </div>
    </div>
    <div class="flex-1" />
  </div>
</template>
