import { auth } from "@/auth";

// Next.js 16: `proxy.ts` replaces `middleware.ts`
export default auth((req) => {
  if (!req.auth) {
    const url = new URL("/login", req.nextUrl.origin);
    url.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return Response.redirect(url);
  }
});

export const config = { matcher: ["/dashboard/:path*"] };
