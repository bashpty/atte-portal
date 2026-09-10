<template>
  <div class="space-y-3">
    <CitizenGovBanner />

    <div v-for="v in vehicleStore.vehicles" :key="v.id" class="space-y-3">
      <!-- Vehicle identity card -->
      <div class="relative overflow-hidden rounded-xl bg-primary text-on-primary p-4 shadow-md">
        <img src="/logo-attt.png" alt="" class="absolute -right-6 -bottom-6 w-36 h-36 opacity-10 pointer-events-none object-contain">
        <div class="flex items-start justify-between relative z-10 gap-3">
          <div>
            <span class="text-[11px] text-primary-fixed uppercase tracking-widest font-medium">{{ v.municipality === 'Panamá' ? 'Municipio de Panamá' : v.municipality }}</span>
            <h2 class="font-headline-md text-on-primary leading-tight">{{ v.brand }} {{ v.model }} {{ v.year }}</h2>
            <p class="font-body-sm text-primary-fixed">{{ v.type }} · {{ v.color }}</p>
          </div>
          <div class="bg-surface-card rounded-lg px-3 py-2 text-center shrink-0">
            <span class="text-[9px] uppercase tracking-widest text-on-surface-variant font-bold block">PANAMÁ</span>
            <span class="font-headline-sm font-bold text-primary tracking-wider leading-none block">{{ v.plate }}</span>
            <span class="text-[8px] uppercase tracking-wider text-panama-red font-bold mt-0.5 block">{{ v.type.toUpperCase() }}</span>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-2 mt-4 pt-3 bg-primary-container/40 rounded-lg p-2.5 relative z-10">
          <div class="flex flex-col">
            <span class="font-label-base text-primary-fixed-dim">{{ $t('vehicles.vin') }}</span>
            <span class="font-label-code text-on-primary truncate">{{ v.vin }}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-label-base text-primary-fixed-dim">Color Oficial</span>
            <span class="font-label-lg text-on-primary truncate">{{ v.color }}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-label-base text-primary-fixed-dim">Revisado Vigente</span>
            <span class="font-label-lg text-status-success font-bold truncate">{{ v.ecarcheck.validUntil }}</span>
          </div>
        </div>
      </div>

      <!-- Sticker / Paz y Salvo quick action -->
      <div class="bg-surface-card rounded-xl p-3.5 shadow-sm flex items-center justify-between gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <div class="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-badge" class="size-5 text-secondary" />
          </div>
          <div class="min-w-0">
            <p class="font-label-lg text-on-surface truncate">Sticker Digital 2025</p>
            <p class="font-body-sm text-on-surface-variant truncate">Trámite listo para retirar o delivery</p>
          </div>
        </div>
        <UButton to="/tramites/paz-y-salvo" size="sm" color="secondary" icon="i-lucide-download" class="shrink-0 font-label-base">Paz y Salvo</UButton>
      </div>

      <!-- Accordion sections -->
      <div class="bg-surface-card rounded-xl shadow-sm overflow-hidden">
        <button class="w-full p-4 flex items-center justify-between text-left gap-3 hover:bg-surface-container-low transition-colors" @click="open.ecar = !open.ecar">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-10 h-10 rounded-full bg-status-success/15 flex items-center justify-center shrink-0">
              <UIcon name="i-lucide-clipboard-check" class="size-6 text-status-success" />
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <h4 class="font-headline-sm text-primary tracking-tight truncate">{{ $t('vehicles.ecarcheck') }}</h4>
                <span class="px-2 py-0.5 rounded-full bg-status-success/15 text-status-success font-label-base uppercase">{{ v.ecarcheck.status }}</span>
              </div>
              <p class="font-body-sm text-on-surface-variant truncate">82 puntos de seguridad reglamentaria · Válido hasta {{ v.ecarcheck.validUntil }}</p>
            </div>
          </div>
          <UIcon name="i-lucide-chevron-down" class="text-on-surface-variant transition-transform" :class="{ 'rotate-180': open.ecar }" />
        </button>
        <div v-show="open.ecar" class="px-4 pb-4 pt-1 space-y-3">
          <div class="bg-surface-container-low rounded-lg p-3 flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <UIcon name="i-lucide-check-circle-2" class="size-5 text-status-success" />
              <div>
                <p class="font-label-lg text-on-surface">Inspección Digital Acreditada</p>
                <p class="font-body-sm text-on-surface-variant">{{ v.ecarcheck.provider }}</p>
              </div>
            </div>
            <span class="font-label-code text-secondary font-bold">{{ v.ecarcheck.score }} OK</span>
          </div>
          <div class="grid grid-cols-2 gap-2 font-body-sm">
            <div class="p-2.5 rounded-lg bg-surface-container-lowest shadow-sm flex items-center justify-between">
              <span class="truncate text-on-surface">Frenos y Suspensión</span>
              <span class="font-label-base text-status-success font-bold shrink-0">{{ v.ecarcheck.brakes }}</span>
            </div>
            <div class="p-2.5 rounded-lg bg-surface-container-lowest shadow-sm flex items-center justify-between">
              <span class="truncate text-on-surface">Emisión de Gases</span>
              <span class="font-label-base text-status-success font-bold shrink-0">{{ v.ecarcheck.emissions }}</span>
            </div>
            <div class="p-2.5 rounded-lg bg-surface-container-lowest shadow-sm flex items-center justify-between">
              <span class="truncate text-on-surface">Neumáticos &amp; Labrado</span>
              <span class="font-label-base text-status-success font-bold shrink-0">{{ v.ecarcheck.tires }}</span>
            </div>
            <div class="p-2.5 rounded-lg bg-surface-container-lowest shadow-sm flex items-center justify-between">
              <span class="truncate text-on-surface">Luces &amp; Reflexivo</span>
              <span class="font-label-base text-status-success font-bold shrink-0">{{ v.ecarcheck.lights }}</span>
            </div>
          </div>
          <div class="bg-primary-container text-on-primary rounded-xl p-3.5 flex items-center justify-between gap-3">
            <div class="space-y-1 min-w-0">
              <div class="flex items-center gap-1.5">
                <UIcon name="i-lucide-qr-code" class="size-4 text-panama-red" />
                <span class="font-label-base uppercase tracking-wider text-primary-fixed">Token de Inspección Policial</span>
              </div>
              <p class="font-body-sm text-on-primary-container">Muestre este código criptográfico ante operativos en carretera.</p>
              <p class="font-label-code text-[11px] text-primary-fixed truncate">AUTH-3TECH-PA-2025-{{ v.plate }}-OK</p>
            </div>
            <div class="bg-surface-card p-1.5 rounded-lg shrink-0 shadow-md">
              <UIcon name="i-lucide-qr-code" class="size-14 text-primary" />
            </div>
          </div>
        </div>
      </div>

      <div class="bg-surface-card rounded-xl shadow-sm overflow-hidden">
        <button class="w-full p-4 flex items-center justify-between text-left gap-3 hover:bg-surface-container-low transition-colors" @click="open.insurance = !open.insurance">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center shrink-0">
              <UIcon name="i-lucide-shield-check" class="size-6 text-secondary" />
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <h4 class="font-headline-sm text-primary tracking-tight truncate">{{ $t('vehicles.insurance') }}</h4>
                <span class="px-2 py-0.5 rounded-full bg-status-success/15 text-status-success font-label-base uppercase">{{ v.insurance.status }}</span>
              </div>
              <p class="font-body-sm text-on-surface-variant truncate">{{ v.insurance.provider }} · {{ v.insurance.coverage }}</p>
            </div>
          </div>
          <UIcon name="i-lucide-chevron-down" class="text-on-surface-variant transition-transform" :class="{ 'rotate-180': open.insurance }" />
        </button>
        <div v-show="open.insurance" class="px-4 pb-4 pt-1 space-y-3">
          <div class="p-3.5 rounded-xl bg-surface-container-low space-y-2.5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-status-success" />
                <span class="font-label-lg text-on-surface font-semibold">{{ v.insurance.provider }}</span>
              </div>
              <span class="font-label-code text-secondary font-bold">#{{ v.insurance.policyNumber }}</span>
            </div>
            <div class="grid grid-cols-2 gap-2 font-body-sm pt-1">
              <div class="flex flex-col">
                <span class="font-label-base text-on-surface-variant">Modalidad</span>
                <span class="font-label-lg text-on-surface">{{ v.insurance.coverage }}</span>
              </div>
              <div class="flex flex-col">
                <span class="font-label-base text-on-surface-variant">Vencimiento Póliza</span>
                <span class="font-label-lg text-on-surface font-semibold">{{ v.insurance.validUntil }}</span>
              </div>
            </div>
            <div class="flex items-center gap-2 pt-2 text-on-surface-variant">
              <UIcon name="i-lucide-refresh-cw" class="size-4 text-status-success" />
              <span class="font-body-sm text-[11px] leading-tight">Interconectado en tiempo real con la Superintendencia de Seguros y Reaseguros de Panamá.</span>
            </div>
          </div>
          <div class="flex gap-2">
            <button class="flex-1 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-base flex items-center justify-center gap-1.5 transition-colors">
              <UIcon name="i-lucide-file-text" class="size-4 text-secondary" />
              <span>Ver Carátula de Póliza</span>
            </button>
            <button class="px-3 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-base flex items-center justify-center gap-1.5 transition-colors">
              <UIcon name="i-lucide-phone-call" class="size-4 text-panama-red" />
              <span>Asistencia Vial</span>
            </button>
          </div>
        </div>
      </div>

      <div class="bg-surface-card rounded-xl shadow-sm overflow-hidden">
        <button class="w-full p-4 flex items-center justify-between text-left gap-3 hover:bg-surface-container-low transition-colors" @click="open.tow = !open.tow">
          <div class="flex items-center gap-3 min-w-0">
            <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0" :class="v.tow.retained ? 'bg-status-error/15' : 'bg-status-success/15'">
              <UIcon name="i-lucide-truck" class="size-6" :class="v.tow.retained ? 'text-status-error' : 'text-status-success'" />
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <h4 class="font-headline-sm text-primary tracking-tight truncate">{{ $t('vehicles.towStatus') }}</h4>
                <span class="px-2 py-0.5 rounded-full font-label-base uppercase" :class="v.tow.retained ? 'bg-status-error/15 text-status-error' : 'bg-status-success/15 text-status-success'">{{ v.tow.retained ? 'Retenido' : 'Sin Retención' }}</span>
              </div>
              <p class="font-body-sm text-on-surface-variant truncate">{{ v.tow.retained ? v.tow.reason : 'Vehículo en regla · Ningún traslado registrado' }}</p>
            </div>
          </div>
          <UIcon name="i-lucide-chevron-down" class="text-on-surface-variant transition-transform" :class="{ 'rotate-180': open.tow }" />
        </button>
        <div v-show="open.tow" class="px-4 pb-4 pt-1 space-y-3">
          <div class="p-3.5 rounded-xl bg-status-success/10 flex items-start gap-3" v-if="!v.tow.retained">
            <UIcon name="i-lucide-check-circle-2" class="size-5 text-status-success shrink-0 mt-0.5" />
            <div class="space-y-0.5">
              <p class="font-label-lg text-status-success font-semibold">Vehículo en regla y en posesión de su propietario</p>
              <p class="font-body-sm text-on-surface-variant">No registra orden de acarreo por grúa, retención por mal estacionamiento ni estadía en corralones municipales de tránsito.</p>
            </div>
          </div>
          <div class="rounded-xl bg-surface-container-low p-3.5 space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-info" class="size-5 text-secondary" />
                <span class="font-label-lg text-primary">Protocolo de Asistencia y Retiro Oficial</span>
              </div>
              <span class="px-2 py-0.5 rounded bg-surface text-secondary font-label-base text-[11px] font-bold">DECRETO 640</span>
            </div>
            <p class="font-body-sm text-on-surface-variant">En caso de remoción involuntaria, la app emitirá una notificación en tiempo real con:</p>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div class="bg-surface-card p-2.5 rounded-lg flex items-start gap-2">
                <UIcon name="i-lucide-map-pin" class="size-4 text-secondary shrink-0 mt-0.5" />
                <div>
                  <p class="font-label-base text-on-surface font-semibold">Ubicación GPS Exacta</p>
                  <p class="font-body-sm text-[11px] text-on-surface-variant">Corralón municipal asignado (Patio San Miguelito / Juan Díaz).</p>
                </div>
              </div>
              <div class="bg-surface-card p-2.5 rounded-lg flex items-start gap-2">
                <UIcon name="i-lucide-banknote" class="size-4 text-secondary shrink-0 mt-0.5" />
                <div>
                  <p class="font-label-base text-on-surface font-semibold">Tarifa Regulada ATTT</p>
                  <p class="font-body-sm text-[11px] text-on-surface-variant">B/. 35.00 Livianos + B/. 5.00/día custodia. Sin recargos abusivos.</p>
                </div>
              </div>
              <div class="bg-surface-card p-2.5 rounded-lg flex items-start gap-2">
                <UIcon name="i-lucide-unlock" class="size-4 text-secondary shrink-0 mt-0.5" />
                <div>
                  <p class="font-label-base text-on-surface font-semibold">Retiro Sin Intermediarios</p>
                  <p class="font-body-sm text-[11px] text-on-surface-variant">Liberación instantánea pagando boletas desde esta misma plataforma.</p>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between pt-1">
              <span class="font-body-sm text-[11px] text-on-surface-variant">¿Desea consultar la red de patios oficiales?</span>
              <span class="font-label-base text-secondary font-semibold inline-flex items-center gap-1">
                Ver mapa de patios <UIcon name="i-lucide-arrow-right" class="size-3.5" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Renew plate CTA -->
      <div class="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary p-4 shadow-sm">
        <div class="flex items-center justify-between gap-3">
          <div class="space-y-1 min-w-0">
            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-panama-red text-on-primary text-[10px] uppercase font-bold tracking-wider">Requisito Completado 100%</span>
            <h4 class="font-headline-sm text-on-primary">{{ $t('vehicles.renewPlate') }}</h4>
            <p class="font-body-sm text-primary-fixed-dim">Revisado y Seguro al día. Realice el pago único en el Municipio de Panamá con entrega a domicilio.</p>
          </div>
          <button class="shrink-0 w-12 h-12 rounded-full bg-panama-red text-on-primary flex items-center justify-center shadow-lg active:scale-95 transition-transform" :disabled="loading" @click="renewPlate">
            <UIcon :name="loading ? 'i-lucide-loader-2' : 'i-lucide-chevron-right'" class="size-6" :class="{ 'animate-spin': loading }" />
          </button>
        </div>
      </div>

      <!-- Documents -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <h3 class="font-label-lg text-primary uppercase tracking-wide">{{ $t('vehicles.documents') }}</h3>
          <span class="font-label-base text-secondary">Descargar Todos (ZIP)</span>
        </div>
        <div class="space-y-2">
          <div class="bg-surface-card p-3 rounded-lg flex items-center justify-between gap-2 shadow-sm">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-8 h-8 rounded bg-surface-container flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-file-text" class="size-5 text-secondary" />
              </div>
              <div class="min-w-0">
                <p class="font-label-base text-on-surface truncate">Certificado_eCarCheck_{{ v.plate }}_2025.pdf</p>
                <p class="font-body-sm text-on-surface-variant truncate">Firma Criptográfica ATTT · 1.4 MB</p>
              </div>
            </div>
            <UButton color="neutral" variant="ghost" icon="i-lucide-cloud-download" square size="sm" />
          </div>
          <div class="bg-surface-card p-3 rounded-lg flex items-center justify-between gap-2 shadow-sm">
            <div class="flex items-center gap-3 min-w-0">
              <div class="w-8 h-8 rounded bg-surface-container flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-badge-check" class="size-5 text-status-success" />
              </div>
              <div class="min-w-0">
                <p class="font-label-base text-on-surface truncate">Paz_y_Salvo_Unico_Transito_2025.pdf</p>
                <p class="font-body-sm text-on-surface-variant truncate">Validez legal nacional de 30 días · 890 KB</p>
              </div>
            </div>
            <UButton color="neutral" variant="ghost" icon="i-lucide-cloud-download" square size="sm" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const vehicleStore = useVehicleStore()
const { loading, run } = useFakeTransaction()
const { t } = useI18n()

const open = reactive({ ecar: true, insurance: false, tow: false })

async function renewPlate () {
  await run({ success: t('vehicles.renewPlate') + ' ✓' })
}
</script>

