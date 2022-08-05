import { defineStore } from 'pinia';
import { useSwal } from '@airbnb-vue-express/ui-helpers';

export const useMapStore = defineStore({  
  id: 'map',
  state: () => ({    
    lng: 0,
    lat: 0
  }),
  getters: {
    location: (state) => [state.lng, state.lat],
    loading: (state) => state.lng && state.lat ? false : true
  },
  actions: {
    async getInitialLocation() {            
      await navigator.geolocation.getCurrentPosition(
        (resp) => {          
          this.lng = resp.coords.longitude,          
          this.lat = resp.coords.latitude                  
        },
        (err) => useSwal('Error in geolocation', "We couldn't find your location", 'error', 'Ok')
      );
      return;
  },   
  }
})