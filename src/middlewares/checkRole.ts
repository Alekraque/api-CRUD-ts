import { Request, Response, NextFunction } from 'express';

export const checkRole = (role: 'admin' | 'user') => {
  return (req: Request, res: Response, next: NextFunction) => { //retorna uma funcao padrao de middleware do express
    if (req.user?.role !== role) { //verifica se o role do user que ta no req.user
                                  // é diferente do que foi passado na funcao checkRole
      return res.status(403).json({
        error: 'Access denied: insufficient permissions'
      })
      //se o user nao tem a permissao que ele precisa, o codigo
      // responde com erro 403 (forbbiden - acesso negado)
    }
    next() // se tudo der certo, ele manda pro proximo middleware ou pro controller ou rota, etc
  }
}

//resumindo esse codigao aqui:  cria um middleware que restringe o acesso a
                            //  certas rotas com base na role do user.
