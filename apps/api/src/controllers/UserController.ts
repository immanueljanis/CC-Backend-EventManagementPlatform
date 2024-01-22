import { NextFunction, Request, Response } from "express"
import prisma from "@/prisma"
import { referralGenerator } from "@/lib/referralGenerator"
import { comparePassword, hashPassword } from "@/lib/hashPassword"
import { jwtCreate, jwtVerify } from "@/lib/JWT"

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
        const { email, name, password, phone_number, address, image } = req.body

        const data = await prisma.user.create({
            data: {
                email,
                name,
                password: await hashPassword(password),
                phone_number,
                address,
                referral_code: referralGenerator(),
                image: "testing.jpg"
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
                phone_number: true,
                image: true,
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
        const { email, name, password, phone_number, address } = req.body

        let newPassword: string = ""

        const existingUser = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (!existingUser) throw ("User id not found")
        if (!password) {
            newPassword = existingUser.password
        } else {
            newPassword = await hashPassword(password)
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: existingUser?.id
            },
            data: {
                email: email || existingUser?.email,
                name: name || existingUser?.name,
                password: newPassword,
                phone_number: phone_number || existingUser?.phone_number,
                address: address || existingUser?.address
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
                address: updatedUser.address
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

export const userLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        const admin = await prisma.user.findFirst({
            where: {
                AND: [
                    { email: email },
                    { role: "user" }
                ]
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
                name: admin.name,
                token: userLoginToken
            }
        })
    } catch (error) {
        res.status(500).send({
            error: true,
            message: error,
            data: null
        })
    }
}

export const userKeepLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tokenDecoded: any = req.headers?.authorization
        const isLogin = await prisma.user.findUnique({
            where: {
                id: tokenDecoded?.id
            }
        })

        if (!isLogin) throw ("Something wrong, please login again")

        res.status(200).send({
            error: false,
            message: "Get user who is login success",
            data: isLogin
        })
    } catch (error) {
        next(error)
    }
}