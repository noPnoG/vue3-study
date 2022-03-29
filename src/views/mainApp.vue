<template>
  <!-- <div>MianApp</div> -->
  <div>
    <span>name</span>
    <span>3:00</span>
    <span>sound</span>
  </div>
  <div>
    <div>线</div>
    <svg-icon :iconClass="heart"></svg-icon>
  </div>
  
</template>

<script>
import SvgIcon from '../components/SvgIcon.vue'
export default {
  components: { SvgIcon },

}
</script>

<style>

</style>