import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "@/lib/JWT";

export const tokenVerifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userLoginToken: any = req.headers.authorization
        const payload: any = await jwtVerify(userLoginToken)

        if (payload.role != "user") throw ("unauthorized access")

        next()
    } catch (error) {
        next(error)
    }
}