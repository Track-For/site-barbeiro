<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/layout/Navbar.vue'
import Footer from './components/layout/Footer.vue'
import HeroSection from './components/sections/HeroSection.vue'
import CutStorySection from './components/sections/CutStorySection.vue'
import StyleSelector from './components/sections/StyleSelector.vue'
import ServicesSection from './components/sections/ServicesSection.vue'
import BarberSelector from './components/sections/BarberSelector.vue'
import RitualSection from './components/sections/RitualSection.vue'
import RazorSection from './components/sections/RazorSection.vue'
import AuthoritySection from './components/sections/AuthoritySection.vue'
import BeforeAfterSection from './components/sections/BeforeAfterSection.vue'
import LookbookSection from './components/sections/LookbookSection.vue'
import SpaceSection from './components/sections/SpaceSection.vue'
import TestimonialsSection from './components/sections/TestimonialsSection.vue'
import BookingSection from './components/sections/BookingSection.vue'
import FinalCTA from './components/sections/FinalCTA.vue'
import CustomCursor from './components/motion/CustomCursor.vue'

const intro = ref(null)
const introDone = ref(false)
let ctx
const refreshTriggers = () => ScrollTrigger.refresh()

onMounted(() => {
  window.addEventListener('load', refreshTriggers, { once: true })
  document.fonts?.ready.then(refreshTriggers)
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) {
    introDone.value = true
    return
  }

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power4.inOut' },
      onComplete: () => { introDone.value = true },
    })

    tl.fromTo('.intro-line-x', { scaleX: 0 }, { scaleX: 1, duration: 0.52 })
      .fromTo('.intro-line-y', { scaleY: 0 }, { scaleY: 1, duration: 0.32 }, '-=0.16')
      .fromTo('.intro-mark', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.34 }, '-=0.14')
      .to('.intro-line-x, .intro-line-y, .intro-mark', { autoAlpha: 0, duration: 0.22 }, '+=0.1')
      .to(intro.value, { yPercent: -100, duration: 0.48, ease: 'power4.inOut' }, '-=0.02')
  }, intro.value)
})

onUnmounted(() => {
  window.removeEventListener('load', refreshTriggers)
  ctx?.revert()
})
</script>

<template>
  <div class="site-shell">
    <div v-if="!introDone" ref="intro" class="intro" aria-hidden="true">
      <span class="intro-line-x" />
      <span class="intro-line-y" />
      <div class="intro-mark">A<span>27</span></div>
    </div>

    <CustomCursor />
    <Navbar />
    <main id="conteudo">
      <HeroSection />
      <CutStorySection />
      <StyleSelector />
      <ServicesSection />
      <BarberSelector />
      <RitualSection />
      <RazorSection />
      <AuthoritySection />
      <BeforeAfterSection />
      <LookbookSection />
      <SpaceSection />
      <TestimonialsSection />
      <BookingSection />
      <FinalCTA />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.site-shell {
  position: relative;
  overflow: clip;
  background:
    radial-gradient(circle at 72% 18%, rgba(139, 144, 146, 0.07), transparent 27rem),
    var(--ink);
}

.intro {
  position: fixed;
  inset: 0;
  z-index: var(--z-overlay);
  display: grid;
  place-items: center;
  overflow: hidden;
  background: #070808;
}

.intro-line-x,
.intro-line-y {
  position: absolute;
  display: block;
  background: linear-gradient(90deg, transparent, var(--steel), transparent);
  transform-origin: center;
}

.intro-line-x {
  width: 100%;
  height: 1px;
}

.intro-line-y {
  width: 1px;
  height: 100%;
  background: linear-gradient(0deg, transparent, var(--champagne-bright), transparent);
}

.intro-mark {
  position: relative;
  z-index: 2;
  font-family: var(--display);
  font-size: clamp(4rem, 9vw, 8rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.08em;
}

.intro-mark span {
  margin-left: 0.1em;
  color: var(--champagne);
  font-size: 0.34em;
  letter-spacing: 0.05em;
  vertical-align: 0.35em;
}
</style>
