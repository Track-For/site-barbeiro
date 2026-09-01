import mateus from '../assets/images/refs/barber-reference.jpg'
import rafael from '../assets/images/refs/hero-reference.jpg'
import davi from '../assets/images/refs/final-reference.jpg'

export const barbers = [
  {
    id: 'mateus',
    name: 'MATEUS',
    fullName: 'Mateus Nogueira',
    specialty: 'Fade / Textura',
    tags: ['Fade', 'Textura', 'Baixa manutenção'],
    times: ['14:30', '17:00', '19:15'],
    image: mateus,
    position: 'left center',
  },
  {
    id: 'rafael',
    name: 'RAFAEL',
    fullName: 'Rafael Tavares',
    specialty: 'Clássico / Barba',
    tags: ['Clássico', 'Barba'],
    times: ['10:15', '15:30', '18:00'],
    image: rafael,
    position: '72% center',
  },
  {
    id: 'davi',
    name: 'DAVI',
    fullName: 'Davi Lemos',
    specialty: 'Taper / Styling',
    tags: ['Transformação', 'Baixa manutenção'],
    times: ['11:00', '16:45', '20:00'],
    image: davi,
    position: '25% center',
  },
]

export const styleNeeds = ['Fade', 'Clássico', 'Barba', 'Textura', 'Baixa manutenção', 'Transformação']
