'use client'
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import Input from "../../components/Input"
import { userSchema } from "../../lib/yupSchema"
import { useMutation } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axiosInstance"

export default function profileUser() {
    const { user } = useSelector((state) => state.user)
    const router = useRouter()

    const { mutate } = useMutation({
        mutationFn: async (values) => {
            console.log(values)
            const res = await axiosInstance.put(`user/${user?.data?.data.id}`, values)
            return res
        },

        onSuccess: () => {
            alert("Edit Success")
            router.push("/profile")
        },

        onError: (error) => {
            console.log(error)
        }
    })

    if (!user?.data?.data) return (<><h1>You need to login first</h1></>)
    return (
        <div className="flex w-full justify-center p-8 gap-8 h-96">
            <div className="w-96">
                <div className="avatar flex">
                    <div className="w-full mx-16 my-6 items-center justify-center rounded-full">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>

                <div className="flex flex-col mx-4 gap-2 text-white">
                    <button className="btn bg-blue-950">Change Image</button>
                    <button className="btn bg-gray-900">Delete Image</button>
                </div>
            </div>

            <div className="w-full h-full">
                <Formik initialValues={{ name: user?.data?.data.name, email: user?.data?.data.email, phone_number: user?.data?.data.phone_number, password: "", address: user?.data?.data.address, referral_code: user?.data?.data?.referral_code }} validationSchema={userSchema}
                    onSubmit={async (values) => {
                        await mutate(values)
                    }}>
                    <Form>
                        <div className="flex justify-center gap-24">
                            <div>
                                <Field name="name" type="text">
                                    {({ field }) => (
                                        <Input field={field} label="Name" placeholder="Enter Your Username" />
                                    )}
                                </Field>
                                <ErrorMessage name="name" />

                                <Field name="email" type="text">
                                    {({ field }) => (
                                        <Input field={field} label="Email" placeholder="Enter Your Email" />
                                    )}
                                </Field>
                                <ErrorMessage name="email" />

                                <Field name="phone_number" type="text">
                                    {({ field }) => (
                                        <Input field={field} label="Phone Number" placeholder="Enter Your Phone Number" />
                                    )}
                                </Field>
                                <ErrorMessage name="phone_number" />
                            </div>

                            <div>
                                <Field name="address" type="text">
                                    {({ field }) => (
                                        <Input field={field} label="Address" placeholder="Enter Your Address" />
                                    )}
                                </Field>
                                <ErrorMessage name="address" />

                                <Field name="password">
                                    {({ field }) => (
                                        <Input field={field} type="password" label="Password" placeholder="Enter Your New Password" />
                                    )}
                                </Field>
                                <ErrorMessage name="password" />

                                <label className="label">
                                    <span className="text-base label-text">Referral Code</span>
                                </label>
                                <input type="text" disabled placeholder="Referral Code" className="w-full input input-bordered" value={user?.data?.data?.referral_code} />

                            </div>
                        </div>
                        <button type="submit" className="btn bg-blue-950 w-full mt-4 text-white">Edit</button>
                    </Form>
                </Formik>
            </div>
        </div >
    )
}