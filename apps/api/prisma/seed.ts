import { hashPassword } from "@/lib/hashPassword";
import { referralGenerator } from "@/lib/referralGenerator";
import prisma from "@/prisma";

const main = async () => {
    await prisma.$transaction(async (tx) => {
        const category = await tx.category.createMany({
            data: [
                { name: "Music" },
                { name: "Tribute" }
            ]
        })

        const user = await tx.user.createMany({
            data: [
                { email: "user@gmail.com", name: "user", password: await hashPassword("axel300815"), phone_number: "081932946686", address: "Cluster Green Studentia", role: "user", referral_code: await referralGenerator(), image: "testImage.jpg" },
                { email: "admin@gmail.com", name: "admin", password: await hashPassword("axel300815"), phone_number: "081932946686", address: "Cluster Green Studentia", role: "admin", referral_code: await referralGenerator(), image: "testImage.jpg" },
                { email: "organizer@gmail.com", name: "organizer", password: await hashPassword("axel300815"), phone_number: "081932946686", address: "Cluster Green Studentia", role: "organizer", referral_code: await referralGenerator(), image: "testImage.jpg" },
                { email: "super_admin@gmail.com", name: "super_admin", password: await hashPassword("axel300815"), phone_number: "081932946686", address: "Cluster Green Studentia", role: "super_admin", referral_code: await referralGenerator(), image: "testImage.jpg" },
            ]
        })

        const event = await tx.event.createMany({
            data: {
                organizer_id: "user[2].id",
                title: "Konser dewa 50 Tahun Berkarya",
                location: "Jakarta International Stadium",
                description: "Konser dewa 50 Tahun Berkarya di Jakarta International Stadium",
                date: new Date("2023-02-09"),
                status: "pending",
            }
        })


    })
}