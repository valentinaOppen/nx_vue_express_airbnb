
<template>  
  <div class="w-100 map-element" ref="mapElement"></div>  
</template>

<script setup lang="ts">
import mapboxgl from "mapbox-gl";

import { onMounted, ref } from "vue";

  const mapElement = ref<HTMLDivElement>();
  
  const initMap = () => {    
    if(!mapElement.value) return;
    const map = new mapboxgl.Map({
      container: mapElement.value, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
      // projection: 'globe' // display the map as a 3D globe
    });
  }
  
  onMounted(() => {
    return initMap();
  })

</script>

<style scoped>
.map-element { 
  height: calc(100vh - 60px);
  /* margin-top: 60px;   */
}

</style>