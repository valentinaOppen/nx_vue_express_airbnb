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
    loadingPlaces: false,
    map: undefined,
    markers: undefined
  }),
  getters: {
    location: (state) => [state.lng, state.lat],
    loading: (state) => state.lng && state.lat ? false : true,
    // loadingPlaces: (state) => state.places.length > 0 ? false : true,
  },
  actions: {
    setPlaceMarkers(place: Feature) {      
      this.markers?.forEach(marker => marker.remove());      
      this.markers = [];
      
      if(!this.map) return;

      this.markers = [createMarker(place.center, this.map, place)];

      // Clear polyline
    //   if ( this.map?.getLayer('RouteString') ) {
    //     this.map?.removeLayer('RouteString');
    //     this.map?.removeSource('RouteString');
    //     state.distance = undefined;
    //     state.duration = undefined;
    //    }

    },
    setMap(map: mapboxgl.Map) {
      this.map = map;      
    },

    async getInitialLocation() {            
      await navigator.geolocation.getCurrentPosition(
        (resp) => {                    
          this.lng = resp.coords.longitude,          
          this.lat = resp.coords.latitude              
          // this.searchInitialPlace(`${this.lng}, ${this.lat}`); 
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
      this.loadingPlaces = true;
      this.places = [];
      const resp = await searchReverseApi.get<PlacesResponse>(`/${ this.lng}, ${this.lat}.json`, {
        params: {
          proximity: this.location?.join(',')
        }
      })      
      const dataLocation = resp.data.features.filter(x => x.place_type[0] === 'postcode');
      createMarker([this.lng, this.lat], this.map, dataLocation[0]);
      
    }   
  }
})