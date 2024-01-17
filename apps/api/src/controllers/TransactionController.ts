import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import { getWhoIsLoginViaJWT } from "@/lib/JWT";

export const getAlltransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const transaction = await prisma.transaction.findMany()

        if (transaction.length == 0) res.status(404).send({
            error: false,
            message: "Data null",
            data: null
        })

        res.status(200).send({
            error: false,
            message: "Get transaction success",
            data: transaction
        })
    } catch (error) {
        next(error)
    }
}

export const getTransactionByIsLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isLogin = await getWhoIsLoginViaJWT(req)

        const data = await prisma.transaction.findMany({
            where: {
                user_id: isLogin.id
            }
        })

        res.status(200).send({
            error: false,
            message: "Get data success",
            data
        })
    } catch (error) {
        next(error)
    }
}

export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { event_id } = req.params
        const { price, referral_used } = req.body

        const payload = await getWhoIsLoginViaJWT(req)

        await prisma.transaction.create({
            data: {
                user_id: payload.id,
                price,
                referral_used,
                event_id
            }
        })
    } catch (error) {
        next(error)
    }
}

export const getTransactionById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const transaction = await prisma.transaction.findUnique({
            where: {
                id
            }
        })

        if (!transaction) res.status(404).send({
            error: false,
            message: "Data not found",
            data: null
        })

        const userLogin = await getWhoIsLoginViaJWT(req)
        if (userLogin.id != transaction?.user_id) throw ("Unauthorized Access")

        res.status(200).send({
            error: false,
            message: "Get transaction success",
            data: transaction
        })
    } catch (error) {
        next(error)
    }
}