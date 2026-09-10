export interface CitizenRecord {
  id: string
  cedula: string
  fullName: string
  licenseCategories: string[]
  points: number
  status: 'Habilitado' | 'Suspendido'
  vehicles: number
  activeTickets: number
  lastUpdate: string
}

export const useUserStore = defineStore('users', () => {
  const records = ref<CitizenRecord[]>([
    { id: 'u1', cedula: '8-765-4321', fullName: 'Ricardo A. Morales González', licenseCategories: ['C', 'D'], points: 12, status: 'Habilitado', vehicles: 2, activeTickets: 1, lastUpdate: '2024-10-24' },
    { id: 'u2', cedula: '4-712-993', fullName: 'Carlos E. Castillo Núñez', licenseCategories: ['C'], points: 38, status: 'Habilitado', vehicles: 1, activeTickets: 1, lastUpdate: '2024-10-18' },
    { id: 'u3', cedula: '8-210-449', fullName: 'Martín J. Vergara', licenseCategories: ['C', 'D'], points: 51, status: 'Suspendido', vehicles: 1, activeTickets: 2, lastUpdate: '2024-10-01' },
    { id: 'u4', cedula: '8-794-1102', fullName: 'Carlos E. Mena V.', licenseCategories: ['C', 'D'], points: 12, status: 'Habilitado', vehicles: 1, activeTickets: 0, lastUpdate: '2024-09-30' },
    { id: 'u5', cedula: '4-332-9011', fullName: 'Maritza E. Soto', licenseCategories: ['B'], points: 9, status: 'Habilitado', vehicles: 1, activeTickets: 1, lastUpdate: '2024-10-15' }
  ])

  const search = ref('')
  const statusFilter = ref<'all' | 'Habilitado' | 'Suspendido'>('all')

  const filtered = computed(() => records.value.filter((r) => {
    const matchesSearch = !search.value || r.fullName.toLowerCase().includes(search.value.toLowerCase()) || r.cedula.includes(search.value)
    const matchesStatus = statusFilter.value === 'all' || r.status === statusFilter.value
    return matchesSearch && matchesStatus
  }))

  return { records, search, statusFilter, filtered }
})
