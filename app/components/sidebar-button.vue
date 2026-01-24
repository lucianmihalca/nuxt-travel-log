<script lang="ts" setup>
const props = defineProps<{
  label?: string;
  icon: string;
  href?: string;
  showLabel: boolean;
  iconClosed?: string;
  onClick?: () => void;
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
      v-if="href"
      :to="props.href"
      class="flex items-center gap-2 p-2 transition-colors duration-300 group whitespace-nowrap overflow-hidden border border-transparent hover:border-base-content/10"
      :class="[route.path === props.href
        ? 'bg-primary/10 text-base-content/80 rounded-lg'
        : 'hover:bg-primary/10 hover:rounded-lg text-base-content/80 hover:text-base-content',
      ]"
      @click="onClick"
    >
      <div class="w-12 flex justify-center items-center shrink-0">
        <Icon
          :name="props.icon"
          size="24"
          class="transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <Transition
        name="grow"
      >
        <span v-if="showLabel">
          {{ props.label }}
        </span>
      </Transition>
    </NuxtLink>

    <button
      v-else
      class="flex gap-2 p-2 transition-colors duration-400 hover:bg-primary/10 hover:cursor-pointer hover:rounded-lg whitespace-nowrap  w-full group border border-transparent hover:border-base-content/10"
      @click="onClick"
    >
      <div class="w-12 h-6 flex justify-center items-center shrink-0 relative">
        <Icon
          :name="props.icon"
          size="24"
          class="absolute transition-all duration-400 group-hover:scale-110"
          :class="showLabel ? 'opacity-100' : 'opacity-0'"
        />
        <Icon
          :name="props.iconClosed || props.icon"
          size="24"
          class="absolute transition-all duration-400 group-hover:scale-110"
          :class="showLabel ? 'opacity-0' : 'opacity-100'"
        />
      </div>
    </button>
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
