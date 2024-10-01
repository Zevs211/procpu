<script setup lang="ts">
import { ref, watch, defineProps, defineEmits, onMounted } from 'vue';

type Employee = {
  img: string;
  title: string;
  description: string;
};

const currentValue = ref(0);
const currentIndex = ref(0);

const props = defineProps<{
  data: Employee[];
}>();

const emit = defineEmits(['switchLine', 'changeImg']);

const timer = () => {
  setInterval(() => {    
    if (currentValue.value < 1000) {
      currentValue.value += 1;
    } else {
      currentIndex.value >= props.data.length - 1 ? currentIndex.value = 0 : currentIndex.value += 1;
      currentValue.value = 0;
    }
  }, 10);
};

const switchLine = (index: number) => {
  currentIndex.value = index;
  currentValue.value = 0;
  emit('switchLine', index);
};

watch(currentIndex, (newVal) => {
  emit('changeImg', newVal);
});

onMounted(() => {
  timer();
});
</script>

<template>
  <div class="pagination">
    <div
      v-for="(item, index) in props.data"
      :key="index"
      class="pagination-item"
      @click="switchLine(index)"
    >
      <div class="pagination-line-container">
        <div
          class="filled"
          :style="{ width: `${index < currentIndex ? 100 : (index === currentIndex ? (currentValue / 10) : 0)}%` }"
        ></div>
        <div class="remaining"></div>
        <input
          type="range"
          min="0"
          :max="1000"
          disabled
          :value="index < currentIndex ? 1000 : (index === currentIndex ? currentValue : 0)"
          class="pagination-line"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  gap: 5px;
  margin-bottom: 2rem;
}

.pagination-item {
  flex: 1;
  cursor: pointer;
}

.pagination-line-container {
  position: relative;
  height: 5px;
  width: 100%;
}

.pagination-line {
  width: 100%;
  height: 5px;
  appearance: none;
  background: transparent;
}

.filled {
  height: 5px;
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5px;
}

.remaining {
  height: 5px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 5px;
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
</style>
