<template>
  <div class="flex min-h-screen bg-(--ui-bg-muted)">
    <AdminSidebar />
    <div class="flex-1 min-w-0">
      <AdminTopbar />
      <main class="px-4 py-5 lg:px-6">
        <slot />
      </main>
    </div>
  </div>
</template>
