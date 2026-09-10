<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const items = computed(() => (locales.value as { code: string, name: string }[]).map(l => ({
  label: l.name,
  onSelect: () => setLocale(l.code as 'en' | 'es'),
  active: locale.value === l.code
})))
</script>

<template>
  <UDropdownMenu :items="[items]">
    <UButton
      color="neutral"
      variant="ghost"
      icon="i-lucide-languages"
      :label="locale.toUpperCase()"
      size="sm"
    />
  </UDropdownMenu>
</template>
