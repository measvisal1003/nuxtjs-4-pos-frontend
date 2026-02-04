<script setup lang="ts">
import * as z from 'zod'

const props = defineProps<{
  open: boolean
  id: string | number | null
}>()

const emit = defineEmits<{
  (e: 'update:open', v: boolean): void
  (e: 'submitted'): void
}>()

const schema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  position: z.string().min(1, { message: 'Required' }),
  email: z.string().email({ message: 'Invalid email' }),
  phone: z.string().min(1, { message: 'Required' }),

})

const fields = [
  { name: 'name', label: 'Name', type: 'text' as const, required: true },
  { name: 'position', label: 'Position', type: 'text' as const, required: true },
  { name: 'email', label: 'Email', type: 'text' as const, required: true },
  { name: 'phone', label: 'Phone', type: 'text' as const, required: true },
]

const transform = (data: Record<string, any>) => ({
  ...data,
  supplierId: props.id == null ? undefined : Number(props.id)
})
</script>

<template>
  <FormModal
    :open="open"
    @update:open="(v) => emit('update:open', v)"
    mode="create"
    title="Create Supplier Contact"
    description="create contact"
    buttonLabel="Create"
    :schema="schema"
    :fields="fields"
    createUrl="/supplierContact/create"
    :transform="transform"
    @submitted="emit('submitted')"
  />
</template>
