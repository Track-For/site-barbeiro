<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import ritualImage from '../../assets/images/refs/ritual-reference.jpg'

const root = ref(null)
const current = ref(0)
let ctx

const steps = [
  { name: 'CONSULTA', text: 'Entender rotina, formato e o que precisa continuar funcionando.' },
  { name: 'PREPARO', text: 'O corte começa antes da tesoura.' },
  { name: 'CORTE', text: 'Forma primeiro. Técnica a serviço da proporção.' },
  { name: 'ACABAMENTO', text: 'Contornos precisos sem parecerem desenhados.' },
  { name: 'STYLING', text: 'Você sai sabendo reproduzir o resultado em casa.' },
]

const active = computed(() => steps[current.value])

onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const mobile = window.matchMedia('(max-width: 767px)').matches
  if (reduce || mobile) return

  ctx = gsap.context(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: root.value,
        start: 'top top',
        end: '+=2600',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const next = Math.min(steps.length - 1, Math.floor(self.progress * steps.length))
          if (next !== current.value) current.value = next
        },
      },
    })
      .fromTo('.ritual-progress i', { scaleY: 0 }, { scaleY: 1, duration: 5, ease: 'none' }, 0)
      .fromTo('.ritual-image', { scale: 1.08, yPercent: -3 }, { scale: 1, yPercent: 3, duration: 5, ease: 'none' }, 0)
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="experiencia" ref="root" class="ritual">
    <div class="ritual-image-wrap">
      <img class="ritual-image" :src="ritualImage" alt="Preparo com toalha quente durante o ritual" loading="lazy" />
      <span />
    </div>
    <div class="container ritual-layout">
      <div class="ritual-copy">
        <h2 class="serif-title">THE RITUAL</h2>
        <ol>
          <li v-for="(step, index) in steps" :key="step.name" :class="{ active: current === index }">{{ step.name }}</li>
          <span class="ritual-progress"><i /></span>
        </ol>
        <Transition name="ritual-text" mode="out-in"><p :key="active.name">{{ active.text }}</p></Transition>
      </div>
    </div>
    <div class="container ritual-mobile-copy">
      <article v-for="step in steps" :key="step.name"><h3>{{ step.name }}</h3><p>{{ step.text }}</p></article>
    </div>
  </section>
</template>

<style scoped>
.ritual { position: relative; display: grid; min-height: 100dvh; align-items: center; overflow: hidden; background: #0c0d0d; }
.ritual-image-wrap { position: absolute; inset: 0 0 0 43%; overflow: hidden; }
.ritual-image { width: 168%; height: 100%; object-fit: cover; object-position: right center; transform: translateX(-40%); will-change: transform; }
.ritual-image-wrap > span { position: absolute; inset: 0; background: linear-gradient(90deg, #0c0d0d 0%, rgba(12,13,13,.82) 16%, transparent 56%); }
.ritual-layout { position: relative; z-index: 2; }
.ritual-copy { width: min(39rem, 48%); }
.ritual-copy .serif-title { font-size: clamp(4rem, 7vw, 7rem); }
.ritual-copy ol { position: relative; display: grid; gap: 1.4rem; margin: 3rem 0 0; padding: 0 0 0 1.5rem; list-style: none; }
.ritual-copy li { color: #565959; font-family: var(--serif); font-size: 1.4rem; transition: color 450ms var(--ease-heavy), font-size 450ms var(--ease-heavy), transform 450ms var(--ease-heavy); }
.ritual-copy li.active { color: var(--champagne-bright); font-size: 2.8rem; transform: translateX(.55rem); }
.ritual-progress { position: absolute; inset: 0 auto 0 0; width: 1px; background: var(--line); }
.ritual-progress i { display: block; width: 1px; height: 100%; background: var(--champagne); transform-origin: top; }
.ritual-copy > p { max-width: 28ch; margin: 2rem 0 0; color: var(--mineral-muted); }
.ritual-mobile-copy { display: none; }
.ritual-text-enter-active, .ritual-text-leave-active { transition: opacity 280ms var(--ease-heavy), transform 400ms var(--ease-heavy); }
.ritual-text-enter-from { opacity: 0; transform: translateY(.8rem); }
.ritual-text-leave-to { opacity: 0; transform: translateY(-.8rem); }

@media (max-width: 767px) {
  .ritual { display: block; min-height: auto; padding-block: 6rem; }
  .ritual-image-wrap { position: relative; inset: auto; height: 55dvh; margin-left: var(--gutter); }
  .ritual-image { width: 165%; transform: translateX(-39%) !important; }
  .ritual-layout { margin-top: 2.5rem; }
  .ritual-copy { width: 100%; }
  .ritual-copy ol, .ritual-copy > p { display: none; }
  .ritual-mobile-copy { display: grid; gap: 2.5rem; margin-top: 3rem; }
  .ritual-mobile-copy article { padding-left: 1rem; border-left: 1px solid var(--line); }
  .ritual-mobile-copy h3 { margin: 0; color: var(--champagne-bright); font-family: var(--display); font-size: 2.8rem; font-weight: 500; }
  .ritual-mobile-copy p { margin: .4rem 0 0; color: var(--mineral-muted); }
}
</style>
