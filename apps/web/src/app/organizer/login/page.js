'use client'
import { Formik, Form, Field, ErrorMessage } from "formik"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { setUser } from "@/redux/slice/userSlice"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"

import { loginSchema } from "../../../lib/yupSchema"
import Input from "../../../components/Input"
import { axiosInstance } from "../../../lib/axiosInstance"
import { setCookies } from "../../../lib/cookies"

export default function OrganizerLogin() {
    const dispatch = useDispatch()
    const router = useRouter()

    const { mutate } = useMutation({
        mutationFn: async ({ email, password }) => {
            const res = await axiosInstance.post("organizer/login", { email, password })
            return res
        },

        onSuccess: ({ data }) => {
            alert("Login success")
            dispatch(setUser({
                email: data.data.email,
                name: data.data.name
            }))

            setCookies(data.data.token)

            router.push("/organizer")
        },

        onError: (error) => {
            alert(error.response.data.message)
        }
    })

    return (
        <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
            <div className="w-full p-6 bg-white border-t-4 border-blue-950 rounded-md shadow-md border-top lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-blue-950">Login Organizer</h1>
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
                                <Field name="password">
                                    {({ field }) => (
                                        <Input field={field} type="password" label="Password" placeholder="Password" />
                                    )}
                                </Field>
                                <ErrorMessage name="password" />
                            </div>
                            <Link href={"/register"} className="text-xs text-gray-600 hover:underline hover:text-blue-600">Dont have an account?</Link>
                            <div>
                                <button disabled={!(dirty && isValid)} type="submit" className="btn btn-block bg-blue-950 text-white">Login</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}