<script lang="ts" setup>
const props = defineProps<{
  label: string;
  icon: string;
  href: string;
  showLabel: boolean;
}>();

const route = useRoute();
</script>

<template>
  <div
    class="tooltip-right"
    :data-tip="showLabel ? undefined : props.label"
    :class="{ tooltip: !showLabel }"
  >
    <NuxtLink
      :class="{ 'bg-base-200': route.path === props.href }"
      :to="props.href"
      class="flex gap-2 p-2 hover:bg-base-300 hover:cursor-pointer whitespace-nowrap overflow-hidden"
    >
      <div class="w-12 flex justify-center items-center shrink-0 ">
        <Icon :name="props.icon" size="24" />
      </div>

      <Transition
        name="grow"
      >
        <span v-if="showLabel">
          {{ props.label }}
        </span>
      </Transition>
    </NuxtLink>
  </div>
</template>

<style lang="css" scoped>
.grow-enter-active,
.grow-leave-active {
  transition:
    opacity 0.4s,
    transform 0.4s;
}

.grow-enter-from,
.grow-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
