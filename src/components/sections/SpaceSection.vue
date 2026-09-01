<script setup>
import ParallaxImage from '../motion/ParallaxImage.vue'
import spaceImage from '../../assets/images/refs/space-reference.jpg'
</script>

<template>
  <section id="sobre" class="space-section">
    <ParallaxImage class="space-image" :src="spaceImage" alt="Interior contemporâneo do Atelier 27" :depth="8" position="right center" />
    <span class="space-scrim" />
    <div class="container space-copy">
      <h2 class="serif-title">MORE THAN A CHAIR.</h2>
      <p>Horário respeitado. Atendimento individual. Tudo no lugar.</p>
    </div>
  </section>
</template>

<style scoped>
.space-section { position: relative; display: grid; min-height: 100dvh; align-items: center; overflow: hidden; }
.space-image { position: absolute; inset: -5% 0; }
.space-image :deep(img) { width: 132%; height: 110%; max-width: none; transform: translateX(-24%); }
.space-scrim { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(8,9,9,.88) 0%, rgba(8,9,9,.42) 46%, rgba(8,9,9,.06)), linear-gradient(0deg, rgba(8,9,9,.55), transparent 46%); }
.space-copy { position: relative; z-index: 2; }
.space-copy .serif-title { max-width: 8ch; }
.space-copy p { max-width: 38ch; margin-top: 1.8rem; color: rgba(233,230,223,.76); }
@media (max-width: 767px) {
  .space-section { min-height: 78dvh; align-items: end; padding-bottom: 3rem; }
  .space-image :deep(img) { width: 175%; transform: translateX(-42%); }
  .space-scrim { background: linear-gradient(0deg, rgba(8,9,9,.94), rgba(8,9,9,.08) 74%); }
}
</style>
