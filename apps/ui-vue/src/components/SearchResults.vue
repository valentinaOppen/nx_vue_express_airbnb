<script setup lang="ts">
import { useMapStore } from '../modules/map/map.store';
import { storeToRefs } from 'pinia';
import { Feature } from '../models/PlacesResponse.model';
import { ref, watch } from 'vue';

const mapStore = useMapStore();
const { map, loadingPlaces, places } = storeToRefs(mapStore);
const { setPlaceMarkers } = mapStore;

const activePlace = ref('');

watch(places, (newPlace:Feature[]) => {
  activePlace.value = '';  
});

const onPlaceClicked = (place: Feature) => {
  activePlace.value = place.id;
  const [lng, lat] = place.center;
  setPlaceMarkers(place);
  map.value?.flyTo({
    center: [ lng, lat ],
    zoom: 10
  });
};
</script>

<template>
  <!-- <div
    v-if="loadingPlaces"
    class="text-center absolute z-10 inset-1/3 w-4/12 bg-white h-60 rounded-lg"
  >
    <div class="flex flex-col text-center mt-10">
      Loading Places
      <span
        class="spinner-border spinner-border-lg align-center mx-auto my-10"
      ></span>
    </div>
  </div> -->

  <ul v-if="places.length > 0" class="list-group w-1/4 mt-10 ml-10 text-xs">
    <li
      v-for="place in places"
      class="list-group-item list-group-item-action"
      :class="{ active: place.id === activePlace }"
      :key="place.id"
      @click="onPlaceClicked(place)"
    >
      <!-- <h5>{{ place.text }}</h5> -->
      <div class="my-1">{{ place.place_name }}</div>
      <!-- <div align="right">
        <button
          class="btn btn-outline-primary btn-sm"
          :class="
            place.id === activePlace
              ? 'btn-outline-light'
              : 'btn-outline-primary'
          "
        >
          Direcciones
        </button>
      </div> -->
    </li>
  </ul>
</template>
