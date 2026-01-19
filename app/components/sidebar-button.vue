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
      :class="{ 'bg-base-200': route.path === props.href, 'justify-center': !showLabel, 'justify-start': showLabel }"
      :to="props.href"
      class="flex gap-2 p-2 hover:bg-base-300 hover:cursor-pointer flex-nowrap transition-all duration-400"
    >
      <Icon :name="props.icon" size="24" />
      <Transition name="grow">
        <span v-if="showLabel">
          {{ props.label }}
        </span>
      </Transition>
    </NuxtLink>
  </div>
</template>

<style lang="css" scoped>
.grow-enter-active {
  animation: grow 0.4s;
}
.grow-leave-active {
  animation: grow 0.4s ease reverse;
}
@keyframes grow {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
