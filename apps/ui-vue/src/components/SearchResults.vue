<script setup lang="ts">
import { FavoriteIcon } from '@airbnb-vue-express/icons';
import Button from '../components/ButtonStyled.vue';

import { useMapStore } from '../modules/map/map.store';
import { storeToRefs } from 'pinia';
import { Feature } from '../models/PlacesResponse.model';
import { ref, watch, onMounted } from 'vue';
import { usePlacesStore } from '../modules/places/places.store';
import { useSwal } from '@airbnb-vue-express/ui-helpers'
import { useAuthStore } from '../modules/auth/store/auth.store';

const mapStore = useMapStore();
const placesStore = usePlacesStore();
const authStore = useAuthStore();

const { saveFavorite, getFavorites } = placesStore;
const { favorites } = storeToRefs(placesStore);

const { map, loadingPlaces, places } = storeToRefs(mapStore);
const { setPlaceMarkers } = mapStore;

const { user } = storeToRefs(authStore);

const activePlace = ref('');

watch(places, (newPlace: Feature[]) => {
  activePlace.value = '';
});

const onPlaceClicked = (place: Feature) => {
  activePlace.value = place.id;
  const [lng, lat] = place.center;
  setPlaceMarkers(place);
  map.value?.flyTo({
    center: [lng, lat],
    zoom: 10,
  });
};

const handleToggleFavorite = async (place: Feature) => {    
    saveFavorite({lng: place.center[0], lat: place.center[1], name: place.place_name, userId: user.value.response._id}).then((resp) => {
      useSwal('Saved!', resp.response, 'success', 'Ok');      
    }).catch((error) => {
      useSwal('Error!', error ? error : 'Something went wrong','error', 'Retry');
    }); 
};

onMounted(async () => {      
  try {
    console.log("USER", user.value.response._id);
    getFavorites(user.value.response._id) 
    console.log("FAV", favorites);
  } catch (error) {
    useSwal('Error!', error ? error : 'Something went wrong','error', 'Retry');
  }  
})

const getFavorite = (place: any) => {
  console.log("FAV", favorites.value.find(place));
  
  return true;
}

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
    >
      <!-- <h5>{{ place.text }}</h5> -->
      <div class="flex justify-between">
        <div @click="onPlaceClicked(place)" class="my-1 cursor-pointer">
          {{ place.place_name }}
        </div>
        <div>
          <Button
            border
            color="transparent"
            size="sm"
            type="button"
            text=""
            v-on:click="handleToggleFavorite(place)"
            ><FavoriteIcon></FavoriteIcon
          ></Button>
        </div>
      </div>
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
