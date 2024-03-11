import { NextResponse } from 'next/server';
import querystring from 'querystring';

export const GET = async (req: any) => {
    try {
        const { page } = querystring.parse(req.url.split('?')[1]);
        const res = await fetch(process.env.API_URL + '/events?page='+page , {
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
    const { title, description, date, imageURL, nbMaxRegistrations, alumniToken } = await req.json();

    try {
        const res = await fetch(process.env.API_URL + '/events', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + alumniToken
            },
            body: JSON.stringify({
                title: title,
                description: description,
                date: date,
                imageURL: imageURL,
                nbMaxRegistrations: nbMaxRegistrations
            })
        });
        if (res.status === 201) {
            const data = await res.json();
            return new NextResponse(JSON.stringify(data), { status: 201 });
        }
        if (res.status === 400) {
            return new NextResponse(null, { status: 400 });
        }
        return new NextResponse(null, { status: 401 });
    } catch (err: any) {
        return new NextResponse(err, { status: 401 });
    }
};
