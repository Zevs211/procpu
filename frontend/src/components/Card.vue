<script setup lang="ts">
import { defineProps, computed, ref, type StyleValue } from 'vue';

interface CardData {
  img: string;
  title: string;
  text: string;
}

const props = defineProps<{
  card: CardData;
}>();

const isHovered = ref(false); 

const cardStyle = computed<StyleValue>(() => {
  const backgroundImageUrl = `${props.card.img}`;

  return {
    backgroundImage: `url('${backgroundImageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '10px',
  };
});
</script>

<template>
  <div 
    class="card"
    :class="{'is-hovered': isHovered}"
    :style="cardStyle"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="overlay">
      <h2 class="overlay__title">{{ card.title }}</h2>
      <p class="overlay__text" :class="{'hidden': !isHovered}">{{ card.text }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  color: white;
  padding: 20px;
  overflow: hidden;
  border-radius: 10px;

  &.is-hovered {
    h2 {
      opacity: 1;
    }
    p {
      opacity: 0.8;
    }
    .overlay {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hidden {
    opacity: 0;
    transform: translateY(100%);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(
      to top, 
      rgba(17, 17, 17, 0.9),
      rgba(164, 163, 163, 0.01)
    );
    transform: translateY(50%);
    transition: opacity 0.5s ease, transform 0.5s ease;

    &__title {
      display: flex;
      flex-direction: column;
      margin-top: auto;
      padding: 20px;
    }

    &__text {
      padding: 20px;
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
  }

  @media (max-width: 600px) {
    width: 320px;
    height: 320px;
    .overlay {
      transform: translateY(45%);  
      &__title {
        margin-top: 30%;
      }
    }
  }

  @media (min-width: 601px) and (max-width: 1024px) {
    width: 344px;
    height: 344px;
    .overlay {
      transform: translateY(30%);  
      &__title {
        margin-top: 40%;
      }
    }
  }

  @media (min-width: 1025px) and (max-width: 1199px) {
    width: 454px;
    height: 454px;
    .overlay {
      transform: translateY(30%);  
      &__title {
        margin-top: 50%;
      }
    }
  }

  @media (min-width: 1200px) {
    width: 344px;
    height: 344px;
    .overlay {
      transform: translateY(30%);  
      &__title {
        margin-top: 40%;
      }
    }
  }
}
</style>
