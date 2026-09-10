<script setup lang="ts">
const collapsed = ref(false)
const route = useRoute()
const links = [
  { to: '/admin', icon: 'i-lucide-layout-dashboard', label: 'nav.adminDashboard' },
  { to: '/admin/usuarios', icon: 'i-lucide-users', label: 'nav.users' },
  { to: '/admin/echeck-licencias', icon: 'i-lucide-clipboard-check', label: 'nav.echeck' },
  { to: '/admin/infracciones', icon: 'i-lucide-gavel', label: 'nav.judges' },
  { to: '/admin/bitacora', icon: 'i-lucide-shield-check', label: 'nav.audit' },
  { to: '/blockchain', icon: 'i-lucide-link-2', label: 'nav.blockchain' }
]
</script>

<template>
  <aside
    class="hidden lg:flex flex-col shrink-0 border-r border-(--ui-border) bg-primary-800 text-white sticky top-0 h-screen transition-all duration-200"
    :class="collapsed ? 'w-18' : 'w-64'"
  >
    <div class="flex items-center gap-2 px-4 h-16 border-b border-white/10">
      <img src="/logo-attt.png" alt="ATTT" class="size-8 rounded-full object-cover shrink-0">
      <div v-if="!collapsed" class="leading-tight">
        <p class="text-sm font-bold">ATTT / DNOT</p>
        <p class="text-[11px] text-white/60">{{ $t('nav.adminPortal') }}</p>
      </div>
    </div>

    <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
        :class="route.path === link.to
          ? 'bg-white/10 text-white'
          : 'text-white/60 hover:bg-white/5 hover:text-white'"
      >
        <UIcon :name="link.icon" class="size-5 shrink-0" />
        <span v-if="!collapsed" class="truncate">{{ $t(link.label) }}</span>
      </NuxtLink>
    </nav>

    <div class="border-t border-white/10 p-3">
      <UButton
        color="neutral"
        variant="ghost"
        block
        class="text-white/70 hover:text-white"
        :icon="collapsed ? 'i-lucide-chevron-right' : 'i-lucide-chevron-left'"
        @click="collapsed = !collapsed"
      />
    </div>
  </aside>
</template>
