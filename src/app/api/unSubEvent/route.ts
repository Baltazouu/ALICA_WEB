import { NextResponse } from 'next/server';
import querystring from 'querystring';

export const PUT = async (req: any) => {
    const alumniToken = req.headers.get('Authorization');
    const { eventId } = querystring.parse(req.url.split('?')[1]);
    try {
        const res = await fetch(process.env.API_URL + '/events/unsubscribe/' + eventId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + alumniToken
            }
        });
        if (res.status === 401) {
            console.log('Unsubscribe error: ' + res);
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
