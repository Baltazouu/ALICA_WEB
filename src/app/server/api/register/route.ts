import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export const POST = async (request: any) => {
    const { surname, name, email, password } = await request.json();

    console.log(surname, name, email, password);

    const hashedPassword = await bcrypt.hash(password, 1);
    const user = {
        surname,
        name,
        email,
        password: hashedPassword
    }

    console.log(JSON.stringify(user));

    try {
        const res = await fetch( process.env.API_URL + '/auth/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                surname: user.surname,
                name: user.name,
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
