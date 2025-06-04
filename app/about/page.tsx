//about page.tsx

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="max-w-xl m-3 md:m-8 z-50 w-full space-y-8 border rounded-xl border-gray-700/50 p-5 sm:p-10 backdrop-blur-xl bg-black/80">

        {/* Back Button */}
        <Link href="/">
          <Button
            variant="ghost"
            className="hover:bg-black hover:text-white rounded-full duration-300 mb-5 cursor-pointer"
          >
            Back <BsArrowLeft className="ml-2" />
          </Button>
        </Link>

        {/* About Me Section */}
        <div className="space-y-6">
          <h1 className="text-4xl bg-clip-text font-bold text-transparent bg-gradient-to-r from-emerald-400 via-sky-300 to-blue-500">
            About Me
          </h1>
          <div className="space-y-4 text-neutral-200 text-pretty tracking-tight">
            <p></p>
            <p></p>
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-4">
          <h2 className="text-2xl bg-clip-text font-bold text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
            Education
          </h2>
          <div className="space-y-2">
            <p className="font-medium">Bachelor of Science in Computer Engineering</p>
            <p className="text-neutral-500">University of Florida, 2022– EST May 2026</p>
          </div>
        </div>

        {/* Professional Experience Section */}
        <div className="space-y-4">
          <h2 className="text-2xl bg-clip-text font-bold text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
            Professional Experience
          </h2>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Web Developer</p>
              <p className="text-neutral-500">CANAC Processamento de Dados, 2025–Current</p>
            </div>


            <div>
              <p className="font-medium">FPGA Researcher</p>
              <p className="text-neutral-500">University of Florida, 2025–present</p>
            </div>


            <div>
              <p className="font-medium">Senior Web Developer</p>
              <p className="text-neutral-500">EII IGNITE, 2024</p>
            </div>


            <div>
              <p className="font-medium">Civil Engineering Intern</p>
              <p className="text-neutral-500">Lead Engineering Contractors, 2021</p>
            </div>


          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
