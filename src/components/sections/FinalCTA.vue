<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import MagneticButton from '../motion/MagneticButton.vue'
import finalImage from '../../assets/images/refs/final-reference.jpg'

const root = ref(null)
let ctx

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: root.value, start: 'top 70%', once: true },
      defaults: { ease: 'power4.out' },
    })
    tl.fromTo('.final-image', { scale: 1.12 }, { scale: 1, duration: 1.5 })
      .fromTo('.final-first', { yPercent: 110 }, { yPercent: 0, duration: .78 }, '-=1.12')
      .fromTo('.final-second', { yPercent: 110 }, { yPercent: 0, duration: .9 }, '-=.52')
      .fromTo('.final-action', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .55 }, '-=.35')
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section ref="root" class="final-cta">
    <div class="final-media">
      <img class="final-image" :src="finalImage" alt="Cliente saindo do Atelier 27 com o corte finalizado" loading="lazy" />
      <span />
    </div>
    <div class="container final-content">
      <h2>
        <span class="reveal-mask"><span class="final-first">YOU DON'T NEED A NEW LOOK.</span></span>
        <span class="reveal-mask"><span class="final-second">YOU NEED THE RIGHT ONE.</span></span>
      </h2>
      <div class="final-action"><MagneticButton href="#agendamento">Agendar meu horário</MagneticButton></div>
    </div>
  </section>
</template>

<style scoped>
.final-cta { position: relative; display: grid; min-height: 100dvh; align-items: center; overflow: hidden; background: #080909; }
.final-media { position: absolute; inset: 0 45% 0 0; overflow: hidden; }
.final-image { width: 200%; height: 100%; max-width: none; object-fit: cover; object-position: left center; transform: translateX(-7%); will-change: transform; }
.final-media span { position: absolute; inset: 0; background: linear-gradient(-90deg, #080909 0%, transparent 54%), linear-gradient(0deg, rgba(8,9,9,.5), transparent 45%); }
.final-content { position: relative; z-index: 2; display: flex; align-items: flex-end; flex-direction: column; text-align: right; }
.final-content h2 { max-width: 13ch; margin: 0; font-family: var(--serif); font-size: clamp(3.8rem, 7.4vw, 8rem); font-weight: 400; line-height: .84; letter-spacing: -.045em; }
.final-content h2 span > span { display: block; padding-bottom: .06em; }
.final-first { color: var(--champagne-bright); font-family: var(--sans); font-size: .28em; font-weight: 500; letter-spacing: .1em; }
.final-second { color: var(--mineral); }
.final-action { margin-top: 2.4rem; }
@media (max-width: 767px) {
  .final-cta { align-items: end; min-height: 88dvh; padding-bottom: 3rem; }
  .final-media { inset: 0; }
  .final-image { width: 230%; transform: translateX(-9%); }
  .final-media span { background: linear-gradient(0deg, #080909 4%, rgba(8,9,9,.88) 38%, transparent 75%); }
  .final-content { align-items: flex-start; text-align: left; }
  .final-content h2 { font-size: clamp(3.5rem, 16vw, 5.7rem); }
}
</style>
