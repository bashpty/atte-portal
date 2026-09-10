<template>
  <div class="space-y-10 pb-10">
    <!-- Hero -->
    <section class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-950 via-primary to-primary-container text-on-primary p-6 sm:p-10">
      <div class="absolute inset-0 opacity-20 pointer-events-none panama-accent" />
      <div class="relative z-10 max-w-2xl">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[11px] font-label-base uppercase tracking-wider">
          <UIcon name="i-lucide-sparkles" class="size-3.5" /> {{ $t('blockchain.navBadge') }}
        </span>
        <h1 class="font-headline-lg text-on-primary mt-3">{{ $t('blockchain.heroTitle') }}</h1>
        <p class="font-body-lg text-primary-fixed mt-2">{{ $t('blockchain.heroSubtitle') }}</p>
        <div class="flex flex-wrap gap-2.5 mt-5">
          <UButton size="lg" color="neutral" variant="solid" class="bg-white text-primary font-label-lg" icon="i-lucide-boxes" @click="scrollToSection('how')">
            {{ $t('blockchain.heroCta') }}
          </UButton>
          <UButton to="/admin/bitacora" size="lg" color="neutral" variant="outline" class="border-white/40 text-white font-label-lg" icon="i-lucide-shield-check">
            {{ $t('blockchain.heroSecondary') }}
          </UButton>
        </div>
      </div>
      <button class="relative z-10 mt-8 flex items-center gap-1.5 text-primary-fixed font-label-base animate-bounce" @click="scrollToSection('how')">
        {{ $t('blockchain.scrollHint') }} <UIcon name="i-lucide-chevron-down" class="size-4" />
      </button>
    </section>

    <!-- How it works -->
    <section id="how" class="space-y-4">
      <div class="text-center max-w-xl mx-auto">
        <h2 class="font-headline-md text-on-surface">{{ $t('blockchain.howTitle') }}</h2>
        <p class="font-body-base text-on-surface-variant mt-1">{{ $t('blockchain.howDesc') }}</p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div
          v-for="(step, i) in steps"
          :key="step.title"
          class="bg-surface-card rounded-xl p-4 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md"
          :style="{ transitionDelay: `${i * 60}ms` }"
        >
          <div class="w-9 h-9 rounded-lg flex items-center justify-center mb-2" :class="step.bg">
            <UIcon :name="step.icon" class="size-5" :class="step.fg" />
          </div>
          <h3 class="font-label-lg text-on-surface">{{ step.title }}</h3>
          <p class="font-body-sm text-on-surface-variant mt-1">{{ step.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 3D network -->
    <section class="space-y-3">
      <div>
        <h2 class="font-headline-md text-on-surface">{{ $t('blockchain.networkTitle') }}</h2>
        <p class="font-body-base text-on-surface-variant mt-1">{{ $t('blockchain.networkDesc') }}</p>
      </div>
      <ClientOnly>
        <BlockchainNetworkScene />
        <template #fallback>
          <div class="w-full h-[420px] rounded-2xl bg-primary-950 animate-pulse" />
        </template>
      </ClientOnly>
    </section>

    <!-- D3 chain diagram -->
    <section class="space-y-3">
      <div>
        <h2 class="font-headline-md text-on-surface">{{ $t('blockchain.chainTitle') }}</h2>
        <p class="font-body-base text-on-surface-variant mt-1">{{ $t('blockchain.chainDesc') }}</p>
      </div>
      <ClientOnly>
        <BlockchainChainDiagram :blocks="chainBlocks" />
        <template #fallback>
          <div class="w-full h-[220px] rounded-2xl bg-surface-container animate-pulse" />
        </template>
      </ClientOnly>
    </section>

    <!-- Hyperledger Fabric -->
    <section class="bg-surface-card rounded-2xl shadow-sm p-5 sm:p-6">
      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-status-success/15 text-status-success text-[11px] font-label-base uppercase tracking-wider">
        <UIcon name="i-lucide-badge-check" class="size-3.5" /> {{ $t('blockchain.fabricBadge') }}
      </span>
      <h2 class="font-headline-md text-primary mt-2 flex items-center gap-2">
        <UIcon name="i-lucide-link-2" class="size-6" /> {{ $t('blockchain.fabricTitle') }}
      </h2>
      <p class="font-body-base text-on-surface-variant mt-1 max-w-3xl">{{ $t('blockchain.fabricDesc') }}</p>
      <div class="grid sm:grid-cols-2 gap-3 mt-4">
        <div v-for="f in fabricFeatures" :key="f" class="flex items-start gap-2.5 bg-surface-container-low rounded-lg p-3">
          <UIcon name="i-lucide-check-circle-2" class="size-4 text-status-success shrink-0 mt-0.5" />
          <p class="font-body-sm text-on-surface">{{ f }}</p>
        </div>
      </div>
    </section>

    <!-- Use cases -->
    <section class="space-y-3">
      <div>
        <h2 class="font-headline-md text-on-surface">{{ $t('blockchain.useCasesTitle') }}</h2>
        <p class="font-body-base text-on-surface-variant mt-1">{{ $t('blockchain.useCasesDesc') }}</p>
      </div>
      <div class="grid sm:grid-cols-3 gap-3">
        <div v-for="uc in useCases" :key="uc.title" class="bg-surface-card rounded-xl p-4 shadow-sm">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-2" :class="uc.bg">
            <UIcon :name="uc.icon" class="size-5" :class="uc.fg" />
          </div>
          <h3 class="font-label-lg text-on-surface">{{ uc.title }}</h3>
          <p class="font-body-sm text-on-surface-variant mt-1">{{ uc.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Wallet -->
    <section class="bg-primary rounded-2xl p-5 sm:p-6 text-on-primary flex flex-col lg:flex-row items-center gap-6">
      <div class="flex-1">
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-[11px] font-label-base uppercase tracking-wider">
          <UIcon name="i-lucide-wallet" class="size-3.5" /> {{ $t('blockchain.walletBadge') }}
        </span>
        <h2 class="font-headline-md text-on-primary mt-2">{{ $t('blockchain.walletTitle') }}</h2>
        <p class="font-body-base text-primary-fixed mt-1 max-w-lg">{{ $t('blockchain.walletDesc') }}</p>
        <div class="flex flex-wrap gap-2.5 mt-4">
          <button class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white font-label-base" @click="simulateWalletAdd('Apple Wallet')">
            <UIcon name="i-lucide-apple" class="size-5" /> {{ $t('blockchain.walletApple') }}
          </button>
          <button class="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-primary font-label-base" @click="simulateWalletAdd('Google Wallet')">
            <UIcon name="i-lucide-wallet-cards" class="size-5" /> {{ $t('blockchain.walletGoogle') }}
          </button>
        </div>
      </div>
      <div class="w-40 h-64 rounded-3xl bg-white/10 border border-white/20 backdrop-blur flex flex-col items-center justify-center gap-2 shrink-0">
        <UIcon name="i-lucide-qr-code" class="size-16 text-white" />
        <span class="font-label-code text-[10px] text-primary-fixed">SIGED-VC-2025</span>
      </div>
    </section>

    <!-- Alternatives table -->
    <section class="space-y-3">
      <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-label-base uppercase tracking-wider">
        {{ $t('blockchain.altBadge') }}
      </span>
      <h2 class="font-headline-md text-on-surface">{{ $t('blockchain.altTitle') }}</h2>
      <p class="font-body-base text-on-surface-variant">{{ $t('blockchain.altDesc') }}</p>

      <div class="bg-surface-card rounded-xl shadow-sm overflow-x-auto">
        <table class="w-full text-left min-w-[560px]">
          <thead>
            <tr class="border-b border-border-subtle">
              <th class="p-3 font-label-base text-on-surface-variant">{{ $t('blockchain.altCol1') }}</th>
              <th class="p-3 font-label-base text-on-surface-variant">{{ $t('blockchain.altCol2') }}</th>
              <th class="p-3 font-label-base text-on-surface-variant">{{ $t('blockchain.altCol3') }}</th>
              <th class="p-3 font-label-base text-on-surface-variant">{{ $t('blockchain.altCol4') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in alternatives" :key="row.name" class="border-b border-border-subtle last:border-0">
              <td class="p-3 font-label-lg text-on-surface">{{ row.name }}</td>
              <td class="p-3 font-body-sm text-on-surface-variant">{{ row.type }}</td>
              <td class="p-3 font-body-sm text-on-surface-variant">{{ row.fit }}</td>
              <td class="p-3">
                <span class="px-2 py-0.5 rounded-full font-label-base text-[11px]" :class="row.recommended ? 'bg-status-success/15 text-status-success' : 'bg-surface-container text-on-surface-variant'">{{ row.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-surface-container-low rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <h2 class="font-headline-sm text-on-surface">{{ $t('blockchain.ctaTitle') }}</h2>
        <p class="font-body-sm text-on-surface-variant mt-1">{{ $t('blockchain.ctaDesc') }}</p>
      </div>
      <div class="flex gap-2 shrink-0">
        <UButton to="/" color="neutral" variant="subtle">{{ $t('blockchain.ctaSecondary') }}</UButton>
        <UButton to="/admin/bitacora" icon="i-lucide-shield-check">{{ $t('blockchain.ctaButton') }}</UButton>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const toast = useToast()
const auditStore = useAuditStore()

const steps = computed(() => [
  { title: t('blockchain.step1Title'), desc: t('blockchain.step1Desc'), icon: 'i-lucide-radio-tower', bg: 'bg-secondary/15', fg: 'text-secondary' },
  { title: t('blockchain.step2Title'), desc: t('blockchain.step2Desc'), icon: 'i-lucide-fingerprint', bg: 'bg-primary-fixed', fg: 'text-primary' },
  { title: t('blockchain.step3Title'), desc: t('blockchain.step3Desc'), icon: 'i-lucide-users', bg: 'bg-status-warning/15', fg: 'text-status-warning' },
  { title: t('blockchain.step4Title'), desc: t('blockchain.step4Desc'), icon: 'i-lucide-box', bg: 'bg-status-success/15', fg: 'text-status-success' },
  { title: t('blockchain.step5Title'), desc: t('blockchain.step5Desc'), icon: 'i-lucide-scale', bg: 'bg-panama-red/15', fg: 'text-panama-red' }
])

const fabricFeatures = computed(() => [
  t('blockchain.fabricFeature1'),
  t('blockchain.fabricFeature2'),
  t('blockchain.fabricFeature3'),
  t('blockchain.fabricFeature4')
])

const useCases = computed(() => [
  { title: t('blockchain.kycTitle'), desc: t('blockchain.kycDesc'), icon: 'i-lucide-scan-face', bg: 'bg-secondary/15', fg: 'text-secondary' },
  { title: t('blockchain.echeckTitle'), desc: t('blockchain.echeckDesc'), icon: 'i-lucide-car', bg: 'bg-status-success/15', fg: 'text-status-success' },
  { title: t('blockchain.licenseTitle'), desc: t('blockchain.licenseDesc'), icon: 'i-lucide-wallet', bg: 'bg-primary-fixed', fg: 'text-primary' }
])

const alternatives = computed(() => [
  { name: 'Hyperledger Fabric', type: t('blockchain.altFabricType'), fit: t('blockchain.altFabricFit'), status: t('blockchain.altFabricStatus'), recommended: true },
  { name: 'R3 Corda', type: t('blockchain.altCordaType'), fit: t('blockchain.altCordaFit'), status: t('blockchain.altCordaStatus'), recommended: false },
  { name: 'Hyperledger Besu', type: t('blockchain.altBesuType'), fit: t('blockchain.altBesuFit'), status: t('blockchain.altBesuStatus'), recommended: false },
  { name: 'Avalanche Subnet', type: t('blockchain.altAvalancheType'), fit: t('blockchain.altAvalancheFit'), status: t('blockchain.altAvalancheStatus'), recommended: false }
])

const chainBlocks = computed(() => auditStore.events.slice(0, 6).reverse().map(e => ({
  label: e.action,
  detail: `${e.operator} · ${e.citizen}`,
  hash: e.hash.replace(/\.\.\./g, '')
})))

function scrollToSection (id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function simulateWalletAdd (wallet: string) {
  toast.add({ title: `${wallet} · Credencial añadida ✓`, color: 'success', icon: 'i-lucide-check-circle' })
}
</script>
