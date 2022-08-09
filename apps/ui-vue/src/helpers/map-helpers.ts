import mapboxgl from "mapbox-gl";

const createMarker = (location:any, map: any, dataLocation:any) => {    
  const myLocationPopup = new mapboxgl.Popup()
      //@ts-ignore
      .setLngLat( location )
      .setHTML(`<div class='bg-gray-200 w-4/12'>
        <p>${dataLocation?.place_name}</p>`
        
    );
    
    const marker = new mapboxgl.Marker()
    //@ts-ignore
      .setLngLat( location )
      .setPopup( myLocationPopup )
      .addTo( map );
    return marker;
}

export default createMarker;