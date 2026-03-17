export interface Signatario {
  id_signatario?: string;
  email: string;
  nome: string;
  papel: string; // 'contratante', 'testemunha'
  ordem?: number;
}

export interface EnvelopeResponse {
  envelopeId: string;
  status: string;
  urlPainel?: string;
  signatarios: { email: string; link: string; externalId: string }[];
}

export interface ISignatureProvider {
  name: string;
  
  /**
   * Envia o documento para o provedor de assinatura.
   * @param buffer Arquivo em buffer (PDF/HTML)
   * @param signatarios Lista de pessoas que vão assinar
   */
  enviarEnvelope(buffer: Buffer, signatarios: Signatario[]): Promise<EnvelopeResponse>;

  /**
   * Consulta status do envelope (para sincronizar via webhook ou polling)
   * @param envelopeId Id externo
   */
  consultarStatus(envelopeId: string): Promise<string>;
}
  
