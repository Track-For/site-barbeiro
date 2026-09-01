<script setup>
import { computed, ref } from 'vue'
import { services } from '../../data/services'
import RevealText from '../motion/RevealText.vue'

const activeId = ref('combo')
const active = computed(() => services.find((service) => service.id === activeId.value) || services[0])
</script>

<template>
  <section id="servicos" class="services section" aria-labelledby="services-heading">
    <div class="container services-layout">
      <div class="services-main">
        <RevealText><h2 id="services-heading" class="serif-title">SERVIÇOS,<br /><span>SEM ATALHOS.</span></h2></RevealText>
        <div class="service-list">
          <button
            v-for="service in services"
            :key="service.id"
            type="button"
            class="service-row"
            :class="{ active: activeId === service.id }"
            :aria-expanded="activeId === service.id"
            @mouseenter="activeId = service.id"
            @focus="activeId = service.id"
            @click="activeId = service.id"
          >
            <span class="service-number">{{ service.number }}</span>
            <span class="service-name">{{ service.name }}</span>
            <Transition name="service-meta">
              <span v-if="activeId === service.id" class="service-meta">
                <b>{{ service.duration }}</b><b>{{ service.price }}</b><small>{{ service.description }}</small>
              </span>
            </Transition>
          </button>
        </div>
      </div>

      <div class="service-visual" data-cursor="VIEW">
        <Transition name="service-image" mode="out-in">
          <img :key="active.id" :src="active.image" :alt="`Detalhe do serviço ${active.name}`" loading="lazy" />
        </Transition>
        <span class="service-visual-scrim" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.services { background: #101111; }
.services-layout { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(22rem, .8fr); gap: 3.5rem; align-items: end; }
.services-main { position: relative; z-index: 2; }
.serif-title { max-width: 9ch; margin-bottom: 3.5rem; }
.serif-title span { color: var(--champagne); }
.service-list { border-top: 1px solid var(--line); }
.service-row { display: grid; width: 100%; min-height: 4.7rem; grid-template-columns: 4.6rem minmax(0, 1fr); align-items: center; padding: 1rem 0; border: 0; border-bottom: 1px solid var(--line); text-align: left; background: transparent; cursor: pointer; transition: color 500ms var(--ease-heavy); }
.service-row.active { min-height: 9.5rem; color: var(--champagne-bright); }
.service-number { color: var(--steel); font-family: var(--serif); font-size: 1.5rem; }
.service-row.active .service-number { color: var(--champagne); font-size: 2.8rem; }
.service-name { font-family: var(--display); font-size: clamp(1.8rem, 3.4vw, 3.5rem); line-height: .9; }
.service-meta { grid-column: 2; display: grid; grid-template-columns: auto auto minmax(10rem, 1fr); gap: 1.2rem; align-items: center; margin-top: .8rem; color: var(--mineral-muted); }
.service-meta b { color: var(--champagne-bright); font-size: .75rem; font-weight: 500; white-space: nowrap; }
.service-meta small { max-width: 36ch; font-size: .72rem; }
.service-visual { position: sticky; top: 7rem; height: 72dvh; overflow: hidden; background: var(--graphite); }
.service-visual img { width: 170%; height: 100%; object-fit: cover; object-position: right center; transform: translateX(-41%); }
.service-visual-scrim { position: absolute; inset: 0; background: linear-gradient(90deg, #101111 0%, transparent 32%); pointer-events: none; }
.service-image-enter-active, .service-image-leave-active { transition: opacity 380ms var(--ease-heavy), transform 650ms var(--ease-heavy), filter 380ms var(--ease-heavy); }
.service-image-enter-from { opacity: 0; filter: blur(7px); transform: translateX(-41%) scale(1.04) !important; }
.service-image-leave-to { opacity: 0; filter: blur(7px); transform: translateX(-41%) scale(.96) !important; }
.service-meta-enter-active, .service-meta-leave-active { transition: opacity 300ms var(--ease-heavy), transform 400ms var(--ease-heavy); }
.service-meta-enter-from, .service-meta-leave-to { opacity: 0; transform: translateY(.6rem); }

@media (max-width: 900px) {
  .services-layout { grid-template-columns: 1fr; }
  .service-visual { position: relative; top: auto; order: -1; height: 55dvh; }
}
@media (max-width: 600px) {
  .service-row { grid-template-columns: 3.2rem 1fr; }
  .service-row.active { min-height: 11.5rem; }
  .service-meta { grid-template-columns: auto auto; }
  .service-meta small { grid-column: 1 / -1; }
}
</style>
