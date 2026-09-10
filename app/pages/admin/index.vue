<script setup lang="ts">
definePageMeta({ layout: 'admin' })
const audit = useAuditStore()
const users = useUserStore()
const vehicles = useVehicleStore()
</script>

<template>
  <div class="space-y-5">
    <UPageHeader :title="$t('admin.title')" description="Corredor Sur #4412 · Insp. R. Arboleda" />

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard>
        <p class="text-xs text-(--ui-text-muted)">{{ $t('admin.eventsToday') }}</p>
        <p class="text-2xl font-bold text-(--ui-text-highlighted) mt-1">{{ audit.metrics.eventsToday.toLocaleString() }}</p>
        <p class="text-xs text-success-600 mt-1">+12.4% vs ayer</p>
      </UCard>
      <UCard>
        <p class="text-xs text-(--ui-text-muted)">{{ $t('admin.qrChecks') }}</p>
        <p class="text-2xl font-bold text-(--ui-text-highlighted) mt-1">{{ audit.metrics.qrChecks.toLocaleString() }}</p>
        <p class="text-xs text-(--ui-text-muted) mt-1">{{ audit.metrics.devices }} dispositivos DNOT</p>
      </UCard>
      <UCard>
        <p class="text-xs text-(--ui-text-muted)">{{ $t('admin.tickets') }}</p>
        <p class="text-2xl font-bold text-(--ui-text-highlighted) mt-1">{{ audit.metrics.ticketsAndLiens }}</p>
        <p class="text-xs text-(--ui-text-muted) mt-1">28 levantamientos automáticos</p>
      </UCard>
      <UCard :ui="{ root: 'bg-primary-800 text-white' }">
        <p class="text-xs text-white/60">{{ $t('admin.ledgerHealth') }}</p>
        <p class="text-2xl font-bold mt-1">{{ audit.metrics.ledgerHealth }}%</p>
        <UBadge color="success" variant="solid" class="mt-1">{{ $t('admin.verified') }}</UBadge>
      </UCard>
    </div>

    <div class="grid lg:grid-cols-2 gap-4">
      <UCard>
        <p class="font-semibold text-(--ui-text-highlighted) mb-3">{{ $t('nav.users') }}</p>
        <UTable
          :data="users.records.slice(0, 5)"
          :columns="[
            { accessorKey: 'fullName', header: 'Conductor' },
            { accessorKey: 'cedula', header: 'Cédula' },
            { accessorKey: 'points', header: 'Puntos' },
            { accessorKey: 'status', header: 'Estado' }
          ]"
        />
      </UCard>
      <UCard>
        <p class="font-semibold text-(--ui-text-highlighted) mb-3">{{ $t('nav.vehicles') }}</p>
        <UTable
          :data="vehicles.vehicles"
          :columns="[
            { accessorKey: 'plate', header: 'Placa' },
            { accessorKey: 'brand', header: 'Marca' },
            { accessorKey: 'model', header: 'Modelo' }
          ]"
        />
      </UCard>
    </div>
  </div>
</template>
