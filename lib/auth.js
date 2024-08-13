import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();


export const signToken = ({ email, username, _id }) => {

    const secret = process.env.AUTH_SECRET;
    const mongodburi = process.env.MONGODB_URI;
    console.log('auth secret', secret)
    console.log('mongodburi', mongodburi)
    const payload = { email, username, _id };
    return jwt.sign({ data: payload }, secret);
};
