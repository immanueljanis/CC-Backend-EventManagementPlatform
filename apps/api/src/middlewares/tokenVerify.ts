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

export const tokenVerifyEvent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizerLoginToken: any = req.headers.authorization
        const payload: any = await jwtVerify(organizerLoginToken)
        const access = ["organizer", "admin", "super_admin"]

        if (!access.includes(payload.role)) throw ("unauthorized access")
        next()
    } catch (error) {
        next(error)
    }
}

export const tokenVerifyTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessLoginToken: any = req?.headers?.authorization
        const payload: any = await jwtVerify(accessLoginToken)
        const access = ["super_admin", "user"]

        if (!access.includes(payload.role)) throw ("Unauthorized access")
        next()
    } catch (error) {
        next(error)
    }
}