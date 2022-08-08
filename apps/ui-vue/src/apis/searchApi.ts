import axios from 'axios';

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        language: 'es',
        access_token: 'pk.eyJ1Ijoidm9wcGVuIiwiYSI6ImNsNHI4ZGd3ajBhNWwza21ueW04aXIzNDcifQ.9ss7beusIlPFUBdluhMVUQ'
    }
});


export default searchApi;


