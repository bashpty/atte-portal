<script setup lang="ts">
definePageMeta({ layout: 'admin' })
const infractionStore = useInfractionStore()
const statusFilter = ref('all')

const rows = computed(() => infractionStore.infractions.filter(i => statusFilter.value === 'all' || i.status === statusFilter.value))
</script>

<template>
  <div class="space-y-5">
    <UPageHeader :title="$t('admin.judgesTitle')" />

    <UCard>
      <div class="flex flex-wrap gap-3">
        <USelect
          v-model="statusFilter"
          :items="[
            { label: $t('common.all'), value: 'all' },
            { label: 'Pendiente', value: 'Pendiente' },
            { label: 'Pagado', value: 'Pagado' },
            { label: 'En Juzgado', value: 'En Juzgado' },
            { label: 'Impugnado', value: 'Impugnado' }
          ]"
          class="w-56"
        />
      </div>
    </UCard>

    <UCard>
      <UTable
        :data="rows"
        :columns="[
          { accessorKey: 'number', header: 'Boleta' },
          { accessorKey: 'article', header: 'Artículo' },
          { accessorKey: 'vehiclePlate', header: 'Placa' },
          { accessorKey: 'originalAmount', header: 'Monto', cell: ({ row }) => `$${row.original.originalAmount.toFixed(2)}` },
          { accessorKey: 'status', header: 'Estado' }
        ]"
      >
        <template #status-cell="{ row }">
          <StatusBadge :status="row.original.status" />
        </template>
        <template #actions-cell>
          <div class="flex gap-2">
            <UButton size="xs" color="neutral" variant="subtle" icon="i-lucide-gavel">Remitir</UButton>
            <UButton size="xs" color="error" variant="subtle" icon="i-lucide-x">Anular</UButton>
          </div>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
