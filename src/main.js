import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.css'
import svgIcon from '@/assets/icons/index.js'



createApp(App).use(svgIcon).mount('#app')
