<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import CardsGallery from '../components/CardsGallery.vue';
import Header from "../components/Header.vue";

const data = ref<string | null>(null);
const currentImageIndex = ref(0);
const remainingTime = ref(4);
const intervalId = ref<NodeJS.Timeout | null>(null);

const startImages = [
  '../public/images/employee_1.jpg',
  '../public/images/employee_2.jpg',
  '../public/images/employee_3.jpg',
];

const getData = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: 'http://127.0.0.1:3000',
    });
    data.value = response.data.hello;
  } catch (error) {
    console.log(error);
  }
};

const changeImage = () => {
  return currentImageIndex.value = (currentImageIndex.value + 1) % startImages.length;
};

const countdown = () => {
    if (remainingTime.value > 0) {
      remainingTime.value--;
    } else {
      remainingTime.value = 4
      changeImage();
    }
  };
const currentImage = computed(() => startImages[currentImageIndex.value]);

onMounted(async () => {
  await getData();  
  intervalId.value = await setInterval(countdown, 1000);
});

onUnmounted(() => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
  }
});
</script>

<template>
  <div class="main">
    <div 
      class="start-screen"
      :style="{ backgroundImage: `url(${currentImage})` }"
    >
      <div>
        <Header></Header>
        <h1 class="start-screen__text">{{'Получи свою \n профессию'}}</h1>
      </div>
      <div class="start-screen__pagination">
        <div v-for="(startImage, index) in startImages.length" :key="index" 
          class="start-screen__pagination__item"
          :class="{'item-color': currentImageIndex === (startImage - 1) }">
        </div>
      </div>
    </div>
    <div class="container">
      <div class="gallery-tabs"></div>
      <div class="gallery">
        <CardsGallery></CardsGallery>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<style scoped lang="scss">
.main {
  height: 80vh;
  background-size: cover;
  background-position: center;
  border-radius: 30px;
  margin: 10px 10px 0px 10px;
}
.start-screen {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px 60px;
  width: 100%;
  height: 80vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 30px;
  margin-bottom: 2rem;
  &__text {
    width: 40%;
    color: rgb(239, 91, 11);
    background-color: black;
    opacity: 0.6;
  }
  &__pagination {
    display: flex;
    flex-direction: row;
    gap: 5px;
    &__item {
      width: 100%;
      height: 5px;
      border-radius: 10px;
      background-color: rgb(255, 255, 255);
      opacity: 0.5;
      margin-bottom: 30px;
    }
  }
}
.item-color {
  opacity: 1;
}
.item-color-fill {
  height: 100%;
  width: 30%;
  background-color: red;
}
.container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 60px;
}
.gallery-tabs {
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  background-color: gold;
}
.gallery {
  width: 100%;
  max-width: 928px;
  overflow-x: auto;
}

@media (max-width: 600px) {
  .container {
    margin: 0px 60px;
  }
}

@media (min-width: 601px) and (max-width: 1024px) {
  
}

@media (min-width: 1025px) and (max-width: 1199px) {
  .gallery {
    max-width: 928px;
  }
  .gallery-tabs {
    max-width: 928px;
  }
  .container {
    margin: 0px 40px;
  }
}

@media (min-width: 1200px) {
  .gallery {
    max-width: 1072px;
  }
  .start-screen {
    height: 90vh;
  }
}
</style>
