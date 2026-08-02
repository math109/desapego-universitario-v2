import { z } from "zod"
export const criarUsuarioSchema = z.object({
  nome: z
    .string({ error: "Nome é obrigatório." })
    .min(2, "Nome deve ter pelo menos 2 caracteres."),
  email: z
    .string({ error: "Email é obrigatório." })
    .email("Email inválido."),
  senha: z
    .string({ error: "Senha é obrigatória." })
    .min(6, "Senha deve ter pelo menos 6 caracteres."),
});
export type CriarUsuarioInput = z.infer<typeof criarUsuarioSchema>;
export const loginSchema = z.object({
  email: z
    .string({ error: "Email é obrigatório." })
    .email("Email inválido."),
  senha: z
    .string({ error: "Senha é obrigatória." })
    .min(1, "Senha é obrigatória."),
});
export type LoginInput = z.infer<typeof loginSchema>;
export const criarAnuncioSchema = z.object({
  titulo: z
    .string({ error: "Título é obrigatório." })
    .min(3, "Título deve ter pelo menos 3 caracteres."),
  descricao: z
    .string({ error: "Descrição é obrigatória." })
    .min(10, "Descrição deve ter pelo menos 10 caracteres."),
  categoria: z
    .string({ error: "Categoria é obrigatória." })
    .min(1, "Categoria é obrigatória."),
  preco: z
    .number()
    .nonnegative("Preço não pode ser negativo.")
    .nullable()
    .optional(),
  imagemUrl: z
    .string({ error: "URL da imagem é obrigatória." })
    .url("URL da imagem inválida."),
});
export type CriarAnuncioInput = z.infer<typeof criarAnuncioSchema>;