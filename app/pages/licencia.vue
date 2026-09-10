<script setup lang="ts">
const auth = useAuthStore()
const vehicleStore = useVehicleStore()
const vehicle = computed(() => vehicleStore.vehicles[0])
</script>

<template>
  <div class="space-y-5">
    <UPageHeader :title="$t('dashboard.license')" />

    <UCard :ui="{ root: 'bg-primary-800 text-white ring-2 ring-tertiary-400/40', body: 'sm:p-5' }">
      <div class="flex items-center justify-between">
        <UBadge color="success" variant="solid">CONDUCTOR HABILITADO</UBadge>
        <UIcon name="i-lucide-shield-check" class="text-success-400" />
      </div>
      <div class="flex items-center gap-4 mt-4">
        <UAvatar :src="auth.driver.photo" size="3xl" class="ring-2 ring-white/50" />
        <div>
          <p class="text-lg font-bold">{{ auth.driver.fullName }}</p>
          <p class="text-sm font-mono text-white/70">{{ auth.driver.cedula }}</p>
          <div class="flex gap-1 mt-1">
            <UBadge v-for="c in auth.driver.categories" :key="c" color="neutral" variant="soft" class="bg-white/10 text-white">TIPO {{ c }}</UBadge>
          </div>
        </div>
      </div>
      <p class="text-xs text-white/60 mt-3">Vence: {{ auth.driver.licenseExpiry }} · Puntos {{ auth.driver.points }}/{{ auth.driver.maxPoints }}</p>
    </UCard>

    <UCard>
      <p class="font-semibold text-(--ui-text-highlighted) mb-2">Paz y Salvo Oficial SIGED</p>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs text-(--ui-text-muted)">Folio</p>
          <p class="font-mono text-sm">CERT-SIGED-2025-99812-PA</p>
        </div>
        <UBadge color="success" variant="solid">AL DÍA</UBadge>
      </div>
    </UCard>

    <UCard v-if="vehicle">
      <p class="font-semibold text-(--ui-text-highlighted) mb-2">Vehículo Asignado</p>
      <div class="flex items-center justify-between text-sm">
        <span>{{ vehicle.brand }} {{ vehicle.model }} · {{ vehicle.plate }}</span>
        <StatusBadge status="Despejado" />
      </div>
    </UCard>
  </div>
</template>
