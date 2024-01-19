'use client'

import { Formik, Form, Field, ErrorMessage } from "formik"
import { userRegisterSchema } from "../../lib/yupSchema"
import Link from "next/link"
import Input from "../../components/Input"
import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "@/lib/axiosInstance"

export default function Page() {

    const { mutate } = useMutation({
        mutationFn: async ({ email, name, password, phone_number, address }) => {
            const res = await axiosInstance.post("user", { email, name, password, phone_number, address })
            return res
        },

        onSuccess: (data) => {
            alert("Register Success")
            console.log(data.data)
        }
    })

    return (
        <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
            <div className="w-full p-6 bg-white border-t-4 rounded-md shadow-md border-top lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-blue-950">Register User  </h1>
                <Formik initialValues={{ email: "", name: "", password: "", phone_number: "", address: "" }} validationSchema={userRegisterSchema}
                    onSubmit={async (values) => {
                        const { email, name, password, phone_number, address } = values
                        await mutate({ email, name, password, phone_number, address })
                    }}>
                    {({ dirty, isValid }) => (
                        <Form>
                            <div>
                                <Field name="name" type="text">
                                    {({ field }) => (
                                        <Input field={field} label="Name" placeholder="Enter Your Name" />
                                    )}
                                </Field>
                                <ErrorMessage name="name" />
                            </div>

                            <div>
                                <Field name="email" type="text">
                                    {({ field }) => (
                                        <Input field={field} label="Email" placeholder="Enter Your Email" />
                                    )}
                                </Field>
                                <ErrorMessage name="email" />
                            </div>

                            <div>
                                <Field name="password">
                                    {({ field }) => (
                                        <Input field={field} type="password" label="Password" placeholder="Enter Your Password" />
                                    )}
                                </Field>
                                <ErrorMessage name="password" />
                            </div>

                            <div>
                                <Field name="address" type="text">
                                    {({ field }) => (
                                        <Input field={field} label="Address" placeholder="Enter Your Address" />
                                    )}
                                </Field>
                                <ErrorMessage name="address" />
                            </div>

                            <div>
                                <Field name="phone_number" type="text">
                                    {({ field }) => (
                                        <Input field={field} label="Phone Number" placeholder="Ex: 0819...." />
                                    )}
                                </Field>
                                <ErrorMessage name="phone_number" />
                            </div>
                            <Link href={"/login"} className="text-xs text-gray-600 hover:underline hover:text-blue-600">Already have an account?</Link>
                            <div>
                                <button disabled={!(dirty && isValid)} type="submit" className="btn btn-block bg-blue-950 text-white">Register</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}