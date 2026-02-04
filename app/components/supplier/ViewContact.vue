<script setup lang="ts">
import type { SupplierWithContacts, SupplierContact } from '~/types'
import type { TableColumn } from '@nuxt/ui'
import { getPaginationRowModel, type Row } from '@tanstack/table-core'

const props = defineProps<{
  open: boolean
  data: SupplierWithContacts | null
}>()

const emit = defineEmits<{
  'update:open': [boolean]
}>()

const UBadge = resolveComponent('UBadge')
const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')
const supplierName = computed(() => props.data?.supplier?.name ?? '')
const contacts = computed(() => props.data?.supplierContacts ?? [])

function getRowItem(row: Row<SupplierContact>) {
  return [
    { type: 'label', label: 'Actions' },
    { type: 'separator' },
    {
      label: 'Edit Contact',
      icon: 'i-lucide-pencil',
      onSelect() {
        // do something with row.original (SupplierContact)
      }
    },
    { type: 'separator' },
    {
      label: 'Delete Contact',
      icon: 'i-lucide-trash',
      color: 'error',
      onSelect() {
        // do something with row.original (SupplierContact)
      }
    }
  ]
}

const columns: TableColumn<SupplierContact>[] = [
  {
    id: 'no',
    header: 'No',
    cell: ({ row, table }) => {
      const pageIndex = table.getState().pagination.pageIndex
      const pageSize = table.getState().pagination.pageSize
      return pageIndex * pageSize + row.index + 1
    }
  },
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'position', header: 'Position' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'phone', header: 'Phone' },
  {
    id: 'active',
    header: 'Active',
    accessorFn: (r) => r.active,
    cell: ({ row }) =>
      h(
        UBadge,
        {
          color: row.original.active ? 'success' : 'error',
          variant: 'soft',
          ui: { rounded: 'rounded-full' }
        },
        () => (row.original.active ? 'Active' : 'Inactive')
      )
  },
  {
    id: 'actions',
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            content: { align: 'end' },
            items: getRowItem(row)
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto'
            })
        )
      )
  }
]
</script>

<template>
  <UModal
    scrollable
    :open="open"
    :ui="{ content: 'w-full sm:max-w-7xl' }"
    @update:open="(v) => emit('update:open', v)"
  >
    <template #header>
      <div class="flex items-center justify-between gap-2">
        <div>
          <div class="font-semibold">Supplier Contacts</div>
          <div class="text-sm text-muted" v-if="supplierName">
            {{ supplierName }} • {{ contacts.length }} contact(s)
          </div>
        </div>
      </div>
    </template>
    <template #body>
      <div v-if="!data" class="text-sm text-muted">
        No supplier selected.
      </div>

      <div v-else>
        <UTable
          :data="contacts"
          :columns="columns"
          :ui="{
            base: 'table-fixed border-separate border-spacing-0',
            thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
            tbody: '[&>tr]:last:[&>td]:border-b-0',
            th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r text-black dark:text-white',
            td: 'border-b border-default text-black dark:text-white',
            separator: 'h-0'
          }"
        />

        <div v-if="contacts.length === 0" class="text-sm text-muted mt-3">
          This supplier has no contacts.
        </div>
      </div>
    </template>
  </UModal>
</template>
