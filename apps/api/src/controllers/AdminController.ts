import { Request, Response } from "express"
import prisma from "@/prisma"
import { referralGenerator } from "@/lib/referralGenerator"
import { comparePassword, hashPassword } from "@/lib/hashPassword"
import { jwtCreate } from "@/lib/JWT"

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
        const { email, name, password, phone_number, address, image } = req.body

        await prisma.user.create({
            data: {
                email,
                name,
                password: await hashPassword(password),
                phone_number,
                address,
                role: "admin",
                referral_code: await referralGenerator(),
                image,
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

export const adminLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const admin = await prisma.user.findFirst({
            where: {
                email: email,
                role: "admin"
            }
        })

        if (!admin) throw ("Email not found")

        const validatePassword = await comparePassword(password, admin?.password)
        if (!validatePassword) throw ("Password doesnt match")

        const userLoginToken = await jwtCreate({ id: admin.id, role: admin.role })

        res.status(200).send({
            error: false,
            message: "Login success",
            data: {
                email: admin.email,
                token: userLoginToken
            }
        })
    } catch (error) {
        res.status(500).send({
            error: true,
            message: "Login failed",
            data: null
        })
    }
}