<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

const root = ref(null)
let ctx

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isMobile = window.matchMedia('(max-width: 767px)').matches

  if (prefersReducedMotion || isMobile) return

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root.value,
        start: 'top top',
        end: '+=2000',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    tl.fromTo(
      '.razor-tool',
      { xPercent: -32, rotation: -8 },
      { xPercent: 70, rotation: -1.5, duration: 1.3, ease: 'none' },
      0,
    )
      .fromTo(
        '.razor-title',
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: .75, ease: 'none' },
        .15,
      )
      // Mantém a frase inteira na tela antes de liberar a próxima seção.
      .to('.razor-title', { autoAlpha: 1, duration: .55, ease: 'none' }, 1.3)
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section ref="root" class="razor-section" aria-label="Detail is everything">
    <h2 class="razor-title">DETAIL IS<br />EVERYTHING.</h2>
    <div class="razor-tool" aria-hidden="true">
      <span class="razor-blade" />
      <span class="razor-neck" />
      <span class="razor-handle"><i /></span>
    </div>
  </section>
</template>

<style scoped>
.razor-section { position: relative; display: grid; min-height: 100dvh; place-items: center; overflow: hidden; background: radial-gradient(circle at 53% 42%, #1a1c1c 0%, #090a0a 55%); }
.razor-section::after { position: absolute; inset: 0; content: ''; background: radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,.72)); pointer-events: none; }
.razor-title { position: relative; z-index: 1; margin: 0; color: #9e9d98; font-family: var(--display); font-size: clamp(6rem, 14vw, 15rem); font-weight: 600; line-height: .72; letter-spacing: -.045em; text-align: center; }
.razor-tool { position: absolute; z-index: 2; width: min(86vw, 78rem); height: 18rem; transform-origin: 45% 62%; will-change: transform; }
.razor-blade { position: absolute; top: 0; right: 0; width: 68%; height: 8.2rem; clip-path: polygon(4% 0, 100% 7%, 91% 100%, 0 77%); background: linear-gradient(165deg, #f0eee7 0%, #777d7e 18%, #dedbd2 35%, #4f5455 68%, #b7b8b4 82%, #272a2a 100%); box-shadow: inset 0 -2px 0 rgba(255,255,255,.7); }
.razor-neck { position: absolute; top: 6.8rem; left: 29%; width: 13%; height: 2.4rem; background: linear-gradient(180deg, #d5d4ce, #3f4343); transform: rotate(-15deg); }
.razor-handle { position: absolute; bottom: 0; left: 0; width: 55%; height: 7rem; border: 1px solid rgba(233,230,223,.14); background: linear-gradient(175deg, #252727 0%, #0f1010 55%, #333636 100%); transform: rotate(8deg); box-shadow: inset 0 1px 0 rgba(255,255,255,.16); }
.razor-handle::before { position: absolute; top: 50%; right: 6%; width: 2.3rem; height: 2.3rem; border: 2px solid var(--champagne); border-radius: 50%; content: ''; transform: translateY(-50%); box-shadow: inset 0 0 0 6px #171919; }
.razor-handle i { position: absolute; inset: .6rem; border: 1px solid rgba(255,255,255,.05); }
@media (max-width: 767px) {
  .razor-section { min-height: 72dvh; }
  .razor-title { font-size: 22vw; }
  .razor-tool { width: 110vw; height: 10rem; transform: translateX(-5%) rotate(-4deg) !important; }
  .razor-blade { height: 4.6rem; }
  .razor-handle { height: 4.2rem; }
  .razor-neck { top: 3.8rem; }
}
</style>
