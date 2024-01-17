const event = [
    {
        title : 'Incubus Asia Tour 2024',
        date : '2024-01-01',
        price : '950000',
        publisher : 'CK Star Entertaiment',
        url : "/images/event.webp"
    },
    {
        title : 'DRIVE AND SCREAM',
        date : '2024-01-21',
        price : '35000  ',
        publisher : 'Rumah Hantu Jakarta',
        url : "/images/event1.webp"
    },
    {
        title : 'Bali Full-Day Water Temples',
        date : '2024-01-15',
        price : '3500000',
        publisher : 'Arief Prasetya',
        url : "/images/event2.webp"
    },
    {
        title : 'Candence 2024 Show 1',
        date : '2024-01-20',
        price : '50000',
        publisher : 'SMK Penabur Bintaro Jaya',
        url : "/images/event3.webp"
    },

]


export default function Event() {
    return (
        <div className="flex justify-center gap-4">
        <div>
            Event
        </div>
        {
            event.map((item,index)=>{
                return(
                    <div className="flex flex-col card w-[300px] h-[300px] bg-base-100 shadow-xl">
                    <div className="flex justify-center w-[300px] h-[300px]">
                    <img src={item.url} className="w-[150px] h-[100px] flex justify-center items-center" alt="Shoes" />
                    </div>
                    
                    
                    <div className="card-body">
                        <h2 className="card-title">
                        {item.title}
                        </h2>
                        <p>{item.date}</p>
                        <p>{item.price}</p>
                        <div className="card-actions justify-end">
                        <div className="badge badge-outline">{item.publisher}</div> 
                        </div>
                    </div>
                    </div>
                )
            })
           }
        </div>
           
        
    )
}
