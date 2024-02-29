import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const res = await fetch(process.env.API_URL + '/alumnis-restricted', {
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
