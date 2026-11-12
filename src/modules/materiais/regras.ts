import { Material } from "@/types";

/**
 * Regras de Negócio para o Módulo de Materiais e Estoque
 */

export function verificarEstoqueCritico(material: Material): boolean {
  return material.quantidadeDisponivel <= material.quantidadeMinima;
}

export function validarRetiradaMaterial(
  material: Material,
  quantidadeDesejada: number
): { permitida: boolean; mensagem?: string } {
  if (quantidadeDesejada <= 0) {
    return { permitida: false, mensagem: "Quantidade deve ser maior que zero." };
  }

  if (material.quantidadeDisponivel < quantidadeDesejada) {
    return {
      permitida: false,
      mensagem: `Estoque insuficiente! Disponível: ${material.quantidadeDisponivel} ${material.unidadeMedida}.`,
    };
  }

  return { permitida: true };
}
