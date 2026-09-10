<template>
  <div class="space-y-4">
    <CitizenGovBanner />
    <UButton to="/boletas" color="neutral" variant="link" icon="i-lucide-arrow-left" class="px-0">{{ $t('common.back') }}</UButton>

    <div v-if="!ticket" class="text-center text-on-surface-variant py-10">—</div>

    <template v-else>
      <UAlert v-if="paid" color="success" variant="subtle" icon="i-lucide-check-circle-2" title="Pago Confirmado" description="Gravamen levantado en tiempo real ante la DNOT y RUVE." />

      <!-- Ticket breakdown -->
      <div class="bg-surface-card rounded-xl shadow-sm p-4 flex flex-col gap-3 relative overflow-hidden">
        <div class="flex items-start justify-between gap-2">
          <div class="flex flex-col min-w-0">
            <span class="font-label-code text-secondary tracking-wider uppercase">{{ $t('payment.official') }}</span>
            <span class="font-headline-sm text-primary font-bold truncate">#{{ ticket.number }}</span>
          </div>
          <span class="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-status-warning/15 text-status-warning font-label-base uppercase tracking-wider">
            <UIcon name="i-lucide-timer" class="size-3.5" /> {{ ticket.hoursRemaining }}h Restantes
          </span>
        </div>

        <div class="bg-surface-container-low rounded-lg p-3 flex flex-col gap-2">
          <div class="flex items-center justify-between text-on-surface font-body-sm">
            <span class="font-medium text-on-surface-variant flex items-center gap-1"><UIcon name="i-lucide-gauge" class="size-4" /> {{ ticket.article }}</span>
            <span class="font-medium">{{ ticket.location }}</span>
          </div>
          <div class="flex items-center justify-between text-on-surface font-body-sm">
            <span class="font-medium text-on-surface-variant flex items-center gap-1"><UIcon name="i-lucide-car" class="size-4" /> Vehículo</span>
            <span class="font-bold text-primary">{{ ticket.vehiclePlate }}</span>
          </div>
          <div class="flex items-center justify-between text-on-surface font-body-sm">
            <span class="font-medium text-on-surface-variant flex items-center gap-1"><UIcon name="i-lucide-badge" class="size-4" /> Conductor</span>
            <span class="font-medium text-right truncate">{{ auth.driver.fullName }} ({{ auth.driver.cedula }})</span>
          </div>
        </div>

        <div class="flex flex-col gap-1.5 pt-1">
          <div class="flex items-center justify-between font-body-sm text-on-surface-variant">
            <span>{{ $t('payment.originalAmount') }}</span>
            <span class="font-medium text-on-surface">${{ ticket.originalAmount.toFixed(2) }}</span>
          </div>
          <div class="flex items-center justify-between font-body-sm text-status-success font-medium">
            <span class="flex items-center gap-1"><UIcon name="i-lucide-percent" class="size-3.5" /> {{ $t('payment.promptDiscount') }}</span>
            <span>-${{ discountAmount.toFixed(2) }}</span>
          </div>
          <div class="flex items-center justify-between font-body-sm text-on-surface-variant">
            <span class="flex items-center gap-1"><UIcon name="i-lucide-repeat" class="size-3.5" /> {{ $t('payment.sigedFee') }}</span>
            <span class="font-medium text-on-surface">${{ sigedFee.toFixed(2) }}</span>
          </div>
          <div class="mt-1 pt-2 bg-surface-container rounded-lg px-3 py-2.5 flex items-center justify-between">
            <div class="flex flex-col">
              <span class="font-label-base text-on-surface-variant uppercase tracking-wider">{{ $t('payment.total') }}</span>
              <span class="font-body-sm text-status-success font-semibold flex items-center gap-0.5"><UIcon name="i-lucide-badge-check" class="size-3.5" /> Ahorro de ${{ discountAmount.toFixed(2) }}</span>
            </div>
            <span class="font-headline-lg text-primary font-bold tracking-tight">${{ total }}</span>
          </div>
        </div>
      </div>

      <!-- Instant lien release -->
      <div class="bg-primary text-on-primary rounded-xl p-4 shadow-sm flex flex-col gap-2">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-lock-open" class="size-5 text-secondary-container" />
          </div>
          <div class="flex flex-col min-w-0">
            <div class="flex items-center gap-1.5 flex-wrap">
              <h3 class="font-headline-sm text-on-primary font-semibold">{{ $t('payment.release') }}</h3>
              <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-status-success text-on-primary font-label-base font-bold">3s Real-Time</span>
            </div>
            <p class="font-body-sm text-on-primary/80 mt-0.5 leading-snug">Al completar esta transacción, la DNOT y el Registro Único Vehicular revocan toda traba legal de inmediato. Sin filas ni sellos presenciales.</p>
          </div>
        </div>
        <div class="flex items-center gap-2 pt-1 mt-1 bg-white/5 rounded-lg px-2.5 py-1.5">
          <span class="w-2 h-2 rounded-full bg-status-success shrink-0 animate-pulse" />
          <span class="font-label-base text-secondary-fixed tracking-wide truncate">Conexión activa con Red Telered Panamá &amp; SIGED Central ATTT</span>
        </div>
      </div>

      <!-- Payment method -->
      <div class="bg-surface-card rounded-xl shadow-sm p-4 flex flex-col gap-4">
        <div>
          <h2 class="font-headline-sm text-primary font-semibold">{{ $t('payment.method') }}</h2>
          <p class="font-body-sm text-on-surface-variant">Seleccione su canal bancario certificado en la República de Panamá</p>
        </div>

        <div class="grid grid-cols-3 gap-1.5 p-1 bg-surface-container-low rounded-lg">
          <button
            v-for="m in methodTabs"
            :key="m.value"
            class="flex flex-col items-center justify-center py-2 px-1 rounded-md font-label-lg transition-all"
            :class="method === m.value ? 'bg-surface-card text-secondary font-bold shadow-sm' : 'text-on-surface-variant hover:text-on-surface'"
            @click="method = m.value"
          >
            <UIcon :name="m.icon" class="size-5 mb-0.5" />
            <span class="truncate w-full text-center">{{ m.label }}</span>
          </button>
        </div>

        <div v-if="method === 'clave'" class="flex flex-col gap-3">
          <div class="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low">
            <div class="flex items-center gap-2 min-w-0">
              <span class="font-label-code bg-secondary text-on-secondary px-2 py-0.5 rounded font-black tracking-widest">CLAVE</span>
              <span class="font-body-sm text-on-surface font-medium truncate">Red Bancaria Nacional Telered</span>
            </div>
            <span class="font-label-base text-status-success font-semibold flex items-center gap-0.5"><UIcon name="i-lucide-zap" class="size-3.5" /> 0% Comisión</span>
          </div>
          <UFormField label="Banco Emisor">
            <USelect :items="['Banco General (Yappy / Débito Clave)', 'Caja de Ahorros', 'Banistmo', 'Global Bank', 'Multibank']" default-value="Banco General (Yappy / Débito Clave)" class="w-full" />
          </UFormField>
          <UFormField label="Número de Tarjeta Clave (16 dígitos)">
            <UInput placeholder="4000 1234 5678 9010" class="w-full" icon="i-lucide-credit-card" />
          </UFormField>
          <div class="grid grid-cols-2 gap-3">
            <UFormField label="PIN Digital / Token"><UInput type="password" placeholder="••••" class="w-full text-center" /></UFormField>
            <UFormField label="Cédula Titular"><UInput :model-value="auth.driver.cedula" class="w-full" /></UFormField>
          </div>
        </div>
        <div v-else-if="method === 'card'" class="flex flex-col gap-3">
          <UFormField label="Nombre Completo"><UInput placeholder="RICARDO A MORALES G" class="w-full uppercase" /></UFormField>
          <UFormField label="Número de Tarjeta"><UInput placeholder="4152 •••• •••• 8821" class="w-full" icon="i-lucide-credit-card" /></UFormField>
          <div class="grid grid-cols-2 gap-3">
            <UFormField label="Vencimiento"><UInput placeholder="MM/AA" class="w-full text-center" /></UFormField>
            <UFormField label="CVV"><UInput type="password" placeholder="•••" class="w-full text-center" /></UFormField>
          </div>
        </div>
        <div v-else class="font-body-sm text-on-surface-variant">
          Transferencia ACH Xpress / Punto Pago con liberación instantánea de gravamen.
        </div>

        <button
          class="w-full py-3.5 rounded-xl bg-primary text-on-primary font-label-lg flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-all disabled:opacity-60"
          :disabled="paid"
          @click="pay"
        >
          <UIcon :name="loading ? 'i-lucide-loader-2' : 'i-lucide-shield-check'" class="size-5" :class="{ 'animate-spin': loading }" />
          <span>{{ loading ? $t('common.loadingConnection') : `${$t('payment.payAndRelease')} $${total}` }}</span>
        </button>
        <div class="flex items-center justify-center gap-3 font-body-sm text-[11px] text-on-surface-variant">
          <span class="flex items-center gap-1"><UIcon name="i-lucide-lock" class="size-3.5" /> SSL 256-Bit</span>
          <span class="flex items-center gap-1"><UIcon name="i-lucide-badge-check" class="size-3.5" /> Telered Certificado</span>
          <span class="flex items-center gap-1"><UIcon name="i-lucide-landmark" class="size-3.5" /> Respaldado AIG</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const auth = useAuthStore()
const infractionStore = useInfractionStore()
const { loading, run } = useFakeTransaction()
const { t } = useI18n()

const ticket = computed(() => infractionStore.infractions.find(i => i.id === route.params.id))
const discountAmount = computed(() => ticket.value ? (ticket.value.originalAmount * ticket.value.promptDiscount / 100) : 0)
const sigedFee = 0.25
const total = computed(() => ticket.value ? (ticket.value.originalAmount - discountAmount.value + sigedFee).toFixed(2) : '0.00')

const methodTabs = [
  { label: 'Sistema Clave', value: 'clave', icon: 'i-lucide-key-round' },
  { label: 'Visa / MC', value: 'card', icon: 'i-lucide-credit-card' },
  { label: 'ACH Xpress', value: 'ach', icon: 'i-lucide-landmark' }
]
const method = ref('clave')
const paid = ref(false)

async function pay () {
  await run({ delay: 2200, success: t('payment.release') + ' · 3s Real-Time ✓' })
  if (ticket.value) ticket.value.status = 'Pagado'
  paid.value = true
}
</script>

