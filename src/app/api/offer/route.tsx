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
    const { alumniToken, alumniId, title, description, contract, level, city, company, jobDescription, studies, contactEmail, image, experienceRequired, contactNumber, companyURL } = await req.json();

    try {
        const res = await fetch(process.env.API_URL + '/offers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + alumniToken
            },
            body: JSON.stringify({
                alumniId: alumniId,
                title: title,
                description: description,
                contract: contract,
                level: level,
                city: city,
                company: company,
                jobDescription: jobDescription,
                studies: studies,
                contactEmail: contactEmail,
                image: image,
                experienceRequired: experienceRequired,
                contactNumber: contactNumber,
                companyURL: companyURL
            })
        });
        if (res.status === 200) {
            return new NextResponse("Offer posted", { status: 200 });
        }
        //console.error('Failed to post an offer:', res);
        return new NextResponse(null, { status: 401 });
    } catch (err: any) {
        return new NextResponse(err, { status: 401 });
    }
};