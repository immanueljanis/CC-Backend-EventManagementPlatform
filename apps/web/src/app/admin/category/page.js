'use client'

import { useState, useEffect } from 'react'
import { Pencil, Delete, PlusSquare } from "lucide-react"


export default function Page(){
    
    const [data, setData] = useState([])

    const fetchData = async() => {
        try {
            const res = await fetch('http://localhost:8001/category')
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
        <div className="overflow-x-auto px-5">
        <div className="flex justify-end py-2 px-7 ">
               <div className="text-blue-700 font-bold">Create Category</div>
               <button className=""><PlusSquare/></button>
       </div>
       <table className="table table-xs">
           <thead>
           <tr>
               <th></th> 
               <th>Category Name</th>
               <th>Edit</th> 
               <th>Delete</th> 
           </tr>
           </thead> 
           <tbody>
           
           {data.map((item,index)=>{
               return(
                   <tr>
                   <th>{index+1}</th> 
                   <td>{item.name}</td> 
                   <td>
                    <button className=" w-10 h-5 " onClick={()=>document.getElementById('my_modal_3').showModal()}><Pencil/></button>
                      <dialog id="my_modal_3" className="modal ">
                            <div className="modal-box bg-white">
                                <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <div className='py-2 text-xs text-black'>
                                    <div>
                                    Category Name : <input className="w-15 h-5 border-black" placeholder='Enter Category'/>
                                    </div>
                                </div>
                            </div>
                        </dialog>
                    </td>
                   <td><button className='text-red-500'><Delete/></button></td>
                   </tr>
           
               )
           })}
           
           </tbody> 
       </table>
   </div>
    )
}