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
exports.AwnerController = void 0;
const Awner_service_1 = require("../services/Awner.service");
const awnerServices = new Awner_service_1.AwnerServices();
class AwnerController {
    registerAwnerController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield awnerServices.postAwnerService(req.body);
                res.status(200).json({
                    status: 200,
                    result: "new awner added successfully"
                });
            }
            catch (error) {
                console.log(error.message);
                res.status(500).json({
                    status: 500,
                    message: "something went wrong!"
                });
            }
        });
    }
    loginAwnerController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const awner = yield awnerServices.loginAwnerService(req.body);
                if (awner) {
                    res.status(200).json({
                        status: 200,
                        awner
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        message: "invalid email or password"
                    });
                }
            }
            catch (error) {
            }
        });
    }
    getAllAwners(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const awners = yield awnerServices.findAllAwnersService();
                let result = [];
                awners.map((index) => {
                    result.push({ id: index.id, email: index.email });
                });
                res.status(200).json({
                    status: 200,
                    awners: result
                });
            }
            catch (error) {
                res.status(500).json({
                    status: 500,
                    message: "something went wrong!"
                });
            }
        });
    }
    getAwnerById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const awner = yield awnerServices.findAwnerById(Number(id));
                if (awner) {
                    res.status(200).json({
                        status: 200,
                        awner: {
                            id: awner.id,
                            email: awner.email
                        }
                    });
                }
                else {
                    res.status(404).json({
                        status: 404,
                        awner: null
                    });
                }
            }
            catch (error) {
                res.status(500).json({
                    status: 500,
                    message: "something went wrong!"
                });
            }
        });
    }
    deleteAllAwnersController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield awnerServices.deleteAllAwnersService();
                res.status(200).json({
                    status: 200,
                    awner: "All awners deleted successfully"
                });
            }
            catch (error) {
                res.status(500).json({
                    status: 500,
                    message: "something went wrong!"
                });
            }
        });
    }
    deleteAwnerByIdController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield awnerServices.deleteAwnerByIdService(Number(id));
                res.status(200).json({
                    status: 200,
                    awner: `Awner number ${id} id deleted successfully`
                });
            }
            catch (error) {
                res.status(500).json({
                    status: 500,
                    message: "something went wrong!"
                });
            }
        });
    }
    updateAwnerById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield awnerServices.updateAwnerByIdService(Number(id), req.body);
                res.status(200).json({
                    status: 200,
                    awner: `Awner number ${id} id updated successfully`
                });
            }
            catch (error) {
                res.status(500).json({
                    status: 500,
                    message: "something went wrong!"
                });
            }
        });
    }
}
exports.AwnerController = AwnerController;
