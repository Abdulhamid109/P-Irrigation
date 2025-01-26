import { NextRequest, NextResponse } from "next/server";



export function middleware(request:NextRequest){
    // return NextResponse.redirect(new URL('/home',request.url));
    const path = request.nextUrl.pathname;
    const url = request.nextUrl;
    const pathname = url.pathname;

    const ispublicpath = path ==='/auth/login' || path==='/auth/signup' || path==='/';
    const token = request.cookies.get('token')?.value||"";
    if(ispublicpath && token){
        return NextResponse.redirect(new URL('/home',request.nextUrl));
    }
    if(!ispublicpath && !token){
        return NextResponse.redirect(new URL('/auth/login',request.nextUrl));
    }
    if (pathname.startsWith('/editcrop') && url.searchParams.has('cropId')) {
        // You can extract `cropId` here and perform specific logic if needed
        const cropId = url.searchParams.get('cropId');
        if (!cropId) {
          return NextResponse.redirect(new URL('/auth/login', url)); // Redirect if cropId is missing
        }
        // Continue with other checks if necessary
      }
    
      if (pathname.startsWith('/addcrop') && url.searchParams.has('customerId')) {
        // You can extract `customerId` here and perform specific logic if needed
        const customerId = url.searchParams.get('customerId');
        if (!customerId) {
          return NextResponse.redirect(new URL('/auth/login', url)); // Redirect if customerId is missing
        }
        // Continue with other checks if necessary
      }
}

export const config={
    matcher:[
        '/',
        '/auth/login',
        '/auth/signup',
        '/home',
        '/addcustomer/',
        '/addcrop',
        '/editcrop',
        '/customer/:id*',
        

    ]
}