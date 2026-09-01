<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '../motion/MagneticButton.vue'

const nav = ref(null)
const menu = ref(null)
const scrolled = ref(false)
const open = ref(false)
let ctx

const links = [
  ['Serviços', '#servicos'],
  ['Profissionais', '#profissionais'],
  ['Experiência', '#experiencia'],
  ['Galeria', '#galeria'],
  ['Sobre', '#sobre'],
  ['Contato', '#contato'],
]

const close = () => { open.value = false }

watch(open, async (value) => {
  document.body.style.overflow = value ? 'hidden' : ''
  if (!value) return
  await nextTick()
  gsap.fromTo(menu.value.querySelectorAll('.mobile-link'), { yPercent: 110 }, { yPercent: 0, duration: 0.72, stagger: 0.06, ease: 'power4.out' })
})

onMounted(() => {
  ctx = gsap.context(() => {
    ScrollTrigger.create({
      start: 42,
      end: 'max',
      onToggle: (self) => { scrolled.value = self.isActive },
    })
  }, nav.value)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  ctx?.revert()
})
</script>

<template>
  <header ref="nav" class="navbar" :class="{ 'is-scrolled': scrolled, 'menu-open': open }">
    <a class="brand" href="#inicio" aria-label="Atelier 27, início" @click="close">
      <span class="brand-mark">A</span>
      <span class="brand-name">ATELIER <b>27</b></span>
    </a>

    <nav class="desktop-nav" aria-label="Navegação principal">
      <a v-for="([label, href]) in links" :key="href" :href="href">{{ label }}</a>
    </nav>

    <MagneticButton class="nav-cta" href="#agendamento">Agendar horário</MagneticButton>

    <button class="menu-toggle" type="button" :aria-expanded="open" aria-controls="mobile-menu" :aria-label="open ? 'Fechar menu' : 'Abrir menu'" @click="open = !open">
      <span /><span />
    </button>

    <div v-if="open" id="mobile-menu" ref="menu" class="mobile-menu">
      <nav aria-label="Navegação móvel">
        <span v-for="([label, href]) in links" :key="href" class="mobile-mask">
          <a class="mobile-link" :href="href" @click="close">{{ label }}</a>
        </span>
        <span class="mobile-mask"><a class="mobile-link accent" href="#agendamento" @click="close">Agendar horário</a></span>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-nav);
  display: grid;
  width: 100%;
  height: 5.2rem;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: clamp(1rem, 3vw, 3.5rem);
  padding-inline: var(--gutter);
  background: transparent;
  transition: height 500ms var(--ease-heavy), background-color 500ms var(--ease-heavy), backdrop-filter 500ms var(--ease-heavy);
}

.navbar.is-scrolled,
.navbar.menu-open {
  height: 4.25rem;
  border-bottom: 1px solid var(--line);
  background: rgba(11, 12, 12, 0.82);
  backdrop-filter: blur(18px);
}

.brand {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  white-space: nowrap;
}

.brand-mark {
  display: grid;
  width: 1.8rem;
  height: 1.8rem;
  place-items: center;
  border-left: 2px solid var(--mineral);
  border-right: 2px solid var(--champagne);
  font-family: var(--display);
  font-size: 1.25rem;
  font-weight: 600;
  transform: skewX(-18deg);
}

.brand-name {
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.24em;
}

.brand-name b { color: var(--champagne); font-weight: inherit; }

.desktop-nav {
  display: flex;
  justify-content: center;
  gap: clamp(0.9rem, 2vw, 2.2rem);
}

.desktop-nav a {
  color: rgba(233, 230, 223, 0.72);
  font-size: 0.66rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  transition: color 300ms var(--ease-heavy);
}

.desktop-nav a:hover { color: var(--mineral); }
.nav-cta { min-height: 2.75rem; }
.menu-toggle, .mobile-menu { display: none; }

@media (max-width: 1100px) {
  .desktop-nav { display: none; }
  .navbar { grid-template-columns: auto 1fr auto; }
  .nav-cta { justify-self: end; }
}

@media (max-width: 720px) {
  .navbar { height: 4.25rem; }
  .nav-cta { display: none; }
  .menu-toggle {
    position: relative;
    z-index: 2;
    display: block;
    width: 2.5rem;
    height: 2.5rem;
    justify-self: end;
    padding: 0;
    border: 0;
    background: transparent;
  }
  .menu-toggle span {
    position: absolute;
    left: 0.4rem;
    width: 1.7rem;
    height: 1px;
    background: var(--mineral);
    transition: transform 500ms var(--ease-heavy), top 500ms var(--ease-heavy);
  }
  .menu-toggle span:first-child { top: 0.9rem; }
  .menu-toggle span:last-child { top: 1.55rem; }
  .menu-open .menu-toggle span:first-child { top: 1.25rem; transform: rotate(45deg); }
  .menu-open .menu-toggle span:last-child { top: 1.25rem; transform: rotate(-45deg); }
  .mobile-menu {
    position: fixed;
    inset: 0;
    display: grid;
    place-items: center;
    background: rgba(8, 9, 9, 0.97);
  }
  .mobile-menu nav { display: grid; gap: 0.4rem; width: calc(100% - 2.4rem); }
  .mobile-mask { display: block; overflow: hidden; }
  .mobile-link {
    display: block;
    font-family: var(--display);
    font-size: clamp(3.5rem, 15vw, 6rem);
    line-height: 0.94;
    text-transform: uppercase;
  }
  .mobile-link.accent { color: var(--champagne); margin-top: 1.5rem; font-size: 2.8rem; }
}
</style>
