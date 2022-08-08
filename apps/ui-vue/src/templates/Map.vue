
<template>  
  <div class="w-100 map-element" :class="[loading ? 'opacity-30 z-0' : '']" ref="mapElement"></div>  
  <div v-if="loading" class="text-center absolute z-10  inset-1/3  w-4/12 bg-white h-60 rounded-lg">
    <div class="flex flex-col text-center mt-10">
      Loading current location
      <span class="spinner-border spinner-border-lg align-center mx-auto my-10"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import { storeToRefs } from "pinia";

import { onMounted, ref, watch } from 'vue';
import { useMapStore } from '../modules/map/map.store';
import createMarker from '../helpers/map-helpers';
  
  const mapElement = ref<HTMLDivElement>();  
  const mapStore = useMapStore();      
  const { location, loading  } = storeToRefs(mapStore);      
  const { setMap, searchInitialPlace } = mapStore;
  
  const initMap = () => {    
    if(!mapElement.value) return;

    const map = new mapboxgl.Map({
      container: mapElement.value, // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL      
      //@ts-ignore
      center:  location.value, // starting position [lng, lat]
      zoom: 10, // starting zoom
      // projection: 'globe' // display the map as a 3D globe
    });

    // const marker = createMarker(location.value, map);
    setMap(map);
    searchInitialPlace();
  }


  onMounted(async () => {      
    await mapStore.getInitialLocation();
    if(location ) initMap();    
  })

  watch(location, (newVal) => {
    if(location.value) initMap();
  })

</script>

<style scoped>
.map-element { 
  position: absolute;
  left:0;
  height: calc(100vh - 3.5rem);    
  max-height: calc(100vh - 3.5rem);    
  bottom:0;  
  top:3.5rem;
  /* margin-top: 58px; */
}

</style>