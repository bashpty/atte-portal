<template>
  <div class="rounded-2xl bg-surface-card shadow-sm p-4 overflow-x-auto">
    <svg ref="svgRef" :width="width" :height="height" class="block mx-auto" />
    <div v-if="selected" class="mt-3 bg-surface-container-low rounded-lg p-3 flex items-center justify-between gap-3 text-body-sm">
      <div class="min-w-0">
        <p class="font-label-lg text-primary">{{ selected.label }}</p>
        <p class="font-body-sm text-on-surface-variant truncate">{{ selected.detail }}</p>
      </div>
      <span class="font-label-code text-[11px] text-secondary shrink-0">{{ selected.hash }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as d3 from 'd3'

interface ChainBlock {
  label: string
  detail: string
  hash: string
}

const props = defineProps<{ blocks: ChainBlock[] }>()

const svgRef = ref<SVGSVGElement>()
const selected = ref<ChainBlock | null>(props.blocks[props.blocks.length - 1] ?? null)

const blockWidth = 132
const blockHeight = 88
const gap = 46
const width = computed(() => props.blocks.length * (blockWidth + gap) + gap)
const height = 150

function render () {
  if (!svgRef.value) return
  const svg = d3.select(svgRef.value)
  svg.selectAll('*').remove()

  const y = height / 2 - blockHeight / 2

  // Connecting chain line
  svg.append('line')
    .attr('x1', gap + blockWidth / 2)
    .attr('x2', width.value - gap - blockWidth / 2)
    .attr('y1', height / 2)
    .attr('y2', height / 2)
    .attr('stroke', '#c3c6d1')
    .attr('stroke-width', 3)
    .attr('stroke-dasharray', '2 6')

  const groups = svg.selectAll('g.block')
    .data(props.blocks)
    .enter()
    .append('g')
    .attr('class', 'block')
    .attr('transform', (_d, i) => `translate(${gap + i * (blockWidth + gap)}, ${y})`)
    .style('cursor', 'pointer')
    .style('opacity', 0)
    .on('click', (_event, d) => { selected.value = d })

  groups.append('rect')
    .attr('width', blockWidth)
    .attr('height', blockHeight)
    .attr('rx', 14)
    .attr('fill', (_d, i) => i === props.blocks.length - 1 ? '#003366' : '#f0edf0')
    .attr('stroke', '#c3c6d1')
    .attr('stroke-width', 1)

  groups.append('text')
    .attr('x', blockWidth / 2)
    .attr('y', 28)
    .attr('text-anchor', 'middle')
    .attr('font-size', 11)
    .attr('font-weight', 700)
    .attr('fill', (_d, i) => i === props.blocks.length - 1 ? '#ffffff' : '#001e40')
    .text(d => d.label)

  groups.append('text')
    .attr('x', blockWidth / 2)
    .attr('y', 48)
    .attr('text-anchor', 'middle')
    .attr('font-size', 9)
    .attr('fill', (_d, i) => i === props.blocks.length - 1 ? '#a7c8ff' : '#43474f')
    .text(d => `#${d.hash.slice(0, 10)}`)

  groups.append('text')
    .attr('x', blockWidth / 2)
    .attr('y', 68)
    .attr('text-anchor', 'middle')
    .attr('font-size', 16)
    .text('🔗')

  groups.transition()
    .delay((_d, i) => i * 160)
    .duration(500)
    .style('opacity', 1)
    .attr('transform', (_d, i) => `translate(${gap + i * (blockWidth + gap)}, ${y})`)
}

onMounted(render)
watch(() => props.blocks, render, { deep: true })
</script>
