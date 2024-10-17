import { NextApiRequest, NextApiResponse } from "next";
//@ts-ignore
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import prisma from "../../lib/prisma";

export async function POST(request: NextApiRequest, response: NextApiResponse) {
    const salt = bcrypt.genSaltSync();
    const { email, password } = request.body;

    let user
    try {
        user = await prisma.user.create({
            data: {
                email,password:bcrypt.hashSync(password, salt)
            }
        })

        const token = jwt.sign({
            email: user.email,
            id: user.id,
            time: Date.now()
        },
            'hello',
            { expiresIn: '8h' }
        )

        response.setHeader('Set-Cookie', cookie.serialize('TRAX_ACCESS_TOKEN', token, {
            httpOnly: true,
            maxAge: 8 * 60 * 60,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        }))

        response.json(user)
    }
    catch (error) {
        response.status(401).json({ error: 'User already exists' })
        return
    }
}