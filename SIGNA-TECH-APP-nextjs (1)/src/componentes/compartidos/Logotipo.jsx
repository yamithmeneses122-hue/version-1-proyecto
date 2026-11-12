"use client";

import Link from "next/link";
export default function Logotipo() {
    return (
        <Link href="/" className="flex items-center gap-3" aria-label="SIGNA-TECH-APP, inicio">
            <img src="/images/logo/logo.jpeg" alt="" className="h-11 w-11 rounded-2xl" />
            <span className="hidden text-sm font-extrabold tracking-[0.18em] text-white sm:block">
                SIGNA-TECH-APP
            </span>
        </Link>
    );
}