'use client';
import { GoClockFill } from "react-icons/go";
import { IoLocationSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import TiketCard from '../../../components/TiketCard'
import { BsCalendar2DateFill } from "react-icons/bs";
import { formatRupiah } from "@/lib/formatRupiah";
import { axiosInstance } from "@/lib/axiosInstance";
import { formatTanggal, formatJam } from "@/lib/moment"
import Image from "next/image";
import { imagePath } from "../../../lib/path"
import Modal from "../../../components/Modal"
import { useParams } from "next/navigation";
import Link from "next/link";
import Review from "../../../components/Review"
import { getCookies } from "@/lib/cookies";

export default function Page() {
    const params = useParams()
    const [data, setData] = useState({})
    const [tabOpen, setTabOpen] = useState(null)
    const [selectedMenu, setSelectedMenu] = useState('')
    const [ticket, setTicket] = useState({})
    const [buy, setBuy] = useState([])

    const onSelect = (item, operation) => {
        const prevTicket = { ...ticket } // {}

        // Check, Apakah id category ada di dalam object atau tidak?
        // Kalo ada, ticketExist = true
        // Kalo tidak, ticketExist = false
        let ticketExist = false
        for (let key in prevTicket) {
            if (item.id == key) ticketExist = true
            // console.log(key)
            // console.log(prevTicket[key])
        }

        // {
        //     "1": {
        //         category: A, 
        //         quota: 1, 
        //         price: 10000
        //     }
        // }

        // Kalo ticketExist === false, Akan mengenerate data baru
        if (ticketExist === false && operation === '+') {
            // console.log('If')
            prevTicket[item.id] = {
                id: item.id,
                category: item.category,
                quota: 1,
                price: item.price
            }
            // Kalo ticketExist === true, maka akan mengupdate quota dan price
        } else if (ticketExist === true) {
            if (operation === '+') {
                if (prevTicket[item.id].quota >= 5) {
                    return alert("Max ticket 5")
                }
                if (prevTicket[item.id].quota >= item.quota) {
                    return alert(` ${item.quota} ticket remains`)
                }
                prevTicket[item.id].quota = prevTicket[item.id].quota + 1
                prevTicket[item.id].price = item.price * prevTicket[item.id].quota
            } else {
                if (prevTicket[item.id].quota > 0) {
                    prevTicket[item.id].quota = prevTicket[item.id].quota - 1
                    prevTicket[item.id].price = item.price * prevTicket[item.id].quota
                }
            }
        }

        const tempBuy = [] // [{}] Array of Object
        for (let key in prevTicket) {
            prevTicket[key].quota > 0 ? tempBuy.push(prevTicket[key]) : null
        }

        setTicket({ ...prevTicket })
        setBuy(tempBuy)
    }

    const fetchData = async () => {
        try {
            const res = await axiosInstance.get(`event/${params.id}`)
            setData(res.data.data)
            setTabOpen(res.data.data.event.description)
        } catch (error) {
            console.log(error)
        }
    }
    const onChangeTabOpen = (e) => {
        setTabOpen(data.event[e.target.getAttribute('name')])
        setSelectedMenu(e.target.getAttribute('name'))
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (!data) return (<p>404 Not Found</p>)
    return (
        <div className=" h-full border">
            <div className="text-xs text-blue-900 breadcrumbs px-9">
                <ul>
                    <li><Link href={"/"}>Home</Link></li>
                    <li><Link href={"/event"}>Event</Link></li>
                    <li><Link href={`/event/${params.id}`}>{data?.event?.title}</Link></li>
                </ul>
            </div>
            <div className="grid grid-cols-5 card-body">
                <div className="grid justify-center col-span-3 ">
                    <Image src={`${imagePath}/${data?.event?.Event_Image[0]?.filename}`} width={1000} height={1000} priority className="w-[100vw] h-[25vw] flex justify-center items-center" alt={`${data?.event?.title}`} />
                </div>
                <div className="flex ml- card col-span-2 bg-base-100 shadow-xl">
                    <div className="card-body col-span-2 text-xxl flex">
                        <h2 className="card-title">
                            {data?.event?.title}
                        </h2>
                        <div className="flex">
                            <BsCalendar2DateFill className="text-s mt-1 mr-1 " />
                            {formatTanggal(data?.event?.date)}
                        </div>
                        <div className="flex">
                            <GoClockFill className="text-2 mt-1 mr-1" />
                            {formatJam(data?.event?.date)}
                        </div>
                        <div className="flex">
                            <IoLocationSharp className="text-2 mt-1 mr-1" />
                            {data?.event?.location}
                        </div>
                        <div className="card-actions justify-end">
                        </div>
                        <hr />
                        <div className="flex py-2 gap-5">
                            <div>
                                <div>
                                    <Image src={`${imagePath}/${data?.organizer?.image}`} width={500} height={500} alt={`${data?.event?.title}`} priority className="w-[6vw]" />
                                </div>
                            </div>

                            <div className="justify-center items-center grid gap-1">
                                <div className="">Diselenggarakan oleh</div>
                                <div className="text-lg font-semibold">{data?.organizer?.name}</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {data?.event?.status != "done" &&
                <div className="grid grid-cols-5">
                    <div className="col-span-3">
                        <div className="flex justify-center gap-2">
                            <div name="description" onClick={(e) => onChangeTabOpen(e)} className={selectedMenu === 'description' ? "bg-base-100 rounded-md border-b-4 border-b-indigo-500 h-[2vw] w-full flex justify-center" : "bg-base-100 rounded-md border-b-4 h-[2vw] w-full flex justify-center"} >
                                Description
                            </div>
                            <div name='Event_Ticket' onClick={(e) => onChangeTabOpen(e)} className={selectedMenu === 'tickets' ? "bg-base-100 rounded-md border-b-4 border-b-indigo-500 h-[2vw] w-full flex justify-center" : "bg-base-100 rounded-md border-b-4 h-[2vw] w-full flex justify-center"}>
                                Tiket
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            {
                                typeof tabOpen === 'string' ?
                                    tabOpen
                                    :
                                    typeof tabOpen === 'object' ?
                                        tabOpen?.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    <TiketCard item={item} onSelect={onSelect} stat={ticket} />
                                                </div>
                                            )
                                        })
                                        :
                                        null
                            }
                        </div>
                    </div>

                    <div className="flex ml-card col-span-2 bg-base-100 shadow-xl">
                        <div className="card w-full h-fit bg-base-100 shadow-xl">
                            <div className="card-body">
                                <p>Choose your ticket !!</p>
                                <div>
                                    {
                                        buy?.map((itm, index) => {
                                            return (
                                                <div className='grid'>
                                                    <div>
                                                        {`${itm.quota} x ${itm.category}`}
                                                    </div>
                                                    <div>
                                                        {formatRupiah(itm.price)}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="justify-center items-center w-full bg-blue-950 text-white rounded-lg">
                                    {buy.length > 0 ?
                                        <Modal item={buy} name={data?.event?.title} />
                                        :
                                        null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {data?.event?.Event_Rating.length > 0 &&
                <div className="overflow-x-auto w-full px-8">
                    <p className="text-2xl font-bold">Review from Attendee</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Rating</th>
                                <th>Review</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.event?.Event_Rating.map((item, index) => {
                                return (
                                    <Review item={item} index={index} />
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}