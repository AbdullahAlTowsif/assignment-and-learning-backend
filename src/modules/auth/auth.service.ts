import * as bcrypt from 'bcryptjs';
import { Secret } from "jsonwebtoken";
import { prisma } from '../../utils/prisma';
import { jwtHelper } from '../../middleware/jwtHelper';
import { envVars } from '../../app/config/env';

const loginUser = async (payload: {
    email: string,
    password: string
}) => {
    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
        }
    });
    if(!userData.password) {
        throw new Error("Please Provide the Password")
    }

    const isCorrectPassword: boolean = await bcrypt.compare(payload.password, userData.password);

    if (!isCorrectPassword) {
        throw new Error("Password incorrect!")
    }
    const accessToken = jwtHelper.generateToken({
        // id: personData.id,
        email: userData.email,
        role: userData.role
    },
        envVars.JWT_ACCESS_SECRET as Secret,
        envVars.JWT_ACCESS_EXPIRES as string
    );

    const refreshToken = jwtHelper.generateToken({
        // id: personData.id,
        email: userData.email,
        role: userData.role
    },
        envVars.JWT_REFRESH_SECRET as Secret,
        envVars.JWT_REFRESH_EXPIRES as string,
    );

    return {
        accessToken,
        refreshToken
    };
};

// issue new access and refresh tokens when the current access token has expired
const refreshToken = async (token: string) => {
    let decodedData;
    try {
        decodedData = jwtHelper.verifyToken(token, envVars.JWT_REFRESH_SECRET as Secret);
    }
    catch (err) {
        throw new Error("You are not authorized!")
    }

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: decodedData.email
        }
    });

    const accessToken = jwtHelper.generateToken({
        email: userData.email,
        role: userData.role
    },
        envVars.JWT_ACCESS_SECRET as Secret,
        envVars.JWT_ACCESS_EXPIRES as string
    );

    const refreshToken = jwtHelper.generateToken({
        email: userData.email,
        role: userData.role
    },
        envVars.JWT_REFRESH_SECRET as Secret,
        envVars.JWT_REFRESH_EXPIRES as string,
    );

    return {
        accessToken,
        refreshToken
    };

};


const getMe = async (user: any) => {
    const accessToken = user.accessToken;
    const decodedData = jwtHelper.verifyToken(accessToken, envVars.JWT_ACCESS_SECRET as Secret);

    const userData = await prisma.user.findUniqueOrThrow({
        where: {
            email: decodedData.email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true
        }
    });

    return userData;
}


export const AuthServices = {
    loginUser,
    refreshToken,
    getMe
}