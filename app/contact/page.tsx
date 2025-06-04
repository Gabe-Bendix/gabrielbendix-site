'use client';

import React, { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiMapPin } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";







const page = () => {
    // ─── State Hooks for Form Fields ─────────────────────────────────────────
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    // ─── State Hooks for Submission Status ────────────────────────────────────
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    // ─── handleSubmit: Called when form is submitted ─────────────────────────
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrorMsg(null);
        setSuccessMsg(null);

        // Basic front-end validation
        if (!name.trim() || !email.trim() || !message.trim()) {
            setErrorMsg("Please fill out Name, Email, and Message.");
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Unknown error");
            }

            setSuccessMsg("Your message was sent successfully!");
            // Clear the form fields
            setName("");
            setEmail("");
            setMessage("");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setErrorMsg(err.message);
            } else {
                setErrorMsg("Failed to send message.");
            }
        } finally {
            setIsLoading(false);
        }
    }









    return (
        <div className="min-h-screen flex items-center justify-center">
            <main className="max-w-xl m-3 md:m-8 z-50 w-full space-y-8 border rounded-xl border-gray-700/50 p-5 sm:p-10 backdrop-blur-xl bg-black/80">

                {/* Back button */}
                <Link href="/">
                    <Button
                        variant="ghost"
                        className="hover:bg-black hover:text-white rounded-full mb-5 cursor-pointer"
                    >
                        Back <BsArrowLeft className="ml-2" />
                    </Button>
                </Link>

                {/* Header */}
                <div className="space-y-6">
                    <h1 className="text-4xl bg-clip-text font-bold text-transparent bg-gradient-to-r from-emerald-400 via-sky-300 to-blue-500">
                        Get in Touch
                    </h1>

                    <div className="space-y-6">
                        <p className="text-pretty text-neutral-200 tracking-tight">
                            I’m always open to discussing projects, ideas, or opportunities. Feel free to reach out through this contact form.
                        </p>


                        <div className="space-y-4">



                            {/* Contact Location */}
                            <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-700/50 bg-black/40">
                                <BiMapPin className="w-5 h-5 text-emerald-400" />
                                <div>

                                    <h3 className="font-medium">
                                        Location
                                    </h3>
                                    <a
                                        href="https://www.google.com/maps/place/S%C3%A3o+Paulo,+State+of+S%C3%A3o+Paulo/@-23.6820636,-46.9249557,97191m/data=!3m2!1e3!4b1!4m6!3m5!1s0x94ce448183a461d1:0x9ba94b08ff335bae!8m2!3d-23.5557714!4d-46.6395571!16zL20vMDIycGZt?entry=ttu&g_ep=EgoyMDI1MDYwMi4wIKXMDSoASAFQAw%3D%3D"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-neutral-500 hover:text-emerald-400 transition-colors"
                                    >
                                        São Paulo, BR
                                    </a>
                                </div>
                            </div>
                        </div>








                        {/* Contact Form */}
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold">Send me a message...</h2>

                            {/* Display any error or success message */}
                            {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
                            {successMsg && (
                                <p className="text-green-400 text-sm">{successMsg}</p>
                            )}

                            {/* Note: onSubmit calls handleSubmit instead of action="" */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Your name"
                                        className="w-full p-2 rounded-lg border border-gray-700/50 bg-black/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your Email"
                                        className="w-full p-2 rounded-lg border border-gray-700/50 bg-black/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                                    />
                                </div>

                                {/* Message */}
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        rows={5}
                                        placeholder="Your Message"
                                        className="w-full p-2 rounded-lg border border-gray-700/50 bg-black/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full text-black bg-emerald-400 hover:bg-emerald-500"
                                >
                                    {isLoading ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default page;
