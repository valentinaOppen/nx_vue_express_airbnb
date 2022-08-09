import { Response, Request, NextFunction } from 'express';
import { SaveFavoritePlace, GetFavoritesPlaces } from '../services/places.service';

const FavoriteSchema = require('../models/favorites.schema');

exports.postFavorite = async (req:Request, res:Response, next:NextFunction) => {      
  const fav = new FavoriteSchema({
    lng: req.body.lng,
    lat: req.body.lat,
    name: req.body.name,
    userId: req.body.userId
  })

  try {
    const response = await SaveFavoritePlace(fav);
    res.json({response});
  } catch (error) {
    next(error);
  }
};

exports.getFavorite = async (req:Request, res:Response, next:NextFunction) => {      
  const userId = req.body.userId;
  try {
    const response = await GetFavoritesPlaces(userId);
    res.json(response);
  }
  catch(error) {
    next(error);
  }
  
}