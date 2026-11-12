import { Missao, StatusMissao } from "@/types";

/**
 * Regras de Negócio para o Módulo de Missões Operacionais
 */

export function podeConcluirMissao(missao: Missao): boolean {
  if (!missao.tarefas || missao.tarefas.length === 0) {
    return true;
  }
  // Se existirem itens de checklist, todos devem estar concluídos
  return missao.tarefas.every((t) => t.concluida);
}

export function proximoStatusMissao(atual: StatusMissao): StatusMissao {
  switch (atual) {
    case "PENDENTE":
      return "EM_EXECUCAO";
    case "EM_EXECUCAO":
      return "CONCLUIDA";
    default:
      return atual;
  }
}
