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
          details: ['Consultoria de estilo', 'Degradê e cortes clássicos', 'Finalização profissional'],
        },
        {
          icon: 'bi bi-person',
          title: 'Barba & alinhamento',
          description: 'Contorno preciso, volume equilibrado e cuidado completo para uma barba bem apresentada.',
          details: ['Desenho personalizado', 'Toalha quente', 'Produtos de cuidado'],
        },
        {
          icon: 'bi bi-stars',
          title: 'Acabamento premium',
          description: 'Os últimos detalhes que transformam um bom visual em uma presença marcante.',
          details: ['Pezinho e contorno', 'Sobrancelha', 'Finalização com styling'],
        },
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
