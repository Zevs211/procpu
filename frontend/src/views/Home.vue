<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';
import CardsGallery from '../components/CardsGallery.vue'

const data = ref<string | null>(null);

const getData = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: 'http://127.0.0.1:3000',
    });
    console.log(response.data.hello, '-----------fff');
    data.value = response.data.hello;
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  await getData();
});
</script>

<template>
  <div class="main">
    <div class="header"></div>
    <div class="container">
        <div class="gallery-tabs"></div>
        <div class="gallery">
          <CardsGallery></CardsGallery>
        </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<style scoped>
  .main{
    background-color: rgb(241, 189, 206);
  }
  .container{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px 60px;
    background-color: red;   
  }
  .gallery-tabs{
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
    background-color: gold;
  }

  .gallery{
    width: 100%;
    max-width: 928px;
    overflow-x: auto;
    background-color: blueviolet;
  }

  @media (min-width: 1025px) and (max-width: 1199px) {
    .gallery {
      max-width: 928px;
    }
    .gallery-tabs{
      max-width: 928px;
    }
    .container{
      margin: 0px 40px;
    }
  }

  @media (min-width: 1200px) {
    .gallery {
      max-width: 1072px;
    }
  }
  
  .header{
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
    background-color: rgb(164, 164, 238);
  }
</style>
