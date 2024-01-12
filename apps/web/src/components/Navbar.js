

export default function Page() {
  return(
     <div className="flex flex-col text-white">
      <div className="flex justify-end items-end gap-3 bg-blue-800">
          <div className="text-xs">
          <a>Home</a>
          </div>
          <div className="text-xs">
          <a>Contact Us</a>
          </div> 
      </div>
      <div className="navbar bg-blue-950">
          <div className="navbar-start flex">
              <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                  <li><a>Event</a></li>
                  
              </ul>
              </div>
              <a className="btn btn-ghost text-xl">Mendadak Event</a>
          </div>
          <div className="form-control">
            <input type="text" placeholder="Cari Event mu disini" className="input input-bordered w-24 md:w-[400px] h-9 text-black"  />
          </div>
          <div className="navbar-end flex gap-3">
          <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
              <li><a>Event</a></li>
              
              </ul>
          </div>
              <a className="btn w-24">Register</a>
              <a className="btn w-24">Login</a>
              
          </div>
      </div>
     </div>
  )
}