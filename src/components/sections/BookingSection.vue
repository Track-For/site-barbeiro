<script setup>
import { computed, ref } from 'vue'
import { services } from '../../data/services'
import { barbers } from '../../data/barbers'
import MagneticButton from '../motion/MagneticButton.vue'

const serviceId = ref('combo')
const barberId = ref('mateus')
const day = ref(27)
const time = ref('18:30')

const days = [
  { value: 27, week: 'quinta-feira' },
  { value: 28, week: 'sexta-feira' },
  { value: 29, week: 'sábado' },
]
const times = ['16:00', '17:30', '18:30', '20:00']
const calendarDays = [null, null, null, null, null, null, ...Array.from({ length: 31 }, (_, index) => index + 1)]

const selectedService = computed(() => services.find((item) => item.id === serviceId.value) || services[0])
const selectedBarber = computed(() => barbers.find((item) => item.id === barberId.value) || barbers[0])
const selectedDay = computed(() => days.find((item) => item.value === day.value) || days[0])
const message = computed(() => `Olá! Quero agendar:\n${selectedService.value.name}\ncom ${selectedBarber.value.fullName.split(' ')[0]}\n${selectedDay.value.week} às ${time.value}.`)
const whatsappUrl = computed(() => `https://wa.me/5511912272727?text=${encodeURIComponent(message.value)}`)
</script>

<template>
  <section id="agendamento" class="booking section" aria-labelledby="booking-heading">
    <div class="container">
      <h2 id="booking-heading" class="section-title">ESCOLHA O SEU HORÁRIO.</h2>
      <form class="booking-grid" @submit.prevent>
        <fieldset class="booking-step service-step">
          <legend><span>01</span>Serviço</legend>
          <label for="service-select" class="sr-only">Escolha o serviço</label>
          <select id="service-select" v-model="serviceId">
            <option v-for="service in services" :key="service.id" :value="service.id">{{ service.name }} · {{ service.price }}</option>
          </select>
          <small>{{ selectedService.duration }}</small>
        </fieldset>

        <fieldset class="booking-step barber-step">
          <legend><span>02</span>Profissional</legend>
          <div class="choice-list">
            <button v-for="barber in barbers" :key="barber.id" type="button" :class="{ active: barberId === barber.id }" :aria-pressed="barberId === barber.id" @click="barberId = barber.id">{{ barber.name }}</button>
          </div>
        </fieldset>

        <fieldset class="booking-step date-step">
          <legend><span>03</span>Data</legend>
          <div class="month"><span>AGOSTO 2026</span></div>
          <div class="weekdays" aria-hidden="true"><span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span></div>
          <div class="calendar">
            <template v-for="(calendarDay, index) in calendarDays" :key="`${calendarDay}-${index}`">
              <span v-if="calendarDay === null" class="empty" />
              <button
                v-else-if="days.some((item) => item.value === calendarDay)"
                type="button"
                :class="{ active: day === calendarDay }"
                :aria-label="`${days.find((item) => item.value === calendarDay).week}, ${calendarDay} de agosto`"
                :aria-pressed="day === calendarDay"
                @click="day = calendarDay"
              >{{ calendarDay }}</button>
              <span v-else class="unavailable">{{ calendarDay }}</span>
            </template>
          </div>
        </fieldset>

        <fieldset class="booking-step time-step">
          <legend><span>04</span>Horário</legend>
          <div class="time-list">
            <button v-for="item in times" :key="item" type="button" :class="{ active: time === item }" :aria-pressed="time === item" @click="time = item">{{ item }}</button>
          </div>
        </fieldset>
      </form>

      <div class="booking-confirmation">
        <div>
          <span>Prévia da mensagem</span>
          <pre>{{ message }}</pre>
        </div>
        <MagneticButton :href="whatsappUrl" target="_blank">Confirmar pelo WhatsApp</MagneticButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.booking { background: radial-gradient(circle at 70% 20%, rgba(139,144,146,.08), transparent 30rem), #101212; }
.booking .section-title { max-width: 10ch; font-size: clamp(4rem, 8vw, 8rem); }
.booking-grid { display: grid; grid-template-columns: .9fr .9fr 1.35fr .72fr; margin-top: 4rem; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.booking-step { min-width: 0; margin: 0; padding: 2rem clamp(1rem, 2.3vw, 2rem) 2.5rem; border: 0; border-right: 1px solid var(--line); }
.booking-step:last-child { border-right: 0; }
.booking-step legend { display: flex; flex-direction: column; width: 100%; color: var(--mineral); font-size: .68rem; font-weight: 600; letter-spacing: .11em; text-transform: uppercase; }
.booking-step legend span { margin-bottom: .7rem; color: #575b5c; font-family: var(--serif); font-size: 2rem; font-weight: 400; letter-spacing: 0; }
.service-step select { width: 100%; min-height: 3.6rem; margin-top: 2rem; padding: 0 1rem; border: 1px solid var(--line-strong); border-radius: 0; color: var(--mineral); background: var(--graphite); font-size: .75rem; }
.service-step small { display: block; margin-top: .6rem; color: var(--champagne); }
.choice-list, .time-list { display: grid; gap: .55rem; margin-top: 2rem; }
.choice-list button, .time-list button { min-height: 3rem; padding: 0 .9rem; border: 1px solid var(--line); border-radius: 0; background: transparent; text-align: left; cursor: pointer; transition: color 250ms var(--ease-heavy), background 250ms var(--ease-heavy), border-color 250ms var(--ease-heavy); }
.choice-list button.active, .time-list button.active { color: var(--ink); border-color: var(--champagne-bright); background: var(--champagne-bright); }
.month { margin-top: 2rem; text-align: center; font-size: .75rem; }
.weekdays, .calendar { display: grid; grid-template-columns: repeat(7, 1fr); gap: .25rem; }
.weekdays { margin: 1.2rem 0 .55rem; color: var(--steel); font-size: .6rem; text-align: center; }
.calendar .empty { min-height: 0; }
.calendar button { aspect-ratio: 1; padding: 0; border: 0; border-radius: 0; color: var(--mineral-muted); background: transparent; font-size: .72rem; cursor: pointer; }
.calendar button.active { color: var(--ink); background: var(--champagne-bright); }
.calendar .unavailable { display: grid; aspect-ratio: 1; place-items: center; color: #555858; font-size: .67rem; }
.booking-confirmation { display: grid; grid-template-columns: 1fr auto; gap: 3rem; align-items: end; margin-top: 2.8rem; }
.booking-confirmation > div > span { color: var(--steel); font-size: .66rem; letter-spacing: .1em; text-transform: uppercase; }
.booking-confirmation pre { max-width: 45rem; margin: .6rem 0 0; padding: 1.2rem; border: 1px solid var(--line); color: var(--mineral); background: rgba(11,12,12,.36); font-family: var(--sans); font-size: .8rem; white-space: pre-wrap; }
@media (max-width: 1000px) {
  .booking-grid { grid-template-columns: 1fr 1fr; }
  .booking-step { border-bottom: 1px solid var(--line); }
  .booking-step:nth-child(2) { border-right: 0; }
}
@media (max-width: 620px) {
  .booking-grid { grid-template-columns: 1fr; }
  .booking-step { border-right: 0; }
  .booking-confirmation { grid-template-columns: 1fr; align-items: start; }
}
</style>
