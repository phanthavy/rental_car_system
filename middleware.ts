// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import { Role } from "./libs/role";
// import { jwtpayloadtype } from "./libs/jwt";

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     return NextResponse.redirect(new URL("/auth/login", req.url));
//   }
//   try {
//     const payload = jwt.verify(
//       token,
//       process.env.SECRET_KEY || "default_secret",
//     ) as jwtpayloadtype;

//     // redirect along with role
//     if (
//       payload.role === Role.admin &&
//       !req.nextUrl.pathname.startsWith("/admin")
//     ) {
//       return NextResponse.redirect(new URL("/admin/home", req.url));
//     }
//     if (
//       payload.role === Role.supplier &&
//       !req.nextUrl.pathname.startsWith("/supplier")
//     ) {
//       return NextResponse.redirect(new URL("/supplier/supplierHome", req.url));
//     }
//   } catch {
//     return NextResponse.redirect(new URL("/auth/login", req.url));
//   }
//   return NextResponse.next();
// }
// export const config = {
//   matcher: ["/admin/:path*", "/supplier/:path*", "/requester/:path*"], // apply middleware แค่ route /admin
// };
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Role } from "./libs/role";
import { cookies } from "next/headers";
import { jwtpayloadtype } from "./libs/jwt";

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.SECRET_KEY || "default_secret",
    ) as jwtpayloadtype;

    const pathname = req.nextUrl.pathname;

    // ❌ block admin
    if (pathname.startsWith("/admin") && payload.role !== Role.admin) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // ❌ block supplier
    if (pathname.startsWith("/supplier") && payload.role !== Role.supplier) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // ❌ block requester
    if (pathname.startsWith("/requester") && payload.role !== Role.requester) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/supplier/:path*", "/requester/:path*"],
};
