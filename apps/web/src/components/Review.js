import { imagePath } from "@/lib/path"
import Image from "next/image"

export default function Review({ item, index }) {
    return (
        <tr>
            <th>{index + 1}</th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <Image src={`${imagePath}/${item.users.image}`} alt={item.users.name} width={500} height={500} />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{item.users.name}</div>
                    </div>
                </div>
            </td>
            <td>{item.rating}/5</td>
            <td>{item.review}</td>
        </tr>
    )
}