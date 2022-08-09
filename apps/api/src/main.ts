import { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import HttpException from './app/models/http-exception.model';
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');
// const dbConfig = require('./app/config/db.config');

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cookieSession({
//   name:'airbnb',
//   secret: 'COOKIE_SECRET',
//   httpOnly: true
// }));

const db = require('./app/models');
db.mongoose.connect('mongodb+srv://voppen:mongo20221@airbnb.2d1w9.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log("Successfully connect to MongoDB.");    
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });                               

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api!' });
});

const authRoutes:Router = require('./routes/auth.routes');
app.use('/user', authRoutes);
const placesRoutes:Router = require('./routes/places.routes');
app.use('/places', placesRoutes);

/* eslint-disable */
app.use((err: Error | HttpException, req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (err && err.errorCode) {
    // @ts-ignore
    res.status(err.errorCode).json(err.message);
  } else if (err) {
    res.status(500).json(err.message);
  }
});

// app.use(function (req, res, next) {
//   console.log('Time:', Date.now());
//   next();
// });

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);

export {}