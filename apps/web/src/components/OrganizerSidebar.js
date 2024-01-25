'use client'

import {SidebarItem}  from "./../components/Sidebar"
import Sidebar from "./../components/Sidebar"
import { LifeBuoy, LogOut , BadgeDollarSign , Package, GanttChartSquare ,BarChart3,LayoutDashboard, Settings } from "lucide-react"
import { TbCategory } from "react-icons/tb"
import Link from "next/link"
import { usePathname } from "next/navigation"
export default function MainOrganizer({children}){
    const pathName = usePathname()

    const organizerPath = ['/organizer/login']
    if(organizerPath.includes(pathName)) {
        return (<>{children}</>)
    }
    return(
        <div className="grid grid-cols-12 h-full">
            <div className="col-span-2">
                <div className="">
                    <Sidebar>
                    <SidebarItem
                    icon={<LayoutDashboard size={20}/>}
                    text="Dashboard"
                    alert
                    />
                    <Link href={'/organizer/event'}>
                    <SidebarItem icon={<GanttChartSquare  size={20}/>} text="Event" />
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