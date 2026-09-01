<script setup>
import ParallaxImage from '../motion/ParallaxImage.vue'
import lookbook from '../../assets/images/refs/lookbook-reference.jpg'
import styleImage from '../../assets/images/refs/style-reference.jpg'
import servicesImage from '../../assets/images/refs/services-reference.jpg'
import barberImage from '../../assets/images/refs/barber-reference.jpg'
</script>

<template>
  <section id="galeria" class="lookbook section" aria-labelledby="lookbook-heading">
    <div class="container lookbook-grid">
      <div class="lookbook-intro">
        <h2 id="lookbook-heading" class="serif-title">THE LOOKBOOK</h2>
        <p>Forma. Textura. Identidade.</p>
      </div>
      <div class="lookbook-sticky">
        <ParallaxImage :src="lookbook" alt="Retratos editoriais de cortes e barba" :depth="8" position="24% center" />
      </div>
      <div class="lookbook-flow">
        <ParallaxImage class="lookbook-item tall" :src="styleImage" alt="Perfil com corte texturizado" :depth="7" position="center" />
        <p class="lookbook-word">FORM.</p>
        <ParallaxImage class="lookbook-item detail" :src="servicesImage" alt="Detalhe preciso de acabamento de barba" :depth="10" position="right center" />
        <p class="lookbook-word offset">TEXTURE.</p>
        <ParallaxImage class="lookbook-item wide" :src="barberImage" alt="Barbeiro trabalhando em um corte" :depth="6" position="left center" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.lookbook { background: #0e0f0f; }
.lookbook-grid { display: grid; grid-template-columns: .9fr 1.1fr; column-gap: 1.2rem; }
.lookbook-intro { grid-column: 1 / -1; display: flex; align-items: end; justify-content: space-between; margin-bottom: 4rem; }
.lookbook-intro p { margin: 0; color: var(--champagne); font-family: var(--display); font-size: 1.5rem; letter-spacing: .08em; text-transform: uppercase; }
.lookbook-sticky { position: sticky; top: 5.5rem; height: calc(100dvh - 7rem); overflow: hidden; }
.lookbook-sticky :deep(figure), .lookbook-sticky :deep(img) { width: 100%; height: 100%; }
.lookbook-sticky :deep(img) { width: 215%; max-width: none; transform: translateX(-1%); }
.lookbook-flow { display: grid; gap: 8rem; padding-top: 8rem; }
.lookbook-item { height: 48rem; }
.lookbook-item :deep(img) { width: 174%; max-width: none; transform: translateX(-37%); }
.lookbook-item.detail { width: 78%; height: 34rem; justify-self: end; }
.lookbook-item.detail :deep(img) { width: 190%; transform: translateX(-45%); }
.lookbook-item.wide { width: 115%; height: 31rem; transform: translateX(-15%); }
.lookbook-item.wide :deep(img) { width: 188%; transform: translateX(-4%); }
.lookbook-word { position: relative; z-index: 2; margin: -12rem 0 -3rem -24%; color: rgba(233,230,223,.16); font-family: var(--serif); font-size: clamp(5rem, 11vw, 12rem); line-height: .7; pointer-events: none; }
.lookbook-word.offset { margin-left: -4%; }
@media (max-width: 767px) {
  .lookbook-grid { grid-template-columns: 1fr; }
  .lookbook-intro { align-items: flex-start; flex-direction: column; gap: 1rem; }
  .lookbook-sticky { position: relative; top: auto; height: 65dvh; }
  .lookbook-flow { gap: 5rem; padding-top: 5rem; }
  .lookbook-item, .lookbook-item.detail, .lookbook-item.wide { width: 100%; height: 62dvh; transform: none; }
  .lookbook-word { margin: -8rem 0 0; }
}
</style>
