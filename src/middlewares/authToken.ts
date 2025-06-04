import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { tokenPayload } from '@/types/tokenPayload'
import dotenv from 'dotenv'
dotenv.config()

export const authToken = (req: Request, res: Response, next: NextFunction) => {
  console.log('JWT_SECRET_TOKEN:', process.env.JWT_SECRET_TOKEN)
  console.log('JWT_TOKEN_ADMIN:', process.env.JWT_TOKEN_ADMIN)
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(403).json({ errorMessage: "No information about Token" })
  }

  const token = authHeader.split(' ')[1]
  console.log('Token recebido:', token)

  try {
    // Tenta verificar com user
    let verifyToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN) as tokenPayload //Tenta verificar o token usando o secret do user normal

    req.user = { id: verifyToken.id, role: verifyToken.role } //Salva os dados do user verificado no objeto req.user, para poder usar depois nas rotas.
    console.log("Usuário autenticado como user:", req.user)
    return next() // proximo middleware ou controller ou rota tanto faz, depende do que vier primeiro
  } catch (error1) { // se falhar com a verificacao do user, eh pq o token nao eh do tipo user
    try {
      // Se falhar aquele trycatch, eu tento dnv com o admin
      let verifyToken = jwt.verify(token, process.env.JWT_TOKEN_ADMIN) as tokenPayload //Tenta verificar o token usando o secret do user ADMIN
      req.user = { id: verifyToken.id, role: verifyToken.role } //salva os dados do admin verificado no req.user
      console.log("Usuário autenticado:", req.user)
      return next() // se for valido, ele vai pro proximo, segue o jogo
    } catch (error2) { // se nenhuma das validacoes der certo, ou seja,
                       // se nenhum dos tokens forem validos, eles nao sao nem admin e nem user
      return res.status(403).json({ errorMessage: "Invalid or expired token" }) // gera um erro 403 (forbbiden) pra proibir a autenticacao indicando que o token é invalido ou expirou
    }
  }
}
