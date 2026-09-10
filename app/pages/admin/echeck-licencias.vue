<script setup lang="ts">
definePageMeta({ layout: 'admin' })
const vehicles = useVehicleStore()
const users = useUserStore()

const search = ref('')
const statusFilter = ref('all')
const typeFilter = ref('all')

const rows = computed(() => vehicles.vehicles.filter((v) => {
  const matchesSearch = !search.value || v.plate.toLowerCase().includes(search.value.toLowerCase())
  const matchesStatus = statusFilter.value === 'all' || v.ecarcheck.status === statusFilter.value
  const matchesType = typeFilter.value === 'all' || v.type === typeFilter.value
  return matchesSearch && matchesStatus && matchesType
}))
</script>

<template>
  <div class="space-y-5">
    <UPageHeader :title="$t('admin.echeckTitle')" />

    <UCard>
      <p class="text-xs font-semibold text-(--ui-text-muted) mb-3">{{ $t('admin.advancedFilters') }}</p>
      <div class="flex flex-wrap gap-3">
        <UInput v-model="search" icon="i-lucide-search" placeholder="Placa..." class="max-w-xs" />
        <USelect
          v-model="statusFilter"
          :items="[{ label: $t('common.all'), value: 'all' }, { label: 'Aprobado', value: 'APROBADO' }, { label: 'Pendiente', value: 'PENDIENTE' }, { label: 'Vencido', value: 'VENCIDO' }]"
          class="w-48"
        />
        <USelect
          v-model="typeFilter"
          :items="[{ label: $t('common.all'), value: 'all' }, { label: 'Particular', value: 'Particular' }, { label: 'Comercial', value: 'Comercial' }]"
          class="w-48"
        />
      </div>
    </UCard>

    <UCard>
      <p class="font-semibold text-(--ui-text-highlighted) mb-3">Vehículos ({{ rows.length }})</p>
      <UTable
        :data="rows"
        :columns="[
          { accessorKey: 'plate', header: 'Placa' },
          { accessorKey: 'brand', header: 'Marca / Modelo', cell: ({ row }) => `${row.original.brand} ${row.original.model}` },
          { accessorKey: 'ecarcheck', header: 'e-Car Check', cell: ({ row }) => row.original.ecarcheck.status },
          { accessorKey: 'insurance', header: 'Póliza', cell: ({ row }) => row.original.insurance.provider }
        ]"
      />
    </UCard>

    <UCard>
      <p class="font-semibold text-(--ui-text-highlighted) mb-3">Licencias de Conductores</p>
      <UTable
        :data="users.records"
        :columns="[
          { accessorKey: 'cedula', header: 'Cédula' },
          { accessorKey: 'fullName', header: 'Conductor' },
          { accessorKey: 'licenseCategories', header: 'Categorías', cell: ({ row }) => row.original.licenseCategories.join(', ') },
          { accessorKey: 'points', header: 'Puntos' },
          { accessorKey: 'status', header: 'Estado' }
        ]"
      />
    </UCard>
  </div>
</template>
