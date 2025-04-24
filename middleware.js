import {NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";

export async function middleware(req) {

    const session = await getToken({req: req})
    if ( req.nextUrl.pathname.startsWith('/write')) {
        if (session == null) {
            return NextResponse.redirect(new URL('http://localhost:3000/api/auth/signin'), req.url)
        }
    }
    if (req.nextUrl.pathname === '/list') {
        console.log(new Date())
        console.log(req.headers.get('sec-ch-ua-platform'))
        return NextResponse.next()
    }
}
