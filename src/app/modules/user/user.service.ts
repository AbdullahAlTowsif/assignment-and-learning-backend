import * as bcrypt from 'bcryptjs';
import { prisma } from "../../utils/prisma";
import { CreateUserInput } from './user.interface';
import { Role, User } from '../../../../prisma/generated/prisma/browser';
import { envVars } from '../../config/env';


const createUser = async (req: { body: CreateUserInput }): Promise<User> => {

    const isUserExists = await prisma.user.findFirst({
        where: {
            email: req.body.email
        }
    })

    if (isUserExists) {
        throw new Error("User Already Exists")
    }

    const hashedPassword: string = await bcrypt.hash(req.body.password, Number(envVars.BCRYPT_SALT_ROUND))

    const user = await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role || Role.STUDENT
        }
    });

    return user;
};



export const UserService = {
    createUser,
}