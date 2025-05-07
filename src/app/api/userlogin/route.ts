
import { getSession } from "@/common/http/httpsession";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) { 
  const body = await req.json();
  console.log("paramA:", body.paramA);
  console.log("paramB:", body.paramB);
  const session = await getSession(req);
  console.log("session:", session);
  /*  
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('paramA');
  //const password = searchParams.get('password');
  console.log("username:", username);
  */
  return NextResponse.json({ message: "BIEN" });
}//end 

/*
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Validar las credenciales (esto es solo un ejemplo simple)
    if (username === "user" && password === "password") {
      //req.session.set("user", { username }); // Guardar los datos del usuario en la sesión
      //await req.session.save(); // Guardar la sesión

      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } 
  else {
    res.status(405).json({ message: "Method Not Allowed" }); // Manejar otros métodos HTTP
  }
}
*/
