export interface Procedure {
  id: string
  type: string
  reference: string
  status: 'Vigente' | 'En Proceso' | 'Emitido' | 'Pendiente de Pago'
  date: string
  fee: number
}

export const useProcedureStore = defineStore('procedures', () => {
  const procedures = ref<Procedure[]>([
    {
      id: 'p1',
      type: 'Paz y Salvo de Tránsito',
      reference: 'CERT-SIGED-2025-99812-PA',
      status: 'Vigente',
      date: '2024-10-24',
      fee: 0.25
    },
    {
      id: 'p2',
      type: 'Historial del Conductor',
      reference: 'CERT-SIGED-2025-77201-PA',
      status: 'Emitido',
      date: '2024-09-02',
      fee: 1.00
    },
    {
      id: 'p3',
      type: 'Permiso de Pesas y Dimensiones',
      reference: 'PYD-2025-00218',
      status: 'Pendiente de Pago',
      date: '2024-10-20',
      fee: 20.00
    }
  ])

  const debtFree = computed(() => true)

  return { procedures, debtFree }
})
