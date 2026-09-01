<script setup>
import { computed, nextTick, ref } from 'vue'
import { gsap } from 'gsap'
import { barbers, styleNeeds } from '../../data/barbers'
import MagneticButton from '../motion/MagneticButton.vue'

const activeId = ref('mateus')
const selectedNeed = ref('Textura')
const image = ref(null)

const active = computed(() => barbers.find((barber) => barber.id === activeId.value) || barbers[0])

const matchBarber = (need) => {
  selectedNeed.value = need
  const recommendation = barbers.find((barber) => barber.tags.includes(need)) || barbers[0]
  selectBarber(recommendation.id)
}

const selectBarber = (id) => {
  if (id === activeId.value) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    activeId.value = id
    return
  }
  gsap.to(image.value, {
    autoAlpha: 0,
    scale: 0.97,
    filter: 'blur(7px)',
    duration: 0.28,
    onComplete: async () => {
      activeId.value = id
      await nextTick()
      gsap.fromTo(image.value, { autoAlpha: 0, scale: 1.03, filter: 'blur(7px)' }, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power3.out' })
    },
  })
}
</script>

<template>
  <section id="profissionais" class="barbers section" aria-labelledby="barber-heading">
    <div class="container">
      <h2 id="barber-heading" class="section-title barber-heading">CHOOSE YOUR BARBER</h2>
      <div class="barber-layout">
        <div class="barber-photo" data-cursor="MEET">
          <img ref="image" :src="active.image" :alt="`${active.fullName}, especialista em ${active.specialty}`" :style="{ objectPosition: active.position }" loading="lazy" />
          <span class="barber-photo-shade" />
        </div>

        <div class="barber-content">
          <div class="barber-names" role="tablist" aria-label="Escolha um profissional">
            <button
              v-for="barber in barbers"
              :key="barber.id"
              type="button"
              role="tab"
              :aria-selected="activeId === barber.id"
              :class="{ active: activeId === barber.id }"
              @mouseenter="selectBarber(barber.id)"
              @focus="selectBarber(barber.id)"
              @click="selectBarber(barber.id)"
            >{{ barber.name }}</button>
          </div>

          <Transition name="barber-meta" mode="out-in">
            <div :key="active.id" class="barber-meta">
              <p>{{ active.specialty }}</p>
              <span>Próximos horários: {{ active.times.join(', ') }}</span>
              <MagneticButton href="#agendamento" cursor="BOOK">Agendar com {{ active.name }}</MagneticButton>
            </div>
          </Transition>
        </div>
      </div>

      <div class="recommendation">
        <p>Qual estilo você procura?</p>
        <div class="need-options" role="group" aria-label="Preferência de estilo">
          <button v-for="need in styleNeeds" :key="need" type="button" :class="{ active: selectedNeed === need }" @click="matchBarber(need)">{{ need }}</button>
        </div>
        <p class="recommendation-result">Para o seu estilo, recomendamos <strong>{{ active.name.charAt(0) + active.name.slice(1).toLowerCase() }}.</strong></p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.barbers { background: #0c0d0d; }
.barber-heading { max-width: 9ch; margin: 0 0 -1.2rem auto; position: relative; z-index: 3; color: var(--champagne-bright); text-align: right; }
.barber-layout { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(21rem, .85fr); min-height: 44rem; }
.barber-photo { position: relative; overflow: hidden; background: var(--graphite); }
.barber-photo::before { position: absolute; inset: 0 0 auto; z-index: 2; height: 16%; content: ''; background: linear-gradient(180deg, rgba(12,13,13,.92), transparent); pointer-events: none; }
.barber-photo img { width: 190%; height: 100%; object-fit: cover; transform: translateX(-2%); }
.barber-photo-shade { position: absolute; inset: 0; background: linear-gradient(90deg, transparent 55%, #0c0d0d 98%), linear-gradient(0deg, rgba(12,13,13,.3), transparent 35%); }
.barber-content { display: flex; flex-direction: column; justify-content: center; padding: 5rem 0 2rem clamp(1.5rem, 5vw, 5rem); }
.barber-names { display: grid; }
.barber-names button { padding: 0; border: 0; color: #4d5050; background: transparent; font-family: var(--display); font-size: clamp(3.5rem, 6vw, 6.8rem); line-height: .9; text-align: left; cursor: pointer; transition: color 400ms var(--ease-heavy), transform 400ms var(--ease-heavy); }
.barber-names button.active { color: var(--mineral); transform: translateX(.7rem); }
.barber-meta { margin-top: 2.5rem; }
.barber-meta p { margin: 0; color: var(--champagne-bright); font-family: var(--serif); font-size: 1.5rem; }
.barber-meta > span { display: block; margin: .35rem 0 1.8rem; color: var(--steel); font-size: .78rem; }
.recommendation { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 1.1rem 2rem; align-items: center; margin-top: 3.5rem; padding-top: 2.2rem; border-top: 1px solid var(--line); }
.recommendation > p:first-child { margin: 0; color: var(--mineral); font-family: var(--display); font-size: 1.5rem; letter-spacing: .05em; text-transform: uppercase; }
.need-options { display: flex; flex-wrap: wrap; gap: .55rem 1.3rem; }
.need-options button { padding: .3rem 0; border: 0; border-bottom: 1px solid transparent; color: var(--steel); background: transparent; font-size: .75rem; cursor: pointer; transition: color 250ms var(--ease-heavy), border-color 250ms var(--ease-heavy); }
.need-options button.active { color: var(--champagne-bright); border-color: var(--champagne); }
.recommendation-result { grid-column: 2; margin: 0; color: var(--mineral-muted); font-size: .9rem; }
.recommendation-result strong { color: var(--champagne-bright); font-weight: 500; }
.barber-meta-enter-active, .barber-meta-leave-active { transition: opacity 260ms var(--ease-heavy), transform 400ms var(--ease-heavy); }
.barber-meta-enter-from { opacity: 0; transform: translateY(1rem); }
.barber-meta-leave-to { opacity: 0; transform: translateY(-1rem); }

@media (max-width: 800px) {
  .barber-heading { margin: 0 0 2rem; text-align: left; }
  .barber-layout { grid-template-columns: 1fr; }
  .barber-photo { height: 62dvh; }
  .barber-content { padding: 2.5rem 0 0; }
  .barber-names { grid-template-columns: repeat(3, 1fr); gap: .5rem; }
  .barber-names button { font-size: 2.5rem; }
  .recommendation { grid-template-columns: 1fr; }
  .recommendation-result { grid-column: 1; }
}
</style>
