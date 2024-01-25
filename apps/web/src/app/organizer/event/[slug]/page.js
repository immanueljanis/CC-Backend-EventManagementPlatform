'use client'
import {useParams} from 'next/navigation'
import { useState , useEffect } from 'react'
import Image from 'next/image'
import Modal from './../../../../components/Modal'

import { Pencil, Delete, PlusSquare } from "lucide-react"

export default function Detail(){

    const [data, setData] = useState([])
    const params = useParams()
    const fetchData = async() => {
        try {
            const res = await fetch(`http://localhost:8001/events/${params.slug}`)
            const tableCategory = await res.json()
            setData(tableCategory)
        } catch (error) {
            console.log(error)
        }
    }
useEffect(() => {
    fetchData()
}, [])

    return(
    <div className='px-20'>
        <div className=' py-5'>
            <div className='border py-4 rounded-lg px-2 font-bold'>
                User - Event Detail
            </div>
        </div>
        <div className='border border-t-4 border-t-black rounded-lg px-6 py-5'>
                <div className='py-6 font-bold'>
                Event Data
                </div>
                <div className='py-2 text-xs text-gray-400'>
                    <div>
                    Event Name : {data.tittle}
                    </div>
                    <div>
                    Organizer Name : {data.organizerName}
                    </div>
                    <div>
                    Location : {data.location}
                    </div>
                    <div>
                    Date : {data.date}
                    </div>
                    <div>
                    Status : {data.status}
                    </div>
                    <div>
                        <Modal/>
                    </div>
                </div>
              
                <br/>
                <hr/>
                <div className='py-3 flex justify-center items-center'>
                <Image src={`http://localhost:8000/public/image/${data.url}`} width={500} height={300} alt={data.tittle}/>
                </div>
                <hr/>
                <div className='font-bold'>
                    Tickets
                </div>
             
                <div>
                    <table className="table table-xs">
                        <thead>
                            <tr>
                                <th></th> 
                                <th>Category Ticket</th>
                                <th>Price</th> 
                                <th>Quota</th> 
                            </tr>
                        </thead> 
                        <tbody>
                        {data?.tickets?.map((item,index) =>{
                            return (
                                <tr>
                                    <th></th> 
                                    <td>{item.category}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quota}</td>
                                </tr>
                            )
                        })}
                        </tbody> 
                    </table>
                </div>
                <div className='flex justify-end gap-4'>
                    <button className='border border-black rounded-sm bg-blue-900 text-white'>Accept</button>
                    <button className='border border-black rounded-sm bg-blue-900 text-white'>Decline</button>
                </div>
        </div>
    </div>
    )
}