<script setup lang="ts">
const props = defineProps<{ status: string }>()

const map: Record<string, { color: 'success' | 'warning' | 'error' | 'neutral' | 'primary', icon: string }> = {
  APROBADO: { color: 'success', icon: 'i-lucide-check' },
  ACTIVA: { color: 'success', icon: 'i-lucide-check' },
  ACTIVO: { color: 'success', icon: 'i-lucide-check' },
  Vigente: { color: 'success', icon: 'i-lucide-check' },
  Habilitado: { color: 'success', icon: 'i-lucide-check' },
  Emitido: { color: 'success', icon: 'i-lucide-check' },
  Pagado: { color: 'success', icon: 'i-lucide-check' },
  'En Regla': { color: 'success', icon: 'i-lucide-check' },
  Despejado: { color: 'success', icon: 'i-lucide-check' },
  PENDIENTE: { color: 'warning', icon: 'i-lucide-clock' },
  Pendiente: { color: 'warning', icon: 'i-lucide-clock' },
  'Pendiente de Pago': { color: 'warning', icon: 'i-lucide-clock' },
  'En Proceso': { color: 'warning', icon: 'i-lucide-clock' },
  'Revisado Próximo': { color: 'warning', icon: 'i-lucide-clock' },
  VENCIDO: { color: 'error', icon: 'i-lucide-x' },
  VENCIDA: { color: 'error', icon: 'i-lucide-x' },
  Suspendido: { color: 'error', icon: 'i-lucide-x' },
  SUSPENDIDO: { color: 'error', icon: 'i-lucide-x' },
  'En Juzgado': { color: 'error', icon: 'i-lucide-gavel' },
  Impugnado: { color: 'error', icon: 'i-lucide-gavel' },
  Crítico: { color: 'error', icon: 'i-lucide-alert-triangle' },
  Advertencia: { color: 'warning', icon: 'i-lucide-alert-circle' },
  Informativo: { color: 'neutral', icon: 'i-lucide-info' }
}

const config = computed(() => map[props.status] ?? { color: 'neutral' as const, icon: 'i-lucide-circle' })
</script>

<template>
  <UBadge :color="config.color" variant="subtle" size="md" class="rounded-full font-semibold uppercase">
    <UIcon :name="config.icon" class="size-3" />
    {{ status }}
  </UBadge>
</template>
