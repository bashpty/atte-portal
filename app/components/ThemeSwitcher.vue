<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (v) => { colorMode.preference = v ? 'dark' : 'light' }
})
</script>

<template>
  <UButton
    color="neutral"
    variant="ghost"
    size="sm"
    :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
    @click="isDark = !isDark"
  />
</template>
