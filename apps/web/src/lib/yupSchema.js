import * as Yup from "yup"

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .min(10, "Email have minimum 10 characters")
        .required("Email is required"),

    password: Yup.string()
        .required("Password is required")
})

export const userSchema = Yup.object().shape({
    email: Yup.string()
        .min(10, "Email have minimum 10 characters")
        .required("Email is required"),

    name: Yup.string()
        .min(3, "Name have minimum 3 characters")
        .required("Name is required"),

    password: Yup.string()
        .min(6, "Password have minimum 6 characters")
        .max(15, "Password have maximum 15 characters"),

    address: Yup.string()
        .min(10, "Address have minimum 10 characters")
        .max(40, "Address have maximum 40 characters")
        .required("Address is required"),

    phone_number: Yup.number()
        .min(10, "Number have minimum 10 characters")
        .required("Phone number is required")
})

export const userRegisterSchema = Yup.object().shape({
    email: Yup.string()
        .min(10, "Email have minimum 10 characters")
        .required("Email is required"),

    name: Yup.string()
        .min(3, "Name have minimum 3 characters")
        .required("Name is required"),

    password: Yup.string()
        .min(6, "Password have minimum 6 characters")
        .max(15, "Password have maximum 15 characters")
        .required("Password is required"),

    address: Yup.string()
        .min(10, "Address have minimum 10 characters")
        .max(40, "Address have maximum 40 characters")
        .required("Address is required"),

    phone_number: Yup.number()
        .min(10, "Number have minimum 10 characters")
        .required("Phone number is required")

})