import { Response, Request, NextFunction } from 'express';
import { RegisterUser, LoginUser } from '../services/auth.service';

const UserSchema = require('../models/user.schema');

exports.postRegister = async (req:Request, res:Response, next:NextFunction) => {      
  const user = new UserSchema({      
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
  })
  
  try {
    const response = await RegisterUser(user);
    res.json({response});
  } catch (error) {
    next(error);
  }
}

exports.postAuthenticate = async (req:Request, res:Response, next:NextFunction) => {  
  const loginUser = ({            
      username: req.body.username,
      password: req.body.password
  })
  try {
    const response = await LoginUser(loginUser);
    res.json({response});
  } catch (error) {
    next(error);
  }
}