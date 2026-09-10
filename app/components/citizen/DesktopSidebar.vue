<script setup lang="ts">
const collapsed = ref(false)
const route = useRoute()
const links = [
  { to: '/', icon: 'i-lucide-layout-dashboard', label: 'nav.dashboard' },
  { to: '/vehiculos', icon: 'i-lucide-car', label: 'nav.vehicles' },
  { to: '/boletas', icon: 'i-lucide-file-warning', label: 'nav.tickets' },
  { to: '/tramites', icon: 'i-lucide-folder-open', label: 'nav.procedures' },
  { to: '/licencia', icon: 'i-lucide-id-card', label: 'nav.license' },
  { to: '/blockchain', icon: 'i-lucide-link-2', label: 'nav.blockchain' }
]
</script>

<template>
  <aside
    class="hidden lg:flex flex-col shrink-0 border-r border-(--ui-border) bg-(--ui-bg) sticky top-0 h-screen transition-all duration-200"
    :class="collapsed ? 'w-18' : 'w-64'"
  >
    <div class="flex items-center justify-between px-4 h-16 border-b border-(--ui-border)">
      <AppLogo v-if="!collapsed" size="sm" />
      <img v-else src="/logo-attt.png" alt="ATTT" class="size-8 rounded-full object-cover mx-auto">
    </div>

    <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
        :class="route.path === link.to
          ? 'bg-primary-600 text-white'
          : 'text-(--ui-text-muted) hover:bg-(--ui-bg-elevated) hover:text-(--ui-text-highlighted)'"
      >
        <UIcon :name="link.icon" class="size-5 shrink-0" />
        <span v-if="!collapsed" class="truncate">{{ $t(link.label) }}</span>
      </NuxtLink>
    </nav>

    <div class="border-t border-(--ui-border) p-3">
      <UButton
        color="neutral"
        variant="ghost"
        block
        :icon="collapsed ? 'i-lucide-chevron-right' : 'i-lucide-chevron-left'"
        @click="collapsed = !collapsed"
      >
        <span v-if="!collapsed">{{ $t('common.close') === 'Cerrar' ? 'Colapsar' : 'Collapse' }}</span>
      </UButton>
    </div>
  </aside>
</template>
