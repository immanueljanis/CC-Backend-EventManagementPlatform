'use client'

import { useEffect , useState } from "react"
import { Pencil, Delete, PlusSquare } from "lucide-react"
export default function Page(){
    const [data, setData] = useState([])

    const fetchData = async() => {
        try {
            const res = await fetch('http://localhost:8001/users')
            const tableData = await res.json()
            setData(tableData)
        } catch (error) {
            console.log(error)
        }
    }
useEffect(() => {
    fetchData()
} ,[])

    return(
        <div className="overflow-x-auto px-5">
             <div className="flex justify-end py-2 px-7 ">
                    <div className="text-blue-700 font-bold">Create Users</div>
                    <button className=""><PlusSquare/></button>
            </div>
            <table className="table table-xs">
                <thead>
                <tr>
                    <th></th> 
                    <th>Email</th> 
                    <th>Name</th> 
                    <th>Phone Number</th> 
                    <th>Address</th> 
                    <th>Role</th> 
                    <th>Referral Code</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead> 
                <tbody>
                
                {data.map((item,index)=>{
                    return(
                        <tr>
                            <th>{index+1}</th> 
                            <td>{item.email}</td> 
                            <td>{item.name}</td> 
                            <td>{item.phone_number}</td>
                            <td>{item.address}</td> 
                            <td>{item.role}</td> 
                            <td>{item.referral_code}</td> 
                            <button className=" w-10 h-5 " onClick={()=>document.getElementById('my_modal_3').showModal()}><Pencil/></button>
                             <dialog   dialog id="my_modal_3" className="modal ">
                                <div className="modal-box bg-white">
                                    <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    </form>
                                    <div className='py-2 text-xs text-black'>
                                        <div className="text-lg font-bold">
                                        Email : <input type="text" placeholder="Type here" className="input input-bordered input-primary input-sm w-full max-w-xs" />
                                        </div>
                                        <br/>
                                        <div className="text-lg font-bold">
                                        Name : <input type="text" className="input input-bordered input-primary input-sm w-full max-w-xs" placeholder="Enter Name"/>
                                        </div>
                                        <br/>
                                        <div className="text-lg font-bold">
                                        Phone : <input type="text" className="input input-bordered input-primary input-sm w-full max-w-xs" placeholder="Enter Phone Number"/>
                                        </div>
                                        <br/>
                                        <div className="text-lg font-bold">
                                        Address : <input type="text"  className="input input-bordered input-primary input-sm w-full max-w-xs" placeholder="Enter Address"/>
                                        </div>
                                        <br/>
                                        <div className="text-lg font-bold">
                                        Role : <input type="text" className="input input-bordered input-primary input-sm w-full max-w-xs" placeholder="Enter Role"/>
                                        </div>
                                    </div>
                                </div>
                            </dialog>
                            <td><button className='text-red-500'><Delete/></button></td>
                        </tr>
                
                    )
                })}
                
                </tbody> 
            </table>
        </div>
    )
}