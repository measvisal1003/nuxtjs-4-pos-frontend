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
  code: z.string().min(1, { message: 'Required' }),
  active: z.boolean({ message: 'Required' })

})

const fields = [
  { name: 'id', label: "Id", type: 'number' as const, require: true, hidden: true},
  { name: 'name', label: 'Category Name', type: 'text' as const, required: true },
  { name: 'code', label: 'Category Code', type: 'text' as const, required: true },
  {
    name: 'active', label: 'Active', type: 'select' as const, require: true,
    items: [{ label: 'Active', value: true }, { label: 'Inactive', value: false }]
  }
]
</script>

<template>
  <FormModal
    :open="open"
    @update:open="(v) => emit('update:open', v)"
    mode="update"
    :id="id"
    title="Edit Category"
    description="Update category information"
    buttonLabel=""
    :schema="schema"
    :fields="fields"
    findByIdUrl="/category"   
    updateUrl="/category"      
    @submitted="emit('submitted')"
  >
    <template #default></template>
  </FormModal>
</template>
