<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({ src: { type: String, required: true }, alt: { type: String, required: true }, depth: { type: Number, default: 10 }, position: { type: String, default: 'center' } })
const root = ref(null)
let ctx

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(max-width: 767px)').matches) return
  ctx = gsap.context(() => {
    gsap.fromTo(root.value.querySelector('img'), { yPercent: -props.depth / 2 }, {
      yPercent: props.depth / 2,
      ease: 'none',
      scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom top', scrub: 1 },
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <figure ref="root" class="parallax-image">
    <img :src="src" :alt="alt" loading="lazy" :style="{ objectPosition: position }" />
  </figure>
</template>

<style scoped>
.parallax-image { margin: 0; overflow: hidden; }
.parallax-image img { width: 100%; height: 120%; object-fit: cover; }
</style>
