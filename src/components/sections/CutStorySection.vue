<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import MagneticButton from '../motion/MagneticButton.vue'
import cutImage from '../../assets/images/refs/cut-reference.jpg'

const root = ref(null)
const frame = ref(null)
const current = ref(0)
let ctx

const stages = [
  { title: 'BEFORE THE CUT', text: 'Todo corte começa entendendo o formato, rotina e estilo.' },
  { title: 'STRUCTURE', text: 'Proporção antes de tendência.' },
  { title: 'PRECISION', text: 'Milímetros mudam a leitura do rosto.' },
  { title: 'TEXTURE', text: 'Movimento sem perder controle.' },
  { title: 'IDENTITY', text: 'O melhor corte é aquele que parece ter sido feito para você.' },
]

const activeStage = computed(() => stages[current.value])

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const mobile = window.matchMedia('(max-width: 767px)').matches
  if (reduce) {
    current.value = stages.length - 1
    return
  }
  if (mobile) return

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root.value,
        start: 'top top',
        end: '+=4200',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const next = Math.min(stages.length - 1, Math.floor(self.progress * stages.length))
          if (next !== current.value) current.value = next
        },
      },
    })

    tl.fromTo('.cut-after', { clipPath: 'inset(0 88% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 5, ease: 'none' }, 0)
      .fromTo('.blade-line', { x: () => frame.value.clientWidth * 0.1 }, { x: () => frame.value.clientWidth * 0.88, duration: 5, ease: 'none' }, 0)
      .to('.cut-photo', { scale: 1.04, duration: 5, ease: 'none' }, 0)
      .fromTo('.cut-progress-fill', { scaleY: 0 }, { scaleY: 1, duration: 5, ease: 'none' }, 0)
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="the-cut" ref="root" class="cut-story" data-cursor="CUT">
    <div class="container cut-layout">
      <div class="cut-copy-wrap">
        <p class="eyebrow">The Cut</p>
        <Transition name="stage" mode="out-in">
          <div :key="activeStage.title" class="cut-copy">
            <h2>{{ activeStage.title }}</h2>
            <p>{{ activeStage.text }}</p>
            <MagneticButton v-if="current === 4" href="#profissionais" variant="ghost" cursor="MEET">Encontrar meu barbeiro</MagneticButton>
          </div>
        </Transition>
      </div>

      <div ref="frame" class="cut-frame" aria-label="Corte sendo refinado da forma inicial ao resultado final">
        <img class="cut-photo cut-before" :src="cutImage" alt="Homem antes do refinamento completo do corte" loading="lazy" />
        <div class="cut-after">
          <img class="cut-photo" :src="cutImage" alt="Homem com o corte finalizado" loading="lazy" />
        </div>
        <span class="blade-line"><i /></span>
      </div>

      <ol class="cut-index" aria-label="Etapas do corte">
        <li v-for="(stage, index) in stages" :key="stage.title" :class="{ active: current === index }">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>{{ stage.title }}
        </li>
        <span class="cut-progress"><i class="cut-progress-fill" /></span>
      </ol>
    </div>

    <div class="container cut-mobile-steps">
      <article v-for="(stage, index) in stages" :key="stage.title">
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <h3>{{ stage.title }}</h3>
        <p>{{ stage.text }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.cut-story {
  position: relative;
  display: grid;
  min-height: 100dvh;
  align-items: center;
  overflow: hidden;
  background: #0e0f0f;
}

.cut-layout {
  display: grid;
  min-height: 100dvh;
  grid-template-columns: 1fr minmax(23rem, 48vw) 0.72fr;
  align-items: center;
  gap: clamp(1.2rem, 3vw, 3rem);
}

.cut-copy-wrap { position: relative; z-index: 3; }
.cut-copy { min-height: 14rem; }

.cut-copy h2 {
  margin: 0;
  font-family: var(--display);
  font-size: clamp(3.3rem, 6vw, 6.5rem);
  font-weight: 500;
  line-height: 0.88;
}

.cut-copy p { max-width: 27ch; margin: 1.4rem 0 2rem; color: var(--mineral-muted); }

.cut-frame {
  position: relative;
  height: min(82dvh, 58rem);
  overflow: hidden;
  background: #080909;
  isolation: isolate;
}

.cut-frame::before,
.cut-frame::after {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 3;
  width: 13%;
  content: '';
  pointer-events: none;
}
.cut-frame::before { left: 0; background: linear-gradient(90deg, #0e0f0f, transparent); }
.cut-frame::after { right: 0; background: linear-gradient(-90deg, #0e0f0f, transparent); }

.cut-photo {
  position: absolute;
  inset: -5%;
  width: 110%;
  height: 110%;
  object-fit: cover;
  object-position: center;
  will-change: transform;
}

.cut-before { filter: grayscale(0.82) contrast(0.86) brightness(0.72); object-position: 43% center; }
.cut-after { position: absolute; inset: 0; overflow: hidden; will-change: clip-path; }
.cut-after .cut-photo { filter: saturate(0.76) contrast(1.08); object-position: 57% center; }

.blade-line {
  position: absolute;
  top: 7%;
  bottom: 7%;
  left: 0;
  z-index: 4;
  width: 1px;
  background: linear-gradient(0deg, transparent, var(--mineral), var(--champagne-bright), transparent);
  box-shadow: 0 0 0 1px rgba(182, 160, 113, 0.12);
  will-change: transform;
}

.blade-line i { position: absolute; top: 50%; left: 50%; width: 0.5rem; height: 0.5rem; border: 1px solid var(--champagne-bright); transform: translate(-50%, -50%) rotate(45deg); }

.cut-index { position: relative; display: grid; gap: 1.65rem; margin: 0; padding: 0 0 0 1.4rem; list-style: none; }
.cut-index li { display: grid; grid-template-columns: 2.2rem 1fr; color: #575b5c; font-family: var(--display); font-size: 1.1rem; letter-spacing: 0.08em; transition: color 500ms var(--ease-heavy), transform 500ms var(--ease-heavy); }
.cut-index li span { color: var(--steel); font-family: var(--sans); font-size: 0.58rem; padding-top: 0.38rem; }
.cut-index li.active { color: var(--champagne-bright); transform: translateX(0.45rem); }
.cut-progress { position: absolute; top: 0; bottom: 0; left: 0; width: 1px; background: var(--line); }
.cut-progress i { display: block; width: 100%; height: 100%; background: var(--champagne); transform-origin: top; }
.cut-mobile-steps { display: none; }
.stage-enter-active, .stage-leave-active { transition: opacity 350ms var(--ease-heavy), transform 500ms var(--ease-heavy); }
.stage-enter-from { opacity: 0; transform: translateY(1.2rem); }
.stage-leave-to { opacity: 0; transform: translateY(-1.2rem); }

@media (max-width: 767px) {
  .cut-story { display: block; min-height: auto; padding-block: 6rem; overflow: visible; }
  .cut-layout { display: block; min-height: auto; width: 100%; }
  .cut-copy-wrap, .cut-index { display: none; }
  .cut-frame { width: calc(100% - 2.3rem); height: 72dvh; margin-inline: auto; }
  .cut-after { clip-path: inset(0 0 0 52%); }
  .blade-line { left: 52%; }
  .cut-photo { transform: none !important; }
  .cut-mobile-steps { display: grid; gap: 3.5rem; margin-top: 4rem; }
  .cut-mobile-steps article { padding-left: 1rem; border-left: 1px solid var(--line); }
  .cut-mobile-steps span { color: var(--champagne); font-size: 0.64rem; }
  .cut-mobile-steps h3 { margin: 0.45rem 0 0; font-family: var(--display); font-size: 3.3rem; font-weight: 500; line-height: 0.9; }
  .cut-mobile-steps p { max-width: 30ch; color: var(--mineral-muted); }
}
</style>
