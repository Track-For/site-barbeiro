# Auditoria de oportunidades de movimento

## Oportunidades

| # | Local | Estado atual | Propósito | Frequência | Movimento sugerido |
| --- | --- | --- | --- | --- | --- |
| 1 | `BookingSection.vue` | A prévia da mensagem atualiza instantaneamente | Evitar mudança brusca | Ocasional | Ao mudar serviço, profissional, data ou hora: `opacity: 0` e `transform: translateY(8px)` para o estado atual, seguido do novo conteúdo em `opacity: 1` e `translateY(0)`, 240ms, `cubic-bezier(0.16, 1, 0.3, 1)`. Em reduced motion, atualizar sem deslocamento. |
| 2 | `CutStorySection.vue`, narrativa mobile | As cinco etapas são estáticas na versão vertical | Explicação | Rara | Revelar cada etapa uma vez com `opacity: 0` e `translateY(20px)` até o estado final, 620ms, `cubic-bezier(0.16, 1, 0.3, 1)`, 70ms entre itens visíveis. Em reduced motion, usar apenas opacidade imediata. |

## Candidatos rejeitados

- `Navbar.vue`, links de navegação: rejeitado pela frequência. O usuário pode acessá-los dezenas de vezes e cor ou sublinhado já oferecem feedback suficiente.
- `AuthoritySection.vue`, contagem animada dos números: rejeitado pela função. Os números são prova racional e devem permanecer legíveis, sem efeito decorativo.
- `BookingSection.vue`, horários e dias: rejeitado pela função e frequência. Springs ou deslocamentos atrasariam uma seleção objetiva; a mudança de cor já indica o estado.
- `Footer.vue`, entrada coreografada: rejeitado por propósito. O rodapé encerra o fluxo e não precisa competir com o CTA cinematográfico anterior.

## Veredito

O site já concentra movimento nos momentos de maior valor: hero, THE CUT, ritual, navalha, comparação e CTA final. A oportunidade de maior retorno restante é a transição da prévia de agendamento, pois ajuda a confirmar a consequência de cada escolha sem adicionar espetáculo ao fluxo funcional.
