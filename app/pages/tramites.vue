<template>
  <div class="space-y-5">
    <CitizenGovBanner />

    <!-- Digital License Credential -->
    <section class="flex flex-col gap-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1.5">
          <UIcon name="i-lucide-badge" class="size-5 text-secondary" />
          <h2 class="font-headline-sm text-primary">{{ $t('procedures.digitalLicense') }}</h2>
        </div>
        <span class="font-label-base text-secondary">Oficial Sertracen</span>
      </div>

      <div class="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-primary via-primary-container to-[#001730] text-on-primary p-4">
        <div class="relative flex items-center justify-between pb-3 border-b border-on-primary/15">
          <div class="flex items-center gap-2.5">
            <img src="/logo-attt.png" alt="ATTT" class="w-8 h-8 object-contain rounded-full">
            <div class="flex flex-col">
              <span class="font-label-code text-[10px] tracking-wider uppercase text-inverse-primary">República de Panamá</span>
              <span class="font-label-lg leading-tight tracking-tight text-on-primary">AUTORIDAD DEL TRÁNSITO Y TRANSPORTE TERRESTRE</span>
            </div>
          </div>
          <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-300 via-secondary-container to-rose-300 p-0.5 flex items-center justify-center shadow-md shrink-0">
            <div class="w-full h-full rounded-full bg-primary/40 backdrop-blur-sm flex items-center justify-center">
              <span class="font-label-code text-[9px] text-on-primary font-bold">ATTT</span>
            </div>
          </div>
        </div>

        <div class="relative pt-3 flex gap-3.5">
          <div class="flex flex-col items-center shrink-0">
            <div class="w-20 h-24 rounded-xl overflow-hidden bg-surface-container-high relative shadow-md">
              <img :src="auth.driver.photo" class="w-full h-full object-cover" alt="">
              <div class="absolute bottom-0 inset-x-0 bg-primary/85 py-0.5 text-center">
                <span class="font-label-code text-[9px] text-inverse-primary tracking-widest">{{ auth.driver.cedula }}</span>
              </div>
            </div>
            <span class="text-[10px] text-on-primary-container mt-1 uppercase tracking-wider font-semibold">Conductor</span>
          </div>

          <div class="flex-1 flex flex-col justify-between min-w-0">
            <div>
              <span class="text-[10px] text-secondary-fixed uppercase">Nombre Completo</span>
              <h3 class="font-headline-sm text-on-primary truncate">{{ auth.driver.fullName.toUpperCase() }}</h3>
            </div>
            <div class="flex items-center gap-1.5 py-1">
              <span class="text-[10px] text-surface-variant uppercase">Categorías:</span>
              <div class="flex gap-1">
                <span v-for="c in auth.driver.categories" :key="c" class="px-2 py-0.5 rounded-md bg-secondary text-on-secondary font-label-code">TIPO {{ c }}</span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2 pt-1 border-t border-on-primary/10">
              <div class="flex flex-col">
                <span class="text-[10px] text-surface-variant uppercase">Donante</span>
                <div class="flex items-center gap-1">
                  <UIcon name="i-lucide-heart" class="size-3.5 text-panama-red" />
                  <span class="font-label-code text-on-primary">{{ auth.driver.donor ? 'SÍ' : 'NO' }}</span>
                </div>
              </div>
              <div class="flex flex-col">
                <span class="text-[10px] text-surface-variant uppercase">G. Sanguíneo</span>
                <div class="flex items-center gap-1">
                  <UIcon name="i-lucide-droplet" class="size-3.5 text-secondary-fixed" />
                  <span class="font-label-code text-on-primary">{{ auth.driver.bloodType }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="shrink-0 flex flex-col items-center justify-center pl-1 border-l border-on-primary/10">
            <div class="bg-surface-card p-1.5 rounded-lg shadow-sm">
              <UIcon name="i-lucide-qr-code" class="size-12 text-primary" />
            </div>
            <span class="text-[9px] text-inverse-primary text-center mt-1 uppercase">SIGED QR</span>
          </div>
        </div>

        <div class="relative mt-3 pt-2.5 border-t border-on-primary/15 flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <UIcon name="i-lucide-calendar-check" class="size-3.5 text-secondary-fixed" />
            <span class="font-body-sm text-surface-variant">Vence: <strong class="text-on-primary">{{ auth.driver.licenseExpiry }}</strong></span>
          </div>
          <span class="font-label-code text-[11px] text-emerald-300 uppercase tracking-widest font-semibold flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-status-success inline-block" /> VIGENTE
          </span>
        </div>
      </div>

      <!-- Points gauge -->
      <div class="bg-surface-card rounded-2xl p-4 shadow-sm flex flex-col gap-3">
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <span class="font-label-base text-on-surface-variant uppercase font-semibold">{{ $t('dashboard.points') }}</span>
            <div class="flex items-baseline gap-1.5 mt-0.5">
              <span class="font-headline-md text-primary font-bold">{{ auth.driver.points }}</span>
              <span class="font-body-base text-on-surface-variant">/ {{ auth.driver.maxPoints }} pts permitidos</span>
            </div>
          </div>
          <span class="font-label-base text-status-success bg-status-success/15 px-2.5 py-1 rounded-full font-bold">{{ auth.driver.maxPoints - auth.driver.points }} Puntos Libres</span>
        </div>
        <div class="w-full h-2.5 rounded-full bg-surface-container overflow-hidden">
          <div class="h-full bg-secondary rounded-full transition-all duration-500" :style="{ width: `${(auth.driver.points / auth.driver.maxPoints) * 100}%` }" />
        </div>
        <div class="bg-surface-container-low rounded-xl p-3 flex items-start gap-2.5">
          <div class="w-6 h-6 rounded-full bg-status-success/15 text-status-success flex items-center justify-center shrink-0 mt-0.5">
            <UIcon name="i-lucide-check-circle-2" class="size-4" />
          </div>
          <div class="flex-1 flex flex-col">
            <span class="font-label-lg text-primary">Apto para renovación en línea</span>
            <p class="font-body-sm text-on-surface-variant mt-0.5">Cumple con la normativa SERTRACEN (menos de 50 puntos y sin retención cautelar). Puede tramitar su duplicado o renovación a domicilio.</p>
            <button class="mt-2.5 self-start px-3 py-1.5 rounded-lg bg-primary text-on-primary font-label-base flex items-center gap-1 hover:bg-primary-container transition-colors" :disabled="auth.driver.points >= 50">
              <span>{{ $t('procedures.renewLicense') }}</span>
              <UIcon name="i-lucide-arrow-right" class="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- SIGED documents -->
    <section class="flex flex-col gap-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1.5">
          <UIcon name="i-lucide-folder-lock" class="size-5 text-secondary" />
          <h2 class="font-headline-sm text-primary">{{ $t('procedures.documents') }}</h2>
        </div>
        <span class="font-label-base text-on-surface-variant">Validez Legal Inmediata</span>
      </div>

      <div class="bg-surface-card rounded-2xl p-4 shadow-sm flex flex-col gap-3.5">
        <div class="flex items-start justify-between gap-2">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
              <UIcon name="i-lucide-file-check-2" class="size-6" />
            </div>
            <div class="flex flex-col">
              <div class="flex items-center gap-2">
                <h3 class="font-headline-sm text-primary">{{ $t('procedures.pazSalvo') }}</h3>
                <span class="px-2 py-0.5 rounded-full bg-status-success/15 text-status-success font-label-base text-[11px] font-bold">0 DEUDAS</span>
              </div>
              <span class="font-body-sm text-on-surface-variant">Costo oficial ATTT: $0.25 (Caja de Ahorros / Visa / MC)</span>
            </div>
          </div>
          <span class="font-headline-md text-primary font-bold shrink-0">$0.25</span>
        </div>
        <div class="bg-surface-container-low rounded-xl p-3 flex items-center justify-between font-body-sm text-on-surface-variant">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-gavel" class="size-4 text-status-success" />
            <span>Historial limpio de boletas y desacatos</span>
          </div>
          <span class="font-label-code text-secondary font-bold">CERT-2025-998</span>
        </div>
        <button class="w-full py-3 px-4 rounded-xl bg-primary text-on-primary font-label-lg flex items-center justify-center gap-2 shadow-sm hover:bg-primary-container active:scale-[0.99] transition-all" @click="openPay(t('procedures.pazSalvo'), 0.25)">
          <UIcon name="i-lucide-qr-code" class="size-[18px]" />
          <span>Descargar Paz y Salvo con QR de Autenticidad</span>
        </button>
      </div>

      <div class="bg-surface-card rounded-2xl p-4 shadow-sm flex flex-col gap-3.5">
        <div class="flex items-start justify-between gap-2">
          <div class="flex items-center gap-3">
            <div class="w-11 h-11 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
              <UIcon name="i-lucide-scroll-text" class="size-6" />
            </div>
            <div class="flex flex-col">
              <div class="flex items-center gap-2">
                <h3 class="font-headline-sm text-primary">{{ $t('procedures.history') }}</h3>
                <span class="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-label-base text-[11px] font-bold">EMBAJADAS</span>
              </div>
              <span class="font-body-sm text-on-surface-variant">Sello digital ATTT con QR para trámites consulares o empleo</span>
            </div>
          </div>
          <span class="font-headline-md text-primary font-bold shrink-0">$1.00</span>
        </div>
        <div class="bg-surface-container-low rounded-xl p-3 flex flex-col gap-1 font-body-sm text-on-surface-variant">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-badge-check" class="size-4 text-secondary" />
            <span>Apostilla digital disponible mediante firma electrónica calificada</span>
          </div>
          <div class="flex items-center gap-2 text-[11px] text-outline">
            <UIcon name="i-lucide-clock" class="size-3.5" />
            <span>Generación inmediata en formato PDF protegido</span>
          </div>
        </div>
        <button class="w-full py-3 px-4 rounded-xl bg-secondary text-on-secondary font-label-lg flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-all" @click="openPay(t('procedures.history'), 1.00)">
          <UIcon name="i-lucide-credit-card" class="size-[18px]" />
          <span>Solicitar y Pagar ($1.00)</span>
        </button>
      </div>
    </section>

    <!-- Weights and dimensions -->
    <section class="flex flex-col gap-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1.5">
          <UIcon name="i-lucide-truck" class="size-5 text-secondary" />
          <h2 class="font-headline-sm text-primary">{{ $t('procedures.weights') }}</h2>
        </div>
        <span class="font-label-base text-panama-red font-bold">Pueblos 2000</span>
      </div>

      <div class="bg-surface-card rounded-2xl p-4 shadow-sm flex flex-col gap-3.5">
        <div class="flex items-start gap-3">
          <div class="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shrink-0">
            <UIcon name="i-lucide-weight" class="size-6" />
          </div>
          <div class="flex-1 flex flex-col">
            <div class="flex items-center justify-between">
              <h3 class="font-headline-sm text-primary leading-tight">Permiso de Pesas y Dimensiones</h3>
              <span class="font-headline-sm text-primary font-bold">$20.00</span>
            </div>
            <span class="font-body-sm text-on-surface-variant mt-0.5">Vehículos de más de 6 llantas, volquetes, mulas y carga pesada</span>
          </div>
        </div>

        <div class="bg-surface-container rounded-xl p-3.5 flex flex-col gap-2.5">
          <span class="font-label-base text-primary uppercase font-bold flex items-center gap-1">
            <UIcon name="i-lucide-network" class="size-4" />
            Requisito de Configuración de Ejes
          </span>
          <div class="p-3 bg-surface-card rounded-lg flex items-center justify-between">
            <div class="flex items-center gap-2.5 min-w-0">
              <UIcon name="i-lucide-upload" class="size-5 text-secondary" />
              <div class="flex flex-col min-w-0">
                <span class="font-label-lg text-primary truncate">Diagrama_Ejes_Mula_T3S2.pdf</span>
                <span class="font-body-sm text-status-success">Archivo verificado con éxito (2.4 MB)</span>
              </div>
            </div>
            <button class="px-2 py-1 rounded bg-surface-container text-on-surface-variant font-label-base hover:text-primary">Cambiar</button>
          </div>
          <div class="flex items-center justify-between px-1 font-body-sm text-on-surface-variant">
            <span>Inspección Físico-Mecánica</span>
            <span class="font-label-base text-primary font-semibold">Vigente 2025</span>
          </div>
        </div>

        <div class="bg-surface-container-low rounded-xl p-3 flex items-center justify-between gap-2">
          <div class="flex items-center gap-2 min-w-0">
            <UIcon name="i-lucide-calendar-check-2" class="size-5 text-on-tertiary-container shrink-0" />
            <div class="flex flex-col min-w-0">
              <span class="font-label-lg text-primary truncate">Cita Express sin filas</span>
              <span class="font-body-sm text-on-surface-variant">Sede ATTT Pueblos 2000 · Carril 3</span>
            </div>
          </div>
          <span class="px-2.5 py-1 rounded-full bg-on-tertiary-container/10 text-on-tertiary-container font-label-base text-[11px] font-bold shrink-0">DISPONIBLE HOY</span>
        </div>

        <button
          class="w-full py-3 px-4 rounded-xl bg-primary-container text-on-primary font-label-lg flex items-center justify-center gap-2 shadow-sm hover:bg-primary active:scale-[0.99] transition-all disabled:opacity-60"
          :disabled="loading"
          @click="run({ success: 'Cita Express agendada ✓' })"
        >
          <UIcon :name="loading ? 'i-lucide-loader-2' : 'i-lucide-credit-card'" class="size-[18px]" :class="{ 'animate-spin': loading }" />
          <span>{{ loading ? $t('common.loadingConnection') : 'Pagar Tasa de $20.00 y Agendar Cita Express' }}</span>
        </button>
      </div>
    </section>

    <UModal v-model:open="paymentOpen">
      <template #content>
        <div class="p-5 space-y-4">
          <p class="font-label-lg text-on-surface">{{ pendingDoc?.label }}</p>
          <UFormField label="Número de Tarjeta"><UInput placeholder="4000 1234 5678 9010" class="w-full" /></UFormField>
          <div class="grid grid-cols-2 gap-3">
            <UFormField label="Vencimiento"><UInput placeholder="MM/AA" class="w-full" /></UFormField>
            <UFormField label="CVV"><UInput placeholder="123" class="w-full" /></UFormField>
          </div>
          <UButton block :loading="loading" @click="confirmPay">
            {{ loading ? $t('common.loadingConnection') : `${$t('common.pay')} $${pendingDoc?.fee.toFixed(2)}` }}
          </UButton>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()
const { loading, run } = useFakeTransaction()
const { t } = useI18n()

const paymentOpen = ref(false)
const pendingDoc = ref<{ label: string, fee: number } | null>(null)

function openPay (label: string, fee: number) {
  pendingDoc.value = { label, fee }
  paymentOpen.value = true
}

async function confirmPay () {
  await run({ delay: 1800, success: `${pendingDoc.value?.label} · ${t('common.confirm')} ✓` })
  paymentOpen.value = false
  navigateTo('/tramites/paz-y-salvo')
}
</script>

