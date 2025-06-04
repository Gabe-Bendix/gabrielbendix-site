import React from "react";
import Link from "next/link"
import { Button } from "../components/ui/button"
import Image from "next/image";
import {
  BiBuilding,
  BiChevronRight,
  BiLogoGithub,
  BiLogoLinkedin,
  BiLogoYoutube,
} from "react-icons/bi";
import { HiArrowDown } from "react-icons/hi";
import RotatingText from "@/components/RotatingText";


export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="w-full max-w-xl m-3 md:m-8 z-50 space-y-8 border border-gray-700/50 rounded-xl p-5 sm:p-10 backdrop-blur-xl bg-black/80">

        {/* ───────── Top Row: Location + “Available for work” ───────── */}
        <div className="flex sm:flex-row sm:justify-between sm:items-center flex-col-reverse item-start gap-3 sm:gap-10">
          <div className="flex items-center gap-3">

            <BiBuilding className="w-5 h-5" />
            <h3 className="text-gray-400">São Paulo, BR</h3>
          </div>

          <Button variant="ghost" className="hover:bg-black/50 duration-300 hover:text-white rounded-full">
            <div className="relative flex text-sm gap-1 items-center justify-center h-3 w-3 rounded full">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full"></span>
              <span className="inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <p>Available for work</p>
          </Button>
        </div>


        {/* ───────── PFP ───────── */}
        <div className="m-0 w-full h-56 overflow-hidden rounded-lg">
          <Image
            src="/images/pfp.JPG"
            alt="Proffesional yet casual photo of me at the 2024 AKC National Championship presented by Royal Canin"
            className="w-full h-full object-cover object-center"
            width={800}
            height={300}
            priority

          />
        </div>



        {/* ───────── ROTATING Job Title + Paragraph ───────── */}
        <div className="mt-10 mb-0"> {/*to edit space below the pfp*/}
          <div className="text-2xl font-semibold text-white text-left flex flex-wrap items-center gap-2">
            Gabriel Bendix, a
            <span className="inline-block">
              <RotatingText
                texts={[
                  "UF Student",
                  "Software Developer",
                  "Computer Engineer",
                ]}



                mainClassName="inline-block px-2 bg-[#4BA4FF] text-black overflow-hidden py-0.5 rounded-lg"
                staggerFrom="last"
                initial={{
                  y: "100%",
                  opacity: 0
                }}
                animate={{
                  y: 0,
                  opacity: 1
                }}
                exit={{
                  y: "-120%",
                  opacity: 0
                }}
                staggerDuration={0.02}
                splitLevelClassName="inline-block overflow-hidden pb-0.5"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </span>
          </div>
        </div>

        {/* ───────── Paragraph under the rotating line ───────── */}
        <div className="mt-0">
          <p className="text-pretty tracking-tight mt-1 text-nuetral-300 text-left">
            I’m a fourth year Computer Engineer at the University of Florida
            currently working as a software developer at tech startup in São Paulo, Brazil. I love to talk cryptography, innovation, and hardware.
          </p>
        </div>


        {/* ───────── Menu Links ───────── */}
        <nav className="space-y-4">
          <h3 className="text-x1 cont-bold text-emerald-400"> Menu</h3>

          <div className="flex flex-col gap-3">
            <Link href="/about"
              className="w-1/2 border bg-black/ 30 border-gray-700/40 flex group items-center justify-between p-3 cursor-pointer transition-colors duration-200 ease-linear hover:bg-zinc-800/40 rounded-1g">
              <span>Experience</span>
              <BiChevronRight className="mr-5 text-2x1 translate-x-0 group-hover:translate-x-3 text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-200"></BiChevronRight>
            </Link>

            <Link href="/work"
              className="w-1/2 border bg-black/ 30 border-gray-700/40 flex group items-center justify-between p-3 cursor-pointer transition-colors duration-200 ease-linear hover:bg-zinc-800/40 rounded-1g">
              <span>Projects</span>
              <BiChevronRight className="mr-5 text-2x1 translate-x-0 group-hover:translate-x-3 text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-200"></BiChevronRight>
            </Link>

            <Link href="/skills"
              className="w-1/2 border bg-black/ 30 border-gray-700/40 flex group items-center justify-between p-3 cursor-pointer transition-colors duration-200 ease-linear hover:bg-zinc-800/40 rounded-1g">
              <span>Skills</span>
              <BiChevronRight className="mr-5 text-2x1 translate-x-0 group-hover:translate-x-3 text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-200"></BiChevronRight>
            </Link>

            <Link href="/contact"
              className="w-1/2 border bg-black/ 30 border-gray-700/40 flex group items-center justify-between p-3 cursor-pointer transition-colors duration-200 ease-linear hover:bg-zinc-800/40 rounded-1g">
              <span>Contact</span>
              <BiChevronRight className="mr-5 text-2x1 translate-x-0 group-hover:translate-x-3 text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-200"></BiChevronRight>
            </Link>
          </div>

          {/* ───────── “Check out my socials” ───────── */}
          <div className="flex gap-2 items-center">
            <h3 className="text-xl bg-clip-text font-bold text-transparent bg-gradient-to-r from-emerald-400 via-sky-400 to-blue-400">Check out my socials</h3>
            <HiArrowDown className="text-2x1 text-sky-400"></HiArrowDown>
          </div>

          <div className="flex flex-col gap-3">
            {/* link to Linkedin */}
            <a
              href="https://www.linkedin.com/in/gabriel-bendix/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-black/30 w-full p-6 text-gray-300 border border-gray-700/40 hover:bg-slate-300/20 hover:text-white transition-colors duration-200 ease-linear">
                <BiLogoLinkedin /> Linkedin
              </Button>
            </a>

            {/* link to Github */}
            <a
              href="https://github.com/Gbendi023"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-black/30 w-full p-6 text-gray-300 border border-gray-700/40 hover:bg-slate-300/20 hover:text-white transition-colors duration-200 ease-linear">
                <BiLogoGithub /> Github
              </Button>
            </a>

            {/* link to Youtube */}
            <a
              href="https://www.youtube.com/@gabrielbendix3750"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-black/30 w-full p-6 text-gray-300 border border-gray-700/40 hover:bg-slate-300/20 hover:text-white transition-colors duration-200 ease-linear">
                <BiLogoYoutube /> Youtube
              </Button>
            </a>
          </div>

        </nav>

      </main >
    </div >
  );
}