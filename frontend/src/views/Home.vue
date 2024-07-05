<script setup lang="ts">
import axios from 'axios';

const getData = async () => {
  try {
    // const data = await axios.create({
    //   url: 'http://127.0.0.1:3000/',
    // })
    // console.log(data);

    // return data;
    const data = await axios({
      method: 'get',
      url: 'http://127.0.0.1:3000',
    })
    console.log(data, '-----------data');
    
  } catch (error) {
    console.log(error);
  }
};
const data = getData();

// import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
    {{ data }}
  </main>
</template>
