import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config()
export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization?.split(' ')[1];
    const secretKey = process.env.JWT_SECRET_KEY || '';
    if (!token) {
        return res.status(401).json({
            status: 401,
            message: "no token provided"
        });
    } else{
        jwt.verify(token, secretKey, (error) => {
            if (error) {
                res.status(404).json({
                    status: 404,
                    result: "you are unauthorized !",
                })
            } else {
                // console.log(decoded) // decrypted jwt
                next()
            }
        })
    }

}