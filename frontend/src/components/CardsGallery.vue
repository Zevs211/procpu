<script setup lang="ts">
// import { defineProps } from 'vue';
import Card from './Card.vue';

interface CardData {
  img: string;
  title: string;
  text: string;
}

const cardsList: CardData[] = [
  {
    img: '/images/cpu_1.jpg',
    title: 'Карточка 1',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus alias rem minima itaque iure hic obcaecati repellendus eveniet quasi, libero nobis commodi dolorum, vel at pariatur ipsam minus? Dolore, in?'
  },
  {
    img: '/images/cpu_2.jpg',
    title: 'Карточка 2',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus alias rem minima itaque iure hic obcaecati repellendus eveniet quasi, libero nobis commodi dolorum, vel at pariatur ipsam minus? Dolore, in?'
  },
  {
    img: '/images/cpu_3.jpg',
    title: 'Карточка 3',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus alias rem minima itaque iure hic obcaecati repellendus eveniet quasi, libero nobis commodi dolorum, vel at pariatur ipsam minus? Dolore, in?'
  },
  {
    img: '/images/cpu_1.jpg',
    title: 'Карточка 4',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus alias rem minima itaque iure hic obcaecati repellendus eveniet quasi, libero nobis commodi dolorum, vel at pariatur ipsam minus? Dolore, in?'
  },
  {
    img: '/images/cpu_1.jpg',
    title: 'Карточка 5',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus alias rem minima itaque iure hic obcaecati repellendus eveniet quasi, libero nobis commodi dolorum, vel at pariatur ipsam minus? Dolore, in?'
  },
  {
    img: '/images/cpu_1.jpg',
    title: 'Карточка 6',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus alias rem minima itaque iure hic obcaecati repellendus eveniet quasi, libero nobis commodi dolorum, vel at pariatur ipsam minus? Dolore, in?'
  },
]

// const props = defineProps<{
//   cardsList: CardData[];
// }>();
</script>

<template>
  <div class="cards-container">
    <div v-for="(card, index) in cardsList" :key="index">
      <Card :card="card" />
    </div>
  </div>
</template>


<style>
.cards-container {
  display: grid;
  grid-gap: 20px;
}

@media (max-width: 600px) {
  .cards-container {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
}

@media (min-width: 601px) and (max-width: 1024px) {
  .cards-container {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: repeat(auto-fit, minmax(344px, 1fr));
  }
}

@media (min-width: 1025px) and (max-width: 1199px) {
  .cards-container {
    justify-items: center;
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1200px) {
  .cards-container {
    justify-items: center;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>