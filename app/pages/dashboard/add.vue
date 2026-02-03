<script lang="ts" setup>
import type { FetchError } from "ofetch";

import { insertLocationSchema } from "~~/lib/db/schema";

const { handleSubmit, errors, meta, setErrors } = useForm({
  validationSchema: toTypedSchema(insertLocationSchema),
});

const { $csrfFetch } = useNuxtApp();
const router = useRouter();
const loading = ref(false);
const submitted = ref(false);
const submitError = ref("");
const { t } = useI18n();

const onSubmit = handleSubmit(async (values) => {
  try {
    submitError.value = "";
    loading.value = true;
    await $csrfFetch("/api/locations", {
      method: "post",
      body: values,
    });

    submitted.value = true;
    navigateTo("/dashboard");
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data) {
      setErrors(error.data?.data);
    }
    submitError.value = error.statusMessage || " An unknown error occured";
  }

  loading.value = false;
});

onBeforeRouteLeave(() => {
  if (!submitted.value && meta.value.dirty) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm(t("add_locations.form.unsavedconfirm"));
    if (!confirm) {
      return false;
    }
    return true;
  }
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
    <div
      v-if="submitError"
      role="alert"
      class="alert alert-error"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{{ submitError }}</span>
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
        :disabled="loading"
      />
      <AppFormField
        name="description"
        :label="$t('add_locations.form.description')"
        as="textarea"
        :error="errors.description"
        :disabled="loading"
      />
      <AppFormField
        name="lat"
        :label="$t('add_locations.form.latitude')"
        type="number"
        :error="errors.lat"
        :disabled="loading"
      />

      <AppFormField
        name="long"
        :label="$t('add_locations.form.longitude')"
        type="number"
        :error="errors.long"
        :disabled="loading"
      />

      <div class="flex justify-end gap-2">
        <button
          :disabled="loading"
          type="button"
          class="btn btn-outline"
          @click="router.back()"
        >
          <Icon name="tabler:arrow-left" size="24" />
          {{ $t('add_locations.form.cancel') }}
        </button>

        <button
          :disabled="loading"
          type="submit"
          class="btn btn-primary"
        >
          {{ $t('add_locations.form.submit') }}
          <span v-if="loading" class="loading loading-ring loading-sm" />
          <Icon
            v-else
            name="tabler:circle-plus-filled"
            size="24"
          />
        </button>
      </div>
    </form>
  </div>
</template>
