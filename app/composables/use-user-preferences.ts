export async function useUserPreferences() {
  // SSR-friendly state using a Cookie (prevents layout shift)
  const isSidebarOpen = useCookie<boolean>("is_sidebar_open", {
    default: () => true,
    watch: true,
  });

  // Database Sync: Fetch the stored preference
  const { data } = await useFetch<{ sidebarOpen: boolean }>("/api/user-preferences", {
    key: "user_preferences",
  });

  // Update cookie/state if database has a value
  if (data.value) {
    isSidebarOpen.value = data.value.sidebarOpen;
  }

  // 3. Debounce for database persistence
  const debouncedSave = useDebounceFn(async (value: boolean) => {
    try {
      await $fetch("/api/user-preferences", {
        method: "PATCH",
        body: { sidebarOpen: value },
      });
    }
    catch (error) {
      console.error("Failed to sync sidebar preference to database:", error);
    }
  }, 1000);

  function setSidebarOpen(value: boolean) {
    // Updates the cookie and the UI instantly
    isSidebarOpen.value = value;
    // Saves to the database in the background
    debouncedSave(value);
  }

  return {
    // Read-only version of the state for architectural safety
    isSidebarOpen: readonly(isSidebarOpen),
    setSidebarOpen,
  };
}
