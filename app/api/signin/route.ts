import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import prisma from "../../lib/prisma"

export async function POST(request: NextApiRequest, response: NextApiResponse) {
    const { email, password } = request.body

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ email: user.email, id: user.id, time: Date.now() }, 'hello', { expiresIn: '8h' })
        
        response.setHeader('Set-Cookie', cookie.serialize('TRAX_ACCESS_TOKEN', token, {
            httpOnly: true,
            maxAge: 8 * 60 * 60,
            path: '/',
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production'
        }))

        response.json(user)
    }
    else {
        response.status(401).json({error:'Email or Password is wrong'})
    }
}