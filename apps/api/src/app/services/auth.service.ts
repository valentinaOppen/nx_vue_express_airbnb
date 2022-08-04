import * as bcrypt from 'bcryptjs';
import HttpException from '../models/http-exception.model';
import { LoginUserInterface, UserInterface } from '@airbnb-vue-express/shared-models';

const UserSchema = require('../models/user.schema');

const checkUserUniqueness = async (user:UserInterface): Promise<void> => {
  // const UserSchema = require('../models/user.schema');  
  const existingUserByEmail = await UserSchema.findOne({email: user.email});
  const existingUserByUsername = await UserSchema.findOne({username: user.username});

  if (existingUserByEmail || existingUserByUsername) {
    throw new HttpException(422, {
      errors: [
        existingUserByEmail ? 'Email has already been taken' : '', 
        existingUserByUsername ? 'Username has already been taken' : ''
      ]
    });
  }
};

export const RegisterUser = async (user: UserInterface) : Promise<any> => {
  const firstname = user.firstname.trim();
  const lastname = user.lastname.trim();
  const username = user.username.trim();
  const email = user.email.trim();
  const password = user.password;

  if(!firstname) {
    throw new HttpException(422, { errors: ["Firstname can't be blank"] });
  }

  if(!lastname) {
    throw new HttpException(422, { errors: ["Lastname can't be blank"] });
  }

  if(!username) {
    throw new HttpException(422, { errors: ["Username can't be blank"] });
  }

  if(!email) {
    throw new HttpException(422, { errors: ["Email can't be blank"] });
  }

  if(!password) {
    throw new HttpException(422, { errors: ["Password can't be blank"] });
  }

  await checkUserUniqueness(user);

  const hashedPassword = await bcrypt.hash(password, 10);

  const userSchema = await new UserSchema({firstname, lastname, username, email, password: hashedPassword});
  
  await userSchema.save();

  return "User saved successfully";

}

export const LoginUser = async (user: LoginUserInterface) : Promise<any> => {  
  const username = user.username.trim();
  const password = user.password.trim();

  if(!username) {
    throw new HttpException(422, { errors: ["Username can't be blank"] });
  }

  if(!password) {
    throw new HttpException(422, { errors: ["Password can't be blank"] });
  }

  const savedUser = await UserSchema.findOne({username: user.username});

  if (savedUser) {
    const match = await bcrypt.compare(password, savedUser.password);
    if(match) return user;
  }

  throw new HttpException(403, {
    errors: ['Username or password are invalid']    
  });
  
}