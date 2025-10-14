import Image from "next/image"
import Link from "next/link"

const navItems = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "MyCollection",
        href: "/my-collection",
    },
    {
        label: "Cards",
        href: "/cards",
    },
    {
        label: "Sets",
        href: "/sets",
    },
    {
        label: "Profile",
        href: "/profile",
    }
]

const Navbar = () => {
    return (
        <div className="h-25 w-full ">
            <nav className="max-w-[50%] m-auto relative">
            <div className="absolute">
                <img src="/nav-bar-gradient.png" alt=" navbar gradient" />
            </div>
            <div className="absolute w-[100%] mt-5">
                <div 
                className="flex gap-4 items-center justify-center"
            >
                <Image 
                    src="/logo.png"
                    alt="TCG LOGO"
                    width={36}
                    height={36}
                />
                {navItems.map((item) => 
                <Link
                 href={item.href} 
                 key={item.label}
                 
                 >
                    <span 
                        className="px-8 py-2 rounded-full bg-gradient-to-b from-[hsla(221,20%,72%,0)] to-[#51585f75] text-white text-sm font-bold shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.5)]"
                    >
                        {item.label}
                    </span>
                </Link>
                )}
            </div>
            </div>
        </nav>
        </div>
    )
}

export default Navbar