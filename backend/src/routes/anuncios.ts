import { Router } from "express";
import { prisma } from "../lib/prisma";
import { authMiddleware, AuthRequest } from "../middlewares/auth";
import { criarAnuncioSchema } from "../schemas";

const router = Router();

router.post("/", authMiddleware, async (req: AuthRequest, res) => {
  const resultado = criarAnuncioSchema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({
      erro: "Dados inválidos",
      detalhes: resultado.error.flatten().fieldErrors,
    });
  }

  const { titulo, descricao, categoria, preco, imagemUrl } = resultado.data;

  try {
    const anuncio = await prisma.anuncio.create({
      data: { titulo, descricao, categoria, preco, imagemUrl, usuarioId: req.usuarioId! },
    });

    return res.status(201).json(anuncio);
  } catch (error) {
    console.error("Erro ao criar anúncio:", error);
    return res.status(500).json({ erro: "Erro ao criar anúncio." });
  }
});

// Listar anúncios (público, continua sem login)
router.get("/", async (req, res) => {
  try {
    const { categoria } = req.query;
    const anuncios = await prisma.anuncio.findMany({
      where: categoria ? { categoria: String(categoria) } : undefined,
      orderBy: { createdAt: "desc" },
    });
    return res.json(anuncios);
  } catch (error) {
    console.error("Erro ao listar anúncios:", error);
    return res.status(500).json({ erro: "Erro ao listar anúncios." });
  }
});

// Meus anúncios (agora usa o token, não mais um ID na URL)
router.get("/meus", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const anuncios = await prisma.anuncio.findMany({
      where: { usuarioId: req.usuarioId! },
      orderBy: { createdAt: "desc" },
    });
    return res.json(anuncios);
  } catch (error) {
    console.error("Erro ao listar seus anúncios:", error);
    return res.status(500).json({ erro: "Erro ao listar seus anúncios." });
  }
});

// Buscar um anúncio específico (público)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ erro: "ID inválido." });
    }

    const anuncio = await prisma.anuncio.findUnique({ where: { id } });

    if (!anuncio) return res.status(404).json({ erro: "Anúncio não encontrado." });
    return res.json(anuncio);
  } catch (error) {
    console.error("Erro ao buscar anúncio:", error);
    return res.status(500).json({ erro: "Erro ao buscar anúncio." });
  }
});

// Deletar anúncio (agora exige login E ser o dono)
router.delete("/:id", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ erro: "ID inválido." });
    }

    const anuncio = await prisma.anuncio.findUnique({ where: { id } });

    if (!anuncio) {
      return res.status(404).json({ erro: "Anúncio não encontrado." });
    }

    if (anuncio.usuarioId !== req.usuarioId) {
      return res.status(403).json({ erro: "Você não tem permissão para deletar este anúncio." });
    }

    await prisma.anuncio.delete({ where: { id } });
    return res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar anúncio:", error);
    return res.status(500).json({ erro: "Erro ao deletar anúncio." });
  }
});

export default router;
