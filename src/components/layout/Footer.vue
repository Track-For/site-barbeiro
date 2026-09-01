<template>
  <footer id="contato" class="footer">
    <div class="container footer-grid">
      <div>
        <a class="footer-brand" href="#inicio">ATELIER <span>27</span></a>
        <p>Imagem masculina, construída com precisão.</p>
      </div>
      <address>
        Rua Cândido Luz, 127<br />
        Jardins, São Paulo<br />
        <a href="tel:+5511912272727">(11) 91227-2727</a>
      </address>
      <div class="footer-hours">
        <p>Ter-Sáb, 09h-21h</p>
        <a href="#agendamento">Agendar horário</a>
      </div>
    </div>
    <div class="container footer-bottom">
      <span>© 2026 Atelier 27. Projeto fictício.</span>
      <div><span>Privacidade</span><span>Termos</span></div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 5rem 0 2rem;
  border-top: 1px solid var(--line);
  background: #080909;
}
.footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 3rem; }
.footer-brand { font-family: var(--serif); font-size: 2.2rem; letter-spacing: 0.08em; }
.footer-brand span, .footer-hours a { color: var(--champagne); }
.footer p, address { color: var(--mineral-muted); font-size: 0.84rem; font-style: normal; }
.footer-hours { text-align: right; }
.footer-hours a { font-size: 0.74rem; letter-spacing: 0.12em; text-transform: uppercase; }
.footer-bottom { display: flex; justify-content: space-between; gap: 2rem; margin-top: 4rem; padding-top: 1.2rem; border-top: 1px solid var(--line); color: var(--steel); font-size: 0.68rem; }
.footer-bottom div { display: flex; gap: 1.5rem; }
@media (max-width: 767px) {
  .footer-grid { grid-template-columns: 1fr; }
  .footer-hours { text-align: left; }
  .footer-bottom { flex-direction: column; }
}
</style>
