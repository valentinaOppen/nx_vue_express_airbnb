import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css';
import { createPinia } from 'pinia';

const options = {
  confirmButtonColor: '#f87171'
}

const pinia = createPinia()

createApp(App).use(pinia).use(router)
.mount('#app');
