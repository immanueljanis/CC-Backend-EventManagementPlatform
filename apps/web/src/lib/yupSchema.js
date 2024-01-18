import * as Yup from "yup"

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .min(10, "Email have minimum 10 characters")
        .required("Email is required"),

    password: Yup.string()
        .required("Password is required")
})