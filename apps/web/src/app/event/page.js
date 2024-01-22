'use client'
import Image from "next/image"
import { GoClockFill } from "react-icons/go";
import { IoLocationSharp } from "react-icons/io5";
import axios from "axios";
import { useEffect , useState } from "react";

import { BsCalendar2DateFill } from "react-icons/bs";


const gambar = [
    {
        url : '/images/event.webp',
        title : 'Incubus Asia Tour 2024',
        date : '2024-01-01',
        price : '950000',
        publisher : 'CK Star Entertaiment',
        clock : '20.00 - 24.00',
        description : 'INI EVENT TERBAIK',
        logo : '/images/logoincubus.webp'
    }
]




export default function Page(){

    const [data , setData] = useState({})
    const [tabOpen , setTabOpen] = useState(null)

    const fetchData = async() => {
        try {
            const res = await axios.get('http://localhost:5001/event/1')
           
            setData(res.data)
            setTabOpen(res.data.description)
        } catch (error) {
            console.log(error)
        }
    }
    const onChangeTabOpen = (e) => {
        setTabOpen(data[e.target.getAttribute('name')])
    }

    useEffect(() =>{
        fetchData()
    },[])
    return (


        <container className="">
            {gambar.map((item, index) =>{
                return (
                    <>
                    <div key={index} className=" h-full border">
                        <div>
                            <ul className="flex gap-3 ">
                            <li> 
                            Home
                            </li>
                            <li>
                            Event
                            </li>
                            <li>
                            Event Category
                            </li>
                            <li>
                            Event Name
                            </li>
                        </ul>
                        </div>
                        <div className="grid grid-cols-5 card-body">
                        <div className="grid justify-center col-span-3 ">
                            <img src={item.url} className="w-[1000px] h-[300px] flex justify-center items-center" alt="Shoes" />
                        </div>
                        <div className="flex ml- card col-span-2 bg-base-100 shadow-xl">
                            <div className="card-body col-span-2 text-xxl flex">
                                <h2 className="card-title">
                                {item.title}
                                </h2>
                                <div className="flex">
                                <BsCalendar2DateFill className="text-s mt-1 mr-1 " />
                                {item.date}
                                </div>
                                <div className="flex">
                                <GoClockFill className="text-2 mt-1 mr-1" />
                                {item.clock}
                                </div>
                                <div className="flex">
                                <IoLocationSharp className="text-2 mt-1 mr-1" />
                                    location
                                </div>
                                <div className="card-actions justify-end">
                                </div>
                                <hr />
                                <div className="flex">
                                <span>
                                <img src={item.logo} alt="shoes" className="w-[6vw]"/>
                               
                                </span>
                                <div className="text-xs flex justify-center items-center">diselenggarakan oleh : </div>
                                </div>
                                <div className="flex justify-center items-center">
                                {item.publisher}
                                </div>
                            </div>
                                     
                        </div>
                        </div>


                        <div className="grid grid-cols-5 card-body">
                        <div className="col-span-3">
                        <div className="flex justify-center">
                                <div name="description" onClick={(e) => onChangeTabOpen(e)} className="bg-base-100 rounded-md border-b-4 h-[2vw] w-full flex justify-center" >
                                Description
                                </div>
                                <div name='tickets' onClick={(e) => onChangeTabOpen(e)} className="bg-base-100 px-3 rounded-md border-b-4 h-[2vw] w-full flex justify-center">
                                Tickets 
                                </div>
                            </div>
                        <div className="">
                            {
                            typeof tabOpen === 'string'?
                                    tabOpen
                                :
                                    typeof tabOpen === 'object'?
                                        tabOpen?.map((item) => {
                                            return(
                                                <div>
                                                    {item.category}
                                                </div>
                                            )
                                        })
                                    :
                                        null
                            }
                        </div>
                        </div>


                        <div className="flex ml-card col-span-2 bg-base-100 shadow-xl">
                        <div className="card w-96 bg-base-100 shadow-xl col-span-2">
                                <div className="card-body">
                                    <p>Choose your ticket !!</p>
                                    <div className="card-actions justify-center items-center">
                                    <button className="btn btn-primary w-full">Buy Now</button>
                                    </div>
                                </div>
                        </div>
                            
                                     
                        </div>
                        </div>
                    </div>
                    </>
                )
            })}
            
        </container>
    )
}