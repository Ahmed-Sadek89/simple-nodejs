"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const checkAuth = (req, res, next) => {
    var _a, _b;
    const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
    const secretKey = process.env.JWT_SECRET_KEY || '';
    if (!token) {
        return res.status(401).json({
            status: 401,
            message: "no token provided"
        });
    }
    else {
        jsonwebtoken_1.default.verify(token, secretKey, (error) => {
            if (error) {
                res.status(404).json({
                    status: 404,
                    result: "you are unauthorized !",
                });
            }
            else {
                // console.log(decoded) // decrypted jwt
                next();
            }
        });
    }
};
exports.checkAuth = checkAuth;
