<template>
  <div ref="container" class="relative w-full h-[420px] rounded-2xl overflow-hidden bg-primary-950">
    <canvas ref="canvas" class="absolute inset-0 w-full h-full" />
    <div class="absolute inset-x-0 bottom-0 p-3 flex flex-wrap gap-1.5 pointer-events-none">
      <span v-for="n in nodeLabels" :key="n" class="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-label-base backdrop-blur">{{ n }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'

const container = ref<HTMLDivElement>()
const canvas = ref<HTMLCanvasElement>()

const nodeLabels = ['ATTT', 'SERTRACEN', 'SIGED', '3Tech e-Car', 'Tribunal Electoral', 'Aseguradoras', 'Patios DNOT', 'Bancos']

let renderer: THREE.WebGLRenderer | null = null
let animationId = 0

onMounted(() => {
  if (!canvas.value || !container.value) return

  const width = container.value.clientWidth
  const height = container.value.clientHeight

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100)
  camera.position.set(0, 0, 9)

  renderer = new THREE.WebGLRenderer({ canvas: canvas.value, antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const group = new THREE.Group()
  scene.add(group)

  // Central institutional core (ATTT)
  const coreGeometry = new THREE.IcosahedronGeometry(0.9, 1)
  const coreMaterial = new THREE.MeshBasicMaterial({ color: 0x005fac, wireframe: true })
  const core = new THREE.Mesh(coreGeometry, coreMaterial)
  group.add(core)

  const coreGlow = new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 16), new THREE.MeshBasicMaterial({ color: 0xa7c8ff, transparent: true, opacity: 0.5 }))
  group.add(coreGlow)

  // Orbiting institutional nodes connected to the core (permissioned network peers)
  const nodeCount = nodeLabels.length - 1
  const nodes: THREE.Mesh[] = []
  const radius = 3.4
  const nodeColors = [0xf2661f, 0x16a34a, 0x045fac, 0xda121a, 0xd97706, 0x799dd6, 0xffffff]

  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2
    const node = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 16, 16),
      new THREE.MeshBasicMaterial({ color: nodeColors[i % nodeColors.length] })
    )
    node.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.3) * 1.4, Math.sin(angle) * radius)
    group.add(node)
    nodes.push(node)

    const points = [new THREE.Vector3(0, 0, 0), node.position.clone()]
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
    const line = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: 0x3a5f94, transparent: true, opacity: 0.5 }))
    group.add(line)
  }

  // Ring connecting peer nodes (chained ledger)
  const ringPoints = nodes.map(n => n.position.clone())
  ringPoints.push(ringPoints[0])
  const ringGeometry = new THREE.BufferGeometry().setFromPoints(ringPoints)
  const ring = new THREE.Line(ringGeometry, new THREE.LineBasicMaterial({ color: 0x799dd6, transparent: true, opacity: 0.35 }))
  group.add(ring)

  const clock = new THREE.Clock()

  function animate () {
    const t = clock.getElapsedTime()
    group.rotation.y = t * 0.18
    group.rotation.x = Math.sin(t * 0.15) * 0.12
    core.rotation.y -= 0.01
    core.rotation.x += 0.004
    coreGlow.scale.setScalar(1 + Math.sin(t * 2) * 0.08)
    nodes.forEach((n, i) => {
      n.scale.setScalar(1 + Math.sin(t * 2 + i) * 0.15)
    })
    renderer?.render(scene, camera)
    animationId = requestAnimationFrame(animate)
  }
  animate()

  function handleResize () {
    if (!container.value || !renderer) return
    const w = container.value.clientWidth
    const h = container.value.clientHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  }
  window.addEventListener('resize', handleResize)

  onBeforeUnmount(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', handleResize)
    renderer?.dispose()
  })
})
</script>
