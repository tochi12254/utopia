import { authMiddleware, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: ["/api/uploadthing"]
});

// const isProtectedRoute = createRouteMatcher(['/space(.*)'])
  
// export default clerkMiddleware((auth, req) => {
//   if(isProtectedRoute(req)) auth().protect();
// })


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
};