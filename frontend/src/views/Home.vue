<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import CardsGallery from '../components/CardsGallery.vue';
import Header from '../components/Header.vue';
import PaginationLine from '../components/PaginationLine.vue';

const data = ref<string | null>(null);

const startImages = [
  {
    img: '../public/images/employee_1.jpg',
    employeeTitle: 'Оператор CPU станка',
    employeeDescription: 'Елена Петрова работает уже больше года на позиции оператор CPU станка',
  },
  {
    img: '../public/images/employee_2.jpg',
    employeeTitle: 'Инженер конструктор',
    employeeDescription: 'Иван Иванов получил предложение на позицию инженера конструктора спустя месяц после завершения курса',
  },
  {
    img: '../public/images/employee_3.jpg',
    employeeTitle: 'Наладчик CPU станка',
    employeeDescription: 'Андрей Сидоров после прохождения курса устроился наладчиком',
  },
];
const currentIndex = ref(0);
const currentImage = ref(startImages[0].img);

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

const switchLine = (index: number) => {
  currentIndex.value = index;
};
const changeImg = (currentIndex: number) => {
  currentImage.value = startImages[currentIndex].img
}

onMounted(async () => {
  await getData();
});
</script>

<template>
  <div class="main">
    <div class="start-screen" :style="{ backgroundImage: `url(${currentImage})` }">
      <div>
        <Header></Header>
        <div class="text-container">
          <h1 class="text">Освой новую профессию вместе с PROCPU</h1>
          <div class="banner">
            <h2 class="banner__title">10 000 +</h2>
            <span class="banner__text">Наших клиентов уже освоили профессию</span>
          </div>
        </div>
      </div>
      <div class="employee">
        <div class="employee__title">
          <h3>{{ startImages[currentIndex].employeeTitle }}</h3>
        </div>
        <div class="employee__description">
          {{ startImages[currentIndex].employeeDescription }}
        </div>
        <PaginationLine 
          :data="startImages"
          @switchLine="switchLine"
          @changeImg="changeImg"/>
      </div>
      <PaginationLine
        :data="startImages"
        @switchLine="switchLine"
        @changeImg="changeImg"/>
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
  padding: 0px 20px 40px 40px;
  width: 100%;
  height: 80vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 30px;
  margin-bottom: 2rem;
  &__pagination {
    display: flex;
    gap: 5px;
    margin-bottom: 20px;
  }
}
.text {
  width: 200px;
  color: rgb(255, 255, 255);
}

.employee {
  display: flex;
  flex-direction: column;
  width: 80%;
  color: rgb(255, 255, 255);
  &__title {
    margin-bottom: 5px;
  }
  &__description {
    font-family: 'Tahoma', sans-serif;
    font-size: 16px;
    margin-bottom: 20px;
  }
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

.banner {
  display: none;
}

.hide-elem {
  display: none;
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

@media (min-width: 100px) and (max-width: 600px){
  .start-screen {
    padding: 0 30px;
  }
}

@media (min-width: 601px) and (max-width: 1024px) {
  .start-screen {
    height: 90vh;
    padding: 30px 60px;
  }
}

@media (min-width: 1025px) and (max-width: 1279px) {
  .text {
    width: 40%;
  }
  .gallery {
    max-width: 928px;
  }
  .gallery-tabs {
    max-width: 928px;
  }
  .container {
    margin: 0px 40px;
  }
  .start-screen {
    height: 90vh;
    padding: 30px 135px;
  }
}

@media (min-width: 1280px) {
  .banner {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: rgb(69, 69, 69);
    width: 250px;
    height: 130px;
    border-radius: 20px;
    border-width: 2px;
    border-color: rgb(255, 255, 255);
    transform: rotate(9deg);
    opacity: 0.8;
    padding: 20px;
    cursor: pointer;
    &__title {
      color: rgb(214, 214, 214);
    }
    &__text {
      font-family: 'Tahoma', sans-serif;
      font-weight: 400;
      font-size: 20px;
      color: rgb(214, 214, 214);
    }
  }
  .banner:hover {
    background-color: rgb(107, 105, 105);
  }
  .banner:hover .banner__title {
      color: rgb(255, 255, 255);
  }

  .banner:hover .banner__text {
      color: rgb(255, 255, 255);
  }
  .text-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .text {
    width: 60%;
  }
  .gallery {
    max-width: 1072px;
  }
  .start-screen {
    height: 95vh;
    padding: 30px 135px;
  }
}
</style>
