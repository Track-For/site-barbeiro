<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  href: { type: String, default: '' },
  variant: { type: String, default: 'primary' },
  cursor: { type: String, default: 'BOOK' },
  target: { type: String, default: undefined },
})

const root = ref(null)
let xTo
let yTo
let finePointer

const handleMove = (event) => {
  if (!finePointer?.matches) return
  const bounds = root.value.getBoundingClientRect()
  xTo((event.clientX - bounds.left - bounds.width / 2) * 0.18)
  yTo((event.clientY - bounds.top - bounds.height / 2) * 0.18)
}

const handleLeave = () => {
  xTo?.(0)
  yTo?.(0)
}

onMounted(() => {
  finePointer = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
  xTo = gsap.quickTo(root.value, 'x', { duration: 0.42, ease: 'power3.out' })
  yTo = gsap.quickTo(root.value, 'y', { duration: 0.42, ease: 'power3.out' })
  root.value.addEventListener('pointermove', handleMove)
  root.value.addEventListener('pointerleave', handleLeave)
})

onUnmounted(() => {
  root.value?.removeEventListener('pointermove', handleMove)
  root.value?.removeEventListener('pointerleave', handleLeave)
  xTo?.tween?.kill()
  yTo?.tween?.kill()
})
</script>

<template>
  <component
    :is="props.href ? 'a' : 'button'"
    ref="root"
    class="magnetic-button"
    :class="`magnetic-button--${props.variant}`"
    :href="props.href || undefined"
    :target="props.target"
    :rel="props.target === '_blank' ? 'noreferrer' : undefined"
    :type="props.href ? undefined : 'button'"
    :data-cursor="props.cursor"
  >
    <span class="magnetic-button__label"><slot /></span>
    <span class="magnetic-button__icon" aria-hidden="true">↗</span>
  </component>
</template>

<style scoped>
.magnetic-button {
  display: inline-flex;
  min-height: 3.5rem;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 0.55rem 0.6rem 0.55rem 1.35rem;
  border: 1px solid transparent;
  border-radius: 0;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: pointer;
  transition:
    color 500ms var(--ease-heavy),
    background-color 500ms var(--ease-heavy),
    border-color 500ms var(--ease-heavy),
    transform 180ms var(--ease-heavy);
}

.magnetic-button--primary {
  color: #101111;
  background: var(--champagne-bright);
}

.magnetic-button--ghost {
  color: var(--mineral);
  border-color: var(--line-strong);
  background: rgba(11, 12, 12, 0.32);
}

.magnetic-button__icon {
  display: grid;
  width: 2.35rem;
  height: 2.35rem;
  place-items: center;
  border: 1px solid currentColor;
  font-size: 1rem;
  transition: transform 500ms var(--ease-heavy);
}

.magnetic-button:hover .magnetic-button__icon {
  transform: translate(0.16rem, -0.16rem);
}

.magnetic-button--primary:hover {
  background: var(--mineral);
}

.magnetic-button--ghost:hover {
  color: var(--ink);
  border-color: var(--mineral);
  background: var(--mineral);
}

.magnetic-button:active {
  transform: scale(0.98);
}
</style>
