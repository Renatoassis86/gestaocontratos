import { ISignatureProvider, Signatario, EnvelopeResponse } from '../../application/services/ISignatureProvider'

export class SimuladoSignatureProvider implements ISignatureProvider {
  name = 'interno_simulado';

  async enviarEnvelope(buffer: Buffer, signatarios: Signatario[]): Promise<EnvelopeResponse> {
    const envelopeId = `env_${Math.random().toString(36).substring(2, 9)}`
    
    // Simula uma resposta de envio, gerando links fictícios para testes.
    const responseSignatarios = signatarios.map((s, index) => {
      const extId = `sig_${envelopeId}_${index}`;
      return {
        email: s.email,
        link: `https://visualizador.contratossaas.com/assinar/${extId}`,
        externalId: extId
      }
    })

    return {
      envelopeId,
      status: 'enviado',
      urlPainel: `https://painel.contratossaas.com/track/${envelopeId}`,
      signatarios: responseSignatarios
    }
  }

  async consultarStatus(envelopeId: string): Promise<string> {
    // Simulado: em_assinatura
    return 'em_assinatura'
  }
}
  
