<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import beforeAfterImage from '../../assets/images/refs/before-after-reference.jpg'

const root = ref(null)
const frame = ref(null)
const handle = ref(null)
const value = ref(50)
let positionTo
let xTo

const update = (percentage) => {
  const safe = Math.max(8, Math.min(92, percentage))
  value.value = safe
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.value.style.setProperty('--position', safe)
    gsap.set(handle.value, { x: ((safe - 50) / 100) * frame.value.clientWidth })
    return
  }
  positionTo(safe)
  xTo(((safe - 50) / 100) * frame.value.clientWidth)
}

const pointerMove = (event) => {
  if (event.buttons !== 1 && event.pointerType !== 'touch') return
  const bounds = frame.value.getBoundingClientRect()
  update(((event.clientX - bounds.left) / bounds.width) * 100)
}

const input = (event) => update(Number(event.target.value))

onMounted(() => {
  positionTo = gsap.quickTo(root.value, '--position', { duration: 0.42, ease: 'power3.out' })
  xTo = gsap.quickTo(handle.value, 'x', { duration: 0.42, ease: 'power3.out' })
})

onUnmounted(() => {
  positionTo?.tween?.kill()
  xTo?.tween?.kill()
  positionTo = null
  xTo = null
})
</script>

<template>
  <section ref="root" class="before-after section" style="--position: 50" aria-labelledby="before-heading">
    <div class="container">
      <h2 id="before-heading" class="serif-title">THE DIFFERENCE IS IN THE MILLIMETERS.</h2>
      <div ref="frame" class="ba-frame" data-cursor="DRAG" @pointerdown="pointerMove" @pointermove="pointerMove">
        <div class="ba-layer ba-before">
          <img :src="beforeAfterImage" alt="Cabelo antes do refinamento" loading="lazy" />
        </div>
        <div class="ba-layer ba-after">
          <img :src="beforeAfterImage" alt="Cabelo após o refinamento" loading="lazy" />
        </div>
        <span class="ba-label before">BEFORE</span>
        <span class="ba-label after">AFTER</span>
        <div ref="handle" class="ba-handle" aria-hidden="true"><span>DRAG</span></div>
        <input class="ba-range" type="range" min="8" max="92" :value="value" aria-label="Mover comparação de antes e depois" @input="input" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.before-after { background: #090a0a; }
.before-after .serif-title { max-width: 14ch; margin: 0 auto 3rem; font-size: clamp(3rem, 5.8vw, 6.2rem); text-align: center; }
.ba-frame { position: relative; height: min(74dvh, 52rem); overflow: hidden; background: var(--graphite); touch-action: none; user-select: none; }
.ba-layer { position: absolute; inset: 0; overflow: hidden; }
.ba-layer img { width: 116%; height: 116%; max-width: none; object-fit: cover; object-position: center 68%; transform: translate(-7%, -9%); pointer-events: none; }
.ba-before { filter: grayscale(1) contrast(.78) brightness(.7); }
.ba-after { clip-path: inset(0 calc((100 - var(--position)) * 1%) 0 0); filter: saturate(.82) contrast(1.04); }
.ba-label { position: absolute; top: 1.6rem; z-index: 3; color: var(--champagne-bright); font-size: .64rem; font-weight: 600; letter-spacing: .17em; }
.ba-label.before { left: 1.6rem; }
.ba-label.after { right: 1.6rem; }
.ba-handle { position: absolute; top: 0; bottom: 0; left: 50%; z-index: 4; width: 1px; background: var(--champagne-bright); pointer-events: none; will-change: transform; }
.ba-handle span { position: absolute; top: 50%; left: 50%; display: grid; width: 4rem; height: 4rem; place-items: center; border: 1px solid var(--champagne-bright); border-radius: 50%; color: var(--mineral); background: rgba(11,12,12,.72); font-size: .56rem; letter-spacing: .12em; transform: translate(-50%, -50%); }
.ba-range { position: absolute; inset: 0; z-index: 5; width: 100%; height: 100%; margin: 0; opacity: 0; cursor: ew-resize; }
@media (max-width: 767px) {
  .ba-frame { height: 62dvh; }
  .ba-layer img { width: 170%; transform: translate(-21%, -9%); }
  .ba-handle span { width: 3.3rem; height: 3.3rem; }
}
</style>
