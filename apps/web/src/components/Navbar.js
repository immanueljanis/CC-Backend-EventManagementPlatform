'use client'
import { useDebounce } from "use-debounce"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import axios from "axios"
import { useDispatch } from 'react-redux';
import { useQuery } from "@tanstack/react-query";
import { getCookies, removeCookies } from "@/lib/cookies";
import { axiosInstance } from "@/lib/axiosInstance";
import { setUser } from "@/redux/slice/userSlice";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import path from "path";

export default function Page({children}) {
    // const [products, setProducts] = useState([]);

   
    const [search, setSearch] = useState('');
    const [searchText] = useDebounce(search, 1000)
    const [dataSearch, setDataSearch] = useState([]);
    const dispatch = useDispatch()
    const dataUser = useSelector((state) => state.user)
    const pathName = usePathname()
    const params = useParams()
    console.log(`${params.slug}`)
    console.log(pathName)

    useQuery({
        queryFn: async () => {
            const { value } = await getCookies()
            if (value != null) {
                let res = await axiosInstance.post(`user/keep-login`, null, {
                    headers: {
                        "authorization": value
                    }
                })
                dispatch(setUser(res))
            }
        }
    })

    const onLogout = async () => {
        await removeCookies()
        dispatch(setUser(null))
    }
    
    // const getCookies = async () => {
    //     try {
    //         const { value } = await getCookies()
    //         if (value) {
    //             let res = await axiosInstance.get(`/user/${value}`)

    //             console.log(value, res)
    //             dispatch(setUser(res))
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const getProducts = async () => {
    //     try {
    //         const res = await axios.get(`http://localhost:5003/products?name=${searchText}`)
    //         setDataSearch(res.data)
    //     } catch (error) {
    //         console.log(error)
    //     }

    // };

    // useEffect(() => {
    //     getProducts();
    // }, [searchText])
    const adminPath = ["/admin","/organizer/login","/admin/login", "/admin/event", "/organizer","/admin/users","/admin/category","/organizer/event", `/organizer/event/${params.slug}`,`/admin/event/${params.slug}`]
    if(adminPath.includes(pathName)) {
        return (<>{children}</>)
    }
    return (
        <div className="flex flex-col text-white">
            <div className="flex justify-end items-end gap-3 bg-blue-800">
                <div className="text-xs">
                    <a>Home</a>
                </div>
                <div className="text-xs">
                    <a>Contact Us</a>
                </div>
            </div>
            <div className="navbar bg-blue-950">
                <div className="navbar-start flex">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a>Event</a></li>

                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Mendadak Event</a>
                </div>
                <div className="form-control">
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Cari Event mu disini"
                        className="input input-bordered w-24 md:w-[400px] h-9 text-black" />
                </div>
                <div>
                    {
                        dataSearch.length ?
                            dataSearch.map((item, index) => {
                                return (
                                    <div>
                                        {item.name}
                                    </div>
                                )
                            })
                            :
                            null
                    }
                </div>
                <div className="navbar-end flex gap-3">
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            <li><a>Event</a></li>

                        </ul>
                    </div>
                    {dataUser?.user?.data?.data?.name ?
                        <>
                            <a className="btn w-24">{dataUser.user.data.data.name}</a>
                            <button className="btn w-24" onClick={() => onLogout()}>Logout</button>
                        </>
                        :
                        <>
                            <Link href={"/register"} className="btn w-24">Register</Link>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}