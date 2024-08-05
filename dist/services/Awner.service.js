"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwnerServices = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
const bcript_service_1 = require("./bcript.service");
const JWT_service_1 = require("./JWT.service");
class AwnerServices {
    constructor() {
        this.bcrypt = new bcript_service_1.BcryptService();
        this.jwt = new JWT_service_1.JWT();
    }
    postAwnerService(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            const hashedPassword = yield this.bcrypt.encryptPassword(password);
            const awner = yield prisma_1.default.awner.create({
                data: {
                    email,
                    password: hashedPassword
                }
            });
            return awner;
        });
    }
    findAllAwnersService() {
        return __awaiter(this, void 0, void 0, function* () {
            const awners = yield prisma_1.default.awner.findMany();
            return awners;
        });
    }
    findAwnerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const awner = yield prisma_1.default.awner.findUnique({
                where: {
                    id
                }
            });
            return awner;
        });
    }
    findAwnerByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const awner = yield prisma_1.default.awner.findUnique({
                where: {
                    email
                }
            });
            return awner;
        });
    }
    loginAwnerService(awnerInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const isAwner = yield this.checkIsAwner(awnerInput);
            if (isAwner) {
                const payload = {
                    id: isAwner.id,
                    email: isAwner.email,
                };
                const Authorization = this.jwt.generetaJWT(payload);
                return Object.assign(Object.assign({}, payload), { Authorization });
            }
            return null;
        });
    }
    checkIsAwner(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            const awner = yield this.findAwnerByEmail(email);
            if (awner) {
                const checkPassword = yield this.bcrypt.comparingPassword(password, awner.password);
                if (checkPassword) {
                    return awner;
                }
            }
            return null;
        });
    }
    deleteAllAwnersService() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.awner.deleteMany();
        });
    }
    deleteAwnerByIdService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.awner.delete({
                where: {
                    id
                }
            });
        });
    }
    updateAwnerByIdService(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield this.bcrypt.encryptPassword(data.password);
            return yield prisma_1.default.awner.update({
                where: { id },
                data: {
                    email: data.email,
                    password: hashedPassword
                }
            });
        });
    }
}
exports.AwnerServices = AwnerServices;
