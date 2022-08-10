<template>  
  <Header></Header>  
  <Map></Map>  
  <div :v-if="!loadingLocation && loadingPlaces|| places.length > 0">
    <SearchResults></SearchResults>    
  </div>
</template>

<script setup lang="ts">
import Header from '../templates/Header.vue';
import Map from '../templates/Map.vue';
import SearchResults from '../components/SearchResults.vue';

import { useMapStore } from '../modules/map/map.store';
import { storeToRefs } from 'pinia';

const mapStore = useMapStore();
const { loadingLocation, loadingPlaces, places } = storeToRefs(mapStore);

</script>
