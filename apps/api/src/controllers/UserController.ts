import { Request, Response } from "express"
import prisma from "@/prisma"
import { referralGenerator } from "@/lib/referralGenerator"
import { hashPassword } from "@/lib/hashPassword"

export const getAllUser = async (req: Request, res: Response) => {
    try {
        const data = await prisma.user.findMany({
            where: {
                role: "user"
            }
        })

        if (data.length == 0) throw ("Get user null")

        return res.status(200).send({
            error: false,
            message: "Get user success",
            data: data
        })
    } catch (error) {
        return res.status(500).send({
            error: false,
            message: error,
            data: null
        })
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, name, password } = req.body

        const data = await prisma.user.create({
            data: {
                email,
                name,
                password: await hashPassword(password),
                phone_number: "",
                address: "",
                referral_code: referralGenerator(),
                image: ""
            }
        })

        return res.status(200).send({
            error: false,
            message: "Create user success",
            data: {
                email: data.email,
                name: data.name,
                referral_code: data.referral_code
            }
        })
    } catch (error) {
        return res.status(500).send({
            error: false,
            message: error,
            data: null
        })
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const data = await prisma.user.findUnique({
            where: {
                id: id
            },
            select: {
                name: true,
                email: true,
                address: true,
                referral_code: true,
                phone_number: true
            }
        })

        if (!data) return res.status(404).send({
            error: false,
            message: "Data not found",
            data: null
        })

        return res.status(200).send({
            error: false,
            message: "Get user by id success",
            data
        })
    } catch (error) {
        return res.status(500).send({
            error: true,
            message: "Get user failed",
            data: null
        })
    }
}

export const updateUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { email, name, password, phone_number, address, image } = req.body

        const existingUser = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!existingUser) throw ("User id not found")

        const updatedUser = await prisma.user.update({
            where: {
                id: existingUser?.id
            },
            data: {
                email: email || existingUser?.email,
                name: name || existingUser?.name,
                password: await hashPassword(password) || existingUser?.password,
                phone_number: phone_number || existingUser?.phone_number,
                address: address || existingUser?.address,
                image: image || existingUser?.image,
            }
        })

        return res.status(200).send({
            error: false,
            message: "Edit user success",
            data: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone_number: updatedUser.phone_number,
                address: updatedUser.address,
                image: updatedUser.image
            }
        })
    } catch (error: any) {
        res.status(500).send({
            error: true,
            message: error,
            data: null
        })
    }
}

export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const data = await prisma.user.delete({
            where: {
                id: id
            }
        })

        res.status(200).send({
            error: false,
            message: "Data delete success",
            data: null
        })
    } catch (error: any) {
        res.status(500).send({
            error: true,
            message: error,
            data: null
        })
    }
}