<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  delay: { type: Number, default: 0 },
  amount: { type: Number, default: 0.25 },
})

const root = ref(null)
let ctx

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  ctx = gsap.context(() => {
    gsap.from(root.value, {
      y: 44,
      autoAlpha: 0,
      duration: 0.9,
      delay: props.delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: root.value,
        start: `top ${Math.round((1 - props.amount) * 100)}%`,
        once: true,
      },
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template><div ref="root"><slot /></div></template>
