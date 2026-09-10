<script setup lang="ts">
const auth = useAuthStore()
const route = useRoute()
const titles: Record<string, string> = {
  '/': 'nav.dashboard',
  '/vehiculos': 'nav.vehicles',
  '/boletas': 'nav.tickets',
  '/tramites': 'nav.procedures',
  '/licencia': 'nav.license'
}
const pageTitle = computed(() => titles[route.path] ?? 'app.name')
</script>

<template>
  <header class="sticky top-0 z-30 bg-surface lg:bg-(--ui-bg) lg:border-b lg:border-(--ui-border)">
    <div class="flex items-center justify-between px-4 h-14 lg:h-16 lg:px-6">
      <div class="flex items-center gap-2 lg:hidden">
        <span class="w-2 h-2 rounded-full bg-panama-red" />
        <div class="leading-tight">
          <p class="font-label-lg text-on-surface uppercase tracking-wide">ATTT</p>
          <p class="font-body-sm text-on-surface-variant -mt-0.5">{{ $t(pageTitle) }}</p>
        </div>
      </div>

      <UBreadcrumb
        class="hidden lg:flex"
        :items="[{ label: $t('nav.citizenPortal'), icon: 'i-lucide-home' }]"
      />

      <div class="flex items-center gap-1.5">
        <LocaleSwitcher />
        <ThemeSwitcher />
        <UButton to="/admin" color="neutral" variant="ghost" size="sm" icon="i-lucide-shield" class="hidden lg:flex" />
        <UButton color="neutral" variant="ghost" size="sm" icon="i-lucide-bell" square class="relative">
          <span class="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-status-warning" />
        </UButton>
        <UAvatar :src="auth.driver.photo" :alt="auth.driver.fullName" size="sm" />
      </div>
    </div>
  </header>
</template>
