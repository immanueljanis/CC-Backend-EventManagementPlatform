import { axiosInstance } from "@/lib/axiosInstance"
import { getCookies } from "@/lib/cookies"
import { useQuery } from "@tanstack/react-query"
import { formatTanggal } from "@/lib/moment"
import { formatRupiah } from "@/lib/formatRupiah"
import { imagePath } from "@/lib/path"
import Image from "next/image"

export default function Table(props) {

    const { data, isLoading } = useQuery({
        queryKey: ["Get transaction by islogin"],
        queryFn: async () => {
            try {
                const { value } = await getCookies()
                if (value) {
                    const res = await axiosInstance.post("transaction/user", null, {
                        headers: {
                            "Authorization": value
                        }
                    })
                    return res
                }
                return null
            } catch (error) {
                console.log(error)
            }
        }
    })

    if (isLoading) return (<p>Loading...</p>)
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Concert Date</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data?.data?.map((item, index) => {
                        return (
                            <tr>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <Image src={`${imagePath}/${data.data.image.filename}`} width={500} height={500} alt={item.event.title} />
                                            </div>
                                        </div>
                                        <div className="font-bold">{item.event.title}</div>
                                    </div>
                                </td>
                                <td>
                                    {item.event.location}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">{formatTanggal(item.event.date)}</span>
                                </td>
                                <td>{formatRupiah(item.price)}</td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>
        </div>
    )
}