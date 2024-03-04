import { NextResponse } from 'next/server';
import querystring from 'querystring';

export const GET = async (req: any) => {
    try {
        const { page } = querystring.parse(req.url.split('?')[1]);
        const res = await fetch(process.env.API_URL + '/offers?page='+page , {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.status === 200) {
            const data = await res.json(); 
            return new NextResponse(JSON.stringify(data), { status: 200 });
        }
        return new NextResponse(null, { status: 401 });
    } catch (err: any) {
        return new NextResponse(err, { status: 401 });
    }
};

export const POST = async (req: any) => {
    try {
        const body = await req.json();
        const res = await fetch(process.env.API_URL + '/offer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body) 
        });
        if (res.status === 200) {
            return new NextResponse("Offer posted", { status: 200 });
        }
        return new NextResponse(null, { status: 401 });
    } catch (err: any) {
        return new NextResponse(err, { status: 401 });
    }
};