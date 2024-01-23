import { SidebarItem } from "../../components/Sidebar"
import Sidebar  from "../../components/Sidebar"
import { LifeBuoy, CircleUser, BadgeDollarSign , Package, GanttChartSquare ,BarChart3,LayoutDashboard, Settings } from "lucide-react"
import { TbCategory } from "react-icons/tb"
export default function Page(){
    return(
        <main>
            <div className="w-72">
            <Sidebar>
            <SidebarItem
            icon={<LayoutDashboard size={20}/>}
            text="Dashboard"
            alert
            />
            <SidebarItem icon={<BarChart3 size={20}/>} text="Statistics" active/>
            <SidebarItem icon={<GanttChartSquare  size={20}/>} text="Event" />
            <SidebarItem icon={<BadgeDollarSign  size={20}/>} text="Transaction" />
            <SidebarItem icon={<TbCategory size={20}/>} text="Category" alert />
            <SidebarItem icon={<CircleUser size={20}/>} text="User" />
            <hr/>
            <SidebarItem icon={<Settings size={20}/>} text="Setting" />
            <SidebarItem icon={<LifeBuoy size={20}/>} text="Help" />
            </Sidebar>
            </div>
        </main>
    )
}