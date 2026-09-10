<script setup lang="ts">
definePageMeta({ layout: 'admin' })
const audit = useAuditStore()
const severityFilter = ref('all')

const rows = computed(() => audit.events.filter(e => severityFilter.value === 'all' || e.severity === severityFilter.value))

const nodes = [
  { label: 'SERTRACEN S.A.', desc: 'Licencias & Emisión RUVE', latency: '18 ms' },
  { label: 'Tribunal Electoral', desc: 'Registro Civil & Biometría', latency: '24 ms' },
  { label: 'Red Telered Clave', desc: 'Pagos ACH / Pasarela Inmediata', latency: '35 ms' },
  { label: 'Patios y Grúas DNOT', desc: 'Custodia Vehicular & Depósitos', latency: '42 ms' }
]
</script>

<template>
  <div class="space-y-5">
    <UPageHeader :title="$t('admin.auditTitle')" description="SIGED / DNOT v4.12 · Registro inmutable bajo Ley 83 de Firma Digital" />

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard>
        <p class="text-xs text-(--ui-text-muted)">{{ $t('admin.eventsToday') }}</p>
        <p class="text-2xl font-bold text-(--ui-text-highlighted) mt-1">{{ audit.metrics.eventsToday.toLocaleString() }}</p>
      </UCard>
      <UCard>
        <p class="text-xs text-(--ui-text-muted)">{{ $t('admin.qrChecks') }}</p>
        <p class="text-2xl font-bold text-(--ui-text-highlighted) mt-1">{{ audit.metrics.qrChecks.toLocaleString() }}</p>
      </UCard>
      <UCard>
        <p class="text-xs text-(--ui-text-muted)">{{ $t('admin.tickets') }}</p>
        <p class="text-2xl font-bold text-(--ui-text-highlighted) mt-1">{{ audit.metrics.ticketsAndLiens }}</p>
      </UCard>
      <UCard :ui="{ root: 'bg-primary-800 text-white' }">
        <p class="text-xs text-white/60 flex items-center gap-1"><UIcon name="i-lucide-link-2" /> {{ $t('admin.ledgerHealth') }}</p>
        <p class="text-2xl font-bold mt-1">{{ audit.metrics.ledgerHealth }}%</p>
        <UBadge color="success" variant="solid" class="mt-1">{{ $t('admin.verified') }}</UBadge>
      </UCard>
    </div>

    <UCard>
      <div class="flex flex-wrap gap-3 items-center">
        <UInput icon="i-lucide-search" placeholder="Cédula, Placa, Agente DNOT o Hash..." class="max-w-md w-full" />
        <USelect
          v-model="severityFilter"
          :items="[
            { label: $t('common.all'), value: 'all' },
            { label: 'Informativo', value: 'Informativo' },
            { label: 'Advertencia', value: 'Advertencia' },
            { label: 'Crítico', value: 'Crítico' }
          ]"
          class="w-48"
        />
      </div>
    </UCard>

    <UCard>
      <div class="flex items-center justify-between mb-3">
        <p class="font-semibold text-(--ui-text-highlighted)">{{ $t('admin.immutableLedger') }}</p>
        <UBadge color="success" variant="soft" icon="i-lucide-shield-check">Ledger Criptográfico Activo</UBadge>
      </div>
      <UTable
        :data="rows"
        :columns="[
          { accessorKey: 'timestamp', header: 'Timestamp' },
          { accessorKey: 'operator', header: 'Operador / Agente' },
          { accessorKey: 'action', header: 'Evento' },
          { accessorKey: 'citizen', header: 'Ciudadano Afectado' },
          { accessorKey: 'ipNode', header: 'IP / Nodo Origen' },
          { accessorKey: 'severity', header: 'Severidad' },
          { accessorKey: 'hash', header: 'Hash SHA-256' }
        ]"
      >
        <template #severity-cell="{ row }">
          <StatusBadge :status="row.original.severity" />
        </template>
        <template #hash-cell="{ row }">
          <span class="font-mono text-xs">{{ row.original.hash }}</span>
        </template>
      </UTable>
    </UCard>

    <UCard>
      <p class="font-semibold text-(--ui-text-highlighted) mb-3">Monitoreo de Sincronización de Nodos</p>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div v-for="n in nodes" :key="n.label" class="rounded-lg border border-(--ui-border) p-3">
          <p class="text-sm font-semibold text-(--ui-text-highlighted)">{{ n.label }}</p>
          <p class="text-xs text-(--ui-text-muted)">{{ n.desc }}</p>
          <UBadge color="success" variant="soft" size="sm" class="mt-2">{{ n.latency }}</UBadge>
        </div>
      </div>
    </UCard>
  </div>
</template>
