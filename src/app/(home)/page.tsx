import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
    return (
      <>
        <div className="text-center h-screen mt-10 text-white">
        <h1
          className="text-6xl font-bold"
        >
          Mega Evolution series
        </h1>
        <p
          className="text-[#2AC5EC]"
        >
          November 14 2025
        </p>
        <div className="flex flex-col items-center justify-center">
          <img 
          src="/phantasmal-flames.png" 
          alt="Mega Evolution series : Phantasmal Flames"
          className="w-[25%] -rotate-6 drop-shadow-2xl"
          />
          <Link
          href="/sign-in">
              <Button
              className=""
              >
              Create account
            </Button>
          </Link>
        </div>
          

      </div>

      <div>

      </div>
      
      </>
    )
}