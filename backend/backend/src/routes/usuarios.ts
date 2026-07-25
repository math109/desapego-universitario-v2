import { Router } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { criarUsuarioSchema } from "../schemas";

const router = Router();

router.post("/", async (req, res) => {
  const resultado = criarUsuarioSchema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({
      erro: "Dados inválidos",
      detalhes: resultado.error.flatten().fieldErrors,
    });
  }

  const { nome, email, senha } = resultado.data;

  try {
    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await prisma.user.create({
      data: { nome, email, senha: senhaHash },
    });

    const { senha: _, ...usuarioSemSenha } = usuario;
    return res.status(201).json(usuarioSemSenha);
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({ erro: "Este email já está cadastrado." });
    }
    return res.status(500).json({ erro: "Erro ao criar usuário." });
  }
});

export default router;