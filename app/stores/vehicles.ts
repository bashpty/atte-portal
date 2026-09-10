export interface Vehicle {
  id: string
  plate: string
  vin: string
  brand: string
  model: string
  year: number
  type: 'Particular' | 'Comercial'
  color: string
  municipality: string
  ecarcheck: {
    status: 'APROBADO' | 'PENDIENTE' | 'VENCIDO'
    validUntil: string
    provider: string
    score: string
    brakes: string
    emissions: string
    tires: string
    lights: string
  }
  insurance: {
    status: 'ACTIVA' | 'VENCIDA'
    provider: string
    policyNumber: string
    coverage: string
    validUntil: string
  }
  tow: {
    retained: boolean
    yard?: string
    gps?: string
    reason?: string
  }
}

export const useVehicleStore = defineStore('vehicles', () => {
  const vehicles = ref<Vehicle[]>([
    {
      id: 'v1',
      plate: 'AA1234',
      vin: 'MROBA3CD...90211',
      brand: 'Toyota',
      model: 'Hilux',
      year: 2022,
      type: 'Particular',
      color: 'Gris Metálico',
      municipality: 'Panamá',
      ecarcheck: {
        status: 'APROBADO',
        validUntil: '2025-03-15',
        provider: '3Tech AutoCheck #402',
        score: '82 / 82',
        brakes: '100%',
        emissions: '0.04 CO',
        tires: '4.8 mm',
        lights: 'Conforme'
      },
      insurance: {
        status: 'ACTIVA',
        provider: 'Seguros SURA Panamá',
        policyNumber: 'POL-772183-PA',
        coverage: 'Cobertura Completa + RC',
        validUntil: '2025-12-15'
      },
      tow: { retained: false }
    },
    {
      id: 'v2',
      plate: '890123',
      vin: 'KNAB4512...44210',
      brand: 'Kia',
      model: 'Rio',
      year: 2019,
      type: 'Particular',
      color: 'Blanco',
      municipality: 'Panamá',
      ecarcheck: {
        status: 'PENDIENTE',
        validUntil: '2025-01-10',
        provider: '3Tech AutoCheck #118',
        score: '—',
        brakes: '—',
        emissions: '—',
        tires: '—',
        lights: '—'
      },
      insurance: {
        status: 'ACTIVA',
        provider: 'Seguros Fedpa',
        policyNumber: 'FED-33210-PA',
        coverage: 'Cobertura Completa',
        validUntil: '2025-08-01'
      },
      tow: { retained: false }
    }
  ])

  const selectedVehicleId = ref(vehicles.value[0]?.id)
  const selectedVehicle = computed(() => vehicles.value.find(v => v.id === selectedVehicleId.value))

  return { vehicles, selectedVehicleId, selectedVehicle }
})
