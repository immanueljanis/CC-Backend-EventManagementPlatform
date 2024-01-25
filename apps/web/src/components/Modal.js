

export default function Modal(){
    return(
        <>
       {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button className="btn w-15 " onClick={()=>document.getElementById('my_modal_3').showModal()}>Edit</button>
            <dialog id="my_modal_3" className="modal ">
                <div className="modal-box bg-white">
                    <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className='py-2 text-xs text-black'>
                    <div>
                    Event Name : <input className="w-15 h-5"/>
                    </div>
                    <div>
                    Organizer Name : <input className="w-15 h-5"/>
                    </div>
                    <div>
                    Location : <input className="w-15 h-5"/>
                    </div>
                    <div>
                    Date : <input className="w-15 h-5"/>
                    </div>
                </div>
                </div>
            </dialog>
        </>
    )
}