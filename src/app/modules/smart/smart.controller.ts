import { Request, Response } from "express";
import { SmartService } from "./smart.service";

const generateFeedback = async (req: Request, res: Response) => {
    const { studentNote } = req.body;

    const result = await SmartService.generateFeedback(studentNote);

    res.status(200).json({
        success: true,
        message: "AI feedback generated",
        data: result,
    });
};

const improveDescription = async (req: Request, res: Response) => {
    const { description } = req.body;

    const result = await SmartService.improveDescription(description);

    res.status(200).json({
        success: true,
        message: "Description improved",
        data: result,
    });
};

export const SmartController = {
    generateFeedback,
    improveDescription,
};
