// lib/session.ts
import { serialize, parse } from "cookie";
import { NextRequest, NextResponse } from "next/server";

const SESSION_NAME = "myapp_session";
const MAX_AGE = 60 * 60 * 24; // 1 día en segundos

export async function getSession(req: NextRequest) {
    const cookies = parse(req.headers.get("cookie") || "");
    const sessionCookie = cookies[SESSION_NAME];
    if (!sessionCookie) {
        return null;
    }
    try {
        const session = JSON.parse(sessionCookie);
        return session;
    } catch (error) {
        return null;
    }
}

export async function setSession(res: NextResponse, session: any) {
    const cookie = serialize(SESSION_NAME, JSON.stringify(session), {
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
    });
    res.headers.set("Set-Cookie", cookie);
}

export async function destroySession(res: NextResponse) {
    const cookie = serialize(SESSION_NAME, "", {
        maxAge: 0,
        path: "/",
    });
    res.headers.set("Set-Cookie", cookie);
}

/*
export class UserService {

    
    
    static async loginUsuario(username: string, password: string): Promise<any> {

        try {
            let paramA:string = "hola";
            let paramB = "mundo";
            const response = await fetch('/api/userlogin', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "paramA": paramA, "paramB": paramB })
            });	
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            
            console.log("Respuesta de la API (POST):", data);
            return data;
        } catch (error) {
            console.error("Error al llamar a la API (POST):", error);
            throw error;
        }

    }
    
}//end class
*/