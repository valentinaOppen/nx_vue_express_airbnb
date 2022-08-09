<script setup lang="ts">
import { FavoriteIcon } from '@airbnb-vue-express/icons';
import Button from '../components/ButtonStyled.vue';

import { useMapStore } from '../modules/map/map.store';
import { storeToRefs } from 'pinia';
import { Feature } from '../models/PlacesResponse.model';
import { ref, watch, onMounted, computed } from 'vue';
import { usePlacesStore } from '../modules/places/places.store';
import { useSwal } from '@airbnb-vue-express/ui-helpers'
import { useAuthStore } from '../modules/auth/store/auth.store';

const mapStore = useMapStore();
const placesStore = usePlacesStore();
const authStore = useAuthStore();

const { saveFavorite, getFavorites } = placesStore;
const { favorites, loadingFavorites } = storeToRefs(placesStore);

const { map, loadingPlaces, places } = storeToRefs(mapStore);
const { setPlaceMarkers } = mapStore;

const { user } = storeToRefs(authStore);

const activePlace = ref('');

const placesAndFavorites:any = computed(() => {      
  return places.value.map(p => {
    return {...p, color: favorites.value.filter(f => p.place_name === f.name).length > 0 ? 'red' : 'white'}    
  });  
})

watch(places, (newPlace: Feature[]) => {
  activePlace.value = '';
  handleGetFavorites();
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

const handleGetFavorites = async () => {
  try {    
      await getFavorites(user.value.response._id)     
    } catch (error) {
      useSwal('Error!', error ? error : 'Something went wrong','error', 'Retry');
    }  
}

const handleToggleFavorite = async (place: Feature) => {    
    saveFavorite({lng: place.center[0], lat: place.center[1], name: place.place_name, userId: user.value.response._id}).then((resp) => {      
      useSwal('Saved!', resp.response, 'success', 'Ok');      
    }).catch((error) => {
      useSwal('Error!', error ? error : 'Something went wrong','error', 'Retry');
    }); 
};

onMounted(async () => {      
  await handleGetFavorites();
})  



</script>

<template>
  <!-- <div
    v-if="loadingPlaces || loadingPlaces"
    class="text-center absolute z-10 inset-1/3 w-4/12 bg-white h-60 rounded-lg"
  >
    <div class="flex flex-col text-center mt-10">
      Loading Places
      <span
        class="spinner-border spinner-border-lg align-center mx-auto my-10"
      ></span>
    </div>
  </div> -->

  <!-- <div  class="text-center z-10  inset-1/3  w-1/4 bg-white h-60 rounded-lg">
    <div class="flex flex-col text-center mt-10">
      Loading current location
      <span class="spinner-border spinner-border-lg align-center mx-auto my-10"></span>
    </div>
  </div> -->

  <ul class="list-group w-1/4 mt-10 ml-10 text-xs">
    <li v-if="loadingPlaces || loadingFavorites" class="list-group-item list-group-item-action flex flex-col">
      Loading places
      <span class="spinner-border spinner-border-lg align-center mx-auto my-3"></span>
    </li>
    <li v-if="places.length > 0 && !loadingPlaces && !loadingFavorites"
      v-for="place in placesAndFavorites"
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
            ><FavoriteIcon :color="place.color"></FavoriteIcon
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
