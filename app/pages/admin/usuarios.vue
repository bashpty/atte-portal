<script setup lang="ts">
definePageMeta({ layout: 'admin' })
const users = useUserStore()
</script>

<template>
  <div class="space-y-5">
    <UPageHeader :title="$t('admin.users')" />

    <div class="flex flex-wrap gap-3">
      <UInput v-model="users.search" icon="i-lucide-search" placeholder="Cédula o nombre..." class="max-w-xs" />
      <USelect
        v-model="users.statusFilter"
        :items="[{ label: $t('common.all'), value: 'all' }, { label: 'Habilitado', value: 'Habilitado' }, { label: 'Suspendido', value: 'Suspendido' }]"
        class="w-48"
      />
    </div>

    <UCard>
      <UTable
        :data="users.filtered"
        :columns="[
          { accessorKey: 'cedula', header: 'Cédula' },
          { accessorKey: 'fullName', header: 'Nombre Completo' },
          { accessorKey: 'licenseCategories', header: 'Categorías', cell: ({ row }) => row.original.licenseCategories.join(', ') },
          { accessorKey: 'points', header: 'Puntos (Ley 21)' },
          { accessorKey: 'vehicles', header: 'Vehículos' },
          { accessorKey: 'activeTickets', header: 'Boletas Activas' },
          { accessorKey: 'status', header: 'Estado' }
        ]"
      >
        <template #status-cell="{ row }">
          <StatusBadge :status="row.original.status" />
        </template>
      </UTable>
    </UCard>
  </div>
</template>
