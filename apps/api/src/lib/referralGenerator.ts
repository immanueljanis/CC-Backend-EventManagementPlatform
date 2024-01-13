export const referralGenerator = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

    let result: string = ""

    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return result
}