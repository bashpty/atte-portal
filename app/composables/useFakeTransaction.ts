// Simulates a backend transaction (OCR, payment gateway, SIGED, 3Tech, SERTRACEN, etc.)
export function useFakeTransaction () {
  const loading = ref(false)
  const toast = useToast()

  async function run (opts: { message?: string, success?: string, delay?: number } = {}) {
    loading.value = true
    await new Promise(resolve => setTimeout(resolve, opts.delay ?? 1600))
    loading.value = false
    if (opts.success) {
      toast.add({ title: opts.success, color: 'success', icon: 'i-lucide-check-circle' })
    }
  }

  return { loading, run }
}
