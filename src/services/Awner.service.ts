import { Prisma, PrismaClient } from "@prisma/client"
import { BcryptService } from "./bcript.service";
import { JWT } from "./JWT.service";

export class AwnerServices {
    private readonly prisma: PrismaClient;
    private readonly bcrypt: BcryptService;
    private readonly jwt: JWT;
    constructor() {
        this.prisma = new PrismaClient();
        this.bcrypt = new BcryptService();
        this.jwt = new JWT()
    }
    async postAwnerService({ email, password }: Prisma.AwnerCreateInput) {
        const hashedPassword = await this.bcrypt.encryptPassword(password)
        const awner = await this.prisma.awner.create({
            data: {
                email,
                password: hashedPassword
            }
        })
        return awner
    }

    async findAllAwnersService() {
        const awners = await this.prisma.awner.findMany();
        return awners
    }

    async findAwnerById(id: number) {
        const awner = await this.prisma.awner.findUnique({
            where: {
                id
            }
        });
        return awner
    }

    private async findAwnerByEmail(email: string) {
        const awner = await this.prisma.awner.findUnique({
            where: {
                email
            }
        });
        return awner
    }

    async loginAwnerService(awnerInput: Prisma.AwnerCreateInput) {
        const isAwner = await this.checkIsAwner(awnerInput);
        if (isAwner) {
            const payload = {
                id: isAwner.id,
                email: isAwner.email,
            }
            const Authorization = await this.jwt.generetaJWT(payload);
            return {
                ...payload,
                Authorization
            }
        }
        return null
    }

    private async checkIsAwner({ email, password }: Prisma.AwnerCreateInput) {
        const awner = await this.findAwnerByEmail(email);
        if (awner) {
            const checkPassword = await this.bcrypt.comparingPassword(password, awner.password);
            if (checkPassword) {
                return awner
            }
        }
        return null
    }

    async deleteAllAwnersService() {
        return await this.prisma.awner.deleteMany()
    }

    async deleteAwnerByIdService(id: number) {
        return await this.prisma.awner.delete({
            where: {
                id
            }
        })
    }

    async updateAwnerByIdService(id: number, data: { email: string, password: string }) {
        const hashedPassword = await this.bcrypt.encryptPassword(data.password)
        return await this.prisma.awner.update({
            where: { id },
            data: {
                email: data.email,
                password: hashedPassword
            }
        })
    }

}