import { Request, Response } from "express"
import prisma from "@/prisma"

export const getAllAdmin = async (req: Request, res: Response) => {
    try {
        const adminData = await prisma.user.findMany({
            where: {
                role: "admin"
            }
        })

        res.status(200).send({
            error: false,
            message: "Get Data Success",
            data: adminData
        })
    } catch (error: any) {
        res.status(500).send({
            error: true,
            message: error.message,
            data: null
        })
    }
}

export const createAdmin = async (req: Request, res: Response) => {
    try {
        const { email, name, password, phone_number, address, referral_code } = req.body

        await prisma.user.create({
            data: {
                email,
                name,
                password,
                phone_number,
                address,
                role: "admin",
                referral_code,
                image: "testImage",
            }
        })

        res.status(200).send({
            error: false,
            message: `Create data admin ${name} success`,
            data: null
        })
    } catch (error: any) {
        res.status(500).send({
            error: true,
            message: error.message,
            data: null
        })
    }

}

export const getAdminById = async (req: Request, res: Response) => {
    try {
        const data = await prisma.user.findUnique({
            where: {
                id: String(req?.query?.id)
            }
        })

        if (!data) throw { message: "data not found" }

        res.status(200).send({
            error: false,
            message: "Data found",
            data: data
        })
    } catch (error: any) {
        res.status(500).send({
            error: true,
            message: error.message,
            data: null
        })
    }
}

export const updateAdminById = async (req: Request, res: Response) => {
    try {
        const { id } = req.query
        const { email, name, password, phone_number, address, image } = req.body

        const existingAdmin = await prisma.user.findUnique({
            where: {
                id: String(id)
            }
        })

        if (!existingAdmin) { res.status(404).send({ message: 'Admin not found' }) }

        const updatedAdmin = await prisma.user.update({
            where: {
                id: String(id)
            },
            data: {
                email: email || existingAdmin?.email,
                name: name || existingAdmin?.name,
                password: password || existingAdmin?.password,
                phone_number: phone_number || existingAdmin?.phone_number,
                address: address || existingAdmin?.address,
                image: image || existingAdmin?.image,
            }
        })

        return res.status(200).send({
            error: false,
            message: "Edit admin success",
            data: updatedAdmin
        })
    } catch (error: any) {
        res.status(500).send({
            error: true,
            message: error.message,
            data: null
        })
    }
}

export const deleteAdminById = async (req: Request, res: Response) => {
    try {
        await prisma.user.delete({
            where: {
                id: String(req?.query?.id)
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
            message: error.message,
            data: null
        })
    }
}