'use client'

import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../../../lib/yupSchema"
import Input from "../../../components/Input"
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axiosInstance"
import { setCookies } from "../../../lib/cookies"

import { setUser } from "@/redux/slice/userSlice";
import { useDispatch } from "react-redux"

export default function Page() {
    const dispatch = useDispatch()

    const { mutate } = useMutation({
        mutationFn: async ({ email, password }) => {
            // console.log(email, password)
            const res = await axiosInstance.post("user/login", { email, password })
            return res
        },

        onSuccess: ({ data }) => {
            alert("Login Success")
            dispatch(setUser({
                email: data.data.email,
                name: data.data.name
            }))
            setCookies(data.data.token)
        },

        onError: (error) => {
            console.log(error)
        }
    })

    return (
        <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
            <div className="w-full p-6 bg-white border-t-4 border-blue-950 rounded-md shadow-md border-top lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-blue-950">Login Admin</h1>
                <Formik initialValues={{ email: "", password: "" }} validationSchema={loginSchema}
                    onSubmit={async (values) => {
                        const { email, password } = values

                        await mutate({ email, password })
                    }}>
                    {({ dirty, isValid }) => (
                        <Form>
                            <div>
                                <Field name="email" type="text">
                                    {({ field }) => (
                                        <Input field={field} label="Email" placeholder="Email Address" />
                                    )}
                                </Field>
                                <ErrorMessage name="email" />
                            </div>

                            <div>
                                <Field name="password" type="password">
                                    {({ field }) => (
                                        <Input field={field} label="Password" placeholder="Password" />
                                    )}
                                </Field>
                                <ErrorMessage name="password" />
                            </div>
                            <div className="pt-4">
                                <button disabled={!(dirty && isValid)} type="submit" className="btn btn-block bg-blue-950 text-white">Login</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}