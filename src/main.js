import { createApp } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '@fontsource/manrope/latin-ext-400.css'
import '@fontsource/manrope/latin-ext-500.css'
import '@fontsource/manrope/latin-ext-600.css'
import '@fontsource/barlow-condensed/latin-ext-500.css'
import '@fontsource/barlow-condensed/latin-ext-600.css'
import '@fontsource/cormorant-garamond/latin-ext-400.css'
import '@fontsource/cormorant-garamond/latin-ext-500.css'
import './styles/variables.css'
import './styles/globals.css'
import './styles/animations.css'
import App from './App.vue'

gsap.registerPlugin(ScrollTrigger)

createApp(App).mount('#app')
