<template>
  <div class="space-y-4">
    <CitizenGovBanner />

    <!-- Priority ticket alert -->
    <div v-if="alertTicket" class="relative overflow-hidden bg-surface-card rounded-xl p-4 shadow-sm">
      <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-status-warning" />
      <div class="flex items-start justify-between gap-2">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 rounded-lg bg-status-warning/10 flex items-center justify-center text-status-warning shrink-0">
            <UIcon name="i-lucide-triangle-alert" class="size-5" />
          </div>
          <div>
            <div class="flex items-center space-x-2">
              <span class="font-label-lg text-on-surface">{{ $t('dashboard.ticketAlert') }}</span>
              <span class="px-2 py-0.5 rounded-full bg-status-warning/15 text-status-warning font-label-base uppercase">{{ alertTicket.hoursRemaining }}h Restantes</span>
            </div>
            <p class="font-body-sm text-on-surface-variant mt-0.5">Boleta #{{ alertTicket.number }} • {{ alertTicket.article }}</p>
          </div>
        </div>
        <span class="font-headline-sm text-on-surface shrink-0">${{ alertTicket.originalAmount.toFixed(2) }}</span>
      </div>

      <div class="mt-3 bg-surface-container-low rounded-lg p-2.5 flex items-center justify-between text-on-surface-variant">
        <div class="flex items-center space-x-1.5 text-status-success">
          <UIcon name="i-lucide-percent" class="size-4" />
          <span class="font-label-base">{{ alertTicket.promptDiscount }}% {{ $t('dashboard.discount') }}</span>
        </div>
        <span class="font-body-sm line-through text-outline">${{ alertTicket.originalAmount.toFixed(2) }}</span>
      </div>

      <div class="mt-3 flex gap-2">
        <UButton :to="`/pago/${alertTicket.id}`" block color="primary" icon="i-lucide-credit-card" class="flex-1 min-h-11 justify-center font-label-lg">
          Pagar con Tarjeta / Clave
        </UButton>
        <UButton color="neutral" variant="subtle" icon="i-lucide-info" square class="w-11 h-11 shrink-0" />
      </div>
    </div>

    <!-- Digital driver identity card -->
    <div class="relative overflow-hidden rounded-xl bg-primary text-on-primary p-4 shadow-md">
      <img src="/logo-attt.png" alt="" class="absolute -right-6 -bottom-6 w-36 h-36 opacity-10 pointer-events-none object-contain">

      <div class="flex items-start justify-between relative z-10">
        <div class="flex items-center space-x-3">
          <div class="relative w-12 h-12 rounded-xl overflow-hidden bg-primary-container shrink-0 shadow-inner">
            <img :src="auth.driver.photo" class="w-full h-full object-cover" alt="">
            <span class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-status-success" />
          </div>
          <div>
            <div class="flex items-center space-x-1.5">
              <span class="font-label-base tracking-widest text-on-primary-container uppercase">Cédula Ciudadana</span>
              <span class="px-1.5 py-0.5 rounded bg-status-success/20 text-status-success text-[10px] font-bold">{{ auth.driver.status }}</span>
            </div>
            <h2 class="font-headline-sm text-on-primary leading-tight">{{ auth.driver.cedula }}</h2>
            <p class="font-body-sm text-primary-fixed uppercase">{{ auth.driver.fullName }}</p>
          </div>
        </div>
        <button aria-label="Abrir QR para verificación policial" class="bg-primary-container text-on-primary p-2 rounded-lg flex flex-col items-center justify-center active:scale-95 transition-transform shadow-sm">
          <UIcon name="i-lucide-qr-code" class="size-6" />
          <span class="text-[10px] text-primary-fixed mt-0.5 font-bold">INSPECCIÓN</span>
        </button>
      </div>

      <div class="mt-4 pt-3 grid grid-cols-3 gap-2 relative z-10 bg-primary-container/40 rounded-lg p-2.5">
        <div>
          <span class="text-[11px] text-primary-fixed block uppercase font-medium">Categorías</span>
          <div class="flex items-center space-x-1 mt-0.5">
            <span v-for="c in auth.driver.categories" :key="c" class="px-1.5 py-0.5 rounded bg-surface-card text-primary font-label-code">TIPO {{ c }}</span>
          </div>
        </div>
        <div>
          <span class="text-[11px] text-primary-fixed block uppercase font-medium">Vencimiento</span>
          <span class="font-label-lg text-on-primary block mt-0.5 uppercase">{{ new Date(auth.driver.licenseExpiry).toLocaleDateString('es-PA', { month: 'short', year: 'numeric' }) }}</span>
        </div>
        <div>
          <span class="text-[11px] text-primary-fixed block uppercase font-medium">Historial</span>
          <span class="font-label-base text-status-success flex items-center mt-0.5"><UIcon name="i-lucide-badge-check" class="size-4 mr-0.5" />Paz y Salvo</span>
        </div>
      </div>

      <div class="mt-3.5 relative z-10">
        <div class="flex items-center justify-between mb-1">
          <div class="flex items-center space-x-1.5">
            <UIcon name="i-lucide-gauge" class="size-4 text-primary-fixed" />
            <span class="font-label-base text-primary-fixed">{{ $t('dashboard.points') }}</span>
          </div>
          <span class="font-label-lg text-on-primary">{{ auth.driver.points }} <span class="text-primary-fixed font-normal font-body-sm">/ {{ auth.driver.maxPoints }} máx</span></span>
        </div>
        <div class="w-full h-2.5 rounded-full bg-primary-container overflow-hidden p-0.5 flex">
          <div class="h-full rounded-full bg-gradient-to-r from-status-success to-status-warning" :style="{ width: `${pointsPct}%` }" />
        </div>
        <div class="flex justify-between items-center mt-1">
          <span class="text-[11px] text-primary-fixed">{{ $t('dashboard.pointsMax') }}</span>
          <span class="text-[11px] text-status-warning font-semibold">{{ $t('dashboard.suspension') }}</span>
        </div>
      </div>
    </div>

    <!-- Quick services -->
    <div>
      <div class="flex items-center justify-between mb-2">
        <h3 class="font-headline-sm text-on-surface">{{ $t('dashboard.quickServices') }}</h3>
        <span class="font-label-base text-secondary">SIGED Oficial</span>
      </div>
      <div class="grid grid-cols-2 gap-2.5">
        <NuxtLink to="/tramites" class="bg-surface-card p-3 rounded-xl shadow-sm text-left flex flex-col justify-between active:scale-[0.98] transition-transform group">
          <div class="flex items-start justify-between w-full">
            <div class="w-10 h-10 rounded-xl bg-status-success/15 flex items-center justify-center text-status-success">
              <UIcon name="i-lucide-file-check-2" class="size-6" />
            </div>
            <span class="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-bold group-hover:bg-primary group-hover:text-on-primary transition-colors">$0.25</span>
          </div>
          <div class="mt-2.5">
            <span class="font-label-lg text-on-surface block leading-snug">Paz y Salvo Express</span>
            <span class="font-body-sm text-on-surface-variant block mt-0.5">Certificado SIGED con QR</span>
          </div>
        </NuxtLink>

        <NuxtLink to="/boletas" class="bg-surface-card p-3 rounded-xl shadow-sm text-left flex flex-col justify-between active:scale-[0.98] transition-transform group">
          <div class="flex items-start justify-between w-full">
            <div class="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary">
              <UIcon name="i-lucide-scan-line" class="size-6" />
            </div>
            <span class="px-2 py-0.5 rounded-full bg-status-warning/20 text-status-warning text-[10px] font-bold uppercase">Instantáneo</span>
          </div>
          <div class="mt-2.5">
            <span class="font-label-lg text-on-surface block leading-snug">Escanear Boleta</span>
            <span class="font-body-sm text-on-surface-variant block mt-0.5">OCR sin esperar 24 hrs</span>
          </div>
        </NuxtLink>

        <NuxtLink to="/vehiculos" class="bg-surface-card p-3 rounded-xl shadow-sm text-left flex flex-col justify-between active:scale-[0.98] transition-transform group">
          <div class="flex items-start justify-between w-full">
            <div class="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
              <UIcon name="i-lucide-car" class="size-6" />
            </div>
            <UIcon name="i-lucide-chevron-right" class="text-outline-variant size-[18px]" />
          </div>
          <div class="mt-2.5">
            <span class="font-label-lg text-on-surface block leading-snug">e-Car Check</span>
            <span class="font-body-sm text-on-surface-variant block mt-0.5">Revisado vehicular 3Tech</span>
          </div>
        </NuxtLink>

        <NuxtLink to="/vehiculos" class="bg-surface-card p-3 rounded-xl shadow-sm text-left flex flex-col justify-between active:scale-[0.98] transition-transform group">
          <div class="flex items-start justify-between w-full">
            <div class="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary">
              <UIcon name="i-lucide-shield" class="size-6" />
            </div>
            <UIcon name="i-lucide-chevron-right" class="text-outline-variant size-[18px]" />
          </div>
          <div class="mt-2.5">
            <span class="font-label-lg text-on-surface block leading-snug">Estatus Póliza</span>
            <span class="font-body-sm text-on-surface-variant block mt-0.5">Validación APADEA en vivo</span>
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Fleet summary -->
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <h3 class="font-headline-sm text-on-surface">{{ $t('dashboard.myFleet') }}</h3>
          <span class="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-base">{{ vehicleStore.vehicles.length }} Registrados</span>
        </div>
        <NuxtLink to="/vehiculos" class="font-label-base text-secondary flex items-center">
          {{ $t('dashboard.manage') }}
          <UIcon name="i-lucide-chevron-right" class="size-4 ml-0.5" />
        </NuxtLink>
      </div>

      <NuxtLink v-for="v in vehicleStore.vehicles" :key="v.id" to="/vehiculos" class="block bg-surface-card rounded-xl p-4 shadow-sm relative overflow-hidden">
        <div class="flex items-start justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-14 h-14 rounded-lg bg-surface-container flex items-center justify-center overflow-hidden shrink-0">
              <UIcon name="i-lucide-car" class="size-7 text-on-surface-variant" />
            </div>
            <div>
              <div class="flex items-center space-x-2">
                <span class="font-label-code px-2 py-0.5 rounded font-bold tracking-wider" :class="v.ecarcheck.status === 'APROBADO' ? 'bg-primary text-on-primary' : 'bg-surface-container-highest text-on-surface'">{{ v.plate }}</span>
                <span class="font-label-base font-bold flex items-center" :class="v.ecarcheck.status === 'APROBADO' ? 'text-status-success' : 'text-status-warning'">
                  <span class="w-1.5 h-1.5 rounded-full mr-1" :class="v.ecarcheck.status === 'APROBADO' ? 'bg-status-success' : 'bg-status-warning'" />
                  {{ v.ecarcheck.status === 'APROBADO' ? 'En Regla' : 'Revisado Próximo' }}
                </span>
              </div>
              <h4 class="font-headline-sm text-on-surface mt-0.5">{{ v.brand }} {{ v.model }} {{ v.year }}</h4>
              <span class="font-body-sm text-on-surface-variant">{{ v.type }} • {{ v.municipality }}</span>
            </div>
          </div>
        </div>

        <div class="mt-3 pt-3 grid grid-cols-2 gap-2 bg-surface-container-low p-2.5 rounded-lg">
          <div class="flex items-center space-x-2">
            <div class="w-6 h-6 rounded-full flex items-center justify-center shrink-0" :class="v.ecarcheck.status === 'APROBADO' ? 'bg-status-success/20 text-status-success' : 'bg-status-warning/20 text-status-warning'">
              <UIcon :name="v.ecarcheck.status === 'APROBADO' ? 'i-lucide-check' : 'i-lucide-history'" class="size-3.5" />
            </div>
            <div class="min-w-0">
              <span class="text-[11px] font-bold block truncate" :class="v.ecarcheck.status === 'APROBADO' ? 'text-on-surface' : 'text-status-warning'">{{ v.ecarcheck.status === 'APROBADO' ? 'Revisado 3Tech QR' : 'Revisado próximo' }}</span>
              <span class="text-[10px] text-on-surface-variant block">Vigente hasta {{ v.ecarcheck.validUntil }}</span>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-6 h-6 rounded-full bg-status-success/20 text-status-success flex items-center justify-center shrink-0">
              <UIcon name="i-lucide-shield" class="size-3.5" />
            </div>
            <div class="min-w-0">
              <span class="text-[11px] font-bold block truncate text-on-surface">Póliza {{ v.insurance.provider.split(' ')[1] ?? v.insurance.provider }}</span>
              <span class="text-[10px] text-on-surface-variant block">{{ v.insurance.policyNumber }}</span>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Blockchain layer promo -->
    <NuxtLink to="/blockchain" class="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary-950 via-primary to-primary-container p-4 flex items-center justify-between gap-3 shadow-sm">
      <div class="flex items-center gap-3">
        <div class="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
          <UIcon name="i-lucide-link-2" class="size-6 text-white" />
        </div>
        <div>
          <span class="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-white uppercase font-bold tracking-wider">{{ $t('blockchain.navBadge') }}</span>
          <p class="font-label-lg text-white mt-0.5">{{ $t('blockchain.heroTitle') }}</p>
        </div>
      </div>
      <UIcon name="i-lucide-chevron-right" class="text-white/70 size-5 shrink-0" />
    </NuxtLink>

    <!-- Roadside checkpoint banner -->
    <div class="bg-gradient-to-r from-primary-container to-secondary p-4 rounded-xl text-on-primary flex items-center justify-between shadow-sm">
      <div class="space-y-0.5 max-w-[70%]">
        <div class="flex items-center space-x-1">
          <UIcon name="i-lucide-shield-alert" class="size-[18px] text-secondary-fixed" />
          <span class="text-[11px] text-secondary-fixed uppercase font-bold tracking-wider">Control Policial</span>
        </div>
        <h4 class="font-headline-sm font-bold">{{ $t('dashboard.checkpointMode') }}</h4>
        <p class="font-body-sm text-primary-fixed">{{ $t('dashboard.checkpointDesc') }}</p>
      </div>
      <NuxtLink to="/licencia" class="w-12 h-12 rounded-full bg-surface-card/10 flex items-center justify-center shrink-0">
        <UIcon name="i-lucide-smartphone" class="size-7 text-on-primary" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const auth = useAuthStore()
const vehicleStore = useVehicleStore()
const infractionStore = useInfractionStore()

const alertTicket = computed(() => infractionStore.active[0])
const pointsPct = computed(() => Math.round((auth.driver.points / auth.driver.maxPoints) * 100))
</script>


