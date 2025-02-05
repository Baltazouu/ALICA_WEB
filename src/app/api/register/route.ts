import { NextResponse } from 'next/server';

export const POST = async (request: any) => {
    const { lastName, firstName, email, password } = await request.json();

    const user = {
        lastName: lastName,
        firstName: firstName,
        email,
        password,
    }

    try {
        const res = await fetch( process.env.API_URL + '/auth/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lastName: user.lastName,
                firstName: user.firstName,
                email: user.email,
                password: user.password
             })
        });
        if (res.status === 201) {
            return new NextResponse("user is registered", { status: 200 });
        }
        return new NextResponse("user is not registered", { status: 401 });
    } catch (err: any) {
        return new NextResponse(err, { status: 401 });
    }
};
