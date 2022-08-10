import { defineStore } from 'pinia';
import { swalError } from '@airbnb-vue-express/ui-helpers';
import { searchApi } from '../../apis/index';
import { PlacesResponse, Feature, Language } from '../../models/PlacesResponse.model';
import mapboxgl from 'mapbox-gl';
import { searchReverseApi } from '../../apis/searchApi';
import createMarker from '../../helpers/map-helpers';

export interface MapState {
  lng: number,
  lat: number,
  places: Array<Feature>,
  loadingLocation: boolean,
  loadingPlaces: boolean,
  map: mapboxgl.Map | undefined,
  markers: mapboxgl.Marker[] | undefined
}


export const useMapStore = defineStore({  
  id: 'map',
  state: () : MapState => ({    
    lng: 0,
    lat: 0,
    places: [],
    loadingLocation: false,
    loadingPlaces: false,
    map: undefined,
    markers: undefined
  }),
  getters: {
    location: (state) => [state.lng, state.lat],
  },
  actions: {
    setPlaceMarkers(place: Feature) {      
      this.markers?.forEach(marker => marker.remove());      
      this.markers = [];
      if(!this.map) return;
      this.markers = [createMarker(place.center, this.map, place)];
    },
    setMap(map: mapboxgl.Map) {
      this.map = map;      
    },

    async getInitialLocation() {            
      await navigator.geolocation.getCurrentPosition(
        (resp) => {                    
          this.lng = resp.coords.longitude,          
          this.lat = resp.coords.latitude              
        },
        (err) => swalError("We couldn't find your location", 'Error in geolocation')
      );    
      return;
    },

    async searchPlaces(query:string) {            
      this.loadingPlaces = true;
      this.places = [];
      const resp = await searchApi.get<PlacesResponse>(`/${ query }.json`, {
        params: {
          proximity: this.location?.join(',')
        }
      })
      this.places = resp.data.features;
      this.loadingPlaces = false;
    },   
    
    async searchInitialPlace() {   
      this.loadingLocation = true;               
      this.places = [];
      const resp = await searchReverseApi.get<PlacesResponse>(`/${ this.lng}, ${this.lat}.json`, {
        params: {
          proximity: this.location?.join(',')
        }
      })      
      const dataLocation = resp.data.features.filter(x => x.place_type[0] === 'postcode');
      createMarker([this.lng, this.lat], this.map, dataLocation[0]);
      this.loadingLocation = false;
    }   
  }
})