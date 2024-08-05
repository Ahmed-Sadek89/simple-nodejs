import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


export class JWT {
    constructor() {
        dotenv.config()
    }
    generetaJWT(data: { id: number, email: string }) {
        const secretKey = process.env.JWT_SECRET_KEY || ''
        const token = jwt.sign(data, secretKey, { expiresIn: "1d" });
        return `Barear ${token}`
    }
}