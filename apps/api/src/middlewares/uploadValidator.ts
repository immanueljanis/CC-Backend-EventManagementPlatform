import { Request, Response, NextFunction } from "express";
import { upload } from "@/lib/Multer";
import fs from "fs"

export const uploadValidator = (req: Request, res: Response, next: NextFunction) => {
    const uploadResult = upload.fields([{ name: "kelompokasik", maxCount: 3 }])
    uploadResult(req, res, (err) => {
        try {
            if (err) throw err

            let isError = ""

            if (req.files) {
                const filesArray = Array.isArray(req.files) ? req.files : req.files.kelompokasik

                if (Array.isArray(filesArray)) {
                    filesArray.forEach((item: Express.Multer.File) => {
                        if (item.size > 3000000) {
                            isError += `${item.originalname} size is too large. Maximum size is 3 MB`
                        }
                    })
                }
                if (isError) throw { message: isError, images: filesArray }
                next()
            }

            throw ("Something error")
        } catch (error: any) {
            if (error.images) {
                error.images.forEach((item: any) => {
                    fs.rmSync(item.path)
                });
            }

            next(error.message)
        }
    })
}