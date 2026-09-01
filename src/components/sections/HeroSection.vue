<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import MagneticButton from '../motion/MagneticButton.vue'
import heroImage from '../../assets/images/refs/hero-reference.jpg'

const root = ref(null)
let ctx

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) return

  ctx = gsap.context(() => {
    const tl = gsap.timeline({ delay: 1.25, defaults: { ease: 'power4.out' } })
    tl.fromTo('.hero-image', { scale: 1.1, filter: 'blur(8px)', autoAlpha: 0 }, { scale: 1, filter: 'blur(0px)', autoAlpha: 1, duration: 1.25 })
      .fromTo('.hero-title .reveal-mask > span', { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.14 }, '-=0.82')
      .fromTo('.hero-support', { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.65 }, '-=0.48')
      .fromTo('.hero-actions', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.58 }, '-=0.38')
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="inicio" ref="root" class="hero">
    <div class="hero-media" aria-hidden="true">
      <img class="hero-image" :src="heroImage" alt="" fetchpriority="high" />
      <span class="hero-scrim" />
    </div>

    <div class="container hero-content">
      <div class="hero-copy">
        <h1 class="hero-title">
          <span class="reveal-mask"><span>YOUR IMAGE.</span></span>
          <span class="reveal-mask"><span class="hero-title-accent">REFINED.</span></span>
        </h1>
        <p class="hero-support">Corte, barba e cuidado pensados para a sua imagem.</p>
        <div class="hero-actions">
          <MagneticButton href="#agendamento">Agendar horário</MagneticButton>
          <a href="#the-cut" class="hero-link" data-cursor="CUT">Conhecer a experiência <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: grid;
  min-height: 100dvh;
  align-items: center;
  overflow: hidden;
  background: #080909;
}

.hero-media {
  position: absolute;
  inset: 0 0 0 34%;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: right center;
  will-change: transform, filter, opacity;
}

.hero-scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(8, 9, 9, 0.96) 0%, rgba(8, 9, 9, 0.12) 18%, transparent 26%),
    linear-gradient(90deg, #080909 0%, rgba(8, 9, 9, 0.9) 12%, transparent 50%),
    linear-gradient(0deg, rgba(8, 9, 9, 0.42), transparent 38%);
}

.hero-content {
  position: relative;
  z-index: 2;
  padding-top: 5rem;
}

.hero-copy { width: min(56rem, 69%); }

.hero-title {
  margin: 0;
  font-family: var(--serif);
  font-size: clamp(4.8rem, 9vw, 9.6rem);
  font-weight: 400;
  line-height: 0.78;
  letter-spacing: -0.055em;
}

.hero-title > span { padding-bottom: 0.08em; }
.hero-title > span > span { display: block; }
.hero-title-accent { color: var(--champagne-bright); margin-left: 0.24em; }

.hero-support {
  max-width: 38ch;
  margin: 2.2rem 0 0;
  color: rgba(233, 230, 223, 0.72);
  font-size: clamp(0.92rem, 1.25vw, 1.08rem);
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 1.8rem;
  margin-top: 2.3rem;
}

.hero-link {
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  color: var(--mineral);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.hero-link span { color: var(--champagne); transition: transform 400ms var(--ease-heavy); }
.hero-link:hover span { transform: translateY(0.25rem); }

@media (max-width: 800px) {
  .hero { align-items: end; }
  .hero-media { inset: 0; }
  .hero-image { object-position: 70% center; }
  .hero-scrim { background: linear-gradient(0deg, #080909 2%, rgba(8, 9, 9, 0.88) 35%, rgba(8, 9, 9, 0.08) 78%), linear-gradient(180deg, rgba(8,9,9,.92), transparent 18%); }
  .hero-content { padding-top: 7rem; padding-bottom: 3.2rem; }
  .hero-copy { width: 100%; }
  .hero-title { font-size: clamp(3.9rem, 18vw, 6.7rem); line-height: 0.82; }
  .hero-title-accent { margin-left: 0; }
  .hero-actions { align-items: flex-start; flex-direction: column; gap: 1.2rem; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-image { filter: none; opacity: 1; transform: none; will-change: auto; }
}
</style>
