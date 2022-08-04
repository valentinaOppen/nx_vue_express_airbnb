import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css';
import { createPinia } from 'pinia';

import mapboxgl from 'mapbox-gl'; 
mapboxgl.accessToken = 'pk.eyJ1Ijoidm9wcGVuIiwiYSI6ImNsNHI4ZGd3ajBhNWwza21ueW04aXIzNDcifQ.9ss7beusIlPFUBdluhMVUQ';

const pinia = createPinia()

createApp(App).use(pinia).use(router)
.mount('#app');
