import { Request, Response } from "express"
import prisma from "@/prisma"

export const getAllCategory = async (req: Request, res: Response) => {
    try {
        const data = await prisma.category.findMany()

        if (data.length == 0) return res.status(404).send({
            error: false,
            message: "Get data null",
            data: null
        })

        return res.status(200).send({
            error: false,
            message: "Get data success",
            data: data
        })
    } catch (error) {
        return res.status(500).send({
            error: true,
            message: error,
            data: null
        })
    }
}

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body

        await prisma.category.create({
            data: {
                name
            }
        })

        return res.status(200).send({
            error: false,
            message: "create category success",
            data: null
        })
    } catch (error) {
        return res.status(500).send({
            error: true,
            message: error,
            data: null
        })
    }
}

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const data = await prisma.category.findUnique({
            where: {
                id: Number(id)
            },
            select: {
                name: true
            }
        })

        if (!data) return res.status(404).send({
            error: false,
            message: "get category null",
            data: null
        })

        return res.status(200).send({
            error: false,
            message: "get category success",
            data
        })
    } catch (error) {
        return res.status(500).send({
            error: true,
            message: "get category failed",
            data: null
        })
    }
}

export const updateCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { name } = req.body

        const existingCategory = await prisma.category.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!existingCategory) throw ("Category not found")

        const data = await prisma.category.update({
            where: {
                id: Number(id)
            },
            data: {
                name
            }
        })

        return res.status(200).send({
            error: false,
            message: "Edit Category Success",
            data: null
        })
    } catch (error) {
        return res.status(500).send({
            error: true,
            message: error,
            data: null
        })
    }
}

export const deleteCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        await prisma.category.delete({
            where: {
                id: Number(id)
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