<script setup lang="ts">
withDefaults(defineProps<{ size?: 'sm' | 'md' | 'lg' }>(), { size: 'md' })
const sizes = { sm: 'h-7 w-7', md: 'h-9 w-9', lg: 'h-14 w-14' }
</script>

<template>
  <div class="flex items-center gap-2">
    <img src="/logo-attt.png" alt="ATTT" :class="[sizes[size], 'rounded-full object-cover']">
    <div class="leading-tight">
      <p class="font-bold text-(--ui-text-highlighted) tracking-tight" :class="size === 'sm' ? 'text-sm' : 'text-base'">
        {{ $t('app.name') }}
      </p>
      <p v-if="size !== 'sm'" class="text-xs text-(--ui-text-muted)">
        {{ $t('app.tagline') }}
      </p>
    </div>
  </div>
</template>

