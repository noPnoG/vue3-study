<template>
  <div ref="slideRef" class=" h-1 bg-gray-300 cursor-pointer" :style="{width:width}" @mousedown="touchStart">
    <div class="h-1 bg-gray-900" :style="slideStyle" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useElementBounding } from '@vueuse/core'
const props = defineProps({
  modelValue: {
    type: Number,
    default: 10,
  },
  width: {
    type: String,
    default: '100%',
  }, 
})
const emit = defineEmits(['update:modelValue'])
const slideRef = ref(null)
const percent = computed({
  get(){
    return props.modelValue
  },
  set(value){
    console.log(value)
    emit('update:modelValue', value)
  },
})
const slideStyle = computed(()=>{
  return {
    width: `${percent.value}%`,
  }
})
let slideWidth = 0
let sliderX = 0
onMounted(()=>{
  const { x, width, update } = useElementBounding(slideRef)
  update()
  sliderX = x.value
  slideWidth = width.value
})
function touchStart({ x, y }){
  setSliderBar(x, y)
  window.addEventListener('mousemove', mouseMove)
  window.addEventListener('mouseup', touchEnd)
  console.log('touchStart')
}
function mouseMove({ x: mouseX, y: mouseY }){
  setSliderBar(mouseX, mouseY)
}
function setSliderBar(mouseX){
  const diffX = mouseX - sliderX
  const length = diffX < 0 ? 0 : diffX > slideWidth ? slideWidth : diffX
  percent.value = length * 100 / slideWidth
  // console.log(percent.value)
}
function touchEnd(){
  console.log('touchEnd')
  window.removeEventListener('mousemove', mouseMove)
  window.removeEventListener('mouseup', touchEnd)
}
</script>

<style lang="scss" scoped>

</style>