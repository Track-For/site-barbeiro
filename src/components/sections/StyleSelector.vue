<script setup>
import { computed, nextTick, ref } from 'vue'
import { gsap } from 'gsap'
import RevealText from '../motion/RevealText.vue'
import styleImage from '../../assets/images/refs/style-reference.jpg'
import cutImage from '../../assets/images/refs/cut-reference.jpg'
import beforeAfterImage from '../../assets/images/refs/before-after-reference.jpg'
import heroImage from '../../assets/images/refs/hero-reference.jpg'
import testimonialImage from '../../assets/images/refs/testimonial-reference.jpg'
import finalImage from '../../assets/images/refs/final-reference.jpg'

const image = ref(null)
const active = ref(3)

const styles = [
  { name: 'LOW FADE', description: 'Laterais baixas e limpas, com transição quase invisível.', personality: 'Preciso. Limpo. Versátil.', image: beforeAfterImage, position: '45% center' },
  { name: 'MID FADE', description: 'Contraste mais presente sem desconectar o topo.', personality: 'Marcado. Atual. Direto.', image: cutImage, position: '57% center' },
  { name: 'TAPER', description: 'Refino pontual nas têmporas e nuca, mantendo a forma.', personality: 'Discreto. Técnico. Durável.', image: finalImage, position: '25% center' },
  { name: 'TEXTURED CROP', description: 'Estrutura curta, textura marcada e baixa manutenção.', personality: 'Preciso. Contemporâneo. Fácil de manter.', image: styleImage, position: 'center' },
  { name: 'CLASSIC', description: 'Peso controlado, linhas sóbrias e acabamento de alfaiataria.', personality: 'Maduro. Calmo. Intencional.', image: testimonialImage, position: '82% center' },
  { name: 'SLICK BACK', description: 'Comprimento conduzido para trás com brilho sob controle.', personality: 'Clássico. Seguro. Presente.', image: heroImage, position: '78% center' },
]

const selected = computed(() => styles[active.value])

const selectStyle = (index) => {
  if (index === active.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    active.value = index
    return
  }
  gsap.to(image.value, {
    scale: 0.96,
    filter: 'blur(7px)',
    autoAlpha: 0,
    duration: 0.28,
    ease: 'power2.in',
    onComplete: async () => {
      active.value = index
      await nextTick()
      gsap.fromTo(image.value, { scale: 1.04, filter: 'blur(7px)', autoAlpha: 0 }, { scale: 1, filter: 'blur(0px)', autoAlpha: 1, duration: 0.52, ease: 'power3.out' })
    },
  })
}
</script>

<template>
  <section class="style-selector section" aria-labelledby="style-heading">
    <div class="container style-layout">
      <RevealText class="style-title-wrap"><h2 id="style-heading" class="section-title">WHAT'S YOUR CUT?</h2></RevealText>

      <div class="style-stage" data-cursor="CUT">
        <div class="style-photo">
          <img ref="image" :src="selected.image" :alt="`Referência visual do corte ${selected.name}`" :style="{ objectPosition: selected.position }" loading="lazy" />
          <span class="style-photo-scrim" />
        </div>
        <button
          v-for="(item, index) in styles"
          :key="item.name"
          type="button"
          class="style-option"
          :class="[`option-${index}`, { active: active === index }]"
          :aria-pressed="active === index"
          @mouseenter="selectStyle(index)"
          @focus="selectStyle(index)"
          @click="selectStyle(index)"
        >{{ item.name }}</button>
      </div>

      <Transition name="style-copy" mode="out-in">
        <div :key="selected.name" class="style-copy">
          <h3>{{ selected.name }}</h3>
          <p>{{ selected.description }}</p>
          <span>{{ selected.personality }}</span>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.style-selector { min-height: 110dvh; display: grid; align-items: center; overflow: hidden; }
.style-layout { position: relative; min-height: 52rem; }
.style-title-wrap { position: absolute; top: 0; left: 0; z-index: 3; }
.style-title-wrap :deep(.section-title) { max-width: 7ch; font-size: clamp(4.4rem, 8vw, 8rem); }
.style-stage { position: absolute; inset: 0; }
.style-photo { position: absolute; top: 2%; left: 28%; width: 48%; height: 88%; overflow: hidden; background: var(--graphite); }
.style-photo img { width: 165%; height: 100%; max-width: none; object-fit: cover; transform: translateX(-20%); }
.style-photo-scrim { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(11,12,12,.28), transparent 35%, rgba(11,12,12,.22)); }
.style-option { position: absolute; z-index: 2; padding: 0; border: 0; color: #686c6d; background: transparent; font-family: var(--display); font-size: clamp(1.2rem, 2.2vw, 2.2rem); letter-spacing: 0.1em; cursor: pointer; transition: color 400ms var(--ease-heavy), transform 400ms var(--ease-heavy); }
.style-option::before { content: ''; position: absolute; top: 50%; right: calc(100% + .8rem); width: 1.4rem; height: 1px; background: var(--champagne); transform: scaleX(0); transform-origin: right; transition: transform 400ms var(--ease-heavy); }
.style-option.active { color: var(--champagne-bright); transform: translateX(.4rem); }
.style-option.active::before { transform: scaleX(1); }
.option-0 { top: 29%; left: 13%; }
.option-1 { top: 52%; left: 6%; }
.option-2 { top: 15%; right: 10%; }
.option-3 { top: 37%; right: 0; }
.option-4 { top: 65%; right: 5%; }
.option-5 { bottom: 10%; right: 22%; }
.style-copy { position: absolute; bottom: 0; left: 0; z-index: 3; max-width: 34rem; }
.style-copy h3 { margin: 0; color: var(--champagne-bright); font-family: var(--display); font-size: clamp(3.4rem, 6vw, 6rem); font-weight: 500; line-height: .9; }
.style-copy p { max-width: 34ch; margin: .9rem 0 .5rem; font-family: var(--serif); font-size: 1.5rem; line-height: 1.2; }
.style-copy span { color: var(--steel); font-size: .78rem; }
.style-copy-enter-active, .style-copy-leave-active { transition: opacity 280ms var(--ease-heavy), transform 400ms var(--ease-heavy); }
.style-copy-enter-from { opacity: 0; transform: translateY(1rem); }
.style-copy-leave-to { opacity: 0; transform: translateY(-1rem); }

@media (max-width: 767px) {
  .style-selector { min-height: auto; }
  .style-layout { display: flex; min-height: auto; flex-direction: column; }
  .style-title-wrap, .style-stage, .style-copy { position: relative; }
  .style-stage { display: flex; min-height: 37rem; flex-wrap: wrap; align-content: flex-end; gap: 0 .1rem; margin-top: 2.5rem; padding-top: 31rem; }
  .style-photo { top: 0; left: 0; width: 100%; height: 30rem; }
  .style-option { top: auto; right: auto; bottom: auto; left: auto; position: relative; display: inline-block; margin: .55rem .8rem 0 0; font-size: 1.1rem; }
  .style-option::before { display: none; }
  .style-copy { margin-top: 2.3rem; }
}
</style>
