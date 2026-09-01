<script setup>
import { computed, ref } from 'vue'
import { testimonials } from '../../data/testimonials'
import testimonialImage from '../../assets/images/refs/testimonial-reference.jpg'

const active = ref(0)
const current = computed(() => testimonials[active.value])
const move = (direction) => { active.value = (active.value + direction + testimonials.length) % testimonials.length }
</script>

<template>
  <section class="testimonials section" aria-label="Depoimentos de clientes">
    <div class="container testimonial-layout">
      <div class="testimonial-copy">
        <Transition name="quote" mode="out-in">
          <blockquote :key="current.quote">
            <p>“{{ current.quote }}”</p>
            <footer>{{ current.name }}<span>{{ current.detail }}</span></footer>
          </blockquote>
        </Transition>
        <div class="testimonial-controls">
          <button type="button" aria-label="Depoimento anterior" @click="move(-1)">←</button>
          <span>{{ String(active + 1).padStart(2, '0') }} / {{ String(testimonials.length).padStart(2, '0') }}</span>
          <button type="button" aria-label="Próximo depoimento" @click="move(1)">→</button>
        </div>
      </div>
      <div class="testimonial-photo">
        <img :src="testimonialImage" alt="Cliente ajustando o paletó após o atendimento" loading="lazy" />
        <span />
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials { background: #0b0c0c; }
.testimonial-layout { display: grid; grid-template-columns: 1.5fr .5fr; min-height: 43rem; }
.testimonial-copy { position: relative; z-index: 2; display: flex; flex-direction: column; justify-content: center; padding-right: 3rem; }
blockquote { margin: 0; }
blockquote p { max-width: 17ch; margin: 0; font-family: var(--serif); font-size: clamp(2.8rem, 5.8vw, 6rem); line-height: .98; letter-spacing: -.025em; }
blockquote footer { margin-top: 2rem; color: var(--champagne-bright); font-size: .68rem; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; }
blockquote footer span { margin-left: 1rem; color: var(--steel); }
.testimonial-controls { display: flex; align-items: center; gap: 1.2rem; margin-top: 4rem; }
.testimonial-controls button { width: 2.8rem; height: 2.8rem; border: 1px solid var(--line-strong); border-radius: 0; background: transparent; cursor: pointer; transition: color 250ms var(--ease-heavy), background 250ms var(--ease-heavy); }
.testimonial-controls button:hover { color: var(--ink); background: var(--mineral); }
.testimonial-controls span { color: var(--steel); font-size: .62rem; font-variant-numeric: tabular-nums; }
.testimonial-photo { position: relative; overflow: hidden; }
.testimonial-photo img { width: 320%; height: 100%; max-width: none; object-fit: cover; object-position: right center; transform: translateX(-68%); }
.testimonial-photo span { position: absolute; inset: 0; background: linear-gradient(90deg, #0b0c0c 0%, transparent 43%); }
.quote-enter-active, .quote-leave-active { transition: opacity 300ms var(--ease-heavy), transform 500ms var(--ease-heavy); }
.quote-enter-from { opacity: 0; transform: translateY(1.2rem); }
.quote-leave-to { opacity: 0; transform: translateY(-1.2rem); }
@media (max-width: 767px) {
  .testimonial-layout { grid-template-columns: 1fr; }
  .testimonial-copy { order: 2; padding: 2.5rem 0 0; }
  .testimonial-photo { height: 48dvh; }
  .testimonial-photo img { width: 190%; transform: translateX(-47%); }
  blockquote footer { display: flex; flex-direction: column; gap: .35rem; }
  blockquote footer span { margin-left: 0; }
}
</style>
