<script lang="ts" setup>
const props = defineProps<{
  error?: string;
  label: string;
  name: string;
  as?: "input" | "textarea";
  type?: "text" | "number" | "email" | "passwoard";

}>();
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.label }}
    </legend>
    <Field
      :name="props.name"
      :as="props.as || 'input'"
      :type="props.as === 'textarea' ? undefined : (props.type || 'text')"
      class="w-full"
      :class="{
        'input': props.as !== 'textarea',
        'input-error': props.error && props.as !== 'textarea',
        'textarea': props.as === 'textarea',
        'textarea-error': props.error && props.as === 'textarea',
      }"
    />
    <p
      v-if="props.error"
      class="fieldset-label text-error"
    >
      {{ props.error }}
    </p>
  </fieldset>
</template>
