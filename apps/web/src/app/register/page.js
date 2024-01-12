
export default function Page(){
    return(
        <div className="h-screen flex justify-center items-center">
            <div className="flex flex-col justify-center">
            <div>
                <span className="text-xl text-blue-800">REGISTER</span>
            </div>
            <div>
                <span className="text-xs ">Please Register here</span>
            </div>
            <span>Input Your Name</span>
            <div>
                <input className="border bg-base-200 " type="text" placeholder="Enter Name" />
            </div>
            <span>Input Your Email</span>
            <div>
            <input className="border bg-base-200" type="email" placeholder="Enter Email" />
            </div>
            <span>Input Your Password</span>
            <div>
            <input className="border bg-base-200" type="password" placeholder="Enter Password" />
            </div>
            <div className="flex justify-start">
                <button>Register</button>
            </div>  
            </div>
        </div>
    )
}