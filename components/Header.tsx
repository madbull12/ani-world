import Link from "next/link"
import { IoMenu, IoSearchCircle } from 'react-icons/io5'
import { useOpenSearch } from "../lib/zustand"

const Header = () => {
    const { openSearch } = useOpenSearch();

  return (
    // header component 
    <header className="bg-transparent p-4 bg-blue-500 text-white">
        <div className="max-w-7xl mx-auto">
            <nav className="flex justify-between items-center">
                <span className="font-bold text-2xl whitespace-nowrap">
                    <Link href="/" >アニワルド</Link>

                </span>
                <ul className="space-x-2  items-center hidden md:flex">
                    <Link href="/">
                        Anime
                    </Link>
                    <Link href="/">
                        Manga
                    </Link>
                    <IoSearchCircle className="text-3xl cursor-pointer"  onClick={openSearch} />
                </ul>
                <IoMenu className="md:hidden text-xl cursor-pointer" />
                

            </nav>

        </div>
    </header>

  )
}

export default Header