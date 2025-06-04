import express, { Request, Response, NextFunction } from "express";
import clientRoutes from "./clientRoutes";
import userRoutes from "./userRoutes";
import loginRoutes from "./loginRoutes";
import { AuthError } from "@/utils/authError";

const router = express.Router();

router.use("/clients", clientRoutes);
router.use("/users", userRoutes);
router.use("/auth/login", loginRoutes);


router.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AuthError) {
    return res.status(err.statusCode).json({ error: err.message })
  }

  console.error("Erro não tratado:", err)
  return res.status(500).json({ error: "Erro interno no servidor" })
})

export default router;
