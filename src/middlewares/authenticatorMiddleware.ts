import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface tokenPayload {
  id: string,
  email: string,
  role: string
}


export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401).json({
      errorMessage: "No information about Token"
    })
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => { //callback depois que o JWT for verificado
    if (err || typeof decoded !== 'object' || !decoded) {
      return res.sendStatus(403);
    }

  const payload = decoded as tokenPayload;

  req.user = {
    id: payload.id,
    email: payload.email,
    role: payload.role
  }


    if (typeof decoded === 'object' && 'id' in decoded) {
      req.user = {
        id: (decoded as any).id,
        role: (decoded as any).role
      }
      next()
    } else {
      return res.sendStatus(403).json({
        errorMessage: "token format is invalid"
      });
    }
  })
}
