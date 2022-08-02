import bcrypt from 'bcryptjs';
import HttpException from '../models/http-exception.model';
// import User from '../models/user.model';


export const createUser = async (user: any) : Promise<any> => {
  const firstName = user.firstName;
  const lastName = user.lastName;
  const userName = user.userName;
  const email = user.email;
  const password = user.password;

  if(!firstName) {
    throw new HttpException(422, { errors: { firstName: "Firstname can't be blank" } });
  }

  if(!userName) {
    throw new HttpException(422, { errors: { userName: "Username can't be blank" } });
  }

  await user.save();
  return "User saved successfully";

}