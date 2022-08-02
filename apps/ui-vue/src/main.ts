import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css';
import { createPinia } from 'pinia';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const options = {
  confirmButtonColor: '#f87171'
}

const pinia = createPinia()

createApp(App).use(pinia).use(router)
.use(VueSweetalert2, options)
.mount('#app');
