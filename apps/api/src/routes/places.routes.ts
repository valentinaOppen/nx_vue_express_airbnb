import { Router } from "express";
const express = require('express');
const placesController = require('../app/controllers/places.controller');

const router: Router = express.Router();

router.post('/favorite', placesController.postFavorite);
router.get('/favorites', placesController.getFavorite);

module.exports = router;
