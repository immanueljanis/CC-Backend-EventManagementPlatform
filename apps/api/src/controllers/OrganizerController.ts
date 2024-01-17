import { NextFunction, Request, Response } from "express";
import prisma from "@/prisma";
import { comparePassword, hashPassword } from "@/lib/hashPassword";
import { referralGenerator } from "@/lib/referralGenerator";
import { jwtCreate } from "@/lib/JWT";

export const getAllOrganizer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizer = await prisma.user.findMany({
            where: {
                role: "organizer"
            }
        })

        if (organizer.length == 0) return res.status(404).send({
            error: false,
            message: "Data not found",
            data: null
        })

        res.status(200).send({
            error: false,
            message: "Get organizer success",
            data: organizer
        })
    } catch (error) {
        next(error)
    }
}

export const createOrganizer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, name, password, phone_number, address, image } = req.body

        const organizer = await prisma.user.create({
            data: {
                email,
                name,
                password: await hashPassword(password),
                phone_number,
                address,
                referral_code: referralGenerator(),
                image,
                role: "organizer"
            }
        })

        return res.status(202).send({
            error: false,
            message: "Create organizer success",
            data: {
                email: organizer.email,
                name: organizer.name,
                referral_code: organizer.referral_code
            }
        })
    } catch (error) {
        next(error)
    }
}

export const getOrganizerById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const organizer = await prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                name: true,
                email: true,
                address: true,
                referral_code: true,
                phone_number: true,
                image: true
            }
        })

        if (!organizer) res.status(404).send({
            error: false,
            message: "Data not found",
            data: null
        })

        res.status(200).send({
            error: false,
            message: "Get organizer success",
            data: organizer
        })
    } catch (error) {
        next(error)
    }
}

export const updateOrganizerById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const { email, name, password, phone_number, address, image } = req.body

        const existingOrganizer = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!existingOrganizer) throw ("Organizer not found")

        const updatedOrganizer = await prisma.user.update({
            where: {
                id: existingOrganizer.id
            },
            data: {
                email: email || existingOrganizer?.email,
                name: name || existingOrganizer?.name,
                password: await hashPassword(password) || existingOrganizer?.password,
                phone_number: phone_number || existingOrganizer?.phone_number,
                address: address || existingOrganizer?.address,
                image: image || existingOrganizer?.image,
            }
        })

        res.status(200).send({
            error: false,
            message: "Edit organizer success",
            data: {
                id: existingOrganizer.id,
                name: existingOrganizer.name,
                email: existingOrganizer.email,
                phone_number: existingOrganizer.phone_number,
                address: existingOrganizer.address,
                image: existingOrganizer.image
            }
        })
    } catch (error) {
        next(error)
    }
}

export const deleteOrganizerById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const data = await prisma.user.delete({
            where: {
                id
            }
        })

        res.status(200).send({
            error: false,
            message: "Data delete success",
            data: null
        })
    } catch (error) {
        next(error)
    }
}

export const organizerLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        const organizer = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (!organizer) throw ("Email not found")

        const validatePassword = await comparePassword(password, organizer?.password)
        if (!validatePassword) throw ("Password doesnt match")

        const organizerLoginToken = await jwtCreate({ id: organizer.id, role: organizer.role })

        res.status(200).send({
            error: false,
            message: "Login success",
            data: {
                email: organizer.email,
                token: organizerLoginToken
            }
        })
    } catch (error) {
        next(error)
    }
}