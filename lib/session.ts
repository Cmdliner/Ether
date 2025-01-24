import 'server-only'
import { cfg } from './init'
import { jwtVerify, SignJWT } from 'jose';
import { SessionPayload } from './definitions';
import { cookies } from 'next/headers';

const secretKey = cfg.ACCESS_TOKEN_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey);
}


export async function decrypt(session: string | undefined = "") {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256']
        });
        return payload;
    } catch (error) {
        console.log('Failed to verify session')
        console.debug(error);
        console.error(error);

    }
}

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ userId, expiresAt });

    const cookieStore = cookies();
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: cfg.NODE_ENV === "production",
        expires: expiresAt,
        sameSite: 'lax',
        path: '/'
    });
}


export function deleteSession() {
    const cookieStore = cookies();
    cookieStore.delete('session');
}