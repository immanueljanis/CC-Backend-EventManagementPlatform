import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import { getWhoIsLoginViaJWT, jwtVerify } from "@/lib/JWT";
import { Prisma } from "@prisma/client";

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
        const payload: any = req.headers.authorization

        const data = await prisma.transaction.findMany({
            where: {
                user_id: payload.id
            },
            include: {
                event: true
            }
        })

        const image = await prisma.event_Image.findFirst({
            where: {
                event_id: data[0]?.event?.id
            },
            select: {
                filename: true
            }
        })

        res.status(200).send({
            error: false,
            message: "Get data success",
            data,
            image
        })
    } catch (error) {
        next(error)
    }
}

export const createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { event_id, ticket, totalPrice } = req.body
        let isCouponExpired = null
        const payload: any = req.headers.authorization


        // With Coupon
        if (req.body.coupon) {
            const { coupon } = req.body
            isCouponExpired = new Date() > new Date(coupon.exp_date)

            if (!isCouponExpired) {
                await prisma.$transaction(async (tx) => {
                    const transaction: any = await tx.transaction.create({
                        data: {
                            user_id: payload?.id,
                            price: totalPrice,
                            referral_used: coupon?.id,
                            event_id
                        }
                    })

                    await tx.referral_code.update({
                        where: {
                            id: coupon.id
                        },
                        data: {
                            used: 1
                        }
                    })

                    const oldTicket: any = await tx.event_Ticket.findMany({
                        where: {
                            id: {
                                contains: ticket.id
                            }
                        }
                    })

                    for (const tickets of ticket) {
                        const oldTicketIndex = oldTicket.findIndex((ot: any) => ot.id === tickets.id);

                        if (oldTicketIndex !== -1) {
                            const updatedQuota = Math.max(oldTicket[oldTicketIndex].quota - tickets.quota, 0); // Ensure quota doesn't go negative

                            await tx.event_Ticket.updateMany({
                                where: { id: tickets.id },
                                data: { quota: updatedQuota }
                            });
                        }
                    }

                    for (const eventTicket of ticket) {
                        await tx.user_Event_Ticket.create({
                            data: {
                                event_ticket_id: eventTicket.id,
                                user_id: payload.id,
                                qty: eventTicket.quota,
                                transaction_id: transaction.id
                            }
                        })
                    }
                })

                res.status(200).send({
                    error: false,
                    message: "Buy ticket success",
                    data: null
                })
            }
        } else {
            // Without Coupon
            await prisma.$transaction(async (tx) => {
                const transaction: any = await tx.transaction.create({
                    data: {
                        user_id: payload?.id,
                        price: totalPrice,
                        referral_used: "",
                        event_id
                    }
                })

                const oldTicket: any = await tx.event_Ticket.findMany({
                    where: {
                        id: {
                            contains: ticket.id
                        }
                    }
                })

                for (const tickets of ticket) {
                    const oldTicketIndex = oldTicket.findIndex((ot: any) => ot.id === tickets.id);

                    if (oldTicketIndex !== -1) {
                        const updatedQuota = Math.max(oldTicket[oldTicketIndex].quota - tickets.quota, 0); // Ensure quota doesn't go negative

                        await tx.event_Ticket.updateMany({
                            where: { id: tickets.id },
                            data: { quota: updatedQuota }
                        });
                    }
                }

                for (const eventTicket of ticket) {
                    await tx.user_Event_Ticket.create({
                        data: {
                            event_ticket_id: eventTicket.id,
                            user_id: payload.id,
                            qty: eventTicket.quota,
                            transaction_id: transaction.id
                        }
                    })
                }
            })
        }

        res.status(200).send({
            error: false,
            message: "Buy ticket success",
            data: null
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