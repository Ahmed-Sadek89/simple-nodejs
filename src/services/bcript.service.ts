import * as bcrypt from 'bcrypt';


export class BcryptService {
    async encryptPassword(password: string): Promise<string> {
        const salt = 10
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword
    }

    async comparingPassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword)
    }
}