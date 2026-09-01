<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

const cursor = ref(null)
const label = ref('VIEW')
const visible = ref(false)
let xTo
let yTo
let scaleTo
let finePointer

const move = (event) => {
  if (!finePointer?.matches) return
  visible.value = true
  xTo(event.clientX)
  yTo(event.clientY)
  const interactive = event.target.closest('[data-cursor]')
  label.value = interactive?.dataset.cursor || 'VIEW'
  scaleTo(interactive ? 1 : 0.72)
}

const hide = () => { visible.value = false }

onMounted(() => {
  finePointer = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
  if (!finePointer.matches) return
  gsap.set(cursor.value, { xPercent: -50, yPercent: -50 })
  xTo = gsap.quickTo(cursor.value, 'x', { duration: 0.3, ease: 'power3.out' })
  yTo = gsap.quickTo(cursor.value, 'y', { duration: 0.3, ease: 'power3.out' })
  scaleTo = gsap.quickTo(cursor.value, 'scale', { duration: 0.25, ease: 'power3.out' })
  window.addEventListener('pointermove', move, { passive: true })
  document.documentElement.addEventListener('mouseleave', hide)
})

onUnmounted(() => {
  window.removeEventListener('pointermove', move)
  document.documentElement.removeEventListener('mouseleave', hide)
  xTo?.tween?.kill()
  yTo?.tween?.kill()
  scaleTo?.tween?.kill()
})
</script>

<template>
  <div ref="cursor" class="custom-cursor" :class="{ 'is-visible': visible }" aria-hidden="true">
    <span>{{ label }}</span>
  </div>
</template>

<style scoped>
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-cursor);
  display: grid;
  width: 4.3rem;
  height: 4.3rem;
  place-items: center;
  border: 1px solid rgba(233, 230, 223, 0.56);
  border-radius: 50%;
  color: var(--ink);
  background: rgba(233, 230, 223, 0.9);
  opacity: 0;
  pointer-events: none;
  mix-blend-mode: difference;
  transition: opacity 180ms var(--ease-heavy);
}

.custom-cursor.is-visible {
  opacity: 1;
}

.custom-cursor span {
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.14em;
}

@media (max-width: 900px), (pointer: coarse), (prefers-reduced-motion: reduce) {
  .custom-cursor { display: none; }
}
</style>
