import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export function middleware(request) {
    console.log("Hello, I am middleware");
    const path = request.nextUrl.pathname;
    console.log("Path:", path);
    const isPublicPath = path === "/sign-in" || path === "/sign-up";
    console.log("Is Public Path:", isPublicPath);
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value || "";
    console.log("Token:", token);

    if (isPublicPath && token !== "") {
        console.log("Redirecting to /profile");
        return NextResponse.redirect(new URL("/profile", request.nextUrl));
    }

    if (!isPublicPath && token === "") {
        console.log("Redirecting to /sign-in");
        return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
    }

    console.log("No redirection");
    return NextResponse.next();
}

export const config = {
    matcher: ['/sign-in', '/sign-up', '/profile', '/']
};
