'use client'

import {SidebarItem}  from "./../components/Sidebar"
import Sidebar from "./../components/Sidebar"
import { LogOut , CircleUser, BadgeDollarSign , Package, GanttChartSquare ,BarChart3,LayoutDashboard, Settings } from "lucide-react"
import { TbCategory } from "react-icons/tb"
import Link from "next/link"
import { usePathname } from "next/navigation"
export default function MainAdmin({children}){
    const pathName = usePathname()

    const adminPath = ['/admin/login','/organizer/login']
    if(adminPath.includes(pathName)) {
        return (<>{children}</>)
    }
    return(
        <div className="grid grid-cols-12">
            <div className="col-span-2">
                <div className="">
                    <Sidebar>
                    <Link href={'/admin'}>
                    <SidebarItem icon={<LayoutDashboard size={20}/>} text="Dashboard" alert/>
                    </Link>
                    <Link href={'/admin/event'}>
                    <SidebarItem icon={<GanttChartSquare  size={20}/>} text="Event" />
                    </Link>
                        <SidebarItem icon={<BadgeDollarSign  size={20}/>} text="Transaction" />
                    <Link href={'/admin/category'}>
                        <SidebarItem icon={<TbCategory size={20}/>} text="Category" alert />
                    </Link>
                    <Link href={'/admin/users'}>
                    <SidebarItem icon={<CircleUser size={20}/>} text="User" />
                    </Link>
                    <hr/>
                    <SidebarItem icon={<LogOut  size={20}/>} text="Log Out" />
                 
                    </Sidebar>
                </div>
            </div>
            <div className="col-span-10">
            {children}
            </div>
        </div>
    )
}