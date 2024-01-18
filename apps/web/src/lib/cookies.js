'use server'

import { cookies } from "next/headers"

export async function setCookies(data) {
    cookies().set("userData", data)
}

export async function getCookies() {
    return cookies().get("userData")
}

export async function removeCookies() {
    cookies().delete('userData')
}