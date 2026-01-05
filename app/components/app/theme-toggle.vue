<script lang="ts" setup>
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(value) {
    colorMode.preference = value ? "dark" : "light";
  },
});
</script>

<template>
  <label class="swap swap-rotate mx-4">
    <!-- this hidden checkbox controls the state -->
    <input
      v-model="isDark"
      type="checkbox"
    >

    <!-- sun icon -->
    <Icon
      name="tabler:sun"
      class="swap-on h-10 w-10 fill-current"
      size="24"
    />

    <!-- moon icon -->
    <Icon
      name="tabler:moon"
      class="swap-off h-10 w-10 fill-current"
      size="24"
    />
  </label>
</template>
