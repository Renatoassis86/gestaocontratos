import { TemplateContrato } from '../../domain/entities/TemplateContrato'

export class ContratoGenerator {
  /**
   * Renderiza o corpo do contrato substituindo os placeholders {{chave}} pelos valores.
   * @param corpoTemplate String contendo placeholders, ex: "Contrato de {{nome}}"
   * @param dados Variáveis de entrada para substituição, ex: { nome: 'João' }
   */
  static renderizar(corpoTemplate: string, dados: Record<string, string>): string {
    let resultado = corpoTemplate;

    // Regex para encontrar todas as tags {{slug}}
    const regex = /\{\{([a-zA-Z0-9_\-]+)\}\}/g;
    
    resultado = resultado.replace(regex, (match, tag) => {
      const valor = dados[tag];
      
      if (valor === undefined || valor === null || valor === '') {
        return `[Pendente: ${tag}]`; // Placeholder visual se não preenchido
      }
      
      return valor;
    });

    return resultado;
  }
}
  
