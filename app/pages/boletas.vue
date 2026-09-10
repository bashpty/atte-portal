<template>
  <div class="space-y-4">
    <CitizenGovBanner />

    <!-- License status summary banner -->
    <div class="relative overflow-hidden rounded-xl bg-primary text-on-primary p-4 shadow-md">
      <div class="flex items-start justify-between gap-3">
        <div>
          <span class="text-[11px] text-primary-fixed uppercase tracking-widest font-medium">Estado de Licencia</span>
          <h2 class="font-headline-sm text-on-primary leading-tight mt-0.5">{{ infractionStore.active.length ? 'Paz y Salvo Condicionado' : 'Paz y Salvo Vigente' }}</h2>
          <p class="font-body-sm text-primary-fixed mt-1">{{ infractionStore.active.length }} infracción(es) pendiente(s)</p>
        </div>
        <span v-if="infractionStore.active[0]" class="shrink-0 px-2.5 py-1 rounded-full bg-status-warning/20 text-status-warning font-label-base uppercase">{{ infractionStore.active[0].hoursRemaining }}h Pronto Pago</span>
      </div>
      <div class="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
        <span class="font-label-base text-primary-fixed">Cédula: {{ auth.driver.cedula }}</span>
        <span class="px-2 py-0.5 rounded-full bg-primary-container text-on-primary font-label-base">{{ auth.driver.points }} Puntos acumulados</span>
      </div>
    </div>

    <!-- OCR scan CTA -->
    <button class="relative overflow-hidden bg-surface-card rounded-xl p-4 shadow-sm text-left w-full flex items-center justify-between gap-3" @click="scanOpen = true">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
          <UIcon name="i-lucide-scan-line" class="size-5" />
        </div>
        <div>
          <p class="font-label-lg text-on-surface">{{ $t('tickets.scan') }}</p>
          <p class="font-body-sm text-on-surface-variant">{{ $t('tickets.scanDesc') }}</p>
        </div>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <span class="px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-label-base text-[10px] uppercase">Instantáneo</span>
        <UIcon name="i-lucide-chevron-right" class="text-outline-variant" />
      </div>
    </button>

    <!-- Tabs -->
    <div class="bg-surface-container-low rounded-full p-1 flex items-center">
      <button
        v-for="tabItem in tabs"
        :key="tabItem.value"
        class="flex-1 rounded-full py-1.5 font-label-base transition-colors"
        :class="tab === tabItem.value ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant'"
        @click="tab = tabItem.value"
      >
        {{ tabItem.label }} <span class="opacity-70">{{ tabItem.count }}</span>
      </button>
    </div>

    <div class="space-y-3">
      <div v-for="i in items" :key="i.id" class="bg-surface-card rounded-xl p-4 shadow-sm">
        <div class="flex items-start justify-between gap-2">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-gauge" class="size-4 text-status-error" />
            <span class="font-label-lg text-on-surface">BOLETA #{{ i.number.split('-').pop() }}</span>
          </div>
          <span class="px-2 py-0.5 rounded-full font-label-base uppercase" :class="statusPillClass(i.status)">{{ i.status }}</span>
        </div>
        <h4 class="font-headline-sm text-on-surface mt-1">{{ i.article }}</h4>
        <p class="font-body-sm text-on-surface-variant">{{ i.description }}</p>

        <div class="mt-3 bg-surface-container-low rounded-lg p-2.5 flex items-center gap-3">
          <div class="w-14 h-10 rounded bg-surface-container-highest flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-camera" class="size-4 text-on-surface-variant" />
          </div>
          <div class="min-w-0 text-[11px] text-on-surface-variant leading-tight">
            <p>Inspector: <span class="font-semibold text-on-surface">Unidad DNTT</span></p>
            <p>Fecha: {{ i.date }} · Vehículo: {{ i.vehiclePlate }}</p>
          </div>
        </div>

        <div class="flex items-center justify-between mt-3 pt-3 border-t border-border-subtle">
          <div>
            <p class="font-body-sm text-on-surface-variant">{{ $t('tickets.totalToPay') }}</p>
            <p class="font-headline-sm text-on-surface">${{ i.originalAmount.toFixed(2) }}</p>
          </div>
          <div v-if="i.status === 'Pendiente'" class="flex gap-2">
            <button class="px-3 py-2 rounded-lg bg-surface-container text-on-surface-variant font-label-base flex items-center gap-1.5">
              <UIcon name="i-lucide-scale" class="size-4" />{{ $t('tickets.dispute') }}
            </button>
            <UButton :to="`/pago/${i.id}`" size="sm" icon="i-lucide-credit-card" class="font-label-base">{{ $t('tickets.payNow') }}</UButton>
          </div>
        </div>
      </div>
      <p v-if="!items.length" class="text-center text-on-surface-variant font-body-sm py-8">—</p>
    </div>

    <div class="bg-primary-container/10 border border-primary-container/30 rounded-xl p-3.5 flex items-start gap-2.5">
      <UIcon name="i-lucide-shield-check" class="size-5 text-primary shrink-0 mt-0.5" />
      <div>
        <p class="font-label-lg text-on-surface">Interconexión Única Ciudadana</p>
        <p class="font-body-sm text-on-surface-variant">Tus documentos de Registro Único Vehicular y Cédula están sincronizados. No requerimos volver a escribir tus datos personales.</p>
      </div>
    </div>

    <USlideover v-model:open="scanOpen" side="bottom">
      <template #content>
        <div class="p-5 pb-[max(env(safe-area-inset-bottom),1.25rem)] space-y-4">
          <p class="font-label-lg text-on-surface">{{ $t('tickets.scan') }}</p>
          <UFormField label="Número de Control" required>
            <UInput v-model="controlNumber" placeholder="ATTT-2024-XXXXX" class="w-full" />
          </UFormField>
          <UFormField label="Fotografía de la Boleta" required>
            <div
              class="border-2 border-dashed border-border-subtle rounded-lg p-6 text-center cursor-pointer hover:border-primary"
              @click="fileAttached = true"
            >
              <UIcon :name="fileAttached ? 'i-lucide-check-circle-2' : 'i-lucide-camera'" :class="fileAttached ? 'text-status-success' : 'text-on-surface-variant'" class="size-8 mx-auto mb-2" />
              <p class="font-body-sm text-on-surface-variant">{{ fileAttached ? 'Imagen adjunta ✓' : 'Tomar foto / adjuntar imagen' }}</p>
            </div>
          </UFormField>
          <UButton block :loading="loading" :disabled="!controlNumber || !fileAttached" @click="submitScan">
            {{ loading ? $t('common.loadingConnection') : $t('common.confirm') }}
          </UButton>
        </div>
      </template>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()
const infractionStore = useInfractionStore()
const { loading, run } = useFakeTransaction()
const { t } = useI18n()

const tab = ref('active')
const tabs = computed(() => [
  { label: t('tickets.active'), value: 'active', count: infractionStore.active.length },
  { label: t('tickets.history'), value: 'history', count: infractionStore.history.length },
  { label: t('tickets.courts'), value: 'courts', count: infractionStore.courts.length }
])
const items = computed(() => ({
  active: infractionStore.active,
  history: infractionStore.history,
  courts: infractionStore.courts
}[tab.value as 'active' | 'history' | 'courts'] ?? []))

function statusPillClass (status: string) {
  if (status === 'Pendiente') return 'bg-status-warning/15 text-status-warning'
  if (status === 'Pagado') return 'bg-status-success/15 text-status-success'
  return 'bg-status-error/15 text-status-error'
}

const scanOpen = ref(false)
const controlNumber = ref('')
const fileAttached = ref(false)

async function submitScan () {
  await run({ delay: 2000, success: 'Boleta registrada exitosamente · Lista para pago' })
  scanOpen.value = false
  controlNumber.value = ''
  fileAttached.value = false
}
</script>

