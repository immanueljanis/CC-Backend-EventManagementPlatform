import { PlusSquare } from 'lucide-react'
import Table from './../../../components/table'

export default function Event(){
    return(
        <div className='w-full'>
                <div className="flex justify-end py-2 px-11">
                    <div className="text-blue-700 font-bold">Create Event</div>
                    <button className=""><PlusSquare/></button>
                </div>
                <div className="w-full px-5">
                    <Table/>
                </div>
            
        </div>
    )
}