import AuthTypingEffect from "@/components/authTypingEffect";
import { ReactNode } from "react";

export default function AuthLayout({children}: {children: ReactNode}) {
    return (
        <main className="flex min-h-screen">
            <section className="hidden md:block flex-1 md:text-2xl lg:text-5xl bg-black text-white"><AuthTypingEffect /></section>
            <section className="flex-1">{children}</section>
        </main>
    )
}