<template>
  <div class="mx-auto w-[500px]">
    <div class=" text-4xl whitespace-nowrap text-ellipsis ">music name</div>
    <span class=" text-lg text-gray-400 font-bl">auth</span>
    <BiVolumeUpFill :volume="1" />
    <!-- <div class="w-full bg-gray-100 h-px" /> -->
    <Slider v-model="progress" />
    <div>
      <div class="flex gap-5 mt-10">
        <icon-ant-design-heart-filled class="my-custom-icon" />
        <IconCarbonPlay-filled-alt class="my-custom-icon" />
        <icon-carbon-pause-filled class="text-3xl ml-auto text-gray-800" />
        <icon-ri-delete-bin-6-fill class="my-custom-icon" />
      </div>
    </div>
  </div>
</template>

<script setup>

import BiVolumeUpFill from './components/Volume.vue'
import Slider from './components/slider.vue'
import { ref } from 'vue'
const progress = ref(50)
</script>

<style scoped>
.my-custom-icon {
  @apply text-gray-800;
  @apply text-3xl ;
  @apply cursor-pointer
}
</style>
