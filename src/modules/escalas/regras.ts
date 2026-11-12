import { Escala, EscalaParticipante } from "@/types";

/**
 * Regras de Negócio para o Módulo de Escalas e Plantões da ZapZup
 */

export interface ValidacaoEscalaResultado {
  valido: boolean;
  erros: string[];
}

export function validarConflitoHorarios(
  inicioA: Date,
  fimA: Date,
  inicioB: Date,
  fimB: Date
): boolean {
  return inicioA < fimB && fimA > inicioB;
}

export function validarCriacaoEscala(escala: Partial<Escala>): ValidacaoEscalaResultado {
  const erros: string[] = [];

  if (!escala.titulo || escala.titulo.trim().length < 3) {
    erros.push("O título da escala deve conter ao menos 3 caracteres.");
  }

  if (!escala.dataInicio || !escala.dataFim) {
    erros.push("As datas de início e término são obrigatórias.");
  } else {
    const inicio = new Date(escala.dataInicio);
    const fim = new Date(escala.dataFim);

    if (isNaN(inicio.getTime()) || isNaN(fim.getTime())) {
      erros.push("Datas informadas são inválidas.");
    } else if (fim <= inicio) {
      erros.push("A data/hora de término deve ser posterior ao início.");
    }
  }

  return {
    valido: erros.length === 0,
    erros,
  };
}
