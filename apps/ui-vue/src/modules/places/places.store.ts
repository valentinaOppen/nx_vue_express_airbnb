import { defineStore } from 'pinia';
import { useSwal } from '@airbnb-vue-express/ui-helpers';
import { PlaceInterface } from '@airbnb-vue-express/shared-models';
import { fetchWrapper } from '../../helpers/fetch-wrappers';

const baseUrl = 'http://localhost:3333/places';

export interface PlacesState {
  favorites: PlaceInterface[],
  loadingFavorites: boolean
}

export const usePlacesStore = defineStore({
  id: 'places', 
  state: () : PlacesState => ({
    favorites: [],
    loadingFavorites: false
  }),
  actions: {
    async saveFavorite(place: PlaceInterface) {
      this.favorites = [...this.favorites, place];
      return await fetchWrapper.post(`${baseUrl}/favorite`, place)
    },    
    async getFavorites(userId: string) {
      this.loadingFavorites = true;
      const resp = await fetchWrapper.get(`${baseUrl}/favorites?userId=${userId}`);
      this.favorites = resp;
      this.loadingFavorites = false;
      return;
    }
  }

})