import Link from "next/link"
import { IoMenu } from 'react-icons/io5'

const Header = () => {
  return (
    // header component
    <header className="bg-transparent p-4 bg-[#007CEF] text-white">
        <div className="max-w-7xl mx-auto">
            <nav className="flex justify-between items-center">
                <span className="font-bold text-2xl whitespace-nowrap">
                    <Link href="/" >アニワルド</Link>

                </span>
                <ul className="space-x-2 hidden md:block">
                    <Link href="/">
                        Anime
                    </Link>
                    <Link href="/">
                        Manga
                    </Link>
                </ul>
                <IoMenu className="md:hidden text-xl cursor-pointer" />
                

            </nav>

        </div>
    </header>

  )
}

export default Header