import HttpException from '../models/http-exception.model';
import { PlaceInterface } from '@airbnb-vue-express/shared-models';

const FavoriteSchema = require('../models/favorites.schema');

export const SaveFavoritePlace = async (place: PlaceInterface): Promise<any> => {

  const user = place.userId;
  const lng = place.lng;
  const lat = place.lat;
  const name = place.name;

  if(!lng) {
    throw new HttpException(422, { errors: ["Name can't be blank"] });
  }

  if(!lat) {
    throw new HttpException(422, { errors: ["Longitud can't be blank"] });
  }

  if(!name) {
    throw new HttpException(422, { errors: ["Latitud can't be blank"] });
  }

  if(!user) {
    throw new HttpException(422, { errors: ["User ID can't be blank"] });
  }

  try { 
    const favorite = new FavoriteSchema({    
      lng: place.lng,
      lat: place.lat,
      name: place.name,
      userId: place.userId
    }).save(function(err, fav) {
      if(err) {        
        throw new HttpException(400, {errors: [err]});
      } 
      else return "Place saved successfully";  
    });    
  }
  catch(error) {
    throw new HttpException(400, {errors: [error]});
  }

  

} 

export const GetFavoritesPlaces = async (userId: String) => {   
  const favorites = await FavoriteSchema.find({userId: userId});
  return favorites;
}