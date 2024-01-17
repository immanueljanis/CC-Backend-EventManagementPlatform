import jsonwebtoken from "jsonwebtoken"
import { Request } from "express"

interface IJWTCreate {
    id: string,
    role: string
}

export const jwtCreate = async ({ id, role }: IJWTCreate) => {
    return jsonwebtoken.sign({ id, role }, "kelompokasik", {
        expiresIn: "1h"
    })
}

export const jwtVerify = async (token: any) => {
    return jsonwebtoken.verify(token, "kelompokasik")
}

export const getWhoIsLoginViaJWT = async (req: Request) => {
    const accessLoginToken: any = req?.headers?.authorization
    const payload: any = await jwtVerify(accessLoginToken)

    return payload
}