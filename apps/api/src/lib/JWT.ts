import jsonwebtoken from "jsonwebtoken"

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