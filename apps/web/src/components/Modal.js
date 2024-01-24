import { formatRupiah } from "@/lib/formatRupiah"
import { axiosInstance } from "@/lib/axiosInstance"
import { useMutation } from "@tanstack/react-query";
import { getCookies } from "@/lib/cookies";
import { useState } from "react"
import { useParams, useRouter } from "next/navigation";


export default function Modal(props) {
    let totalPrice = 0
    const params = useParams()
    const [coupon, setCoupon] = useState()
    const [useCoupon, setUseCoupon] = useState()
    const router = useRouter()
    const { mutate } = useMutation({
        mutationFn: async () => {
            const { value } = await getCookies()
            if (value) {
                const res = await axiosInstance.post(`user/getAllCoupon`, null, {
                    headers: {
                        "authorization": value
                    }
                })
                setCoupon(res.data.data)
            }
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const checkout = useMutation({
        mutationFn: async () => {
            const { value } = await getCookies()

            if (value) {
                const res = await axiosInstance.post("transaction", {
                    event_id: params.id,
                    coupon: useCoupon,
                    ticket: props.item,
                    totalPrice
                }, {
                    headers: {
                        "authorization": value
                    }
                })

                return res
            }
            alert("You need to login to checkout transaction")
        },
        onSuccess: () => {
            alert("Checkout success")
            router.push('/profile')
        },
        onError: (error) => {
            console.log(error)
        }
    })

    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            < button className="btn btn-primary w-full" onClick={() => document.getElementById('modalCheckout').showModal()}> Buy Now</button >
            <dialog id="modalCheckout" className="modal">
                <div className="modal-box bg-white text-black w-full">
                    <h3 className="font-bold text-lg">Checkout - {props.name}</h3>

                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="w-2">No</th>
                                    <th>Category</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props?.item?.map((item, index) => {
                                    totalPrice += (item.price * item.quota)
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{item.category}</td>
                                            <td>{item.quota} Pc</td>
                                            <td>{formatRupiah(item.price)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                        {!useCoupon ?
                            <p className="justify-end mt-4 w-full">Total Price = {formatRupiah(totalPrice)}</p>
                            :
                            useCoupon.price > 10 ?
                                <p className="justify-end mt-4 w-full">Total Price - {`Discount ${formatRupiah(useCoupon.price)}`} = {formatRupiah(totalPrice - useCoupon.price)}</p>
                                :
                                <p className="justify-end mt-4 w-full">Total Price - {`Discount ${useCoupon.price}%`} = {formatRupiah(totalPrice - (totalPrice / useCoupon.price))}</p>
                        }

                        {useCoupon ?
                            <div>
                                <button className="badge badge-success gap-2 bg-green-800 text-white" onClick={() => setUseCoupon()}>
                                    {useCoupon.price > 10
                                        ?
                                        `Diskon ${formatRupiah(useCoupon.price)}`
                                        :
                                        `Diskon ${useCoupon.price}%`
                                    }
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                            </div>
                            :
                            <div className="dropdown dropdown-right">
                                <div tabIndex={0} role="button" onClick={() => mutate()} className="btn m-1 mt-4">Use my Coupon</div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    {coupon?.map((item, index) => {
                                        return (
                                            item.price > 10
                                                ?
                                                <li className="bg-blue-950 text-white border rounded-lg px-2 h-max"><button onClick={() => setUseCoupon(item)}>Use {formatRupiah(item.price)} Discount Voucher</button></li>
                                                :
                                                <li className="bg-blue-950 text-white border rounded-lg px-2 h-min"><button onClick={() => setUseCoupon(item)}>Use {item.price}% Discount</button></li>
                                        )
                                    })}
                                </ul>
                            </div>
                        }

                    </div>

                    <div className="modal-action">
                        <form method="dialog" className="flex gap-4">
                            <p className="btn bg-blue-950 text-white" onClick={() => checkout.mutate()}>Checkout</p>
                            <button className="btn">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}