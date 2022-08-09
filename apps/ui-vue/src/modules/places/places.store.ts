import { defineStore } from 'pinia';
import { useSwal } from '@airbnb-vue-express/ui-helpers';
import { PlaceInterface } from '@airbnb-vue-express/shared-models';
import { fetchWrapper } from '../../helpers/fetch-wrappers';

const baseUrl = 'http://localhost:3333/places';

export interface PlacesState {
  favorites: PlaceInterface[]
}

export const usePlacesStore = defineStore({
  id: 'places', 
  state: () : PlacesState => ({
    favorites: []
  }),
  actions: {
    async saveFavorite(place: PlaceInterface) {
      return await fetchWrapper.post(`${baseUrl}/favorite`, place)
    },
    
    async getFavorites(userId: string) {
      return await fetchWrapper.get(`${baseUrl}/favorites?userId=${userId}`);
    }
  }

})