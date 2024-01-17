import Image from "next/image"

const gambar = [
  {
    url : "/images/hero.jpg"
  },
  {
    url : "/images/hero1.jpg"
  },
  {
    url : "/images/hero2.jpg"
  },
]

export default function Hero(){
    return(
      <div className="flex justify-center items-center">
        <div className="carousel flex w-[1300px] ">
      {
        gambar.map((item,index) => {
          return(
            <>
            <div id={`slide${index+1}`} className="carousel-item relative h-full w-full ">
              <img src={item.url} className="w-[100%] h-[300px] opacity-80 rounded-full py-5 px-5" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide3" className="btn btn-circle">❮</a>
              <a href="#slide1" className="btn btn-circle">❯</a>
              </div>
          </div>
          </>
          )
        })
      }
     </div>
      </div>
  
    )
}