<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';

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
  <main>
    
  </main>
</template>
