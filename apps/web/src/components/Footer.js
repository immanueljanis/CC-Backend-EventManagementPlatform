'use client'
import { usePathname } from "next/navigation"
import { FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";
import Link from "next/link";

export default function Page({ children }) {
  const pathName = usePathname()
  const adminPath = ["/admin", "/admin/login", "/admin/event", "/organizer"]
  if (adminPath.includes(pathName)) return (<>{children}</>)

  return (
    <footer className="footer p-10 bg-blue-950 text-neutral-content mt-14 text-white">
      <aside>
        <p>Mendadak Event.<br />Providing integrity ticket platform since 2005</p>
      </aside>
      <nav>
        <header className="footer-title">Social</header>
        <div className="grid grid-flow-col gap-4">
          <Link href="https:/instagram.com" target={"_blank"}><FaTwitter className="w-6 h-6" /></Link>
          <Link href="https:/youtube.com" target={"_blank"}><FaYoutube className="w-6 h-6" /></Link>
          <Link href="https:/instagram.com" target={"_blank"}><FaFacebook className="w-6 h-6" /></Link>
        </div>
      </nav>
    </footer>
  )
}