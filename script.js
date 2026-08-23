import { createApp } from 'vue';
import { Collapse } from 'bootstrap';

const WHATSAPP_NUMBER = '5562999999999';

createApp({
  data() {
    return {
      activeSection: 'home',
      isScrolled: false,
      formSent: false,
      formError: false,
      form: { name: '', email: '', message: '' },
      navItems: [
        { id: 'home', label: 'Home', href: '#home' },
        { id: 'sobre', label: 'Sobre nós', href: '#sobre' },
        { id: 'servicos', label: 'Serviços', href: '#servicos' },
        { id: 'barbeiros', label: 'Barbeiros', href: '#barbeiros' },
        { id: 'contato', label: 'Contato', href: '#contato' },
      ],
      features: [
        { icon: 'bi bi-scissors', title: 'Técnica e precisão', text: 'Cortes atuais e acabamento impecável' },
        { icon: 'bi bi-person-check', title: 'Atendimento unissex', text: 'Estilo e cuidado para todo mundo' },
        { icon: 'bi bi-star', title: 'Experiência premium', text: 'Conforto do início ao fim' },
      ],
      values: [
        { title: 'Excelência', text: 'Capricho em cada detalhe, do atendimento ao acabamento.' },
        { title: 'Respeito', text: 'Um espaço acolhedor, diverso e feito para você.' },
        { title: 'Evolução', text: 'Técnica atualizada sem perder a tradição do ofício.' },
      ],
      services: [
        {
          icon: 'bi bi-scissors',
          title: 'Cortes modernos',
          description: 'Do clássico ao contemporâneo, um corte desenhado para valorizar seus traços e sua rotina.',
          image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1100&q=88',
          alt: 'Barbeiro realizando um corte masculino com atenção aos detalhes',
        },
        {
          icon: 'bi bi-person',
          title: 'Barba e alinhamento',
          description: 'Contorno preciso, volume equilibrado e cuidado completo para uma barba bem apresentada.',
          image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1100&q=88',
          alt: 'Cliente recebendo um serviço profissional de barba',
        },
        {
          icon: 'bi bi-stars',
          title: 'Acabamento premium',
          description: 'Os últimos detalhes que transformam um bom visual em uma presença marcante.',
          image: 'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?auto=format&fit=crop&w=1100&q=88',
          alt: 'Profissional finalizando o visual de um cliente na barbearia',
        },
      ],
      barbers: [
        {
          name: 'Gabriel Nunes',
          firstName: 'Gabriel',
          role: 'Barbeiro especialista',
          specialty: 'Fade e cortes modernos',
          skills: ['Degradê', 'Corte social', 'Finalização'],
          position: '0%',
        },
        {
          name: 'Lucas Ferreira',
          firstName: 'Lucas',
          role: 'Barbeiro e visagista',
          specialty: 'Estilo sob medida',
          skills: ['Visagismo', 'Corte na tesoura', 'Sobrancelha'],
          position: '33.333%',
        },
        {
          name: 'Marcos Oliveira',
          firstName: 'Marcos',
          role: 'Barbeiro sênior',
          specialty: 'Clássicos e barba',
          skills: ['Barba completa', 'Corte clássico', 'Camuflagem'],
          position: '66.666%',
        },
        {
          name: 'André Santos',
          firstName: 'André',
          role: 'Barbeiro especialista',
          specialty: 'Barba e acabamento',
          skills: ['Barboterapia', 'Pezinho', 'Corte + barba'],
          position: '100%',
        },
      ],
      serviceMenu: [
        { name: 'Corte personalizado', duration: '40 min', icon: 'bi bi-scissors' },
        { name: 'Corte infantil', duration: '40 min', icon: 'bi bi-emoji-smile' },
        { name: 'Barba completa', duration: '35 min', icon: 'bi bi-person' },
        { name: 'Corte + barba', duration: '70 min', icon: 'bi bi-stars' },
        { name: 'Pezinho e acabamento', duration: '15 min', icon: 'bi bi-bounding-box' },
        { name: 'Design de sobrancelha', duration: '15 min', icon: 'bi bi-eye' },
        { name: 'Hidratação capilar', duration: '30 min', icon: 'bi bi-droplet' },
        { name: 'Camuflagem de brancos', duration: '40 min', icon: 'bi bi-palette' },
      ],
      experiencePoints: [
        { icon: 'bi bi-ear', title: 'Escuta de verdade', text: 'Entendemos sua rotina, suas referências e o resultado que você procura antes de começar.' },
        { icon: 'bi bi-cup-hot', title: 'Conforto em cada etapa', text: 'Ambiente acolhedor e atendimento sem pressa para transformar cuidado em experiência.' },
        { icon: 'bi bi-award', title: 'Resultado personalizado', text: 'Técnica e acabamento pensados para combinar com o seu rosto, cabelo e personalidade.' },
      ],
    };
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
    whatsappUrl() {
      const message = 'Olá! Vim pelo site da Mr. Hélio Barbearia e gostaria de agendar um horário.';
      return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    },
  },
  mounted() {
    this.handleScroll();
    window.addEventListener('scroll', this.handleScroll, { passive: true });

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) this.activeSection = entry.target.id;
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    );
    document.querySelectorAll('.section-observe').forEach((section) => sectionObserver.observe(section));

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 24;
    },
    closeMenu() {
      const menu = document.getElementById('mainNav');
      if (menu?.classList.contains('show')) Collapse.getOrCreateInstance(menu).hide();
    },
    serviceWhatsappUrl(serviceName) {
      const message = `Olá! Vim pelo site da Mr. Hélio Barbearia e gostaria de agendar o serviço: ${serviceName}.`;
      return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    },
    barberWhatsappUrl(barber) {
      const message = [
        'Olá! Vim pelo site da Mr. Hélio Barbearia.',
        `Gostaria de agendar um horário com ${barber.name}, especialista em ${barber.specialty.toLowerCase()}.`,
        'Pode me informar os próximos horários disponíveis, por favor?',
      ].join('\n');
      return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    },
    submitForm() {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email);
      if (!this.form.name || !emailValid || !this.form.message) {
        this.formError = true;
        this.formSent = false;
        return;
      }

      this.formError = false;
      this.formSent = true;
      const text = [
        'Olá! Vim pelo site da Mr. Hélio Barbearia.',
        `Nome: ${this.form.name}`,
        `E-mail: ${this.form.email}`,
        `Mensagem: ${this.form.message}`,
      ].join('\n');
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
      this.form = { name: '', email: '', message: '' };
    },
  },
}).mount('#app');
