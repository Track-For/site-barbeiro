<script setup>
import RevealText from '../motion/RevealText.vue'
import RevealImage from '../motion/RevealImage.vue'
import authorityImage from '../../assets/images/refs/authority-reference.jpg'

const stats = [
  ['8+', 'anos de experiência'],
  ['12.400+', 'atendimentos'],
  ['4.9/5', 'avaliação média'],
  ['6', 'especialistas'],
]
</script>

<template>
  <section class="authority section" aria-labelledby="authority-heading">
    <div class="container">
      <RevealText><h2 id="authority-heading" class="serif-title">CRAFTED THROUGH EXPERIENCE</h2></RevealText>
      <div class="authority-layout">
        <div class="stats">
          <div v-for="([value, label], index) in stats" :key="label" class="stat" :class="`stat-${index}`">
            <strong>{{ value }}</strong>
            <span>{{ label }}</span>
          </div>
        </div>
        <RevealImage class="authority-image" :src="authorityImage" alt="Tesoura cortando fios de cabelo com precisão" position="72% center" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.authority { background: #111212; }
.authority .serif-title { max-width: 9ch; color: var(--mineral-muted); }
.authority-layout { display: grid; grid-template-columns: .9fr 1.1fr; gap: clamp(2rem, 6vw, 6rem); align-items: end; margin-top: -3rem; }
.stats { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem 2rem; padding-top: 9rem; }
.stat { display: flex; flex-direction: column; }
.stat strong { color: var(--champagne-bright); font-family: var(--serif); font-size: clamp(4rem, 7vw, 7rem); font-weight: 400; font-variant-numeric: tabular-nums; line-height: .8; }
.stat span { margin-top: .8rem; color: var(--mineral-muted); font-family: var(--serif); font-size: 1.2rem; }
.stat-1, .stat-3 { transform: translateY(3.5rem); }
.authority-image { height: 30rem; }
.authority-image :deep(img) { width: 178%; max-width: none; transform: translateX(-38%); }
@media (max-width: 800px) {
  .authority-layout { grid-template-columns: 1fr; margin-top: 3rem; }
  .stats { order: 2; padding-top: 1rem; }
  .stat-1, .stat-3 { transform: none; }
  .authority-image { height: 20rem; }
}
</style>
