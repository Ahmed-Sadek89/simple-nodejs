import { Request, Response } from "express";
import { AwnerServices } from "../services/Awner.service";

const awnerServices = new AwnerServices()

export class AwnerController {

    async registerAwnerController(req: Request, res: Response) {
        try {
            await awnerServices.postAwnerService(req.body)
            res.status(200).json({
                status: 200,
                result: "new awner added successfully"
            })
        } catch (error: any) {
            console.log(error.message)
            res.status(500).json({
                status: 500,
                message: "something went wrong!"
            })
        }
    }

    async loginAwnerController(req: Request, res: Response) {
        try {
            const awner = await awnerServices.loginAwnerService(req.body);
            if (awner) {
                res.status(200).json({
                    status: 200,
                    awner
                })
            } else {
                res.status(404).json({
                    status: 404,
                    message: "invalid email or password"
                })
            }
        } catch (error: any) {

        }
    }

    async getAllAwners(_: Request, res: Response) {
        try {
            const awners = await awnerServices.findAllAwnersService();
            let result: { id: number, email: string }[] = [];
            awners.map((index) => {
                result.push({ id: index.id, email: index.email });
            })
            res.status(200).json({
                status: 200,
                awners: result
            })
        } catch (error: any) {
            res.status(500).json({
                status: 500,
                message: "something went wrong!"
            })
        }
    }

    async getAwnerById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const awner = await awnerServices.findAwnerById(Number(id))
            if (awner) {
                res.status(200).json({
                    status: 200,
                    awner: {
                        id: awner.id,
                        email: awner.email
                    }
                })
            } else {
                res.status(404).json({
                    status: 404,
                    awner: null
                })
            }
        } catch (error: any) {
            res.status(500).json({
                status: 500,
                message: "something went wrong!"
            })
        }
    }

    async deleteAllAwnersController(req: Request, res: Response) {
        try {
            await awnerServices.deleteAllAwnersService();
            res.status(200).json({
                status: 200,
                awner: "All awners deleted successfully"
            })
        } catch (error: any) {
            res.status(500).json({
                status: 500,
                message: "something went wrong!"
            })
        }
    }

    async deleteAwnerByIdController(req: Request, res: Response) {
        try {
            const { id } = req.params
            await awnerServices.deleteAwnerByIdService(Number(id));
            res.status(200).json({
                status: 200,
                awner: `Awner number ${id} id deleted successfully`
            })
        } catch (error: any) {
            res.status(500).json({
                status: 500,
                message: "something went wrong!"
            })
        }
    }

    async updateAwnerById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await awnerServices.updateAwnerByIdService(Number(id), req.body);
            res.status(200).json({
                status: 200,
                awner: `Awner number ${id} id updated successfully`
            })
        } catch (error: any) {
            res.status(500).json({
                status: 500,
                message: "something went wrong!"
            })
        }
    }
}