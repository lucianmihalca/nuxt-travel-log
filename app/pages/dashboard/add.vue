<script lang="ts" setup>
import { insertLocationSchema } from "~~/lib/db/schema";

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(insertLocationSchema),
});

const onSubmit = handleSubmit((value) => {
  console.log(value);
});
</script>

<template>
  <div class="container max-w-md mx-auto p-4">
    <div class="my-4">
      <h1 class="text-xl font-bold tracking-tight text-base-content">
        {{ $t('add_locations.title') }}
      </h1>
      <p class="text-base text-base-content/80 leading-relaxed">
        {{ $t('add_locations.description') }}
      </p>
    </div>
    <form
      class="flex flex-col gap-2"
      @submit.prevent="onSubmit"
    >
      <AppFormField
        name="name"
        :label="$t('add_locations.form.name')"
        type="text"
        :error="errors.name"
      />
      <AppFormField
        name="description"
        :label="$t('add_locations.form.description')"
        as="textarea"
        :error="errors.description"
      />
      <AppFormField
        name="lat"
        :label="$t('add_locations.form.latitude')"
        type="number"
        :error="errors.lat"
      />

      <AppFormField
        name="long"
        :label="$t('add_locations.form.longitude')"
        type="number"
        :error="errors.long"
      />

      <div class="flex justify-end gap-2">
        <button type="button" class="btn btn-outline">
          <Icon name="tabler:arrow-left" size="24" />
          {{ $t('add_locations.form.cancel') }}
        </button>

        <button type="submit" class="btn btn-primary">
          <Icon name="tabler:circle-plus-filled" size="24" />
          {{ $t('add_locations.form.submit') }}
        </button>
      </div>
    </form>
  </div>
</template>
