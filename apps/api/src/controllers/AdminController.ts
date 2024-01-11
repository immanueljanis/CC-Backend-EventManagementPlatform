import { Request, Response } from "express"
import prisma from "@/prisma"

export const getAllAdmin = async (req: Request, res: Response) => {
    const adminData = await prisma.user.findMany({
        where: {
            role: "admin"
        }
    })

    return res.status(200).send(adminData)
}

export const testApi = (req: Request, res: Response) => {
    res.send("test api")
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
    } catch (error) {
        console.log(error)
    }

}