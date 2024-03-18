import { NextResponse } from 'next/server';
import querystring from 'querystring';

export const GET = async (req: any) => {
    const alumniToken = req.headers.get('Authorization');
    const { alumniId } = querystring.parse(req.url.split('?')[1]);
    try {
        const res = await fetch(process.env.API_URL + '/events/subscribed-by-alumni/' + alumniId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' + alumniToken
            }
        });
        if (res.status === 200) {
            const data = await res.json();
            return new NextResponse(JSON.stringify(data), { status: 200});
        }
        return new NextResponse(null, { status: 401 });
    } 
    catch (err: any) {
        return new NextResponse(null, { status: 401 });
    }
}

export const PUT = async (req: any) => {
    const alumniToken = req.headers.get('Authorization');
    const { eventId } = querystring.parse(req.url.split('?')[1]);
    try {
        const res = await fetch(process.env.API_URL + '/events/subscribe/' + eventId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + alumniToken
            }
        });
        if (res.status === 401) {
            const data = await res.json();
            return new NextResponse(JSON.stringify(data), { status: 200 });
        } else {
            return new NextResponse(null, { status: 401 });
        }
    }
    catch (err: any) {
        return new NextResponse(err, { status: 401 });
    }
}