// composables/use-user-preferences.ts
export async function useUserPreferences() {
  const { data } = await useFetch<{ sidebarOpen: boolean }>("/api/user-preferences");
  const sidebarOpen = ref(data.value?.sidebarOpen ?? true);

  async function setSidebarOpen(value: boolean) {
    sidebarOpen.value = value;
    await $fetch("/api/user-preferences", {
      method: "PATCH",
      body: { sidebarOpen: value },
    });
  }

  return { sidebarOpen, setSidebarOpen };
}
