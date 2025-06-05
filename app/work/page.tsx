// app/work/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BiLogoGithub, BiLogoLinkedin } from "react-icons/bi";
import { CgExternal } from "react-icons/cg";
import { BsArrowLeft } from "react-icons/bs";
import projectsData from "../data/projects.json";

const page = () => {
    const { projects } = projectsData;

    return (
        <div className="min-h-screen flex items-center justify-center">
            <main className="max-w-4xl m-3 md:m-8 z-50 w-full space-y-8 border rounded-xl border-gray-700/50 p-5 sm:p-10 backdrop-blur-xl bg-black/80">

                {/* Back button + title */}
                <div className="relative flex justify-center">
                    <Link href="/">
                        <Button
                            variant="ghost"
                            className="hover:bg-black absolute left-0 hover:text-white rounded-full duration-300 mb-5 cursor-pointer"
                        >
                            Back <BsArrowLeft className="ml-2" />
                        </Button>
                    </Link>
                    <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-sky-300 h-14 mt-14 sm:mt-0">
                        My Work
                    </h1>
                </div>

                {/* Projects grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="group overflow-hidden rounded-lg border border-neutral-800/70 bg-black/50 transition-all duration-300"
                        >

                            {/* Project image */}
                            <div className="relative h-70 w-full overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>

                            <div className="p-6">

                                {/* Title & description */}
                                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                                <p className="text-gray-300 mb-4">{project.description}</p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 text-sm rounded-full bg-slate-800/50 text-gray-300 border border-neutral-800/70"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Buttons area: render based on which links exist */}
                                <div className="flex gap-3">
                                    {/* 1) If linkedinLink exists (and codeLink/demoLink do NOT), show LinkedIn button */}
                                    {project.linkedinLink && !project.codeLink && !project.demoLink && (
                                        <Button
                                            variant="outline"
                                            className="flex-1 text-white bg-black backdrop-blur-sm border-neutral-800/70 transition-colors duration-200 ease-linear"
                                            asChild
                                        >
                                            <a
                                                href={project.linkedinLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <BiLogoLinkedin className="h-4 w-4 mr-2" />
                                                LinkedIn
                                            </a>
                                        </Button>
                                    )}

                                    {/* 2) If codeLink AND demoLink both exist, show both buttons */}
                                    {project.codeLink && (
                                        <Button
                                            variant="outline"
                                            className="flex-1 text-white bg-black backdrop-blur-sm border-neutral-800/70 transition-colors duration-200 ease-linear"
                                            asChild
                                        >
                                            <a
                                                href={project.codeLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <BiLogoGithub className="h-4 w-4 mr-2" />
                                                Code
                                            </a>
                                        </Button>
                                    )}
                                    {project.demoLink && (
                                        <Button
                                            variant="outline"
                                            className="flex-1 text-white bg-black backdrop-blur-sm border-neutral-800/70 transition-colors duration-200 ease-linear"
                                            asChild
                                        >
                                            <a
                                                href={project.demoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <CgExternal className="mr-2 h-4 w-4" />
                                                Live Demo
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default page;
