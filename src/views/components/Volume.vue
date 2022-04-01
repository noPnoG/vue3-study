
<template>
  <div class="flex items-center gap-2">
    <svg v-if="percent>0" width="2em" height="2em" viewBox="0 0 16 16">
      <g fill="currentColor">
        <path v-show="percent>75" d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
        <path v-show="percent>50" d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z" />
        <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8A3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z" />
      </g>
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--bi" width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
      <path fill="currentColor" d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8L9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z" />
    </svg>
    <div ref="slideRef" class="w-16 h-1 bg-gray-300 cursor-pointer" @mousedown="touchStart">
      <div class="h-1 bg-gray-900" :style="slideStyle" />
    </div>
  </div>
</template>

<script setup>
import { useMousePressed, useElementBounding } from '@vueuse/core'
import { computed, onMounted, ref, watch } from 'vue'
const props = defineProps(['volume'])
// const volume=ref(0)
const slideRef = ref(null)
const percent = ref(props.volume)
const slideStyle = computed(()=>{
  return {
    width: `${percent.value}%`,
  }
})
// const { pressed } = useMousePressed({ target: slideRef })
// watch(pressed, (val)=>{
//   if(val) touchStart()
//   else tocuhEnd()
// })
let sliderX = 0

let slideWidth = 0
onMounted(()=>{
  const { x, width, update } = useElementBounding(slideRef)
  update()
  sliderX = x.value
  slideWidth = width.value
})
function touchStart({ x, y }){
  setSliderBar(x, y)
  window.addEventListener('mousemove', mouseMove)
  window.addEventListener('mouseup', tocuhEnd)
  console.log('touchStart')
}
function mouseMove({ x: mouseX, y: mouseY }){
  setSliderBar(mouseX, mouseY)
}
function setSliderBar(mouseX){
  const diffX = mouseX - sliderX
  const length = diffX < 0 ? 0 : diffX > slideWidth ? slideWidth : diffX
  percent.value = length * 100 / slideWidth
  console.log(percent.value)
}
function tocuhEnd(){
  console.log('touchEnd')
  window.removeEventListener('mousemove', mouseMove)
  window.removeEventListener('mouseup', tocuhEnd)
}
</script>