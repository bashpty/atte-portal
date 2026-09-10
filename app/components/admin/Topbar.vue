<script setup lang="ts">
const search = ref('')
const mobileOpen = ref(false)
</script>

<template>
  <header class="sticky top-0 z-30 bg-(--ui-bg) border-b border-(--ui-border)">
    <div class="flex items-center gap-3 px-4 h-16">
      <UButton
        icon="i-lucide-menu"
        color="neutral"
        variant="ghost"
        class="lg:hidden"
        @click="mobileOpen = true"
      />
      <UInput
        v-model="search"
        icon="i-lucide-search"
        class="max-w-md w-full"
        :placeholder="`${$t('common.search')}: Cédula, Placa, Folio SIGED, Boleta DNOT...`"
      >
        <template #trailing>
          <UKbd value="ctrl" />
          <UKbd value="K" />
        </template>
      </UInput>
      <UButton icon="i-lucide-scan-line" color="neutral" variant="subtle" class="hidden md:flex">
        QR USB
      </UButton>
      <div class="flex-1" />
      <UBadge color="success" variant="subtle" class="hidden md:flex">SERTRACEN</UBadge>
      <UBadge color="success" variant="subtle" class="hidden xl:flex">3Tech e-Car</UBadge>
      <LocaleSwitcher />
      <ThemeSwitcher />
      <UButton to="/" color="neutral" variant="ghost" size="sm" icon="i-lucide-user" class="hidden lg:flex" />
      <UButton color="neutral" variant="ghost" size="sm" icon="i-lucide-bell" square />
      <UAvatar icon="i-lucide-shield" size="sm" />
    </div>

    <USlideover v-model:open="mobileOpen">
      <template #content>
        <AdminSidebar class="!flex !w-full !h-full" />
      </template>
    </USlideover>
  </header>
</template>
