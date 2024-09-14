'use client'

import NavBar from "@/components/ui/NavBar";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import { useRouter } from "next/navigation";

export default function Landing() {
const router = useRouter();
    return (
      <section>
        <NavBar />
        <div className="flex py-5 items-center justify-center flex-col gap-y-10 ">
          <span className="text-blue-500 bg-blue-200 px-4 py-2 rounded-full text-sm">
            A collaborative workspace for designers and developers
          </span>
          <p className="text-8xl text-center  text-zinc-500 dark:text-zinc-400 max-w-[500px] font-sans font-bold" >UTOPIA</p>
          <p className="text-center text-zinc-300 max-w-[500px]" >
            A dynamic collaboration space where designers and developers seamlessly connect, turning creative ideas into reality.
          </p>
          <Button className="
          bg-blue-500 font-bold text-white px-8 hover:bg-blue-300 transition"
           onClick={() => router.push("/sign-in")}>
            Get Started
          </Button>
        </div>
        <Footer />
      </section>
    );
  }
  