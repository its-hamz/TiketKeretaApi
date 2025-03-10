import { NextRequest, NextResponse } from "next/server";
import { verifyKaryawan, verifyPelanggan } from "./helper/authorization";

export const middleware = async (request: NextRequest) => {
    if (request.nextUrl.pathname.startsWith("/karyawan")) {
        // jika url diawali dengan "/karyawan"

        // ambil data from cookie
        const token = request.cookies.get(`token`)?.value

        // prepare ridirect to login
        const redirectLogin = request.nextUrl.clone()
        redirectLogin.pathname = "/" // URL halaman Login

        if (typeof token === "undefined") {
            return NextResponse.redirect(redirectLogin)
            
        }

        const isVerifiedToken = await verifyKaryawan(token ?? "")
        if (!isVerifiedToken) return NextResponse.redirect(redirectLogin)
            return NextResponse.next()

    }
    if (request.nextUrl.pathname.startsWith("/customer")) {
        // jika url diawali dengan "/karyawan"

        // ambil data from cookie
        const token = request.cookies.get(`token`)?.value

        // prepare ridirect to login
        const redirectLogin = request.nextUrl.clone()
        redirectLogin.pathname = "/" // URL halaman Login

        if (typeof token === "undefined") {
            return NextResponse.redirect(redirectLogin)
            
        }

        const isVerifiedToken = await verifyPelanggan(token ?? "")
        if (!isVerifiedToken) return NextResponse.redirect(redirectLogin)
            return NextResponse.next()

    }
    return NextResponse.next()

}

// menentukan route mana saja yang akan memberlakukan proses middleware
export const config = {
    matcher: ["/karyawan/:path*", "/customer/:path*"],
}