<script setup lang="ts">
import * as z from 'zod'

const emit = defineEmits<{ (e: 'submitted'): void }>()

const createModalOpen = ref(false)

const schema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  code: z.string().min(1, { message: 'Required' }),
})

const fields = [
  { name: 'name', label: 'Category Name', type: 'text' as const, required: true },
  { name: 'code', label: 'Category Code', type: 'text' as const, required: true },
]
</script>

<template>
  <FormModal
    v-model:open="createModalOpen"
    mode="create"
    title="New Category"
    buttonLabel="New Category"
    :schema="schema"
    :fields="fields"
    createUrl="/category/create"
    @submitted="emit('submitted')"
  />
</template>
