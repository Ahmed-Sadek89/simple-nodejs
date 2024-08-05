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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwnerServices = void 0;
const client_1 = require("@prisma/client");
const bcript_service_1 = require("./bcript.service");
const JWT_service_1 = require("./JWT.service");
class AwnerServices {
    constructor() {
        this.prisma = new client_1.PrismaClient();
        this.bcrypt = new bcript_service_1.BcryptService();
        this.jwt = new JWT_service_1.JWT();
    }
    postAwnerService({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield this.bcrypt.encryptPassword(password);
            const awner = yield this.prisma.awner.create({
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
            const awners = yield this.prisma.awner.findMany();
            return awners;
        });
    }
    findAwnerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const awner = yield this.prisma.awner.findUnique({
                where: {
                    id
                }
            });
            return awner;
        });
    }
    findAwnerByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const awner = yield this.prisma.awner.findUnique({
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
                const Authorization = yield this.jwt.generetaJWT(payload);
                return Object.assign(Object.assign({}, payload), { Authorization });
            }
            return null;
        });
    }
    checkIsAwner({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
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
            return yield this.prisma.awner.deleteMany();
        });
    }
    deleteAwnerByIdService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.prisma.awner.delete({
                where: {
                    id
                }
            });
        });
    }
    updateAwnerByIdService(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield this.bcrypt.encryptPassword(data.password);
            return yield this.prisma.awner.update({
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
