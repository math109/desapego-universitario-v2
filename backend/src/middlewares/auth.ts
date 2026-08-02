import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
 
const JWT_SECRET = process.env.JWT_SECRET as string;
declare global {
  namespace Express {
    interface Request {
      usuarioId?: string;
    }
  }
}
 
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ erro: "Token não informado." });
  }
 
  
const token = authHeader.split(" ")[1];

if (!token) {
  return res.status(401).json({ erro: "Token não informado." });
}

try {
  const payload = jwt.verify(token, JWT_SECRET) as unknown as { usuarioId: string };
  req.usuarioId = payload.usuarioId;
  next();
} catch (err) {
  return res.status(401).json({ erro: "Token inválido ou expirado." });
}
}