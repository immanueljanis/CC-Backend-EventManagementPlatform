import { Request, Response } from "express";
import prisma from "@/prisma";

export const getAllEvent = async (req: Request, res: Response) => {
    try {
        const data = await prisma.event.findMany()

        if (data.length == 0) return res.status(404).send({
            error: false,
            message: "Data not found",
            data: data
        })

        return res.status(200).send({
            error: false,
            message: "Get event success",
            data
        })
    } catch (error) {
        return res.status(500).send({
            error: true,
            message: error,
            data: null
        })
    }
}

export const createEvent = async (req: Request, res: Response) => {
    try {
        const { organizer_id, title, location, description, date, category_id, event_image, event_ticket } = req.body

        await prisma.$transaction(async (tx) => {
            const dataEvent = await prisma.event.create({
                data: {
                    organizer_id,
                    title,
                    location,
                    description,
                    date: new Date(date),
                    status: "pending"
                }
            })

            await prisma.event_Category.createMany({
                data: [
                    { event_id: dataEvent.id, category_id: 2 }, { event_id: dataEvent.id, category_id: 3 }
                ]

            })

            await prisma.event_Image.createMany({
                data: [
                    { filename: "testing1.jpg", event_id: dataEvent.id },
                    { filename: "testing2.jpg", event_id: dataEvent.id }
                ]
            })

            await prisma.event_Ticket.createMany({
                data: [
                    { event_id: dataEvent.id, category: "Cat 1", quota: 100, code: "CAT1" },
                    { event_id: dataEvent.id, category: "Cat 2", quota: 50, code: "CAT2" },
                ]
            })

            res.status(200).send({
                error: false,
                message: "Create event success",
                data: null
            })
        })
    } catch (error) {
        res.status(500).send({
            error: true,
            message: error,
            data: null
        })
    }
}

export const getEventById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const data = await prisma.event.findUnique({
            where: {
                id: id
            },
            include: {
                Event_Category: true,
                Event_Image: true,
                Event_Ticket: true,
                Event_Rating: true
            }
        })

        if (!data) res.status(404).send({
            error: false,
            message: "Get Data null",
            data
        })

        res.status(200).send({
            error: false,
            message: "Get data success",
            data
        })
    } catch (error) {
        res.status(500).send({
            error: true,
            message: "Get data failed",
            data: null
        })
    }
}

export const deleteEventById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        await prisma.event.update({
            where: {
                id: id
            },
            data: {
                active: 0
            }
        })

        res.status(201).send({
            error: false,
            message: "Delete event success",
            data: null
        })
    } catch (error) {
        res.status(500).send({
            error: true,
            message: "Delete event failed"
        })
    }
}