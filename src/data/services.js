import haircut from '../assets/images/refs/style-reference.jpg'
import beard from '../assets/images/refs/services-reference.jpg'
import complete from '../assets/images/refs/ritual-reference.jpg'
import detail from '../assets/images/refs/authority-reference.jpg'
import color from '../assets/images/refs/lookbook-reference.jpg'
import ritual from '../assets/images/refs/space-reference.jpg'

export const services = [
  { id: 'corte', number: '01', name: 'CORTE', duration: '45 min', price: 'R$ 78', description: 'Forma, proporção e acabamento que continuam funcionando depois da cadeira.', image: haircut },
  { id: 'barba', number: '02', name: 'BARBA', duration: '35 min', price: 'R$ 62', description: 'Desenho limpo, toalha quente e acabamento de navalha.', image: beard },
  { id: 'combo', number: '03', name: 'CORTE + BARBA', duration: '60 min', price: 'R$ 120', description: 'Do desenho do cabelo ao acabamento da barba.', image: complete },
  { id: 'acabamento', number: '04', name: 'ACABAMENTO', duration: '20 min', price: 'R$ 42', description: 'Contorno, nuca e costeletas entre um corte e outro.', image: detail },
  { id: 'pigmentacao', number: '05', name: 'PIGMENTAÇÃO', duration: '40 min', price: 'R$ 86', description: 'Cobertura sutil para cabelo ou barba, sem efeito artificial.', image: color },
  { id: 'experiencia', number: '06', name: 'EXPERIÊNCIA COMPLETA', duration: '90 min', price: 'R$ 168', description: 'Consulta, corte, barba, tratamento e styling em uma sessão.', image: ritual },
]
