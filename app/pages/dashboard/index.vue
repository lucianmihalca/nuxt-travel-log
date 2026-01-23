<script lang="ts" setup>
const isSidebarOpen = useCookie<boolean>("isSidebarOpen", { default: () => true });

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>

<template>
  <div class="flex flex-1">
    <div
      class="bg-base-100 transition-all duration-400 flex flex-col border-r border-base-content/10 "
      :class=" isSidebarOpen ? 'w-64 px-2' : 'w-16'"
    >
      <div class="flex flex-col gap-1 flex-1 py-2">
        <!-- SidebarContent -->
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
        <div class="my-4 border-t border-base-content/10" />

        <SidebarButton
          :show-label="isSidebarOpen"
          label="Sign Out"
          icon="tabler:logout-2"
          href="/sign-out"
        />
        <!-- SidebarFooter -->
        <div class="mt-auto pt-4 flex flex-col border-t border-base-content/10">
          <SidebarButton
            :show-label="isSidebarOpen"
            label="Open Sidebar"
            icon="tabler:layout-sidebar-left-collapse"
            icon-closed="tabler:layout-sidebar-left-expand"
            :on-click="toggleSidebar"
          />
        </div>
      </div>
    </div>
    <div class="flex-1" />
  </div>
</template>
