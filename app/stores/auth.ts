export interface DriverProfile {
  cedula: string
  fullName: string
  photo: string
  categories: string[]
  licenseExpiry: string
  points: number
  maxPoints: number
  bloodType: string
  donor: boolean
  status: 'ACTIVO' | 'SUSPENDIDO'
}

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(true)
  const role = ref<'citizen' | 'admin'>('citizen')

  const driver = ref<DriverProfile>({
    cedula: '8-765-4321',
    fullName: 'Ricardo Alberto Morales González',
    photo: '/logo-attt.png',
    categories: ['C', 'D'],
    licenseExpiry: '2026-11-23',
    points: 12,
    maxPoints: 50,
    bloodType: 'O+',
    donor: true,
    status: 'ACTIVO'
  })

  function login () {
    isAuthenticated.value = true
  }

  function logout () {
    isAuthenticated.value = false
  }

  return { isAuthenticated, role, driver, login, logout }
})
