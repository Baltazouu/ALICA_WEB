import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const res = await fetch(process.env.API_URL + '/events', {
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

export const POST = async (request: any) => {
    const { title, description, date, imageURL, nbMaxRegistrations, alumniToken } = await request.json();

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
        return new NextResponse(null, { status: 401 });
    } catch (err: any) {
        return new NextResponse(err, { status: 401 });
    }
};
