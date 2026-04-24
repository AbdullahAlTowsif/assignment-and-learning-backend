import { Request, Response } from "express";
import { UserService } from "./user.service";
import httpStatus from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createUser(req);
    console.log(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User created successfully",
        data: result
    })
});


export const UserController = {
    createUser,
}