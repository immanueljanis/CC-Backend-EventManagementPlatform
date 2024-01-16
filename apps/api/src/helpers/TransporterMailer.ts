import nodemailer from "nodemailer"

export const transporterMailer = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "jjanistech@gmail.com",
        pass: "ymtvilrjztwmcfjb"
    },
    tls: {
        rejectUnauthorized: false
    }
})