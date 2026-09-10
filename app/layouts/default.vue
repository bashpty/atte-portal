<template>
  <div class="flex min-h-screen bg-(--ui-bg-muted)">
    <CitizenDesktopSidebar />
    <div class="flex-1 min-w-0">
      <CitizenTopbar />
      <main class="max-w-3xl lg:max-w-5xl mx-auto px-4 py-4 lg:py-6 pb-28 lg:pb-6">
        <slot />
      </main>
    </div>
    <CitizenMobileDock />
  </div>
</template>
