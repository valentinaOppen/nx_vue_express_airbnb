import mapboxgl from "mapbox-gl";
import { Feature } from '../models/PlacesResponse.model';


const createMarker = (location:any, map: any, dataLocation:any) => {    
  const myLocationPopup = new mapboxgl.Popup()
      //@ts-ignore
      .setLngLat( location )
      .setHTML(`
        <p>${dataLocation.place_name}</p>
    `);
    
    const marker = new mapboxgl.Marker()
    //@ts-ignore
      .setLngLat( location )
      .setPopup( myLocationPopup )
      .addTo( map );
    return marker;
}

export default createMarker;