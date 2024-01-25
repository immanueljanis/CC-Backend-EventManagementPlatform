'use client'
import axios from 'axios';
import { Delete, Pencil, Check, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FcViewDetails } from "react-icons/fc";
import { useParams } from 'next/navigation';


export default function Table() {

    const [data, setData] = useState([])
    const params = useParams()

    const fetchData = async () => {
        try {
            const res = await fetch(`http://localhost:8001/events/`)
            const tableData = await res.json()
            setData(tableData)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    })

    return (
        <div className="overflow-x-auto ">
            <table className="table table-xs">
                <thead>
                    <tr>
                        <th></th>
                        <th>Event Name</th>
                        <th>Organizer Name</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>

                    {data.map((item, index) => {
                        return (
                            <tr>
                                <th>{index + 1}</th>
                                <td>{item.tittle}</td>
                                <td>{item.organizerName}</td>
                                <td>{item.location}</td>
                                <td>{item.date}</td>
                                <td>{item.status}</td>
                                <td><Link href={`/organizer/event/${item.id}`}><button className='text-blue-500'><Pencil /></button></Link></td>
                                <td><button className='text-red-500'><Delete /></button></td>
                            </tr>

                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}

export function Tables() {
    const [data, setData] = useState([])

    const fetchData = async () => {
        try {
            const res = await fetch('http://localhost:8001/events')
            const tableData = await res.json()
            setData(tableData)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        (
            <div className="overflow-x-auto ">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Event Name</th>
                            <th>Organizer Name</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Detail</th>
                            <th>Accept</th>
                            <th>Decline</th>
                        </tr>
                    </thead>
                    <tbody>

                        {data.map((item, index) => {
                            return (
                                <tr>
                                    <th>{index + 1}</th>
                                    <td>{item.tittle}</td>
                                    <td>{item.organizerName}</td>
                                    <td>{item.location}</td>
                                    <td>{item.date}</td>
                                    <td>{item.status}</td>
                                    <td><button><Link href={`/admin/event/${item.id}`}><FcViewDetails className='text-xl' /></Link></button></td>
                                    <td><button className='text-blue-500'><Check /></button></td>
                                    <td><button className='text-red-500'><X /></button></td>
                                </tr>

                            )
                        })}

                    </tbody>
                </table>
            </div>
        )
    )
}