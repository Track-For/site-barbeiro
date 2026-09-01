<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

defineProps({ src: { type: String, required: true }, alt: { type: String, required: true }, position: { type: String, default: 'center' } })
const root = ref(null)
let ctx

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  ctx = gsap.context(() => {
    gsap.fromTo(root.value, { clipPath: 'inset(0 100% 0 0)' }, {
      clipPath: 'inset(0 0% 0 0)', duration: 1.15, ease: 'power4.inOut',
      scrollTrigger: { trigger: root.value, start: 'top 82%', once: true },
    })
    gsap.from(root.value.querySelector('img'), { scale: 1.08, duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: root.value, start: 'top 82%', once: true } })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <figure ref="root" class="reveal-image">
    <img :src="src" :alt="alt" loading="lazy" :style="{ objectPosition: position }" />
  </figure>
</template>

<style scoped>
.reveal-image { margin: 0; overflow: hidden; }
.reveal-image img { width: 100%; height: 100%; object-fit: cover; }
</style>
