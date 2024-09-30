<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import CardsGallery from '../components/CardsGallery.vue';
import Header from "../components/Header.vue";

const data = ref<string | null>(null);
const currentValue = ref(0);
const currentIndex = ref(0);

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

const timer = () => {
  setInterval(() => {
    if (currentValue.value < 1000) {
      currentValue.value += 1;
    } else {
      currentIndex.value >= startImages.length - 1 ? currentIndex.value = 0 : currentIndex.value += 1;
      currentValue.value = 0;
    }
  }, 10);
};

const switchLine = (index: number) => {
  currentIndex.value = index;
  currentValue.value = 0;
}

const currentImage = computed(() => startImages[currentIndex.value]);

onMounted(async () => {
  await getData();  
  timer();
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
        <div v-for="(startImage, index) in startImages" :key="index" class="item" @click="switchLine(index)">
          <div class="pagination-line-container">
            <div class="filled" :style="{ width: `${index < currentIndex ? 100 : (index === currentIndex ? (currentValue / 10) : 0)}%` }"></div>
            <div class="remaining"></div>
            <input
              type="range"
              min="0"
              :max="1000"
              disabled
              :value="index < currentIndex ? 1000 : (index === currentIndex ? currentValue : 0)"
              @input="index === currentIndex ? currentValue = +( $event.target as HTMLInputElement ).value : null"
              class="pagination-line"
            />
          </div>
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
    justify-content: space-between;
    gap: 5px;
    margin-bottom: 20px;
  }
}

.pagination-line-container {
  position: relative;
  width: 100%;
  height: 5px;
}

.pagination-line {
  height: 5px;
  appearance: none;
  background: transparent;
}

.item {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.item:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.pagination-line::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 0;
  height: 0;
}

.pagination-line::-moz-range-thumb {
  width: 0;
  height: 0;
}

.pagination-line::-ms-thumb {
  width: 0;
  height: 0;
}

.filled {
  border-radius: 5px;
  height: 5px;
  background: white;
  position: absolute;
}

.remaining {
  border-radius: 5px;
  width: 100%;
  height: 5px;
  background: rgba(255, 255, 255, 0.4);
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
