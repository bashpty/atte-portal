export interface Infraction {
  id: string
  number: string
  article: string
  description: string
  location: string
  date: string
  vehiclePlate: string
  originalAmount: number
  status: 'Pendiente' | 'Pagado' | 'En Juzgado' | 'Impugnado'
  promptDiscount: number
  hoursRemaining: number
}

export const useInfractionStore = defineStore('infractions', () => {
  const infractions = ref<Infraction[]>([
    {
      id: 't1',
      number: 'ATTT-2024-88912',
      article: 'Art. 143 - Exceso de Velocidad',
      description: 'Corredor Sur, Tramo Llano Bonito hacia Costa del Este (108 km/h)',
      location: 'Corredor Sur (km 12)',
      date: '2024-10-14',
      vehiclePlate: 'AA8492',
      originalAmount: 50,
      status: 'Pendiente',
      promptDiscount: 15,
      hoursRemaining: 48
    },
    {
      id: 't2',
      number: 'ATTT-2024-77120',
      article: 'Art. 134 - Exceso Ligero',
      description: 'Vía España, sentido Calidonia',
      location: 'Vía España',
      date: '2024-04-11',
      vehiclePlate: 'AA1234',
      originalAmount: 35,
      status: 'Pagado',
      promptDiscount: 0,
      hoursRemaining: 0
    },
    {
      id: 't3',
      number: 'ATTT-2023-44109',
      article: 'Art. 96 - Estacionamiento Prohibido',
      description: 'Avenida Balboa',
      location: 'Avenida Balboa',
      date: '2023-08-02',
      vehiclePlate: 'AA1234',
      originalAmount: 25,
      status: 'Pagado',
      promptDiscount: 0,
      hoursRemaining: 0
    },
    {
      id: 't4',
      number: 'ATTT-2023-19821',
      article: 'Art. 201 - Desacato Judicial',
      description: 'Citación no atendida, remitido a Juzgado de Tránsito Ancón',
      location: 'Juzgado de Tránsito Ancón',
      date: '2023-05-19',
      vehiclePlate: 'AA1234',
      originalAmount: 150,
      status: 'En Juzgado',
      promptDiscount: 0,
      hoursRemaining: 0
    }
  ])

  const active = computed(() => infractions.value.filter(i => i.status === 'Pendiente'))
  const history = computed(() => infractions.value.filter(i => i.status === 'Pagado'))
  const courts = computed(() => infractions.value.filter(i => i.status === 'En Juzgado' || i.status === 'Impugnado'))
  const totalDebt = computed(() => active.value.reduce((sum, i) => sum + i.originalAmount, 0))

  return { infractions, active, history, courts, totalDebt }
})
