<script setup lang="ts">
const auth = useAuthStore()
</script>

<template>
  <div class="space-y-5">
    <UButton to="/tramites" color="neutral" variant="link" icon="i-lucide-arrow-left" class="px-0">{{ $t('common.back') }}</UButton>

    <UAlert color="success" variant="subtle" icon="i-lucide-check-circle-2" title="Paz y Salvo Emitido" description="Trámite ref. SIGED-2024-881920" />

    <UCard>
      <div class="flex items-center gap-2 text-xs text-(--ui-text-muted)">
        <UIcon name="i-lucide-shield" />
        República de Panamá · Autoridad del Tránsito y Transporte Terrestre
      </div>
      <p class="mt-3 text-xs text-(--ui-text-muted)">CERTIFICADO NO.</p>
      <div class="flex items-center gap-2">
        <p class="font-mono font-bold text-(--ui-text-highlighted)">CERT-SIGED-2025-99812-PA</p>
        <UBadge color="primary" variant="soft">SIGED OFICIAL</UBadge>
      </div>

      <div class="mt-4 rounded-lg bg-success-50 dark:bg-success-950/30 p-3">
        <p class="text-xs text-success-700 dark:text-success-300">ESTADO DE CUENTAS</p>
        <p class="font-bold text-success-800 dark:text-success-200">CERO (0) DEUDAS</p>
        <p class="text-[11px] text-success-700 dark:text-success-300">Sin desacatos ni gravámenes</p>
      </div>

      <div class="grid grid-cols-2 gap-4 mt-4 text-sm">
        <div><p class="text-xs text-(--ui-text-muted)">TITULAR</p><p class="font-semibold">{{ auth.driver.fullName }}</p></div>
        <div><p class="text-xs text-(--ui-text-muted)">CÉDULA</p><p class="font-semibold font-mono">{{ auth.driver.cedula }}</p></div>
        <div><p class="text-xs text-(--ui-text-muted)">FECHA EMISIÓN</p><p class="font-semibold">24 Oct 2024</p></div>
        <div><p class="text-xs text-(--ui-text-muted)">VÁLIDO HASTA</p><p class="font-semibold text-tertiary-500">23 Nov 2024</p></div>
      </div>

      <USeparator class="my-4" />

      <div class="text-center space-y-2">
        <p class="text-xs uppercase text-(--ui-text-muted) flex items-center justify-center gap-1"><UIcon name="i-lucide-lock" /> Firma Electrónica Criptográfica</p>
        <div class="mx-auto size-40 rounded-lg bg-(--ui-bg-elevated) border border-(--ui-border) flex items-center justify-center">
          <UIcon name="i-lucide-qr-code" class="size-24 text-(--ui-text-highlighted)" />
        </div>
        <p class="text-xs text-success-600">● Criptográficamente Válido y Firmado</p>
      </div>

      <div class="mt-4 rounded-lg bg-(--ui-bg-elevated) p-3">
        <p class="text-[11px] text-(--ui-text-muted)">Hash SHA-256 Verificable:</p>
        <p class="text-[11px] font-mono break-all">e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</p>
      </div>

      <UButton block color="neutral" variant="subtle" class="mt-3" icon="i-lucide-link">{{ $t('common.copyLink') }}</UButton>
      <UButton block class="mt-3" icon="i-lucide-download">{{ $t('common.download') }} (420 KB)</UButton>

      <div class="grid grid-cols-2 gap-3 mt-3">
        <UButton color="neutral" variant="subtle" icon="i-lucide-wallet">{{ $t('common.addWallet') }}</UButton>
        <UButton color="neutral" variant="subtle" icon="i-lucide-mail">{{ $t('common.sendEmail') }}</UButton>
      </div>
    </UCard>
  </div>
</template>
