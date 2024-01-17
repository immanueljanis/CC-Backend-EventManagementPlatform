
const category = [
    {
      title : "Concert",
      url : "/images/category.webp"
    },
    {
      title : "Fighting",
      url : "/images/category2.webp"
    },
    {
      title : "Exbhition",
      url : "/images/category3.webp"
    },  
    {
      title : "WorkShop",
      url : "/images/category4.webp"
    },
    {
      title : "Theme Park",
      url : "/images/category5.webp"
    },
    {
      title : "Accommodation",
      url : "/images/Category6.webp"
    },
    {
      title : "Talk Show",
      url : "/images/Category7.webp"
    }
  
  ]
  
  export default function Category(){
      return(
      <div>
        <div>
        <span className="text-black flex pl-7">Event Category</span>
        </div>
        <div className="carousel carousel-center max-w p-4 space-x-4 bg-base-100 rounded-box ">
            {
              category.map((item,index)=>{
                return (
            <div className="carousel-item  flex">
              <img src={item.url} className="rounded-box h-[120px] w-[200px]" alt="shoes" />
              <div className="text-white absolute flex py-12 px-[65px] ">{item.title}</div>
            </div> 
              )
            })
          }
        </div>
      </div>
      )
  }