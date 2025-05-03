"use client";
import { signIn, signOut, useSession } from "next-auth/react"

export const NavMenu = () => {
    const { data: session } = useSession()
    if (session) {
        return (
            <div>
                {session.user?.name} <br />
                <button onClick={() => signOut()}>Sign Out</button>
            </div>
        )
    }
    return (
        <div>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign In</button>
        </div>
    )
}