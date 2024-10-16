<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, onMounted } from 'vue';

type image = {
  img: string;
  description?: string;
};

const props = defineProps<{
  imageList: image[];
}>();

const emit = defineEmits(['switchLine']);

const progress = ref(0);
const isRunning = ref(false);
const currentIndex = ref(0);
const interval = ref<number | undefined>(undefined);

const startTimer = () => {
  if (!isRunning.value) {
    isRunning.value = true
    interval.value = setInterval(() => {
      progress.value++
      console.log(progress.value);
    }, 50)
  }
}

const pauseTimer = () => {
  clearInterval(interval.value);
  isRunning.value = false;
};

const resetTimer = () => {
  pauseTimer();
  progress.value = 0;
};

const switchLine = (index?: number) => {
  resetTimer();
  startTimer();
  if (index != null) {
    currentIndex.value = index;
    emit('switchLine', currentIndex.value);
  } else {
    currentIndex.value >= props.imageList.length - 1 ? currentIndex.value = 0 : currentIndex.value++;
    emit('switchLine', currentIndex.value);
  }
}

watch(progress, (newValue) => {
  if(newValue >= 100) switchLine()
})

onMounted(() => {
  startTimer()
})
</script>

<template>
  <div v-for="(line, index) in props.imageList" :key="index" 
    class="line"
    @click="switchLine(index)"
  >
  <div 
    class="filled" 
    :style="{width: `${index < currentIndex ? 100 : (index === currentIndex ? (progress) : 0)}%`}">
  </div>
  </div>
</template>

<style scoped lang="scss">
  .container {
    display: flex;
    flex-direction: column;
  }
  .line {
    width: 100%;
    height: 5px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 5px;
    cursor: pointer;
  }
  .filled {
    height: 100%;
    background-color: rgba(255, 255, 255);
    border-radius: 5px;
  }
</style>