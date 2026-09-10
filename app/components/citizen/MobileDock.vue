<template>
  <nav class="lg:hidden fixed bottom-0 inset-x-0 z-40 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-1 px-4">
    <div class="max-w-md mx-auto pb-3 pt-1">
      <div class="bg-surface-card/95 backdrop-blur-xl rounded-full shadow-[0_4px_20px_rgba(0,30,64,0.12)] px-2 py-1.5 flex items-center justify-between">
        <NuxtLink
          v-for="link in links.slice(0, 2)"
          :key="link!.to"
          :to="link!.to"
          class="flex-1 flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors"
          :class="route.path === link!.to ? 'text-secondary' : 'text-on-surface-variant'"
        >
          <UIcon :name="link!.icon" class="size-[22px]" />
          <span class="font-label-base mt-0.5">{{ $t(link!.label) }}</span>
        </NuxtLink>

        <div class="flex-none px-1 relative -top-3">
          <button
            aria-label="Trámites Rápidos y Servicios"
            class="w-[52px] h-[52px] rounded-full bg-primary p-1 shadow-[0_6px_16px_rgba(0,30,64,0.3)] flex items-center justify-center transition-transform active:scale-95"
            @click="quickOpen = true"
          >
            <img src="/logo-attt.png" alt="ATTT" class="w-full h-full object-contain rounded-full pointer-events-none">
          </button>
        </div>

        <NuxtLink
          v-for="link in links.slice(3)"
          :key="link!.to"
          :to="link!.to"
          class="flex-1 flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors"
          :class="route.path === link!.to ? 'text-secondary' : 'text-on-surface-variant'"
        >
          <UIcon :name="link!.icon" class="size-[22px]" />
          <span class="font-label-base mt-0.5">{{ $t(link!.label) }}</span>
        </NuxtLink>
      </div>
    </div>

    <USlideover v-model:open="quickOpen" side="bottom">
      <template #content>
        <div class="p-4 pb-[max(env(safe-area-inset-bottom),1rem)]">
          <p class="font-label-base text-on-surface-variant mb-3">{{ $t('dashboard.quickServices') }}</p>
          <div class="grid grid-cols-3 gap-3">
            <NuxtLink
              v-for="action in quickActions"
              :key="action.label"
              :to="action.to"
              class="flex flex-col items-center gap-2 rounded-xl border border-border-subtle p-3 text-center hover:border-primary"
              @click="quickOpen = false"
            >
              <UIcon :name="action.icon" class="size-6 text-primary" />
              <span class="font-label-base">{{ $t(action.label) }}</span>
            </NuxtLink>
          </div>
        </div>
      </template>
    </USlideover>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()
const links = [
  { to: '/', icon: 'i-lucide-layout-grid', label: 'nav.dashboard' },
  { to: '/vehiculos', icon: 'i-lucide-car', label: 'nav.vehicles' },
  null,
  { to: '/boletas', icon: 'i-lucide-receipt-text', label: 'nav.tickets' },
  { to: '/tramites', icon: 'i-lucide-folder-open', label: 'nav.procedures' }
]
const quickOpen = ref(false)
const quickActions = [
  { label: 'tickets.scan', icon: 'i-lucide-scan-line', to: '/boletas' },
  { label: 'procedures.pazSalvo', icon: 'i-lucide-file-check-2', to: '/tramites' },
  { label: 'dashboard.checkpointMode', icon: 'i-lucide-shield-check', to: '/licencia' },
  { label: 'nav.blockchain', icon: 'i-lucide-link-2', to: '/blockchain' }
]
</script>

