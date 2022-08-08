import { defineStore } from 'pinia';
import { useSwal } from '@airbnb-vue-express/ui-helpers';
// import searchApi from '../../../../api/src/app/api/searchApi';
import { searchApi } from '../../apis/index';
import { PlacesResponse, Feature, Language } from '../../models/PlacesResponse.model';
import mapboxgl from 'mapbox-gl';

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
    setPlaceMarkers(place: Feature[]) {
      this.markers = [];
      const popup = new mapboxgl.Popup()
      //@ts-ignore
        .setLngLat([...place.center])
        .setHTML(`
          <h4>${ place[0].text }</h4>
          <p>${ place[0].place_name }</p>
        `);
      
      const marker = new mapboxgl.Marker()
        //@ts-ignore
        .setLngLat([...place.center])
        .setPopup(popup)
        //@ts-ignore
        .addTo(this.map)

      this.markers = [marker];

      // Clear polyline
      if ( this.map?.getLayer('RouteString') ) {
        this.map?.removeLayer('RouteString');
        this.map?.removeSource('RouteString');
        // state.distance = undefined;
        // state.duration = undefined;
    }

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
        (err) => useSwal('Error in geolocation', "We couldn't find your location", 'error', 'Ok')
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
    }   
  }
})